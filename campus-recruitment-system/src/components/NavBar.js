import React, { Component } from "react";
import { Navbar, NavItem, Nav } from "react-bootstrap";
import history from '../History'

class MyNavbar extends Component {
    render() {
        return (
            <div>
                <Navbar inverse collapseOnSelect fixedTop>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a className='title'>{this.props.navbartitle}</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight>
                            <NavItem onClick={() => { history.push('/about') }} eventKey={1}>
                                About
                            </NavItem>
                            <NavItem eventKey={2}>
                                {this.props.firstitem}
                            </NavItem>
                            <NavItem eventKey={3}>
                                {this.props.seconditem}
                            </NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

export default MyNavbar;