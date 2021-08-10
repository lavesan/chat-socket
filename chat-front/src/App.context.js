import React from 'react';

export default React.createContext({
  msgs: () => ({}),
  selectedGroup: () => '',
  setSelectedGroup: (selected) => {},
  userName: '',
  setUserName: (name) => {},
  emitMsg: (msg) => {},
  modalUser: false,
  setModalUser: (open) => {},
});
