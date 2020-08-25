export default {
  methods: {
    community(name) {
      const result = this.$store.state.communities.find(community => {
        return community.name === name
      })
      return result;
    },

  },
};
