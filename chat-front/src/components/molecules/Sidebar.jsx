import React, { useState, useContext, useMemo } from 'react';
import {
  List, ListItem, ListItemText, Divider, Drawer, Hidden,
} from '@material-ui/core';
// import MenuIcon from '@material-ui/icons/Menu';
import AppContext from '../../App.context';

const SidebarContent = () => {
  const { msgs, setSelectedGroup, selectedGroup } = useContext(AppContext);

  const arrMsgs = useMemo(
    () => {
      const entries = Object.entries(msgs);
      return entries;
    },
    [msgs],
  );

  const onItemClick = (group) => {
    console.log('group: ', group);
    setSelectedGroup(group);
  };

  return (
    <div>
      <Divider />
      <List>
        {arrMsgs.map(([group, data]) => (
          <ListItem button key={group}>
            <ListItemText primary={group} onClick={() => onItemClick(group)} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const toogleOpen = () => setOpen((actualOpen) => !actualOpen);

  return (
    <>
      <Hidden smUp implementation="css">
        <Drawer
        //   container={container}
          variant="temporary"
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
          classes={{
            // paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          <SidebarContent />
        </Drawer>
      </Hidden>
    </>
  );
};

export default Sidebar;
