import store from '../store.js';

const pollWeb3 = () => {
  const web3 = window.web3;

  setInterval(() => {
    if (web3 && store.state.web3.web3Instance) {
      web3.eth.getAccounts().then((addrs) => {
        const currentAddress = addrs[0];
        if (!currentAddress) {
          store.commit('pollWeb3Instance', {coinbase: null, balance: 0});
        } else if (currentAddress !== store.state.web3.coinbase) {
          const newCoinbase = currentAddress;
          web3.eth.getBalance(currentAddress, (err, newBalance) => {
            if (!err) {
              store.dispatch('pollWeb3', {
                coinbase: newCoinbase,
                balance: parseInt(newBalance, 10),
              });
            }
          });
        } else if (store.state.web3.coinbase) {
          web3.eth.getBalance(store.state.web3.coinbase, (err, polledBalance) => {
            if (err) {
              console.log(err);
            } else if (parseInt(polledBalance, 10) !== store.state.web3.balance) {
              store.dispatch('pollWeb3', {
                coinbase: store.state.web3.coinbase,
                balance: polledBalance,
              });
            }
          });
        }
      });
      web3.eth.net.getId().then((networkId) => {
        if (store.state.web3.networkId !== networkId) {
          store.commit('registerNetworkId', Number(networkId));
        }
      }).catch((e) => {
        throw e;
      });
    }
  }, 500);
};

export default pollWeb3;
