import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

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
import Paper from '@material-ui/core/Paper';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import MenuIcon from '@material-ui/icons/Menu';

import TabNPC from './components/TabNPC';
import TabRolls from './components/TabRolls';
import TabItems from './components/TabItems';
import TabImages from './components/TabImages';


const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

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


const App = ({ classes, theme }) => {
  const [drawerOpen, changeDrawerOpen] = useState(false);
  const [tabIndex, changeTabIndex] = useState(0);

  const sideList = (
    <div>
      <List>
        {['Roll scenario', 'Generate NPC', 'Image gallery', 'Item list'].map((text, index) => (
          <ListItem button key={text} onClick={() => changeTabIndex(index)}>
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
        onOpen={() => changeDrawerOpen(true)}
        onClose={() => changeDrawerOpen(false)}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
      >
        <div
          tabIndex={0}
          role="button"
          onClick={() => changeDrawerOpen(false)}
          onKeyDown={() => changeDrawerOpen(false)}
        >
          {sideList}
        </div>
      </SwipeableDrawer>

      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={() => changeDrawerOpen(true)}
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
    </div >
  );
};

App.propTypes = {

};

export default withStyles(styles, { withTheme: true })(App);
