import React, { Component } from "react";
import Login from './Login';
import { connect } from 'react-redux';
import { checkToken } from '../../redux/actions';


class TokenChecker extends Component {
  constructor(props){
    super(props);
  }

  componentWillMount(){
    this.props.checkToken();
  }

  render(){
    if(this.props.tokenChecked){
      return (<Login {...this.props}/>);
    }
    else{
      return (<div style={{margin:'auto'}}>Checking for session...</div>);
    }
  }
}

// All below is just redux storage
const mapStateToProps = ({ login }) => {
  const {tokenChecked} = login;
  return {tokenChecked};
};

export default connect(mapStateToProps, {checkToken})(TokenChecker);
