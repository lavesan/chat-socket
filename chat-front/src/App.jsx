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
  const [msgs, setMsgs] = useState({});
  const [selectedGroup, setSelectedGroup] = useState('');
  const [userName, setUserName] = useState('');
  const [modalUser, setModalUser] = useState(true);
  const [newMsgs, setNewMsgs] = useState({});

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

    console.log('msg: ', msg);
    console.log('msg.name: ', msg.name);
    console.log('userName: ', userName);
    console.log('verificar: ', msg.name != userName);

    if (msg.name != userName) {
      console.log('entrou po...');
      setNewMsgs((actualCount) => ({
        ...actualCount,
        [msg.group]: actualCount[msg.group] + 1,
      }));
    }
  };

  const emitMsg = (msg) => {
    socket.emit('chat message', msg);
  };

  useEffect(() => {
    setUserName('Eu');
    socket.on('send message', (msg) => addMsg(msg));

    // Load saved msgs
    axios.get('http://localhost:3001/chat')
      .then((res) => {
        setMsgs(res.data);
      })
      .catch((err) => console.error('deu pau: ', err));
  }, []);

  // Empties the new msg alert for the group
  useEffect(
    () => {
      setNewMsgs((actualCount) => ({
        ...actualCount,
        [selectedGroup]: 0,
      }));
    },
    [selectedGroup],
  );

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
        newMsgs,
        setNewMsgs,
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
