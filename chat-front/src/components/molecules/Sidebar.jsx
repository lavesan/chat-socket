import React, { useState, useContext, useMemo } from 'react';
import {
  List, ListItem, ListItemText, Divider, Drawer, Hidden, Avatar, Grid, AppBar, Toolbar, IconButton, useMediaQuery,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/styles';
import AppContext from '../../App.context';
import photo from '../../assets/sad face.png';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 160,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 160,
    borderRight: `2px solid ${theme.palette.primary.main}`,
    backgroundColor: theme.palette.secondary.main,
  },
  mobileDrawer: {
    width: 0,
  },
  selectedItem: {
    backgroundColor: theme.palette.primary.main,
  },
  avatar: {
    margin: '8px 0',
    width: 80,
    height: 80,
  },
  newMsgs: {
    borderRadius: '50%',
    backgroundColor: '#f20000',
    color: '#fff',
    width: 16,
    height: 16,
    fontSize: 8,
    top: 8,
    right: 4,
    position: 'absolute',
  },
}));

const SidebarContent = ({ toogleOpen }) => {
  const classes = useStyles();

  const {
    msgs,
    setSelectedGroup,
    selectedGroup,
    newMsgs,
    userName,
  } = useContext(AppContext);

  const arrMsgs = useMemo(
    () => {
      const entries = Object.entries(msgs);
      return entries;
    },
    [msgs],
  );

  const onItemClick = (group) => {
    setSelectedGroup(group);
    toogleOpen(false);
  };

  const itemClass = (groupName) => {
    const obj = {};
    if (groupName === selectedGroup) obj.root = classes.selectedItem;
    return obj;
  };

  const itemNewMsg = (groupName) => (newMsgs[groupName] > 0 ? newMsgs[groupName] : false);

  return (
    <div>
      <Grid container justifyContent="center">
        <Avatar
          alt="Minha foto"
          src="https://www.provelozuerich.ch/wp-content/uploads/2019/10/neuschrott.jpg"
          className={classes.avatar}
        />
      </Grid>
      <Grid
        container
        justifyContent="center"
      >
        {userName}
      </Grid>
      <Divider />
      <List>
        {arrMsgs.map(([group, data]) => (
          <ListItem
            button
            key={group}
            classes={itemClass(group)}
            onClick={() => onItemClick(group)}
          >
            <ListItemText primary={group} />
            {itemNewMsg(group) && (
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              classes={{ root: classes.newMsgs }}
            >
              {itemNewMsg(group)}
            </Grid>
            )}
          </ListItem>
        ))}
      </List>
    </div>
  );
};

const Sidebar = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const toogleOpen = (value) => {
    setOpen((actualOpen) => (typeof value === 'boolean' ? value : !actualOpen));
  };

  return (
    <>
      <Hidden smUp implementation="css">
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toogleOpen}>
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="persistent"
          anchor="left"
          open={open}
          onClose={toogleOpen}
          classes={{
            root: classes.mobileDrawer,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <SidebarContent toogleOpen={toogleOpen} />
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="persistent"
          anchor="left"
          open
        >
          <SidebarContent toogleOpen={toogleOpen} />
        </Drawer>
      </Hidden>
    </>
  );
};

export default Sidebar;
