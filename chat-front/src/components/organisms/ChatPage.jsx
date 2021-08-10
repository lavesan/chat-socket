import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Sidebar from '../molecules/Sidebar';
import Chat from '../molecules/Chat';

const useStyles = makeStyles({
  content: {
    flexGrow: 1,
  },
});

const ChatPage = () => {
  const classes = useStyles();

  return (
    <Grid container>
      <Sidebar />
      <main className={classes.content}>
        <Chat />
      </main>
    </Grid>
  );
};

export default ChatPage;
