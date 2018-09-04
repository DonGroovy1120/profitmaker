import { observable, action, autorun } from 'mobx'
import axios from 'axios'

class CreateOrderStore {

  @observable createPrice = {'buy': '', 'sell': ''}
  @observable createAmount = {'buy': '', 'sell': ''}
  @observable createTotal = {'buy': '', 'sell': ''}

  @action createChange(value, field, type) {
    if (field === 'price') {
      this.createPrice[type] = value
      var total = (parseFloat(this.createPrice[type]) * parseFloat(this.createAmount[type])).toFixed(8)
      this.createTotal[type] = total !== 'NaN' ? total : ''
    } else if (field === 'amount') {
      this.createAmount[type] = value
      var total = (parseFloat(this.createPrice[type]) * parseFloat(this.createAmount[type])).toFixed(8)
      this.createTotal[type] = (total !== 'NaN') ? total : ''
    } else if (field === 'total') {
      this.createTotal[type] = value
      var amount = (parseFloat(this.createTotal[type]) / parseFloat(this.createPrice[type])).toFixed(8)
      this.createAmount[type] = amount !== 'NaN' ? amount : ''
    }
  }

  @action createOrder(type) {
    axios.post('http://localhost:8051/createOrder', {
      'stock': this.stock,
      'pair': this.pair,
      'type': type,
      'price': this.createPrice[type],
      'amount': this.createAmount[type],
    })
    .then((response) => {
      console.log(response)
      console.log(response.data)
    })
    .catch((error) => { console.log(error) })
  }

}

const store = window.CreateOrderStore = new CreateOrderStore()

export default store

autorun(() => {
  console.log(store.stock)
  console.log(store.pair)
  store.fetchMyTrades()
})
