import React from 'react';
import logo from './logo.svg';
import './App.css';
import Body from './components/Body';
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <Body />
    </div>
    </Provider>
  );
}

export default App;
