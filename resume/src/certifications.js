import React, { Component } from 'react';

class Certifications extends Component {
    render() {
        return (
            <div className="skillset">
                <div className="item">
                    <h3 className="level-title">{this.props.item.venue}</h3> -
                  <span className="tagline">{this.props.item.designation} </span>
                    <span className="lang-desc">({this.props.item.result})</span>
                </div>
            </div>
        )
    }
}

export default Certifications;