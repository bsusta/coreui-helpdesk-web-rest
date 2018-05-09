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

  render() {
    if(this.props.tripod){
      return <Tripod history={this.props.history} match={this.props.match}/>
    }
    return <ClassicProject history={this.props.history} match={this.props.match}/>
  }
}

const mapStateToProps = ({ tasksReducer, login}) => {
  const { tripod } = tasksReducer;
  const {token} = login;
  return { tripod, token };
};

export default connect(mapStateToProps, { getProjectTasks })(Project);
