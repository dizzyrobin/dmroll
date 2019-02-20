import React from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import MenuIcon from '@material-ui/icons/Menu';

import TabNPC from './components/TabNPC';
import TabRolls from './components/TabRolls';
import TabItems from './components/TabItems';
import TabImages from './components/TabImages';

import * as actions from './actions/local';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  hide: {
    display: 'none',
  },
  content: {
    marginTop: 60,
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      drawerOpen: false,
      tabIndex: 0,
    };

    this.changeDrawerOpen = this.changeDrawerOpen.bind(this);
    this.changeTabIndex = this.changeTabIndex.bind(this);
  }

  componentDidMount() {
    const { requestDatabaseData } = this.props;
    requestDatabaseData();
  }

  changeDrawerOpen(drawerOpen) {
    this.setState({ drawerOpen });
  }

  changeTabIndex(tabIndex) {
    this.setState({ tabIndex });
  }

  render() {
    const { classes, theme } = this.props;
    const { drawerOpen, tabIndex } = this.state;

    const sideList = (
      <div>
        <List>
          {['Roll scenario', 'Generate NPC', 'Image gallery', 'Item list'].map((text, index) => (
            <ListItem button key={text} onClick={() => this.changeTabIndex(index)}>
              <ListItemIcon><VerifiedUserIcon /></ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <SwipeableDrawer
          open={drawerOpen}
          onOpen={() => this.changeDrawerOpen(true)}
          onClose={() => this.changeDrawerOpen(false)}
          disableBackdropTransition
          disableDiscovery
        >
          <div
            tabIndex={0}
            role="button"
            onClick={() => this.changeDrawerOpen(false)}
            onKeyDown={() => this.changeDrawerOpen(false)}
          >
            {sideList}
          </div>
        </SwipeableDrawer>

        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={() => this.changeDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              DMRoll
        </Typography>
          </Toolbar>
        </AppBar>
        <main
          className={classes.content}
        >
          {tabIndex === 0 && <TabRolls />}
          {tabIndex === 1 && <TabNPC />}
          {tabIndex === 2 && <TabImages />}
          {tabIndex === 3 && <TabItems />}
        </main>
      </div>
    );
  }
}

App.propTypes = {

};

export default connect(null, actions)(withStyles(styles, { withTheme: true })(App));
