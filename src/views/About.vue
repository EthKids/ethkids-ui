<template>
  <div class="container">
    <div class="col-md-8">
      <h1>How EthKids works</h1>

      <div role="tablist">
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block href="#" variant="warn">1. What this is all for</b-button>
          </b-card-header>
            <b-card-body>
              <b-card-text>To make this world a bit of a better place. At least for children.</b-card-text>
            </b-card-body>
        </b-card>

        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block href="#" variant="warn">2. Why Blockchain?</b-button>
          </b-card-header>
            <b-card-body>
              <b-card-text>
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
                  Every donator gets appreciation according to a single rule, in a fair way. More about it down further.
                  <br><br>
                  <li><code>Open source</code>
                  </li>
                  All the programmable rules are open sourced and cryptographically proven to be the ones that are used
                  <br><br>
                  <li><code>Cheap and fast transfers</code>
                  </li>
                  Donations in cryptocurrencies can be sent at reasonably low transaction costs, regardless of the amounts and geographical location
                </ul>
              </b-card-text>
            </b-card-body>
        </b-card>

        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block href="#" variant="warn">3. How it works</b-button>
          </b-card-header>
            <b-card-body>
              <b-card-text>
                The charity donations can be sent per charity community, any amount, using the corresponding
                <mark>'Donate'</mark>
                button.
                <br><br>
                Once the transaction is confirmed, the donator will receive the <code> community token</code>, as a matter of an appreciation.
                <br><br>
                And then the <code>magic</code> begins!
                <br><br>
                <code>90%</code> of the funds will land in the <strong>Charity Vault</strong> and will stay there until the <em>community leader</em>
                moves it further to the actual charity organization.
                <br><br>
                The remaining <code>10%</code> get into the <strong>Community Vault</strong>which serves as a sort of a rewards pot
                and backs up the minted <em>community tokens</em>.
                <br>
                In other words, the donator gets some cashback, but in <code>community tokens.</code>
                <br><br>
                <code>How this tokens can be used?</code>
                <br>
                The only use case for such tokens at the moment is to <code>sell them back</code> (or <em>liquidate</em>).
                <br><br>
                <code>At what price?</code>
                <br>
                And this is a cool thing: <em>the price depends on the personal portion of tokens held, compared to the entire amount of tokens</em>.
                <br>
                <em>Higher</em> the portion, <em>higher</em> the price.
                <br>
                Again, the more you've got, percent wise, the higher your selling price is.
                <br><br>
                The beauty of this concept:
                <ul>
                  <li>Donators are incentivized to keep their percent of tokens, i.e., donate more often
                  </li>
                  <li>Donator's total return rises along with the Community Vault. More substantial funds mean higher performance in case of selling,
                    even if the individual price has decreased over time
                  </li>
                  <li>New donators have the incentive to start donating because they get more tokens at the start
                    (a personal portion is shallow, or 'zero' originally)
                  </li>
                </ul>
              </b-card-text>
            </b-card-body>
        </b-card>

        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block href="#" variant="warn">4. Example</b-button>
          </b-card-header>
            <b-card-body>
              <b-card-text>
                <p>
                  Let's see how a hypothetical year with three donators would look like, where all donate in different patterns:
                </p>
                <p>
                  <code>Bob</code> - early adopter, donates a big portion in the beginning
                </p>
                <p>
                  <code>Alice</code> - constantly donates throughout the whole year
                </p>
                <p>
                  <code>Tom</code> - steps in at the end of the year putting small amounts
                </p>
                <blockquote class="blockquote text-center">
                  <img src="../assets/about-donations.png" width="600px">
                  <footer class="blockquote-footer">Community vault grows steadily</footer>
                </blockquote>
                <p>
                  At whenever a donator sends some funds to the charity, the individual 'buy' token price calculates to
                  find the number of community tokens he/she will receive.
                  <br><br>
                  As was explained earlier, the price
                  <um>depends on the personal token balance compared to the total amount minted.</um>
                </p>
                <blockquote class="blockquote text-center">
                  <img src="../assets/about-price.png" width="600px">
                  <footer class="blockquote-footer">'Buy' price is calculated for each donator individually</footer>
                </blockquote>
                <p>
                  For <code>Bob</code>, the price rises significantly at the beginning,
                  along with his initial donation. and reduces over time (every month his portion decreases),
                  effectively making a new donation more attractive
                  <br><br>
                  For <code>Alice</code>, it's continuously and slowly growing while she's the only active donator,
                  but then drops whenever new ones contributing
                  <br><br>
                  For <code>Ted</code>, it is very cheap and easy to build up his stake initially.
                </p>
                <p>
                  These dynamics explain how donators grow in their rewards.
                  <br>
                  But how their possible return changes if they want to liquidate what they've got?
                </p>
                <p>
                  Well, this also depends on the personal portion: higher the stake, higher the selling price.
                </p>
                <blockquote class="blockquote text-center">
                  <img src="../assets/about-liquidation.png" width="600px">
                  <footer class="blockquote-footer">Changes of personal return in case of token liquidation</footer>
                </blockquote>
                <p>
                  <code>Bob</code> can liquidate his tokens right after his first donation for a notable reasonable price,
                  especially if he knows that he won't donate more in the future.
                  <br>
                  But, this might not be the brightest move, since the funds backing the bonding curve will continuously be growing when new donations
                  arrive.
                  Bob is moving down in his 'sell' price, but still growing in ETH return value.
                  <br><br>
                  <code>Alice</code> is growing steadily in her token return as she's chosen the best tactics and rewarded the most as a continuous
                  contributor.
                  <br><br>
                  <code>Ted's</code> reward skyrockets at the moment when he's stepping in, but will slow down if he stops with donations.
                </p>
                <p>
                  <strong>Note:</strong> If either <code>Bob</code>, <code>Alice</code> or <code>Ted</code>
                  liquidate some of their tokens, the rest of the community will effectively grow in their returns,
                  since each of their portions will rise.
                </p>
                <p>
                  <strong>Advice?</strong> The best strategy is to donate to the community continuously,
                  take an active position in building the member's base, contribute in a variety of the ways, and, perhaps, HODL.
                </p>
              </b-card-text>
            </b-card-body>
        </b-card>

        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block href="#" variant="warn">5. How raised funds get to the charity organisation</b-button>
          </b-card-header>
            <b-card-body>
              <b-card-text>
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
              </b-card-text>
            </b-card-body>
        </b-card>

        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block href="#" variant="warn">6, How to list a new community</b-button>
          </b-card-header>
            <b-card-body>
              <b-card-text>
                Been effectively a nonprofit <a href="https://en.wikipedia.org/wiki/The_DAO_(organization)" target="_blank">ĐAO</a>,
                EthKids doesn't have a moderator or an admin.
                <br>
                Every charity organization can register on EthKids protocol as long as they: a nonprofit charity raising funds to help children.
                <br>
                For listing inquiries, please contact <a href="mailto:info.ethkids@gmail.com"> info.ethkids@gmail.com</a> or join our
                <a href="https://t.me/joinchat/K1v4ShPV57D0zfjybfRFDQ" target="_blank">Telegram</a> channel.
              </b-card-text>
            </b-card-body>
        </b-card>

        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block href="#" variant="warn">7, Why can't I send my community tokens to someone else?</b-button>
          </b-card-header>
            <b-card-body>
              <b-card-text>
                Transfers of the <strong>Community tokens</strong> are disabled by design to prevent the possible
                <a href="https://en.wikipedia.org/wiki/Sybil_attack" target="_blank"> Sybil attack</a> vector.
                <br>
                Transfers might be enabled later, allowing sending for specific good causes only.
                <br>
                Open for discussion.
              </b-card-text>
            </b-card-body>
        </b-card>

      </div>

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
