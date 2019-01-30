/* eslint-disable import/first */
import React from 'react'
import _ from 'lodash'
import { observer } from 'mobx-react'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import ghLogo from'./github-logo.svg'
import ArrowBackIcon from '@material-ui/icons/ArrowBackIos'
import CloseIcon from '@material-ui/icons/Close'
import Divider from '@material-ui/core/Divider'

import DashboardsStore from 'stores/DashboardsStore'
import DrawersStore from 'stores/DrawersStore'

@observer
class Market extends React.Component {
  render() {
    var dashboardId = (this.props.data && this.props.data.dashboardId) || DashboardsStore.dashboardActiveId
    var aside = (this.props.data && this.props.data.aside) || 'aside-left-first'
    return (
      <div className="market">
        <div className="widgets simple">
          <div className="drawer-title">
            <ArrowBackIcon onClick={this.backToCategories.bind(this)} className="pointer" />
            <div className="drawer-title-text">{DashboardsStore.category}</div>
            <CloseIcon onClick={this.drawerClose.bind(this, aside)} className="pointer" />
          </div>
          <Divider />
          {
            _.map(DashboardsStore.widgetsMarketFitered, (widget) => {
              var style = {
                backgroundImage: `url(${ require( "../../"+widget.img ) })`
              }
              return (
                <div className="market-widget" key={widget.id} style={style}>
                  <div className="market-wrapper">
                    <div className="market-main">
                      <h3 className="market-header">{widget.header}</h3>
                      <p className="market-description">{widget.description}</p>
                    </div>
                    <div className="market-actions">
                      <div className="market-actions-autor">
                        <a href={widget.authorLink} target="_blank">{widget.author}</a>
                        <a className="market-actions-git" href={widget.source} target="_blank">
                          <img src={ghLogo} alt="github"/>
                        </a>
                      </div>
                      <div className="market-actions-action">
                        <Fab color="secondary" aria-label="Add" onClick={this.addWidget.bind(this, widget, dashboardId)}>
                          <AddIcon />
                        </Fab>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
  backToCategories() {
    DrawersStore.drawerSet("aside-left-first", "core_components/Market/Categories.js", "320px")
  }
  componentWillMount() {
    DashboardsStore.fetchWidgets()
  }
  addWidget(widget, dashboardId) {
    DashboardsStore.addWidget(widget, dashboardId)
  }
  drawerClose(drawer) {
    DrawersStore.drawerClose(drawer)
  }
}

export default Market
