import React, { Component } from 'react';
import { connect } from 'react-redux';

class PocketMoney extends Component {
    render() {
        return (
            <div className="row"><p>Your Account Balanace:</p>
                <p className="lead">
                    <span className="label label-success">$ {this.props.pocketMoney}</span>
                </p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        pocketMoney: state.pocketMoney
    }
}

export default connect(mapStateToProps,null)(PocketMoney);