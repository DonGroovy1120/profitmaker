/* eslint-disable import/first */
import React from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
// import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import Grid from './Grid'
import 'element-theme-default'
import './App.sass'
import { inject, observer } from 'mobx-react'
import {Settings, QueryBuilder} from '@material-ui/icons'

import Alert from 'react-s-alert'
import 'react-s-alert/dist/s-alert-default.css'
import 'react-s-alert/dist/s-alert-css-effects/slide.css'
import 'react-s-alert/dist/s-alert-css-effects/scale.css'
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css'
import 'react-s-alert/dist/s-alert-css-effects/flip.css'
import 'react-s-alert/dist/s-alert-css-effects/genie.css'
import 'react-s-alert/dist/s-alert-css-effects/jelly.css'
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css'

// components
import Pairs from './core_components/Pairs'

const drawerWidth = 240

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  drawerPaperRight: {
    // position: 'relative',
    // whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperRightClose: {
    width: 0
    // overflowX: 'hidden',
    // transition: theme.transitions.create('width', {
    //   easing: theme.transitions.easing.sharp,
    //   duration: theme.transitions.duration.leavingScreen,
    // }),
    // width: theme.spacing.unit * 7,
    // [theme.breakpoints.up('sm')]: {
    //   width: theme.spacing.unit * 9,
    // },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
})

@inject('GlobalStore')
@inject('DashboardsStore')
@observer
class App extends React.Component {
  state = {
    open: false,
  }

  handleDrawerOpen = () => {
    this.setState({ open: true })
  }

  handleDrawerClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { classes, GlobalStore, DashboardsStore } = this.props

    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <Alert stack={{limit: 3}} />
          <AppBar
            position="absolute"
            className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
          >
            <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, this.state.open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit" noWrap style={{flexGrow: 1}}>
                {GlobalStore.stock} : {GlobalStore.pair}

              </Typography>
              <IconButton
                color="inherit"
                aria-label="Settings"
                onClick={this.drawerRightToggle.bind(this)}
              >
                <Settings />
              </IconButton>
              <IconButton
                color="inherit"
                aria-label="Settings"
                onClick={this.handleClick1.bind(this)}
              >
                <QueryBuilder />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{
              paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
            }}
            open={this.state.open}
          >
            <div className={classes.toolbarIcon}>
              <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            {
              _.map(DashboardsStore.widgetsMarket, (widget) => {
                const Component = require('@material-ui/icons/Mail').default
                // console.log('@material-ui/icons/Mail')
                // console.log( JSON.stringify(widget.icon+"") )
                // console.log( widget.icon.toString() )
                // const Component = require( (widget.icon+"").toString() ).default
                // const Component = require( widget['icon']+"" ).default
                // const Component = import(widget.icon+"")
                return (
                  <ListItem button onClick={this.addWidget.bind(this, widget)}>
                    <ListItemIcon>
                      {/* {React.createElement(Component)} */}
                      <img src={widget.icon} width="24px" height="24px"></img>
                    </ListItemIcon>
                    <ListItemText primary={widget.header} />
                  </ListItem>
                )
              })
            }
          </Drawer>
          <Drawer
            anchor="right"
            open={GlobalStore.drawerRightOpen}
            variant="permanent"
            classes={{
              paper: classNames(classes.drawerPaperRight, !GlobalStore.drawerRightOpen && classes.drawerPaperRightClose),
            }}
          >
            <div className="drawer-spacer">
              {React.createElement(GlobalStore.drawerRightComponent, {'data': GlobalStore.drawerRightData})}
            </div>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Grid />
          </main>
        </div>
      </React.Fragment>
    )
  }
  addWidget(widget) {
    this.props.DashboardsStore.addWidget(widget)
  }
  drawerRightToggle(e) {
    console.log('settings')
    this.props.GlobalStore.drawerRightToggle()
  }
  handleClick1(e) {
    console.log('time: set pairs')
    this.props.GlobalStore.drawerRightSet(Pairs)
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(App)
