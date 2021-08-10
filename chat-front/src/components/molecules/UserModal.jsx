import React, { useContext, useState } from 'react';
import {
  Modal, Fade, Backdrop, TextField, Grid, Button, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import AppContext from '../../App.context';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 3,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '50%',
    minWidth: 300,
  },
}));

const UserModal = () => {
  const classes = useStyles();

  const { modalUser, setModalUser, setUserName } = useContext(AppContext);
  const [name, setName] = useState('');

  const handleClose = (reason) => {
    if (reason && reason.target) return;

    setModalUser(false);
  };

  const submit = (event) => {
    event.preventDefault();
    if (!name) return;
    setUserName(name);
    handleClose();
  };

  return (
    <Modal
      disableEscapeKeyDown
      closeAfterTransition
      aria-labelledby="nome usuário"
      aria-describedby="digite um nome para o usuário"
      className={classes.modal}
      open={modalUser}
      onClose={handleClose}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={modalUser}>
        <Grid
          container
          direction="column"
          component="form"
          className={classes.paper}
          onSubmit={submit}
        >
          <Grid item>
            <Typography variant="h5" component="h2">
              Digite seu nome
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              value={name}
              onChange={(element) => setName(element.target.value)}
              error={!name}
            />
          </Grid>
          <Grid
            item
            container
            justifyContent="flex-end"
          >
            <Button type="submit">
              Salvar
            </Button>
          </Grid>
        </Grid>
      </Fade>
    </Modal>
  );
};

export default UserModal;
