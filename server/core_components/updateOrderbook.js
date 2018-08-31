var sleep = require('../../utils').sleep
const axios = require('axios')

const updateOrderbook = async function(t) {
    while (true) {
        await updateOrderbookFromBD()
        await sleep(t)
    }
}
const updateOrderbookFromBD = async function() {
    try {

      var response = await axios.get(`http://144.76.109.194:8051/orders/`)
      global.ORDERBOOK = response.data

    } catch (err) { console.log(err) }
}

module.exports = updateOrderbook
