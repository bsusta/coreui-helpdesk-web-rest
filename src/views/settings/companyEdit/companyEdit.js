import React, { Component } from "react";
import { connect } from 'react-redux';
import {editCompany } from '../../../redux/actions';
//city,country, dic, ic_dph,ico,is_active,street,title, zip

class CompanyEdit extends Component {
  constructor(props){
    super(props);
    this.state={
      is_active:this.props.company.is_active,
      title:this.props.company.title?this.props.company.title:'',
      city:this.props.company.city?this.props.company.city:'',
      country:this.props.company.country?this.props.company.country:'',
      dic:this.props.company.dic?this.props.company.dic:'',
      ic_dph:this.props.company.ic_dph?this.props.company.ic_dph:'',
      ico:this.props.company.ico?this.props.company.ico:'',
      street:this.props.company.street?this.props.company.street:'',
      zip:this.props.company.zip?this.props.company.zip:''
    }
  }
  submit(e){
    e.preventDefault(); //prevent default form behaviour
    this.props.editCompany(
      {title:this.state.title,
        city:this.state.city,
        country:this.state.country,
        dic:this.state.dic,
        ic_dph:this.state.ic_dph,
        ico:this.state.ico,
        street:this.state.street,
        zip:this.state.zip
      },
        this.state.is_active,
        this.props.company.id,
        this.props.token);
    this.props.history.goBack();
  }

  render() {
    return (
      <div
        class="card"
        style={{ maxWidth: 1380, margin: "auto", borderTop: "0" }}
      >
        <h4 class="card-header">Edit company</h4>
        <div class="card-body">
          <form
            onSubmit={(event, value) => {
              event.preventDefault();
              this.props.history.goBack();
            }}
          >
            <div class="form-check">
              <label class="form-check-label">
                <input type="checkbox" class="form-check-input" checked={this.state.is_active} onChange={()=>this.setState({is_active:!this.state.is_active})} />
                Active
              </label>
            </div>

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
const mapStateToProps = ({companiesReducer, login }) => {
  const {company} = companiesReducer;
  const {token} = login;
  return {company,token};
};

export default connect(mapStateToProps, {editCompany})(CompanyEdit);
