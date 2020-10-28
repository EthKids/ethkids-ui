import axios from 'axios';

export default class EthBattleApi {
  static fetchFxUSD(url, token) {
    return axios.get(url)
      .then((response) => {
        let result;
        Object.keys(response.data).forEach(function (pair) {
          let searchingFor = token === 'ETH' ?
            'ETH_WETH' :
            ('ETH_' + token);
          if (pair === searchingFor) {
            result = response.data[pair].rate_usd_now;
          }
        });
        return result;
      });
  }

}
