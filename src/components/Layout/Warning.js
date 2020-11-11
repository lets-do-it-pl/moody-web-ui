import React, { Component } from 'react'
import {Modal, Button} from 'react-bootstrap';

class Warning extends Component {

    deleteCategory(){

    }
    
    render() {
        return (
            <Modal
                {...this.props}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    Delete Category
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this category?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick = {this.deleteCategory}>Delete</Button>
                    <Button variant="danger" onClick={this.props.onHide}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}
export default Warning;
