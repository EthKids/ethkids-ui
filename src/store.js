import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash';
import {
  getEthKidsRegistryContract,
  getDonationCommunityContract,
  getEthKidsTokenContract,
  getCharityVaultContract,
  getBondingVaultContract, getKyberConverterContract, getYieldVaultContract, getIATokenContract,
} from './utils/getContract';
import Web3 from "web3";

Vue.use(Vuex)

const empty_address = '0x0000000000000000000000000000000000000000';

export default new Vuex.Store({
  state: {
    //Main

    netName: 'Main',
    registryAddress: '0x1efa04200fd85581502dc21226f6064863932ea5',
    registryCreationBlock: 11242060,
    requiredNetwork: 1,
    kyberAPI: 'https://api.kyber.network',
    httpProvider: 'https://mainnet.infura.io/v3/98d7e501879243c5877bac07a57cde7e',
    infuraId: '98d7e501879243c5877bac07a57cde7e',
    etherscan: 'https://etherscan.io',
    aaveGraphQL: 'https://api.thegraph.com/subgraphs/name/aave/protocol-raw',
    dai: '0x6b175474e89094c44da98b954eedeac495271d0f',
    adai: '0xfC1E690f61EFd961294b3e1Ce3313fBD8aa4f85d',

    //Rinkeby
    /*
    netName: 'Rinkeby',
    registryAddress: '0xA9a56A9dDBE521f15C0BC954ca497AbBD800458a',
    registryCreationBlock: 6393787,
    requiredNetwork: 4,
    kyberAPI: 'https://rinkeby-api.kyber.network',
    httpProvider: 'https://rinkeby.infura.io/v3/98d7e501879243c5877bac07a57cde7e',
    infuraId: '98d7e501879243c5877bac07a57cde7e',
    etherscan: 'https://rinkeby.etherscan.io',
    aaveGraphQL: '',
    dai: '0x6FA355a7b6bD2D6bD8b927C489221BFBb6f1D7B2', //KNC
    adai: empty_address, */

    //Ropsten
    /*netName: 'Ropsten',
    registryAddress: '0xE8dcc388dB4196B338e198Ff84E77efD03E9F7C0',
    registryCreationBlock: 8959496,
    requiredNetwork: 3,
    kyberAPI: 'https://ropsten-api.kyber.network',
    httpProvider: 'https://ropsten.infura.io/v3/98d7e501879243c5877bac07a57cde7e',
    infuraId: '98d7e501879243c5877bac07a57cde7e',
    etherscan: 'https://ropsten.etherscan.io',
    aaveGraphQL: 'https://api.thegraph.com/subgraphs/name/aave/protocol-ropsten-raw',
    dai: '0xf80A32A835F79D7787E8a8ee5721D0fEaFd78108', //DAI, compatible with KyberSwap and Aave
    adai: '0xcB1Fe6F440c49E9290c3eb7f158534c2dC374201',*/

    readOnly: true,
    web3: {
      web3Instance: null,
      networkId: null,
      coinbase: null,
    },
    ethBalance: 0,
    ethKidsRegistryInstance: null,
    kyberConverterAddress: null,

    communities: [],

    //bonding vault stats
    bondingVaultAddress: null,
    yieldVaultAddress: null,
    bondingVaultInstance: null,
    yieldVaultInstance: null,
    aTokenInstance: null,
    bondingVaultBalance: null,

    //token stats
    tokenAddress: null,
    tokenInstance: null,
    tokenSym: null,
    tokenMyBalance: '',
    tokenMyETHReturn: '',

  },
  mutations: {
    disableReadOnlyMode(state) {
      state.readOnly = false;
    },
    registerWeb3Instance(state, payload) {
      state.web3 = payload;
    },
    registerCoinbase(state, payload) {
      state.web3 = {
        ...state.web3,
        coinbase: payload
      };
    },
    registerEthKidsRegistry(state, payload) {
      state.ethKidsRegistryInstance = () => payload;
    },
    registerConverterAddress(state, payload) {
      state.kyberConverterAddress = payload;
    },
    cleanCommunities(state, payload) {
      state.communities = [];
    },
    registerCommunity(state, payload) {
      state.communities.push(payload)
    },
    registerBondingVaultAddress(state, payload) {
      state.bondingVaultAddress = payload;
    },
    registerYieldVaultAddress(state, payload) {
      state.yieldVaultAddress = payload;
    },
    registerBondingVault(state, payload) {
      state.bondingVaultInstance = () => payload;
    },
    registerYieldVault(state, payload) {
      state.yieldVaultInstance = () => payload;
    },
    registerBondingVaultBalance(state, payload) {
      state.bondingVaultBalance = payload;
    },
    registerCharityVaultBalance(state, payload) {
      const community = state.communities.find(community => {
        return community.name === payload.name
      });
      community.balance = payload.balance;
    },
    registerTokenAddress(state, payload) {
      state.tokenAddress = payload;
    },
    registerToken(state, payload) {
      state.tokenInstance = () => payload;
    },
    registerAToken(state, payload) {
      state.aTokenInstance = () => payload;
    },
    registerTokenSym(state, payload) {
      state.tokenSym = payload;
    },
    registerTokenMyBalance(state, payload) {
      state.tokenMyBalance = payload;
    },
    registerTokenMyETHReturn(state, payload) {
      state.tokenMyETHReturn = payload;
    },
    registerCommunityDonation(state, payload) {
      const community = state.communities.find(community => {
        return community.name === payload.name
      });
      if (!community.communityDonations) {
        community.communityDonations = [];
      }
      community.communityDonations.push(payload);
      community.communityDonations = _.orderBy(community.communityDonations, 'blockNo', 'desc');
    },
    registerCommunityTransfer(state, payload) {
      const community = state.communities.find(community => {
        return community.name === payload.name
      });
      if (!community.communityTransfers) {
        community.communityTransfers = [];
      }
      community.communityTransfers.push(payload);
      community.communityTransfers = _.orderBy(community.communityTransfers, 'blockNo', 'desc');
    },
    financialChange(state, payload) {
      //
    },
  },
  actions: {
    instantiateWeb3ReadOnly({commit, state}) {
      state.readOnly = true;
      const web3 = new Web3(new Web3.providers.HttpProvider(state.httpProvider));
      const web3Obj = {
        coinbase: '0x0000000000000000000000000000000000000001',
        networkId: state.requiredNetwork,
        web3Instance: web3
      };
      commit('registerWeb3Instance', web3Obj);
    },
    initBondingVaultContract({commit, state, dispatch}, bondingVaultAddress) {
      commit('registerBondingVaultAddress', bondingVaultAddress);
      getBondingVaultContract(bondingVaultAddress, state.web3.web3Instance).then((bondingVaultContract) => {
        //community token
        bondingVaultContract.methods.getEthKidsToken().call().then((tokenAddress) => {
          dispatch('initEthKidsTokenContract', tokenAddress);
        });
        commit('registerBondingVault', bondingVaultContract);
      }).catch((err) => {
        console.log(err);
      });
    },

    initYieldVaultContract({commit, state, dispatch}, yieldVaultAddress) {
      commit('registerYieldVaultAddress', yieldVaultAddress);
      getYieldVaultContract(yieldVaultAddress, state.web3.web3Instance).then((yieldVaultContract) => {
        commit('registerYieldVault', yieldVaultContract);
      }).catch((err) => {
        console.log(err);
      });
    },

    initEthKidsTokenContract({commit, state}, tokenAddress) {
      commit('registerTokenAddress', tokenAddress);
      getEthKidsTokenContract(tokenAddress, state.web3.web3Instance).then((tokenContract) => {
        commit('registerToken', tokenContract);
        tokenContract.methods.symbol().call().then((sym) => {
          commit('registerTokenSym', sym);
        });
      }).catch((err) => {
        console.log(err);
      });
    },
    initEthKidsCommunityContract({commit, state, dispatch}, communityAddress) {
      getDonationCommunityContract(communityAddress, state.web3.web3Instance).then((communityContract) => {
        communityContract.methods.name().call().then((communityName) => {
          //charity vault
          communityContract.methods.charityVault().call().then((charityVaultAddress) => {
            getCharityVaultContract(charityVaultAddress, state.web3.web3Instance).then((charityVaultContract) => {
              commit('registerCommunity', {
                name: communityName,
                address: communityAddress,
                contract: () => communityContract,
                vaultAddress: charityVaultAddress,
                vaultContract: () => charityVaultContract,
              });
            }).catch((err) => {
              console.log(err);
            });
          });
        });
      }).catch((err) => {
        console.log(err);
      });
    },

    registerContracts({commit, state, dispatch}) {
      return new Promise((resolve, reject) => {
        commit('cleanCommunities');
        getEthKidsRegistryContract(state.registryAddress, state.web3.web3Instance).then((registryContract) => {
          registryContract.methods.communityCount().call().then((index) => {
            console.log("Total communities: " + index);
          }).catch((e) => {
            throw e;
          });

          //bonding vault
          registryContract.methods.bondingVault().call().then((bondingVaultAddress) => {
            dispatch('initBondingVaultContract', bondingVaultAddress);
          });

          //yield vault
          registryContract.methods.yieldVault().call().then((yieldVaultAddress) => {
            dispatch('initYieldVaultContract', yieldVaultAddress);
          });

          //aToken
          getIATokenContract(state.adai, state.web3.web3Instance).then((aDAIContract) => {
            commit('registerAToken', aDAIContract);
          }).catch((err) => {
            console.log(err);
          });

          //converter
          registryContract.methods.currencyConverter().call().then((converter) => {
            commit('registerConverterAddress', converter);
          }).catch((e) => {
            throw e;
          });

          //communities
          registryContract.methods.communityCount().call().then((count) => {
            for (let index = 0; index < count; index++) {
              registryContract.methods.getCommunityAt(index).call().then((communityAddress) => {
                dispatch('initEthKidsCommunityContract', communityAddress);
              }).catch((e) => {
                throw e;
              });
            }
          });


          commit('registerEthKidsRegistry', registryContract);
          resolve(registryContract);
        }).catch((e) => {
          reject(e);
        });
      });
    },
  }
})
