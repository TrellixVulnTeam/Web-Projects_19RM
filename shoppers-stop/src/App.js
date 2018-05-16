import React, { Component } from 'react';
import Grocery from './components/grocery';
import ShoppingBag from './components/shoppingBag';
import Stats from './components/stats';
import PocketMoney from './components/pocketMoney';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="row text-center">
          <div className="jumbotron">
            <h1 className="display-4">Shoppers Stop</h1>
            <p className="lead">Where you get everything!</p>
            <hr className="my-4" />
            <PocketMoney />
            <hr className="my-4" />
          </div>
        </div>
        <div className="row">
          <Grocery />
          <ShoppingBag />
          <Stats />
        </div>
      </div>
    );
  }
}

export default App;
