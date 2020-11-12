<template>
  <div>
    <HeaderPlate/>
    <div class="container">
      <div class="col-md-8">
        <h1>Introducing EthKids</h1>

        <br>
        <br>
        <span class="biggerText">
          EthKids makes this world a bit of a better place. At least for children.
        </span>

        <br>
        <br>
        <h5 class="bolderText">
          Why Blockchain
        </h5>
        <span class="biggerText">
          Although the use of Blockchain is not that straightforward yet as the mass adoption is still ahead, there are some unbeatable grounds
              to use it.
              <br>
              To name a few:
              <br><br>
              <ul>
                <li><code>Transparency of funds collected.</code>
                </li>
                Everyone can see how much and when came in, what's the status of the fund is right now, and what was taken out by whom.
                <br>
                This history is stored in Blockchain forever, cryptographically ensured and no one can tamper it.
                <br><br>
                <li><code>Programmable funds distribution</code>
                </li>
                Blockchain fits ideally when the money flow is occurring in a many-to-many fashion. When, for example, there is a trusted pot, which
                secures
                the funds from the multiple routes, and under a specific programmable condition splits them over to a group of recipients.
                <br><br>
                <li><code>Smart programmable appreciation</code>
                </li>
                Every donor gets appreciation according to a single rule, in a fair way. More about it down further.
                <br><br>
                <li><code>Open source</code>
                </li>
                All the programmable rules are opensource and cryptographically proven to be the ones that are used
                <br><br>
                <li><code>Cheap and fast transfers</code>
                </li>
                Donations in cryptocurrencies can be sent at reasonably low transaction costs, regardless of the amounts and geographical location
              </ul>
        </span>

        <br>
        <br>
        <h5 class="bolderText">
          How it works
        </h5>
        <span class="biggerText">
          The charity donations can be sent per charity community, any amount, using the corresponding
              <mark>'Donate'</mark>
              button.
              <br><br>
              Once the transaction is confirmed, the donor will receive the  <a target="_blank" v-bind:href="getTokenLink">CHANCE</a> token, as a matter of an appreciation.

        </span>
        <br>
        <br>
        <h5 class="bolderText">
          Under the hood
        </h5>
        <span class="biggerText">
          <code>90%</code> of the donated funds will land in the <strong>Charity Vault</strong> and will stay there until the <em>community leader</em>
          moves it further to the actual charity organization.
          <br><br>
          The remaining <code>10%</code> get into the <strong>Community Vault</strong> which serves as a sort of a rewards pot
          and backs up the minted  <a target="_blank" v-bind:href="getTokenLink">CHANCE</a> token.
          <br>
          In other words, the donor gets some cashback, but in <code>CHANCE</code>.
          <br><br>
          <code>How CHANCE can be used?</code>
          <br>
          CHANCE token follows the ERC20 standard on Ethereum blockchain and can be used as any other of it's sort: sent, traded, kept.
          <br>
          Additionally, the token can be <code>sold back</code> (or <em>liquidated</em>) against the <strong>Community Vault</strong> and the holder with receive ETH back.
          <br><br>
          <code>At what price?</code>
          <br>
          <strong>TL;DR</strong> The price will increase when more people donate to EthKids platform, meaning that each and every holder of CHANCE will be able to sell it later for a higher price than they got it for.
          <br><br>
          Here will me some math, feel free to skip it to the next chapter.
          <br><br>
          The Bonding Vault contract (<i>refresher:</i> the one which stores <strong>10%</strong> of the donated funds) is a
          <a target="_blank" href="https://blog.relevant.community/bonding-curves-in-depth-intuition-parametrization-d3905a681e0a">Bonding Curve</a>
          contract and an automatic market maker (a smart contract that enables users to buy and sell tokens) with the following properties:
          <ul>
            <li>
              A token can be minted (bought) at any time according to a price set by a smart contract.
              </li>
            <li>
              This price increases as token supply grows.
            </li>
            <li>
              The money (ETH) paid for tokens is kept in the smart contract (reserve pool).
            </li>
            <li>
              At any point in time, a token can be burned (sold) back to the contract.
            </li>
          </ul>
          <blockquote class="blockquote text-center">
            <img src="../assets/curve.jpeg" width="600px">
            <footer class="blockquote-footer">Bonding Curve, a Market maker </footer>
          </blockquote>
          <br>
          The outstanding benefits of this model are:
          <ul>
            <li>Donors are incentivized to keep their percent of tokens, i.e., donate more often
            </li>
            <li>Donor's total return rises along with the grow of the protocol.
            </li>
          </ul>
        </span>
        <br>
        <br>
        <h5 class="bolderText">
          Passive charity
        </h5>
        <span class="biggerText">
          EthKids is an opensource not-profit protocol that runs as a number of smart-contracts in the blockchain space.
          <br>
          We try to unitize the benefits blockchain offers in terms of interoperability, and integrate with one of them - <a target="_blank"
                                                                                                                             href="https://aave.com/">AAVE</a>, the money market protocol.
          <br>
          Apart from the rest, <strong>Aave</strong> allows people to 'lock' some crypto assets and earn perpetual interest on it. So, what we do for <strong>Passive Charity</strong> -
          we enable people to 'redirect' earned interest to the EthKids platform, effectively donating to the good cause 24/7 at no cost.
          To enable it you will need to:
          <ul>
            <li>
              Go to <a target="_blank" href="https://app.aave.com/dashboard/deposits">Aave dashboard</a>
            </li>
            <li>
              Deposit some <code>DAI</code> (for now, we support Passive Charity for DAI only)
            </li>
            <li>
              Go back the <a target="_blank" href="https://ethkids.io">EthKids.io</a> and press <mark>'Passive charity'</mark> button
            </li>
            <li>
              That's it, now your interest will be redirected to the good cause every minute. When you want to stop it, you just need to switch it off in the EthKids interface
            </li>
          </ul>
        </span>
        <br>
        <br>
        <h5 class="bolderText">
          How raised funds get to the charity organisation
        </h5>
        <span class="biggerText">
              <code>EthKids</code> is a decentralized registry of multiple charity communities.
              Every community has one or many community leaders who have the power to take the funds from the <strong>Charity Vault</strong> at any
              time
              and pass them further to the actual charity organization they represent.
              <br>
              Community leaders are obliged to provide additional information on what the exact reason for taking these funds and how they will be
              used.
              <br><br>
              <strong>Note:</strong> there will be a more sophisticated mechanism of storing the full track of fund movements soon, which will
              save in <a href="https://ipfs.io/" target="_blank">IPFS</a> or similar decentralized data storage.
        </span>

        <br>
        <br>
        <h5 class="bolderText">
          How to list a new community
        </h5>
        <span class="biggerText">
              Been a nonprofit <a href="https://en.wikipedia.org/wiki/The_DAO_(organization)" target="_blank">ĐAO</a>,
              EthKids doesn't have a moderator or an admin.
              <br>
              Every charity organization can register on EthKids protocol as long as they represent a nonprofit charity raising funds to help children.
              <br>
              For listing inquiries, please contact <a href="mailto:info.ethkids@gmail.com"> info.ethkids@gmail.com</a> or join our
              <a href="https://t.me/joinchat/K1v4ShPV57D0zfjybfRFDQ" target="_blank">Telegram</a> channel.
        </span>

      </div>

    </div>
  </div>
</template>

<script>
import HeaderPlate from '@/components/HeaderPlate'

export default {
  name: 'About',
  components: {
    HeaderPlate,
  },
  computed: {
    getTokenLink() {
      return `${this.$store.state.etherscan}/token/${this.$store.state.tokenAddress}`;
    },
  }

};
</script>

<style lang="scss" scoped>
.container {
  padding: 50px 10px 0px 10px;
  text-align: left;
}
</style>
