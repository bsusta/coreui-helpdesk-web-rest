import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import EditTask from "../../../views/EditTask/index";
export default class MyTasks extends Component {
  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.open}
          style={{ maxWidth: 1380, margin: "auto" }}
          class="lg"
        >
          <ModalBody style={{ padding: 0 }}>
            <EditTask toggle={this.props.toggle} />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
