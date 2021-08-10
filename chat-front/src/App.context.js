import React from 'react';

export default React.createContext({
  msgs: () => ({}),
  selectedGroup: () => '',
  setSelectedGroup: (selected) => {},
  userName: '',
});
