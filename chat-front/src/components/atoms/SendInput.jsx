import React, { useContext, useRef } from 'react';
import { TextField, Grid, IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { makeStyles } from '@material-ui/styles';
import AppContext from '../../App.context';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    backgroundColor: theme.palette.secondary.main,
    paddingLeft: 8,
  },
  inputContainer: {
    flexGrow: 1,
  },
}));

const SendInput = () => {
  const classes = useStyles();
  const inputRef = useRef(null);

  const { emitMsg, userName, selectedGroup } = useContext(AppContext);

  const submit = (e) => {
    e.preventDefault();
    if (!inputRef.current) return;
    // Uncontroled form
    const message = inputRef.current.value;

    emitMsg({
      msg: message,
      name: userName,
      date: new Date(),
      group: selectedGroup,
    });
  };

  return (
    <Grid
      container
      component="form"
      direction="row"
      alignItems="center"
      onSubmit={submit}
      className={classes.container}
    >
      <Grid item classes={{ root: classes.inputContainer }}>
        <TextField
          autoFocus
          fullWidth
          name="message"
          inputRef={inputRef}
        />
      </Grid>
      <Grid item>
        <IconButton type="submit">
          <SendIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default SendInput;
