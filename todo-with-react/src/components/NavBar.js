import React, { Component } from "react";
import { Navbar, NavItem, Nav } from "react-bootstrap";

class MyNavbar extends Component {
    render() {
        return (
            <div>
                <Navbar inverse collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#brand">{this.props.navbartitle}</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight>
                            <NavItem eventKey={1}>
                                {this.props.firstitem}
                            </NavItem>
                            <NavItem eventKey={2}>
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