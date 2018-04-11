import React, { Component } from "react";
import { Card, CardBody } from "reactstrap";
import { ClipLoader } from 'react-spinners';
import { connect } from 'react-redux';

class Loading extends Component {

  render() {
    return (
      <Card
        style={{
          margin: "auto",
          border: "0",
          width:300,
          marginTop:300,
          backgroundColor: "#f4f4f4"
        }}
      >
      <CardBody>
        <div style={{display:'flex',marginLeft:47}}>
          <ClipLoader
          color={'#20a8d8'}
          loading={true}
        />
      <div style={{marginTop:'auto',marginBottom:'auto', marginLeft:15}}>
            Loading data...
        </div>
      </div>
        <button
          style={{width:'100%',marginTop:10}}
          className="btn btn-sm btn-primary"
          onClick={() => this.props.history.goBack()}>Go back</button>
        <div style={{color:'red'}}>
          {this.props.errorID===this.props.ID?<span><span style={{fontWeight:'bold'}}>{this.props.errorMessage!==''?'Error message: ':''}</span> {this.props.errorMessage}</span>:''}
        </div>
      </CardBody>
    </Card>
    );
  }
}


const mapStateToProps = ({ loadingReducer }) => {
  const { errorMessage,errorID } = loadingReducer;
  return { errorMessage,errorID };
};

export default connect(mapStateToProps, {})(Loading);
