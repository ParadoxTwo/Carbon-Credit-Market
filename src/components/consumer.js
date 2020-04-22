import React, { Component } from 'react'
import Accordion from 'react-bootstrap/Accordion';
import { Jumbotron, Container, Row, Col, Image, Button, Card } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import './sequester.css';
import InputGroup from 'react-bootstrap/InputGroup'

export default class Sequester extends Component{
    constructor(props){
        super(props)

    }

    
    render(){
        
        return (
            <div>
                <Row className="rows spc_row rodd">
                    <span id="username">
                    <Card className="shadow-none p-3 mb-5 bg-light rounded">Welcome consumer</Card>
                    </span>
                    <Col md={4}  className="btnSec" >
                    
                    <Card  className="bg-light">
                        <Card.Body>
                        <Card.Subtitle style={{ fontSize: '24px', marginBottom: '10px' }}> Token</Card.Subtitle>
                            <Card.Title className="gTxt" style={{ fontSize: '18px' }}>Your wallet</Card.Title>                            
                            
                        </Card.Body>
                        </Card>
                        
                        </Col>
                        <Col md={4}>
                        <Card  className="bg-light">
                        <Card.Body>
                        <Card.Title className="gTxt" style={{ fontSize: '18px' }}>Current Exchange Rate</Card.Title>
                            <Card.Subtitle style={{ fontSize: '14px', marginTop: '10px', marginBottom: '10px' }}>1 Token <span style={{ float: 'right' }}>A$400.00</span></Card.Subtitle>
                            <hr/>
                            <Card.Subtitle style={{ fontSize: '14px', marginTop: '10px' }}>100 Carbon Units <span style={{ float: 'right' }}>1 Token</span> </Card.Subtitle>
                            
                        </Card.Body>
                        </Card>
                        </Col>
                        
                        </Row>
                        <Row  className="rows spc_row rodd">
                        <Col md={12}>
                        <div className="infoToken">
                        <Image style={{ width: '1250px', height: '600px'}}src="../assets/industry.jpg" className="seqBg" />
                            <div style={{color: 'white', fontSize: '32px', marginTop: '-300px'}}>
                            <p>Sad about you are ruining your environment?</p>
                            <p>Smile, now you can support it while running your industry</p>
                            </div>
                        </div>
                        </Col>
                        <Col  style={{ marginBottom: '15px', marginTop:'215px'}} md={{ span: 8, offset: 2 }}>
                        <Card  className="bg-light">
                        <Card.Body>
                            <Card.Title className="gTxt" style={{ fontSize: '18px' }}>Calculate Token</Card.Title>
                            <Card.Title>
                                Enter yearly sequestration
                                <input type="text" name="sequestrationAmount"/>Tonnes/year
                               
                            </Card.Title>
                            
                        </Card.Body>
                        </Card>
                    </Col>
                    </Row>
                <Row className="rows spc_row reven align-items-center">                    
                <Col md={6}>
                    <div>                        
                        <h4>Trade</h4>
                        <Card className="shadow-none p-3 mb-5 bg-light rounded">
                        <div className="trade">
                        <Form>
                        <Form.Label className="formLbl">Select the sequester </Form.Label>
                            <select>
                                <option value="volvo">Volvo</option>
                                <option value="saab">Saab</option>
                                <option value="mercedes">Mercedes</option>
                                <option value="audi">Audi</option>
                                </select>
                                <br/>
                                <Form.Label className="formLbl">Enter number of tokens </Form.Label>
                                <input type="text" name="tokenNumber"/>
                                <br/>
                                <Button type="submit" variant="info">BUY</Button>
                            </Form></div>
                            </Card>
                    </div>
                    </Col>
                    <Col md={6}>
                    <Card style={{background: '#60d660', padding:'35px'}}>
                        <Card.Subtitle style={{fontSize: '22px', fontFamily: 'Segoe UI Symbol', padding:'10px'}}>Give money to support act other are doing to save environment and get authority to burn designated amount of CO2.</Card.Subtitle>
                        <Image style={{ width: '118px', height: '72px', display: 'block', marginLeft: 'auto', marginRight: 'auto'}}src="../assets/saleHand.png"/>
                    </Card>
                    </Col>
                    </Row>
                    <Row className= "rows spc_row rodd align-items-center">
                    <Col md={6}>
                        <Card style={{background: '#60d660', padding:'35px'}}>
                        <Card.Subtitle style={{fontSize: '22px', fontFamily: 'Segoe UI Symbol', padding:'10px'}}>Check your flow of token balance and be eligible for next season of CO2 production.</Card.Subtitle>
                        <Image style={{ width: '112px', height: '124px', display: 'block', marginLeft: 'auto', marginRight: 'auto'}}src="../assets/historyRecord.png"/>
                        </Card>
                        </Col>
                    <Col md={6}>
                        <div>
                            <h4>History</h4>
                            <div id="histTable">
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>SN</th>
                                    <th>Name</th>
                                    <th>No. of tokens</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Andrew</td>
                                    <td>7</td>
                                    <td>Send</td>
                                    <td>2020/1/15</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Andrew</td>
                                    <td>7</td>
                                    <td>Send</td>
                                    <td>2020/1/15</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Andrew</td>
                                    <td>7</td>
                                    <td>Send</td>
                                    <td>2020/1/15</td>
                                </tr>
                                </tbody>
                                </Table>
                            </div>
                        </div>
                        </Col>
                    </Row>
            </div>
        )
    }
}