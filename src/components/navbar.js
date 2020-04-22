import React, { Component } from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavbarToggle from 'react-bootstrap/NavbarToggle';
import NavbarCollapse from 'react-bootstrap/NavbarCollapse';

export default class NavbarMenu extends Component{
    render(){
        return (
            <Navbar bg="light" expand="lg">
             <Navbar.Brand href="/">Carbon Credit Market</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="ml-auto">
                    <Nav.Link href="/sequester">Sequester</Nav.Link>
                    <Nav.Link href="/mediator">Mediator</Nav.Link>
                    <Nav.Link href="/consumer">Consumer</Nav.Link>      
                  </Nav>    
                </Navbar.Collapse>
            </Navbar>
        )
    }
}