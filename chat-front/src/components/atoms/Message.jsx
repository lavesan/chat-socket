import React, { useContext, useMemo } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import AppContext from '../../App.context';

const useStyles = makeStyles((theme) => ({
  container: {
    borderRadius: 3,
    backgroundColor: theme.palette.primary.main,
    padding: 8,
    width: 'fit-content',
    fontWeight: 'normal',
    boxShadow: '2px 2px 5px #e3e3e3',
  },
  nameText: {
    margin: '0 0 8px 0',
    color: '#fff',
  },
  hourText: {
    margin: '0 0 8px 0',
    fontSize: 8,
  },
}));

const Message = ({
  msg, date, name, ...props
}) => {
  const classes = useStyles();

  const { userName } = useContext(AppContext);

  const isMsgFromUser = useMemo(() => name === userName, [name, userName]);

  return (
    <Grid
      container
      justifyContent={isMsgFromUser ? 'flex-end' : 'flex-start'}
      {...props}
    >
      <Grid item container classes={{ root: classes.container }}>
        <Grid item container justifyContent="space-between">
          <p className={classes.nameText}>
            {isMsgFromUser ? '' : name}
          </p>
          <p className={classes.hourText}>
            {date.toLocaleString()}
          </p>
        </Grid>
        <Grid item>
          {msg}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Message;
