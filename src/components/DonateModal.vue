<template>
  <modal class="donate-modal"
         v-if="donateModal"
         @close="donateModal = false">
    <div slot="header">
      Donate to charity
    </div>
    <div slot="subheader">
      Chance.by
    </div>
    <div slot="body">
      <div>
        <b-tabs content-class="mt-3" align="center" active-tab-class="font-weight-bold">
          <b-tab title="Crypto" active>
            <div class="form-group text-center">
              <div class="row donationRow">
                <div class="numericWrapper">
                  <vue-numeric
                    id="donation-input"
                    style="border-width: 0px; text-align: right; "
                    v-model="donation"
                    v-on:input="fetchFxETH()"
                    v-bind:min="0"
                    v-bind:minus="false"
                    focus="focus"
                    v-bind:precision="3"/>
                </div>
                <div>
                  <v-select v-bind:options="supportedCurrencies" @input="tokenChosen" label="symbol" v-bind:value="selectedToken">
                    <template slot="option" slot-scope="option">
                <span style="margin-right: 10px">
                  <img style="width: 40px; height: 40px" v-bind:alt="option.symbol" v-bind:src="getTokenImageLink(option)">
                </span>
                      {{ option.symbol }}
                    </template>
                  </v-select>
                </div>
              </div>
            </div>
            <div class="form-group text-center fx bordered" v-if="ethAmount">
              My wallet: <b>{{myBalance}} {{selectedToken.symbol}}</b>
              <br><br>
              Token swap is powered by <a href="https://kyber.network/" target="_blank">Kyber Network </a>
              <br>
              <b>{{donation}} {{selectedToken.symbol}} = {{ethAmount}} ETH = {{usdAmount}} USD</b>
            </div>
            <div v-if="insufficientFunds" class="alert-danger insuffucientFunds">
              Insufficient funds
            </div>
          </b-tab>
          <b-tab title="Fiat">
            <button id='buy'>Buy</button>
            <div id="wyre-dropin-widget-container"></div>
          </b-tab>
        </b-tabs>
      </div>

      <b-button class="btn-primary custom-btn-action"
                variant="primary"
                @click="donate()">
        {{this.btnText}}
      </b-button>
    </div>
  </modal>
</template>

<script>
import VueNumeric from 'vue-numeric';
import Modal from '@/components/Modal';
import EventBus from '@/utils/event-bus';
import axios from "axios";
import {getIERC20Contract, getKyberConverterContract} from "../utils/getContract";

