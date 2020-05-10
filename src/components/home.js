import React, { Component } from 'react'
import { Jumbotron, Container, Row, Col, Image, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import './home.css';
import axios from 'axios';
const Web3 = require('web3');



export default class Home extends Component{
    constructor(props){
        super(props);
        this.deployContract = this.deployContract.bind(this);
    }
    deployContract(){
        alert("Deploying...");
        axios({
            method: 'get',
            url: 'http://localhost:5000/',
            data: {
                shield: "Yo"
            }
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
        //call node js
    }

    render(){
        return (
            <div>               
                    <Row className="rows">
                        {/* <Col md={12}>
                            <Image src="../assets/main.jpg" className="banner" fluid />
                        </Col>
                        <Col className="bannerCaption">
                        <p>CARBON TRADE</p><p> <b>A way to keep environment balanced</b></p>
                        </Col> */}
                        <Col md={12}>
                        <Carousel>
                            <Carousel.Item>
                                <img
                                className="d-block w-100"
                                src="../assets/main.jpg"
                                alt="First slide"
                                />
                                <Carousel.Caption>
                                <h3>CARBON TRADE</h3>
                                <p>A way to keep environment balanced</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                className="d-block w-100"
                                src="../assets/blockchain.jpg"
                                alt="Third slide"
                                />

                                <Carousel.Caption>
                                <h3>Blockchain technology</h3>
                                <p>Secure, transparent and full control of ownership for your property.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                className="d-block w-100"
                                src="../assets/plantHand.jpg"
                                alt="Third slide"
                                />

                                <Carousel.Caption>
                                <h3>Sequestering activities</h3>
                                <p>Participate in venture of saving environment along with monetary benefits.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                className="d-block w-100"
                                src="../assets/pollute.jpg"
                                alt="Third slide"
                                />

                                <Carousel.Caption>
                                <h3>CO2 destroying environment</h3>
                                <p>Now you can pay price for what you destroy and overcome damage.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                className="d-block w-100"
                                src="../assets/medi.jpg"
                                alt="Third slide"
                                />

                                <Carousel.Caption>
                                <h3>Mediator in regulating Carbon Token</h3>
                                <p>All paperwork of law is now in your hand and verify the users.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            </Carousel>
                        </Col>
                    </Row> 
                    <Row className="menusGrp rows">
                    <Col md={12}>
                    <div><h1>Pick up the role you want to act as</h1></div>
                    </Col>
                        <Col md={4}  className="btnSec" >
                        <Link to="/sequester">
                        <button type="button"  className="btn btn-outline-success homepageBtn" >Sequester</button>
                        </Link>
                        </Col>
                        <Col md={4}  className="btnSec" >
                        <Link to="/mediator">
                        <button type="button"  className="btn btn-outline-success homepageBtn" >Mediator</button>
                        </Link>
                        </Col>
                        <Col md={4}  className="btnSec" >
                        <Link to="/consumer">
                        <button type="button"  className="btn btn-outline-success homepageBtn" >Consumer</button>
                        </Link>
                        </Col>
                    </Row> 
                <Container>
                <Row className="cardsDes rows">
                    <Col md={4} style={{ textAlign: "center" }}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Sequester</Card.Title>
                                <Image src="../assets/seq.jpg" className="roleImg" roundedCircle />
                                <Card.Text>
                                Carbon tenement owners, responsible for sinking carbon using different techniques to remove the carbon pollution from the atmosphere. 
                                </Card.Text>
                                <Button onClick={()=>{this.deployContract()}}>Deploy</Button>                 
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} style={{ textAlign: "center" }}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Mediator</Card.Title>
                                <Image src="../assets/med.jpg" className="roleImg" roundedCircle />
                                <Card.Text>
                                Traders, responsible for maintaining a transparency between the parties having transactions of carbon tokens keeping in mind all the regulations and standard process of carbon pricing, 
                                </Card.Text>
                                                               
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} style={{ textAlign: "center" }}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Consumer</Card.Title>
                                <Image src="../assets/cons.jpg" className="roleImg" roundedCircle />
                                <Card.Text>
                                Industries emitting carbon waste using fossils and who can purchase carbon tokens from generators to help reduce carbon pollution. 
                                </Card.Text>                                                               
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                </Container>
            </div>
        )
    }
}