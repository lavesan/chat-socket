import React, { useEffect, useState } from 'react';
import './App.css';
import { ThemeProvider } from '@material-ui/styles';
import io from 'socket.io-client';
import axios from 'axios';
import ChatPage from './components/organisms/ChatPage';
import theme from './theme';
import AppContext from './App.context';
import UserModal from './components/molecules/UserModal';

function App() {
  const [msgs, setMsgs] = useState({
    doidao: [
      {
        group: 'doidao', name: 'Valdery', date: new Date(), msg: 'Vou cagar.',
      },
      {
        group: 'doidao', name: 'Eu', date: new Date(), msg: 'Apois vá',
      },
      {
        group: 'doidao', name: 'Valdery', date: new Date(), msg: 'Fui e voltei',
      },
    ],
    meFudi: [{
      group: 'Me fudi', name: 'Algo', date: new Date(), msg: 'vem cá',
    }],
  });
  const [selectedGroup, setSelectedGroup] = useState('');
  const [userName, setUserName] = useState('');
  const [modalUser, setModalUser] = useState(true);

  const socket = io('http://localhost:3001');

  /**
   * @param {{ group: String, name: String, msg: String, date: Date }} msg
   */
  const addMsg = (msg) => {
    setMsgs((actualMsgs) => ({
      ...actualMsgs,
      [msg.group]: [
        ...actualMsgs[msg.group],
        msg,
      ],
    }));
  };

  const emitMsg = (msg) => {
    socket.emit('chat message', msg);
  };

  useEffect(() => {
    setUserName('Eu');
    socket.on('message received', (msg) => addMsg(msg));

    // Load saved msgs
    axios.get('http://localhost:3001/msgs')
      .then((res) => {
        setMsgs(res.data);
      })
      .catch((err) => console.error('deu pau: ', err));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider value={{
        msgs,
        userName,
        setUserName,
        selectedGroup,
        setSelectedGroup,
        emitMsg,
        modalUser,
        setModalUser,
      }}
      >
        <div className="App">
          <ChatPage />
        </div>
        <UserModal />
      </AppContext.Provider>
    </ThemeProvider>
  );
}

export default App;