export default {
    name: 'DonateModal',
    components: {
        Modal,
        VueNumeric,
    },
    data() {
        return {
            btnText: 'Donate',
            donateModal: false,
            donation: 0.1,
            insufficientFunds: false,
            supportedCurrencies: [],
            selectedToken: {
                address: '0x00eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', //ETH
                id: '0x00eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
                symbol: 'ETH'
            },
            ethAmount: null,
            usdAmount: null,
            myBalance: null,
        };
    },
    beforeCreate() {
        const self = this;
        EventBus.subscribe('OPEN_DONATE', () => {
            self.donateModal = true;
        });
    },
    mounted() {
      const self = this;
      axios.get(this.$store.state.kyberAPI + "/currencies")
        .then((response) => {
          self.supportedCurrencies = response.data.data;
        })
      //fetch initial FX
      this.$store.subscribe((mutation) => {
        if (mutation.type == 'registerWeb3Instance') {
          this.tokenChosen(this.selectedToken);
        }
      });
    },
    methods: {
        isETHSelected() {
            return this.selectedToken.symbol === 'ETH';
        },
        getTokenImageLink(option) {
            return "https://files.kyber.network/DesignAssets/tokens/" + option.symbol.toLowerCase() + ".svg";
        },
        tokenChosen(value) {
            this.selectedToken = value;
            this.fetchFxETH();
        },
        fetchFxETH() {
            const self = this;
            this.insufficientFunds = false;
            if (!this.isETHSelected()) {
                getIERC20Contract(this.selectedToken.address).then((erc20Instance) => {
                    self.ercBalance(erc20Instance).then(balance => {
                        self.myBalance = parseFloat(window.web3.utils.fromWei(balance.toString(), 'ether')).toFixed(2);
                    });
                });
                axios.get(this.$store.state.kyberAPI + "/sell_rate", {
                    params: {
                        id: this.selectedToken.id,
                        qty: this.donation
                    },
                })
                    .then((response) => {
                        self.ethAmount = response.data.data[0].dst_qty[0];
                        this.fetchFxUSD();
                    })
            } else {
                window.web3.eth.getBalance(this.$store.state.web3.coinbase).then(eth =>
                    this.myBalance = parseFloat(window.web3.utils.fromWei(eth, 'ether')).toFixed(2));
                this.ethAmount = this.donation;
                this.fetchFxUSD();
            }
        },
        fetchFxUSD() {
            const self = this;
            axios.get(this.$store.state.kyberAPI + "/change24h")
                .then((response) => {
                    Object.keys(response.data).forEach(function (pair) {
                        let searchingFor = self.isETHSelected() ?
                            'ETH_WETH' :
                            ('ETH_' + self.selectedToken.symbol);
                        if (pair === searchingFor) {
                            self.usdAmount = (response.data[pair].rate_usd_now * self.donation).toFixed(2);
                        }

                    });
                });
        },
        donate() {
            if (this.isETHSelected()) {
                this.donateETH();
            } else {
                this.donateWithSwap();
            }
        },
        donateETH() {
            const self = this;
            self.donateModal = false;
            EventBus.publish('OPEN_LOADING', 'Sending...');
            self.$store.state.communityInstance().methods
                .donate()
                .send({from: self.$store.state.web3.coinbase, value: window.web3.utils.toWei(self.donation.toString(), 'ether')})
                .on('receipt', (receipt) => {

                })
                .on('confirmation', (confirmationNumber, receipt) => {
                    if (confirmationNumber == 1) {
                        self.thanksAndGoodbye();
                    }
                })
                .on('error', () => {
                    EventBus.publish('CLOSE_LOADING');
                });
        },
        donateWithSwap() {
            const self = this;
            EventBus.publish('OPEN_LOADING', `(1/2) Approving swap of ${this.donation} ${this.selectedToken.symbol}...`);
            getIERC20Contract(this.selectedToken.address).then((erc20Instance) => {
                self.ercBalance(erc20Instance).then(balance => {
                    //balance is enough?
                    if (Number(balance) >= (Number)(window.web3.utils.toWei(self.donation.toString(), 'ether'))) {
                        self.donateModal = false;
                        erc20Instance.methods
                            .approve(self.$store.state.kyberConverterAddress, window.web3.utils.toWei(self.donation.toString(), 'ether'))
                            .send({from: self.$store.state.web3.coinbase})
                            .on('transactionHash', (hash) => {

                            })
                            .on('confirmation', (confirmationNumber, receipt) => {
                                if (confirmationNumber == 1) {
                                    EventBus.publish('OPEN_LOADING', `(2/2) Transferring donation of ${this.ethAmount} ETH...`);
                                    getKyberConverterContract(self.$store.state.kyberConverterAddress).then(kyberConverter => {
                                        let maxDestAmount = self.ethAmount * 1.03; //max 3% up
                                        kyberConverter.methods
                                            .executeSwapAndDonate(self.selectedToken.address,
                                                window.web3.utils.toWei(self.donation.toString(), 'ether'),
                                                window.web3.utils.toWei(maxDestAmount.toString(), 'ether'),
                                                self.$store.state.communityAddress
                                            )
                                            .send({from: self.$store.state.web3.coinbase})
                                            .on('confirmation', (confirmationNumber, receipt) => {
                                                if (confirmationNumber == 1) {
                                                    self.thanksAndGoodbye();
                                                }
                                            })
                                            .on('error', () => {
                                                EventBus.publish('CLOSE_LOADING');
                                            });
                                    });
                                }
                            })
                            .on('error', () => {
                                EventBus.publish('CLOSE_LOADING');
                            });
                    } else {
                        //insufficient funds
                        EventBus.publish('CLOSE_LOADING');
                        self.insufficientFunds = true;
                    }
                });
            })
        },
        ercBalance(token) {
            return token.methods.balanceOf(this.$store.state.web3.coinbase).call();
        },
        thanksAndGoodbye() {
            EventBus.publish('OPEN_LOADING', 'Thank you for your donation!');
            setTimeout(() => {
                EventBus.publish('CLOSE_LOADING');
            }, 2000);
        },
    },
};
</script>

<style scoped>
  .donationRow {
    margin-right: 0;
    margin-left: 0;
  }

  .numericWrapper {
    margin-right: 5px;
    background-color: white;
    padding-right: 5px;
    padding-top: 5px;
  }

  .fx {
    font-size: 14px;
    line-height: 22px;
    width: 350px;
    margin: 10px auto 10px auto;
    padding: 1rem;
  }

  .bordered {
    border: 1px dashed rgba(0, 0, 0, 0.125);
    border-radius: 5px;
  }

  .v-select {
    background-color: white;
    width: 150px;
  }

  .insuffucientFunds {
    background-color: transparent;
  }

</style>
