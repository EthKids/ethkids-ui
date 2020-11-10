export default {
  methods: {
    xWeb3() {
      return this.$store.state.web3;
    },
    fromWei(value) {
      return this.$store.state.web3.web3Instance.utils.fromWei(value.toString(), 'ether');
    },
    toWei(value) {
      return this.$store.state.web3.web3Instance.utils.toWei(value.toString(), 'ether');
    },
    community(name) {
      const result = this.$store.state.communities.find(community => {
        return community.name === name
      })
      return result;
    },

  },
};
