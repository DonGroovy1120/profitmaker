import _ from 'lodash'
import React from "react"
import { BrowserRouter as Router, Link, Route } from "react-router-dom"
import { WidthProvider, Responsive } from "react-grid-layout"
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'


// components
import Stocks from './core_components/Stocks'
import Pairs from './core_components/Pairs'
import Orders from './core_components/Orders'
import OpenOrders from './core_components/OpenOrders'
import MyTrades from './core_components/MyTrades'
import RawTrades from './core_components/RawTrades'
import CreateOrder from './core_components/CreateOrder'
import HeikinAshi from './core_components/charts/HeikinAshi'
import Crocodile from './core_components/charts/Crocodile'
import Balance from './core_components/Balance'
import HighstockWithPreloader from './core_components/HighstockWithPreloader'
import GitterChat from './core_components/GitterChat'

// icons
import Clear from '@material-ui/icons/Clear'
import Settings from '@material-ui/icons/Settings'
import { inject, observer } from 'mobx-react'


const ResponsiveReactGridLayout = WidthProvider(Responsive);
const originalLayouts = getFromLS("layouts") || {};

// const Stock = ({ match }) => (
//   <div>
//     {match.params.stockId}  {match.params.pair}
//   </div>
// )


@inject('DashboardsStore')
@observer
class Grid extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      layouts: JSON.parse(JSON.stringify(originalLayouts)),
      tokenDecimals: 18,
      tokenName: '-',
      tokenSymbol: '-',
      asks: {},
      orderbook: {
        'asks': {},
        'bids': {}
      },
      bids: {}
    };
  }

  static get defaultProps() {
    return {
      className: "layout",
      cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
      rowHeight: 30
    };
  }

  resetLayout() {
    this.setState({ layouts: {} });
  }

  onLayoutChange(layout, layouts) {
    saveToLS("layouts", layouts);
    this.setState({ layouts });
  }

  render() {
    const {DashboardsStore} = this.props
    return (
      <Router>
        <ResponsiveReactGridLayout
          className="layout"
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={30}
          layouts={this.state.layouts}
          onLayoutChange={(layout, layouts) => {
              this.onLayoutChange(layout, layouts)
              setTimeout(function() {
                window.dispatchEvent(new Event('resize'))
              }, 200)
            }
          }
          draggableCancel="input,textarea"
          draggableHandle=".widget-header"
        >
          {
            _.map(DashboardsStore.widgets, (widget, i) => {
              return (
                <div key={widget.i} data-grid={{ w: widget.w, h: widget.h, x: widget.x, y: widget.y, minW: widget.minW, minH:  widget.minH }}>
                  <div class="widget">
                    <div class="widget-header">
                      <span>{widget.header}</span>
                      <div>
                        <Settings style={{ fontSize: 18 }} />
                        <Clear style={{ fontSize: 18 }} />
                      </div>
                    </div>
                    <div class="widget-body">
                      { React.createElement(widget.component, {'data': widget.data}) }
                    </div>
                  </div>
                </div>
              )
            })
          }
        </ResponsiveReactGridLayout>
      </Router>
    );
  }
  async componentWillMount() {

  }
}

// module.exports = ResponsiveLocalStorageLayout;

function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("rgl-8")) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      "rgl-8",
      JSON.stringify({
        [key]: value
      })
    );
  }
}

export default Grid
