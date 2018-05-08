import React, { Component } from "react";
import { connect } from "react-redux";
import { getProjectTasks } from "../../redux/actions";
import {
  Row,
  Col,
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  Form,
  FormGroup,
  FormText,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButton
} from "reactstrap";
import Pagination from "../../components/pagination";
import { timestampToString } from "../../helperFunctions";
import i18n from 'i18next';
import ClassicProject from './Project';
import Tripod from './Tripod';

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tripod: this.props.match.params.task?true:false,
    };
    this.setTripod.bind(this);
  }

  setTripod(){
    this.setState({tripod:!this.state.tripod});
  }

  render() {
    if(this.state.tripod){
      return <Tripod history={this.props.history} match={this.props.match} setTripod={this.setTripod.bind(this)}/>
    }
    return <ClassicProject history={this.props.history} match={this.props.match} setTripod={this.setTripod.bind(this)}/>
  }
}

export default Project;
