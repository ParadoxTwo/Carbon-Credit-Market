import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import './footer.css'

export default class Footer extends Component{
    render(){
        return (
            <div>
                <Row>
                    <Col md={12}>
                    <div className="footerNote">
                        <p>
                            The webpage is basically to interpret how the carbon credit system works and implementation of the token to make secure transfer between user group.
                        </p>
                        <p>
                        &copy; All right reserved Carbon Credit Squad 2019.
                        </p>
                    </div>
                    </Col>
                    
                </Row>
            </div>
        )
    }
}