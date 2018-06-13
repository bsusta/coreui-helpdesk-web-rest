import React, { Component } from "react";
import { Card, CardBody } from "reactstrap";
import i18n from 'i18next';
import {getSidebar} from '../../redux/actions';
import { connect } from 'react-redux';

class Page404 extends Component {
  componentWillMount(){
  this.props.getSidebar(null,this.props.user.user_role.acl,this.props.token);
  }
  render() {
    return (
      <Card
        className="smallCard"
        style={{
          margin: "auto",
          border: "0",
          width:300,
          marginTop:300,
          backgroundColor: "#f4f4f4"
        }}
      >
      <CardBody className="smallCard">
        <div style={{display:'flex',marginLeft:10}}>
        404 - page not found
      </div>
      </CardBody>
    </Card>
    );
  }
}

//all below is just redux storage
const mapStateToProps = ({ login }) => {
  const { token, user } = login;
  return { token, user };
};

export default connect(mapStateToProps, {getSidebar})(Page404);
