<template>
  <div class="container">
    <div class="col-md-8">
      <h1>How EthKids works</h1>

      <h3>
        1. What this all for
      </h3>
      <p>
        To make this world a bit of a better place. At least for children.
      </p>

      <h3>
        2. Why Blockchain?
      </h3>
      Although, use of Blockchain is not that straighforward yet as the mass adoption is still ahead, there is a number of unbeatable reasons to use
      it.
      <br>
      To name a few:
      <br><br>
      <ul>
        <li><strong>Transparency of funds collected.</strong>
        </li>
        Everyone can see how much and when came in, what't the state of fund is right now, and what was taken out by whom.
        <br>
        This history is stored in Blockchain forever, cryptographically secured and cannot be tampered by anyone.
        <br><br>
        <li><strong>Programmable funds distribution</strong>
        </li>
        Blockchain fits perfectly when the money flow is happening in many-to-many manner. When, for example, there is a trusted pot, which collects
        the funds from the multiple routes, and under a specific programmable condition splits them over to a group of recipients.
        <br><br>
        <li><strong>Smart programmable appreciation</strong>
        </li>
        Every donator is appreciated according to a single rule, in a fair way. More about it down further.
        <br><br>
        <li><strong>Open source</strong>
        </li>
        All the programmable rules are open sourced, and cryptographically proven to be the ones that are used
        <br><br>
        <li><strong>Cheap and fast transfers</strong>
        </li>
        Donations in cryptocurrencies can be send at fairly low transaction costs, regardless of the amounts and geographical location
      </ul>

      <h3>
        3. How it works
      </h3>
      The charity donations can be sent per charity community, any amount, using the corresponding
      <mark>'Donate'</mark>
      button.
      <br><br>
      Once the transaction is confirmed, the donator will receive the <strong> community token</strong>, as a matter of an appreciation.
      <br><br>
      And then the <strong>magic</strong> begins!
      <br><br>
      <strong>90%</strong> of the funds will land in the <strong>Charity Vault</strong> and will stay there until the <em>community leader</em>
      move it further to the actual charity organisation.
      <br><br>
      The remaining <strong>10%</strong> get into the <strong>Community Vault</strong>, which serves as a sort of a rewards pot and used to
      backup the minted <em>community tokens</em>.
      <br>
      In other words, the donator gets some sort of a cashback, but in <em>community tokens.</em>
      <br><br>
      <strong>How this tokens can be used?</strong>
      <br>
      The only use case for such tokens at the moment is to <strong>sell them back</strong> (or, actually, <em>liquidate</em>).
      <br><br>
      <strong>At what price?</strong>
      <br>
      And this is a cool thing: <em>the price depends on the personal portion of tokens hold, comparing to the total amount of tokens</em>
      <br>
      <em>Higher</em> the portion, <em>higher</em> the price.
      <br>
      Again, the more you've got, percent wise, the higher your selling price is.
      <br><br>
      The beauty of this concept:
      <ul>
        <li>Donators are incentivised to keep their persent of tokens, i.e. donate more often
        </li>
        <li>Donator's total return grows along with the Community Vault. More funds mean higher return in case of selling,
          even of the personal price has decreased over the time
        </li>
        <li>New donators have incentive to start donating, because they simpy get more tokens in the beginning
          (personal portion is very low, or actually zero at start)
        </li>
      </ul>

      <h3>
        4. Example
      </h3>
      <p>
        Let's see how a hypothetical year with 3 donators would look like, where all donate in different patterns:
      </p>
      <p>
        <strong>Bob</strong> - early adopter, donates a big portion in the beginning
      </p>
      <p>
        <strong>Alice</strong> - constantly donates throughout the whole year
      </p>
      <p>
        <strong>Tom</strong> - steps in at the end of the year putting small amounts
      </p>
      <blockquote class="blockquote text-center">
        <img src="../assets/about-donations.png" width="600px">
        <footer class="blockquote-footer">Community vault growth steadily</footer>
      </blockquote>
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
        <strong>Ted</strong> is rewarded fairly fast at the moment when he's stepping in, but will slow down if he stops.
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

      <h3>
        6, Why can't I send my tokens to someone else?
      </h3>
      TODO
    </div>
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
