import React from 'react'
import _ from 'lodash'
import { inject, observer } from 'mobx-react'

@inject('GlobalStore')
@observer
class Stocks extends React.Component {
  render() {
    const {GlobalStore, type} = this.props
    return (
      <div>
        <table>
          <tbody>
            {
              _.map(GlobalStore.stocks, (stock) => {
                return <tr key={stock}>
                  <td><a href="#" onClick={this.handleClick.bind(this, stock.name)}>{stock.name}</a></td>
                </tr>
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
  handleClick(stock) {
    this.props.GlobalStore.setStock(stock)
  }
}

export default Stocks
