import React, { useState, useContext, useMemo } from 'react';
import {
  List, ListItem, ListItemText, Divider, Drawer, Hidden, Avatar, Grid, ListItemSecondaryAction,
} from '@material-ui/core';
// import MenuIcon from '@material-ui/icons/Menu';
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

const SidebarContent = () => {
  const classes = useStyles();

  const {
    msgs,
    setSelectedGroup,
    selectedGroup,
    newMsgs,
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
          src={photo}
          className={classes.avatar}
        />
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
            // <ListItemSecondaryAction>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              classes={{ root: classes.newMsgs }}
            >
              {itemNewMsg(group)}
            </Grid>
            // </ListItemSecondaryAction>
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

  const toogleOpen = () => setOpen((actualOpen) => !actualOpen);

  return (
    <>
      <Hidden smUp implementation="css">
        <Drawer
        //   container={container}
          variant="persistent"
          anchor="left"
          open={open}
          onClose={toogleOpen}
          classes={{
            // paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <SidebarContent />
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
          <SidebarContent />
        </Drawer>
      </Hidden>
    </>
  );
};

export default Sidebar;
