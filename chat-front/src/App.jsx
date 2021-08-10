import React, { useEffect, useState } from 'react';
import './App.css';
import { ThemeProvider } from '@material-ui/styles';
import io from 'socket.io-client';
import axios from 'axios';
import ChatPage from './components/organisms/ChatPage';
import theme from './theme';
import AppContext from './App.context';

function App() {
  const [msgs, setMsgs] = useState({
    doidao: [{
      group: 'doidao', name: 'Valdery', date: new Date(), msg: 'Vou cagar.',
    }],
  });
  const [selectedGroup, setSelectedGroup] = useState('');
  const [userName, setUserName] = useState('');

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

  useEffect(() => {
    setUserName('Eu');
    // const socket = io('http://localhost:3001');
    // socket.on('message received', (msg) => addMsg(msg));

    // // Load saved msgs
    // axios.get('http://localhost:3001/msgs')
    //   .then((res) => {
    //     setMsgs(res.data);
    //   })
    //   .catch((err) => console.error('deu pau: ', err));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider value={{
        msgs,
        userName,
        selectedGroup,
        setSelectedGroup,
      }}
      >
        <div className="App">
          <ChatPage />
        </div>
      </AppContext.Provider>
    </ThemeProvider>
  );
}

export default App;
