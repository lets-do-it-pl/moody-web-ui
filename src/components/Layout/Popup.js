import React, { Component } from 'react'
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import { FormFeedback } from 'reactstrap';

class Popup extends Component {

    handleSubmit(event){
        event.preventDefault();
        alert(event.target.name.value + " "
            + event.target.order.value + " "
            + event.target.image.value);
    }

    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    Create new Category
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className = "container">
                        <Row>
                            <Col sm = "6">
                                <Form onSubmit = {this.handleSubmit}>
                                    <Form.Group controlId = "Name">
                                        <Form.Label> Name </Form.Label>
                                        <Form.Control
                                            type = "text"
                                            name = "name"
                                            required
                                            placeHolder = "Catgory Name"
                                        />
                                        <Form.Label> Order </Form.Label>
                                        <Form.Control
                                            type = "text"
                                            name = "order"
                                            required
                                            placeHolder = "Catgory Order"
                                        />
                                        <Form.Label> Image </Form.Label>
                                        <Form.Control
                                            type = {Image}
                                            name = "image"
                                            required
                                            placeHolder = "Upload image"
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                    <Button variant="success" type = "submit">Submit</Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={this.props.onHide}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}
export default Popup;
