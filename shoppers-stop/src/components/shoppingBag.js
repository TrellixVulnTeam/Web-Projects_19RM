import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeGroceryById, addPocketMoneyById } from '../actions';

class ShoppingBag extends Component {

    displayShoppingBag() {
        if (this.props.shoppingBag.length > 0) {
            return (
                <ul className="list-group">
                    {this.props.shoppingBag.map((item) => {
                        return <li key={item.id} className="list-group-item" onClick={() => {
                            this.props.removeGroceryById(item.id);
                            this.props.addPocketMoneyById(item.id);
                        }
                        }>
                            <b>{item.name}</b> - <span className="label label-info">$ {item.cost}</span> - <span className="label label-warning">{item.calories} kCal</span> - <span className="label label-primary">{item.weight} mg</span>
                        </li>
                    })}

                </ul>
            )
        }
        else {
            return (
                <ul className="list-group">
                    <li className="list-group-item">No Items Added Yet!</li>
                </ul>
            )
        }
    }

    render() {
        return (
            <div className="col-md-4 shopping-bag-bg">
                <h2 className="text-center">ShoppingBag Items</h2>
                {
                    this.displayShoppingBag()
                }
            </div >
        )
    }
}

function mapStateToProps(state) {
    return {
        shoppingBag: state.shoppingBag
    }
}

export default connect(mapStateToProps, { removeGroceryById, addPocketMoneyById })(ShoppingBag);