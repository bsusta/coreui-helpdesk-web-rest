import React, { Component } from "react";
import Loading from '../../../components/Loading';
class AutomaticTaskAdd extends Component {
  render() {
    return (<Loading history={this.props.history}/>);
  }
}

export default AutomaticTaskAdd;
