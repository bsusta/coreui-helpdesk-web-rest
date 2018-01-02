import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import EditTask from './EditTask';
export default class MyTasks extends Component {

  render() {
    return (
      <div>
      <Modal isOpen={this.props.open} style={{maxWidth:1380,margin:'auto'}} class="lg">
          <ModalHeader toggle={this.props.toggle}>
            <button class="btn btn-success mr-1" onClick={this.props.toggle}>
              <i class="fa fa-save" /> Ulozit
            </button>
            <button class="btn btn-warning mr-1" onClick={this.props.toggle}>
              <i class="fa fa-ban" /> Cancel
            </button>

            <button class="btn btn-primary mr-1">
              <i class="fa fa-print" /> Print
            </button>
            <button class="btn btn-danger mr-1">
              <i class="fa fa-remove" /> Vymazať
            </button>
          </ModalHeader>
          <ModalBody>
          <EditTask/>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
