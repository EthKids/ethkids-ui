<template>
  <div class="container">
    <h1>How EthKids works</h1>

    <h3>
      1. What is it for
    </h3>
    TODO

    <h3>
      2. How it works
    </h3>
    TODO

    <h3>
      3. Example
    </h3>
    <p>
      Hypothetical year with 3 donators:
    </p>
    <p>
      <strong>Bob</strong> - early adopter, big single donation in the beginning
    </p>
    <p>
      <strong>Alice</strong> - constantly donates throughout the year
    </p>
    <p>
      <strong>Tom</strong> - steps in at the end of the year
    </p>
    <p>
      <img src="../assets/about-donations.png" width="600px">
    </p>
    <p>
      The 'buy' price changes depending on their current holdings.
      <br>
      For <strong>Bob</strong> is raises significantly at the beginning, along with his initial donation. and decreases over the time,
      effectively making new donation more attractive
      <br>
      For <strong>Alice</strong> is's constantly and slowly growing while she's the only active donator, but with drops when new ones contributing
      <br>
      For <strong>Ted</strong> it is very cheap and easy to build up his stake when he decides to donate first time, and this is the way to attract
      new donators.
    </p>
    <p>
      <img src="../assets/about-price.png" width="600px">
    </p>
    <p>
      The ETH return differs based on the personal token holdings.
      <br>
      <strong>Bob</strong> can liquidate his tokens right after his first donation for a pretty good price, especially if he knows that he won't
      donate more in near future.
      But, this might not be the smartest move, since the the funds backing the bonding curve with be constantly growing when new donations happen.
      In fact, Bob dropping in price, but still growing in ETH value.
      <br>
      <strong>Alice</strong> is growing steadily in her token return as she's chosen the best tacktics and rewarded the most as a constant
      contributor.
      <br>
      <strong>Ted</strong> is rewarded fairily fast at the moment when he's stepping in, but will slow down if he stops.
    </p>
    <p>
      <img src="../assets/about-liquidation.png" width="600px">
    </p>
    <p>
      <strong>Note:</strong> If either <strong>Bob</strong>, <strong>Alice</strong> or <strong>Ted</strong>
      will liquidate their tokens, the rest of the community will effectively grow
      in their returns, since each of their's portion of tokens will increase.
    </p>
    <p>
      <strong>Advice?</strong> The best strategy is to constantly donate to the community,
      take an active position in growing the member's base, contribute in a variaty of the ways, and, perhaps, HODL.
    </p>

    <h3>
      4. How raised funds get to the charity organisation
    </h3>
    TODO

    <h3>
      5, How to list a new community
    </h3>
    TODO
  </div>
</template>

<script>
export default {
  name: 'About',
};
</script>

<style lang="scss" scoped>
  .container {
    padding: 50px 10px 0px 10px;
    text-align: left;
  }
</style>
