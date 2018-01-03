import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Badge,
  Row,
  Col,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  FormGroup,
  FormText,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButton
} from "reactstrap";
import classnames from "classnames";

class AddComment extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1"
    };
    this.state = {
      selected: 0
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "1" })}
              onClick={() => {
                this.toggle("1");
              }}
            >
              Add Comment
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "2" })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              Add Email
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent
          style={{
            borderLeft: 0,
            borderRight: 0,
            borderBottom: 0,
            backgroundColor: "#f0f3f5"
          }}
          activeTab={this.state.activeTab}
        >
          <TabPane tabId="1" style={{ paddingLeft: 0, paddingRight: 0 }}>
            <div class="form-group">
              <textarea
                class="form-control"
                id="description"
                placeholder="add comment"
              />
            </div>
            <div className="form-group">
              <Button color="link" size="sm">
                <i className="fa fa-paperclip" />&nbsp;Add atachments
              </Button>
              <Label check htmlFor="inline-checkbox1" className="align-middle">
                <Input
                  type="checkbox"
                  id="inline-checkbox1"
                  name="inline-checkbox1"
                  value="option1"
                />
                Internal note
              </Label>
              <button
                type="submit"
                className="btn btn-sm btn-success mr-2 ml-2 float-right"
              >
                Send
              </button>
              <button
                type="submit"
                className="btn btn-sm btn-danger float-right"
              >
                Discard
              </button>
            </div>
          </TabPane>
          <TabPane
            tabId="2"
            style={{
              paddingLeft: 0,
              paddingRight: 0,
              backgroundColor: "#f0f3f5"
            }}
          >
            <FormGroup row>
              <Col md="2">
                <Label htmlFor="text-input">To:</Label>
              </Col>
              <Col xs="12" md="10">
                <Input type="text" id="text-input" name="text-input" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="2">
                <Label htmlFor="email-input">Bc:</Label>
              </Col>
              <Col xs="12" md="10">
                <Input type="email" id="email-input" name="email-input" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="2">
                <Label htmlFor="email-input">Predmet:</Label>
              </Col>
              <Col xs="12" md="10">
                <Input type="email" id="email-input" name="email-input" />
              </Col>
            </FormGroup>
            <div class="form-group">
              <textarea class="form-control" id="description" placeholder="" />
            </div>
            <div className="form-group">
              <Button color="link" size="sm">
                <i className="fa fa-paperclip" />&nbsp;Add atachments
              </Button>
              <Label check htmlFor="inline-checkbox1" className="align-middle">
                <Input
                  type="checkbox"
                  id="inline-checkbox1"
                  name="inline-checkbox1"
                  value="option1"
                />
                Internal note
              </Label>
              <button
                type="submit"
                className="btn btn-sm btn-success mr-2 ml-2 float-right"
              >
                Send
              </button>
              <button
                type="submit"
                className="btn btn-sm btn-danger float-right"
              >
                Discard
              </button>
            </div>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

export default AddComment;
