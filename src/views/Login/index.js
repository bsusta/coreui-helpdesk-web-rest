import React, { Component } from "react";
import Full from '../../containers/Full';
import {Container, Row, Col, CardGroup, Card, CardBody, Button, Input, InputGroup, InputGroupAddon} from 'reactstrap';

class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      loggedIn:false,
      login:true,
      loginName:'',
      resetName:'',
    }
  }
  render() {
    if(this.state.loggedIn){
      return <div style={{maxWidth:1600,margin:'auto'}}><Full {...this.props} /></div>;
    }
    return (
      <div className="app flex-row align-items-center">
      <Container>
      <Row className="justify-content-center">
      <Col md="4">
      <CardGroup>
      <Card className="p-4">
      <CardBody>
      <h1>{this.state.login?"Login":"Password reset"}</h1>
      <p className="text-muted">{this.state.login?"Sign In to your account":"Forgot your password?"}</p>
      <InputGroup className="mb-3">
      <InputGroupAddon><i className="icon-user"></i></InputGroupAddon>
      <Input type="text" placeholder="Username" value={this.state.login?this.state.loginName:this.state.resetName} onChange={(value)=>{console.log(value.target.value);if(this.state.login){this.setState({loginName:value.target.value})}else{this.setState({resetName:value.target.value})}}}/>
      </InputGroup>
      {
        this.state.login &&
        <InputGroup className="mb-4">
        <InputGroupAddon><i className="icon-lock"></i></InputGroupAddon>
        <Input type="password" placeholder="Password"/>
        </InputGroup>
      }
      <Button color="primary" style={{width:'100%'}} onClick={()=>{
        if(this.state.login){
          this.setState({loggedIn:true});
        }
        else{
          this.setState({login:true});
        }
      }}>{this.state.login?"Login":"Reset password"}</Button>
      <Button color="link" style={{margin:'auto', width:'100%'}} onClick={()=>this.setState({login:!this.state.login})}>{this.state.login?"Forgot password?":"Back to login"}</Button>
      </CardBody>
      </Card>
      </CardGroup>
      </Col>
      </Row>
      </Container>
      </div>
    );
  }

}

export default Login;
