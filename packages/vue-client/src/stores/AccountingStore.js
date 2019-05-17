import { observable, action, reaction, computed } from 'mobx'
// import { version, AsyncTrunk } from 'mobx-sync'
import _ from 'lodash'
// import uuidv1 from 'uuid/v1'
// import axios from 'axios'


// @version(1)
class Store {
  // Deals
  @observable deals = [
    {
      id: 'my_best_trade',
      name: 'my best trade with DNT LIQUI-BINANCE',
      stocks: 'BINANCE, LIQUI, TIDEX',
      coins: 'DNT, BTC, ETH, BNB',
      pairs: 'DNT_BTC, DNT_ETH, DNT_BNB',
      debited: -500,
      debited_trades: '20',
      credited: 550,
      credited_trades: 2,
      profit: 50,
      trades: 22,
      status: 'closed',
      timestamp_open: 1558117760918,
      timestamp_closed: 1558117760918,
      note: 'bla-bla'
    }
  ]
  @observable deal = []

  @action addMyTradeToDeal(trade) {
    for(let [i, _trade] of Object.entries(this.deal)) {
      if (_trade.id === trade.id) {
        this.deal.splice(i, 1)
        return false
      }
    }
    console.log(trade)
    this.deal.push(trade)
  }

  // @computed get total() {
  //   return this.price * this.amount;
  // }
}

const store = window.AccountingStore = new Store()


export default store
