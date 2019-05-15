import Vue from 'vue'
import Vuex from 'vuex'
import getWeb3 from './utils/getWeb3';
import pollWeb3 from './utils/pollWeb3';
import {
  getEthKidsRegistryContract,
  getDonationCommunityContract,
  getCommunityTokenContract,
  getCharityVaultContract,
  getBondingVaultContract,
} from './utils/getContract';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    registryAddress: '0x51ca6C9da9460B03C44fb14B5c1e1f89e9b23C28',
    communityCreationBlock: 25,
    requiredNetwork: '5777',
    web3: {
      isInjected: false,
      web3Instance: null,
      networkId: null,
      coinbase: null,
      balance: null,
      error: null,
    },
    ethBalance: 0,
    ethKidsRegistryInstance: null,
    //TODO These states are per community
    communityAddress: null,
    communityInstance: null,
    //bonding vault stats
    bondingVaultAddress: null,
    bondingVaultInstance: null,
    bondingVaultBalance: null,
    //charity vault stats
    charityVaultAddress: null,
    charityVaultInstance: null,
    charityVaultBalance: null,
    totalDonationsRaised: 0,
    //token stats
    tokenAddress: null,
    tokenInstance: null,
    tokenSym: null,
    tokenTotalSupply: null,
    tokenMyBalance: null,
    tokenMyETHValue: null,

  },
  mutations: {
    registerWeb3Instance(state, payload) {
      const result = payload;
      const web3Copy = state.web3;
      web3Copy.coinbase = result.coinbase;
      web3Copy.networkId = result.networkId;
      web3Copy.balance = Number(result.balance);
      web3Copy.isInjected = result.injectedWeb3;
      web3Copy.web3Instance = result.web3;
      state.web3 = web3Copy;
      pollWeb3(state.web3);
    },
    registerNetworkId(state, payload) {
      state.web3.networkId = payload;
    },
    pollWeb3Instance(state, payload) {
      state.web3.coinbase = payload.coinbase;
      state.web3.balance = parseInt(payload.balance, 10);
    },
    registerEthBalance(state, payload) {
      state.ethBalance = payload;
    },
    registerEthKidsRegistry(state, payload) {
      state.ethKidsRegistryInstance = () => payload;
    },
    registerCommunityAddress(state, payload) {
      state.communityAddress = payload;
    },
    registerCommunity(state, payload) {
      state.communityInstance = () => payload;
    },
    registerBondingVaultAddress(state, payload) {
      state.bondingVaultAddress = payload;
    },
    registerBondingVault(state, payload) {
      state.bondingVaultInstance = () => payload;
    },
    registerBondingVaultBalance(state, payload) {
      state.bondingVaultBalance = payload;
    },
    registerCharityVaultAddress(state, payload) {
      state.charityVaultAddress = payload;
    },
    registerCharityVault(state, payload) {
      state.charityVaultInstance = () => payload;
    },
    registerCharityVaultBalance(state, payload) {
      state.charityVaultBalance = payload;
    },
    registerTokenAddress(state, payload) {
      state.tokenAddress = payload;
    },
    registerToken(state, payload) {
      state.tokenInstance = () => payload;
    },
    registerTokenSym(state, payload) {
      state.tokenSym = payload;
    },
    registerTokenTotalSupply(state, payload) {
      state.tokenTotalSupply = payload;
    },
    registerTokenMyBalance(state, payload) {
      state.tokenMyBalance = payload;
    },
    registerTokenMyETHValue(state, payload) {
      state.tokenMyETHValue = payload;
    },
    registerTotalDonationsRaised(state, payload) {
      state.totalDonationsRaised = payload;
    },
  },
  actions: {
    registerWeb3({commit}) {
      return new Promise((resolve, reject) => {
        getWeb3.then((result) => {
          commit('registerWeb3Instance', result);
          resolve(result);
        }).catch((e) => {
          console.log('error in action registerWeb3', e);
          reject(e);
        });
      });
    },
    pollWeb3({commit}, payload) {
      commit('pollWeb3Instance', payload);
    },
    initBondingVaultContract({commit}, bondingVaultAddress) {
      commit('registerBondingVaultAddress', bondingVaultAddress);
      getBondingVaultContract(bondingVaultAddress).then((bondingVaultContract) => {
        commit('registerBondingVault', bondingVaultContract);
      }).catch((err) => {
        console.log(err);
      });
    },

    initCharityVaultContract({commit, dispatch}, charityVaultAddress) {
      commit('registerCharityVaultAddress', charityVaultAddress);
      getCharityVaultContract(charityVaultAddress).then((charityVaultContract) => {
        commit('registerCharityVault', charityVaultContract);
      }).catch((err) => {
        console.log(err);
      });
    },
    initCommunityTokenContract({commit}, tokenAddress) {
      commit('registerTokenAddress', tokenAddress);
      getCommunityTokenContract(tokenAddress).then((tokenContract) => {
        commit('registerToken', tokenContract);

        tokenContract.methods.symbol().call().then((sym) => {
          commit('registerTokenSym', sym);
        });

      }).catch((err) => {
        console.log(err);
      });
    },
    initEthKidsCommunityContract({commit, dispatch}, communityAddress) {
      commit('registerCommunityAddress', communityAddress);
      getDonationCommunityContract(communityAddress).then((communityContract) => {
        commit('registerCommunity', communityContract);
        //bonding vault
        communityContract.methods.bondingVault().call().then((bondingVaultAddress) => {
          dispatch('initBondingVaultContract', bondingVaultAddress);
        });
        //charity vault
        communityContract.methods.charityVault().call().then((charityVaultAddress) => {
          dispatch('initCharityVaultContract', charityVaultAddress);
        });
        //community token
        communityContract.methods.getCommunityToken().call().then((tokenAddress) => {
          dispatch('initCommunityTokenContract', tokenAddress);
        });
      }).catch((err) => {
        console.log(err);
      });
    },

    registerContracts({commit, state, dispatch}) {
      return new Promise((resolve, reject) => {
        getEthKidsRegistryContract(state.registryAddress).then((registryContract) => {
          commit('registerEthKidsRegistry', registryContract);
          registryContract.methods.communityIndex().call().then((index) => {
            console.log("Total communities: " + index);
          }).catch((e) => {
            throw e;
          });
          registryContract.methods.getCommunityAt(0).call().then((communityAddress) => {
            dispatch('initEthKidsCommunityContract', communityAddress);
          }).catch((e) => {
            throw e;
          });
          resolve(registryContract);
        }).catch((e) => {
          reject(e);
        });
      });
    },
  }
})
