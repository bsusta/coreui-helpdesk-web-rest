import React, { Component } from "react";
import { connect } from 'react-redux';
import {addCompany } from '../../../redux/actions';

class CompanyAdd extends Component {
  constructor(props){
    super(props);
    let company_data={};
    this.state={
      title:'',
      city:'',
      country:'',
      dic:'',
      ic_dph:'',
      ico:'',
      street:'',
      zip:''
    }
    console.log(this.props.companyAttributes);
  }
  submit(e){
    e.preventDefault(); //prevent default form behaviour
    this.props.addCompany(
      {
        title:this.state.title,
        city:this.state.city,
        country:this.state.country,
        dic:this.state.dic,
        ic_dph:this.state.ic_dph,
        ico:this.state.ico,
        street:this.state.street,
        zip:this.state.zip
      }, this.props.token);
    this.props.history.goBack();
  }

  render() {
    return (
      <div
        class="card"
        style={{ maxWidth: 1380, margin: "auto", borderTop: "0" }}
      >
        <h4 class="card-header">Add company</h4>
        <div class="card-body">
          <form
            onSubmit={(event, value) => {
              event.preventDefault();
              this.props.history.goBack();
            }}
          >
            <div class="form-group">
              <label for="title">Company name</label>
              <input
                class="form-control"
                id="title"
                value={this.state.title}
                onChange={(e)=>this.setState({title:e.target.value})}
              placeholder="Enter company name"
              />
            </div>

            <div class="form-group">
              <label for="ICO">ICO</label>
              <input
                class="form-control"
                id="title"
                value={this.state.ico}
                onChange={(e)=>this.setState({ico:e.target.value})}
              placeholder="Enter ICO number"
              />
            </div>

            <div class="form-group">
              <label for="DIC">DIC</label>
              <input
                class="form-control"
                id="DIC"
                value={this.state.dic}
                onChange={(e)=>this.setState({dic:e.target.value})}
              placeholder="Enter DIC"
              />
            </div>

            <div class="form-group">
              <label for="ic_dph">IČ DPH</label>
              <input
                class="form-control"
                id="ic_dph"
                value={this.state.ic_dph}
                onChange={(e)=>this.setState({ic_dph:e.target.value})}
              placeholder="Enter IČ DPH"
              />
            </div>

            <div class="form-group">
              <label for="street">Street</label>
              <input
                class="form-control"
                id="street"
                value={this.state.street}
                onChange={(e)=>this.setState({street:e.target.value})}
              placeholder="Enter street"
              />
            </div>

            <div class="form-group">
              <label for="city">City</label>
              <input
                class="form-control"
                id="city"
                value={this.state.city}
                onChange={(e)=>this.setState({city:e.target.value})}
              placeholder="Enter city"
              />
            </div>

            <div class="form-group">
              <label for="PSC">PSC</label>
              <input
                class="form-control"
                id="PSC"
              placeholder="Enter PSC"
              value={this.state.zip}
              onChange={(e)=>this.setState({zip:e.target.value})}
              />
            </div>

            <div class="form-group">
              <label for="country">Country</label>
              <input
                class="form-control"
                id="country"
              placeholder="Enter country"
              value={this.state.country}
              onChange={(e)=>this.setState({country:e.target.value})}
              />
            </div>

            <button type="submit" class="btn btn-primary" onClick={this.submit.bind(this)}>
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

// All below is just redux storage
const mapStateToProps = ({ login,companyAttributesReducer }) => {
  const {token} = login;
  const {companyAttributes} = companyAttributesReducer;
  return {token, companyAttributes};
};

export default connect(mapStateToProps, {addCompany})(CompanyAdd);
