import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addGroceryById, removePocketMoneyById } from '../actions';

class Grocery extends Component {
    render() {
        return (
            <div className="col-md-4 grocery-bg">
                <h2 className="text-center">Grocery Items</h2>
                <ul className="list-group">
                    {this.props.grocery.map((item) => {
                        return <li key={item.id} className="list-group-item" onClick={() => {
                            this.props.addGroceryById(item.id);
                            this.props.removePocketMoneyById(item.id);
                        }
                        }>
                            <b>{item.name}</b> - <span className="label label-info">$ {item.cost}</span> - <span className="label label-warning">{item.calories} kCal</span> - <span className="label label-primary">{item.weight} mg</span>
                        </li>
                    })}

                </ul>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        grocery: state.grocery
    }
}

export default connect(mapStateToProps, { addGroceryById, removePocketMoneyById })(Grocery);