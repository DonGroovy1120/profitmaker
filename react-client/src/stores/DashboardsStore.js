import { observable, action, autorun } from 'mobx'
import { version, AsyncTrunk, ignore } from 'mobx-sync'

@version(1)
class DashboardsStore {
  @observable counter = 15
  @ignore @observable widgetsMarket = [
    { icon: '/img/widgets/funding-amounts.svg', component: './core_components/Orders', header: "Orders asks", data: {type: "asks"} },
    { icon: '/img/widgets/code.svg', component: './core_components/Orders', header: "Orders bids", data: {type: "bids"} },

    { icon: '/img/widgets/code.svg', component: './core_components/Stocks', header: "Stocks", data: {} },
    { icon: '/img/widgets/code.svg', component: './core_components/Pairs', header: "Pairs", data: {} },


    { icon: '/img/widgets/code.svg', component: './core_components/charts/HeikinAshi', header: "OHLCV", data: {} },


    { icon: '/img/widgets/experts.svg', component: './core_components/MyTrades', header: "My trades", data: {} },
    { icon: '/img/widgets/faces.svg', component: './core_components/OpenOrders', header: "Open orders", data: {} },
    { icon: '/img/widgets/code.svg', component: './core_components/RawTrades', header: "Trades", data: {} },


    { icon: '/img/widgets/funds-raised.svg', component: './core_components/CreateOrder', header: "Limit buy", data: {type: "buy"} },
    { icon: '/img/widgets/likes.svg', component: './core_components/CreateOrder', header: "Limit sell", data: {type: "sell"} },

    { icon: '/img/widgets/portfolio.svg', component: './core_components/Balance', header: "Total balance", data: {total: true} },
    { icon: '/img/widgets/portfolio.svg', component: './core_components/Balance', header: "Balance", data: {total: false} },
    { icon: '/img/widgets/portfolio.svg', component: './core_components/BalancePie', header: "Total balance", data: {total: true} },
    { icon: '/img/widgets/portfolio.svg', component: './core_components/BalancePie', header: "Balance", data: {total: false} },
    { icon: '/img/widgets/portfolio.svg', component: './core_components/BalanceHistoryArea', header: "Total balance history", data: {total: true} },
    { icon: '/img/widgets/portfolio.svg', component: './core_components/BalanceHistoryArea', header: "Balance history", data: {total: false} },
  ]
  @observable widgets = [
    {i: "0", component: './core_components/Orders', header: "Orders asks", data: {type: "asks"}, x: 19, y: 0, w: 5, h: 19, minW: 2, minH: 3},
    {i: "1", component: './core_components/Orders', header: "Orders bids", data: {type: "bids"}, x: 19, y: 19, w: 5, h: 19, minW: 2, minH: 3},
    {i: "2", component: './core_components/Balance', header: "Total balance", data: {total: true}, x: 9, y: 51, w: 5, h: 13, minW: 2, minH: 3},
    {i: "3", component: './core_components/charts/HeikinAshi', header: "OHLCV", data: {}, x: 5, y: 0, w: 14, h: 23, minW: 2, minH: 3},
    {i: "4", component: './core_components/Balance', header: "Balance", data: {total: false}, x: 9, y: 38, w: 5, h: 13, minW: 2, minH: 3},
    {i: "5", component: './core_components/Pairs', header: "Pairs", data: {}, x: 0, y: 9, w: 5, h: 14, minW: 2, minH: 3},
    {i: "6", component: './core_components/Stocks', header: "Stocks", data: {}, x: 0, y: 0, w: 5, h: 9, minW: 2, minH: 3},
    {i: "7", component: './core_components/OpenOrders', header: "Open orders", data: {}, x: 0, y: 23, w: 9, h: 15, minW: 2, minH: 3},
    {i: "8", component: './core_components/MyTrades', header: "My trades", data: {}, x: 0, y: 38, w: 9, h: 13, minW: 2, minH: 3},
    {i: "9", component: './core_components/RawTrades', header: "Trades", data: {}, x: 0, y: 51, w: 9, h: 13, minW: 2, minH: 3},
    {i: "10", component: './core_components/CreateOrder', header: "Limit sell", data: {type: "sell"}, x: 14, y: 23, w: 5, h: 15, minW: 2, minH: 3},
    {i: "11", component: './core_components/CreateOrder', header: "Limit buy", data: {type: "buy"}, x: 9, y: 23, w: 5, h: 15, minW: 2, minH: 3},
    {i: "12", component: './core_components/BalancePie', header: "Total balance", data: {total: true}, x: 14, y: 51, w: 5, h: 13, minW: 2, minH: 3},
    {i: "13", component: './core_components/BalancePie', header: "Balance", data: {total: false}, x: 14, y: 38, w: 5, h: 13, minW: 2, minH: 3},
    {i: "14", component: './core_components/BalanceHistoryArea', header: "Balance history", data: {total: false}, x: 19, y: 38, w: 5, h: 13, minW: 2, minH: 3},
    {i: "15", component: './core_components/BalanceHistoryArea', header: "Total balance history", data: {total: true}, x: 19, y: 51, w: 5, h: 13, minW: 2, minH: 3},
  ]

  @action setLayout(layout) {
    // console.log('********************')
    console.log(layout)
    // delete layouts.lg
    // layouts.delete(lg)
    // this.widgets = JSON.parse(JSON.stringify(layouts))
    // this.widgets.replace(layout)
    this.widgets = layout
  }

  @action addWidget(widget) {
    // forEach()
    this.widgets.push({
      i: this.counter+1+"", component: widget.component, header: widget.header, data: widget.data, x: 19, y: 0, w: 5, h: 19, minW: 2, minH: 3
    })
  }
}

const store = window.DashboardsStore = new DashboardsStore()

const trunk = new AsyncTrunk(store, { storage: localStorage })
trunk.init()



autorun(() => {
  // Assuming that profile.asJson returns an observable Json representation of profile,
  // send it to the server each time it is changed, but await at least 300 milliseconds before sending it.
  // When sent, the latest value of profile.asJson will be used.
  console.log(store.widgets)
  trunk.updateStore(store)
}, { delay: 1000 });

export default store
