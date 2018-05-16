import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chat from './chat'

class Home extends Component {

    render() {
        return (
            <div>
                <Chat />
            </div>
        )
    }
}

function mapStateToProp(state) {
    return ({
        userName: state.root.userName,
    })
}

export default connect(mapStateToProp, null)(Home);

