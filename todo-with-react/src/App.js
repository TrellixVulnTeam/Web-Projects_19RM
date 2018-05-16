import React, { Component } from 'react';
// import MyNavBar from './components/NavBar';
import {Provider} from 'react-redux';
import store from './store';
import Routers from './Route'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Routers />
      </Provider>
    );
  }
}

export default App;
