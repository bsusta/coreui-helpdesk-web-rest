import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import EditTask from '../EditTask';
export default class MyTasks extends Component {

  render() {
    return (
      <div>
      <Modal isOpen={this.props.open} toggle={this.props.toggle} style={{maxWidth:1380,margin:'auto'}} class="lg">
          <ModalHeader toggle={this.props.toggle}>Task edit</ModalHeader>
          <ModalBody>
          <EditTask/>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
