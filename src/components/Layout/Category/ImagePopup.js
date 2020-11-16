import React, { Component } from 'react'
import {Modal, Button} from 'react-bootstrap';

class ImagePopup extends Component {

    deleteCategory(){

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
                </Modal.Header>
                <Modal.Body>
                    {this.props.image}
                </Modal.Body>
            </Modal>
        )
    }
}
export default ImagePopup;

