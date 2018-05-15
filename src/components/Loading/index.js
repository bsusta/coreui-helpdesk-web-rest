import React, { Component } from "react";
import { Card, CardBody } from "reactstrap";
import { ClipLoader } from 'react-spinners';
import { connect } from 'react-redux';
import i18n from 'i18next';
class Loading extends Component {

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
          <ClipLoader
          color={'#20a8d8'}
          loading={true}
        />
      <div style={{marginTop:'auto',marginBottom:'auto', marginLeft:15}}>
            {i18n.t('loadingData')}
        </div>
      </div>
        <button
          style={{width:'100%',marginTop:10}}
          className="btn btn-sm btn-primary"
          onClick={() => this.props.history.goBack()}>{i18n.t('goBack')}</button>
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
