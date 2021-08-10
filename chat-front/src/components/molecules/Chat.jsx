import React, { useContext, useMemo } from 'react';
import { Grid } from '@material-ui/core';
import AppContext from '../../App.context';
import Message from '../atoms/Message';

const Chat = () => {
  const { selectedGroup, msgs } = useContext(AppContext);

  const chatMsgs = useMemo(
    () => {
      console.log('chat selected: ', selectedGroup);
      console.log('chat msgs: ', msgs);
      console.log('chat msgs: ', msgs[selectedGroup]);
      return msgs[selectedGroup] || [];
    },
    [msgs, selectedGroup],
  );

  return (
    <Grid container>
      {chatMsgs.map((msg) => <Message {...msg} />)}
    </Grid>
  );
};

export default Chat;
