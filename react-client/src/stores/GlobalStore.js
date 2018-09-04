import { observable, action, autorun } from 'mobx'
import axios from 'axios'

class GlobalStore {

  // START STOCKS
  @observable stock = 'LIQUI'

  @observable stocks = {}

  @action setStock(stock) {
    console.log('SET STOCK')
    this.stock = stock
  }

  @action async fetchStocks() {
    axios.get('http://localhost:8051/stocks')
    .then((response) => {
      this.stocks = response.data
    })
    .catch((error) => { console.log(error) })
  }
  // END STOCKS

  // START PAIRS
  @observable pair = 'ETH_BTC'
  @observable coinFrom = 'ETH'
  @observable coinTo = 'BTC'

  @observable pairs = []

  @action setPair(pair) {
    console.log('SET PAIR')
    this.pair = pair
  }

  @action async fetchPairs() {
    axios.get(`http://localhost:8051/pairs/${this.stock}`)
    .then((response) => {
      this.pairs = response.data.map((pair) => {
        return pair.split('/').join('_')
      })
    })
    .catch((error) => { console.log(error) })
  }
  // END PAIRS

}

const store = window.GlobalStore = new GlobalStore()

export default store

autorun(() => {
  console.log(store.stock)
  console.log(store.pair)
  store.fetchStocks()
  store.fetchPairs()
})
