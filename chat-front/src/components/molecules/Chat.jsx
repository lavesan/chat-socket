import React, {
  useContext, useMemo, useRef, useEffect,
} from 'react';
import { Grid, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import AppContext from '../../App.context';
import Message from '../atoms/Message';
import SendInput from '../atoms/SendInput';

const useStyles = makeStyles({
  container: {
    height: '100vh',
  },
  messagesMap: {
    overflowY: 'scroll',
    overflowX: 'hidden',
    padding: '0 8px 8px 8px',
    flexGrow: 1,
  },
  messageContainer: {
    marginTop: 8,
  },
});

const Chat = () => {
  const classes = useStyles();

  const endChatRef = useRef(null);

  const { selectedGroup, msgs } = useContext(AppContext);

  const chatMsgs = useMemo(
    () => msgs[selectedGroup] || [],
    [msgs, selectedGroup],
  );

  const noGroupSelected = useMemo(
    () => Boolean(selectedGroup),
    [selectedGroup],
  );

  useEffect(() => {
    if (endChatRef.current) { endChatRef.current.scrollIntoView(); }
  }, [selectedGroup]);

  return (
    <Grid
      container
      direction="column"
      wrap="nowrap"
      classes={{ root: classes.container }}
      justifyContent="space-between"
    >
      <Grid
        item
        container
        direction="column"
        wrap="nowrap"
        classes={{ root: classes.messagesMap }}
      >
        {chatMsgs.map((msg) => <Message className={classes.messageContainer} {...msg} />)}
        <div ref={endChatRef} />
      </Grid>
      <Grid
        item
        container
        direction="column"
      >
        {noGroupSelected && (
          <>
            <Divider />
            <SendInput />
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default Chat;
