import React, { Component } from "react";
import { connect } from "react-redux";
import { editCompany } from "../../../redux/actions";
import MultiSelect from "../../../components/multiSelect";
import {initialiseCustomAttributes,processCustomAttributes, containsNullRequiredAttribute, importExistingCustomAttributesForCompany,areObjectsSame} from '../../../helperFunctions';
import DatePicker from "react-datepicker";
import moment from "moment";

//city,country, dic, ic_dph,ico,is_active,street,title, zip

class CompanyEdit extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.company.companyData);
    let company_data = initialiseCustomAttributes([...this.props.companyAttributes]);
    company_data= importExistingCustomAttributesForCompany(company_data,[...this.props.company.companyData],[...this.props.companyAttributes]);
    console.log(company_data);
    this.state = {
      is_active: this.props.company.is_active,
      title: this.props.company.title ? this.props.company.title : "",
      city: this.props.company.city ? this.props.company.city : "",
      country: this.props.company.country ? this.props.company.country : "",
      dic: this.props.company.dic ? this.props.company.dic : "",
      ic_dph: this.props.company.ic_dph ? this.props.company.ic_dph : "",
      ico: this.props.company.ico ? this.props.company.ico : "",
      street: this.props.company.street ? this.props.company.street : "",
      zip: this.props.company.zip ? this.props.company.zip : "",
      company_data,
      submitError:false,
      changed:false
    };
    this.compareChanges.bind(this);
  }

  compareChanges(change,val){
    var newState = {...this.state};
    newState[change]=val;
    newState.changed=undefined;
    newState.submitError=undefined;
    newState.company_data=JSON.stringify(newState.company_data);

    let company_data = initialiseCustomAttributes([...this.props.companyAttributes]);
    company_data= importExistingCustomAttributesForCompany(company_data,[...this.props.company.companyData],[...this.props.companyAttributes]);
    var originalState = {
      is_active: this.props.company.is_active,
      title: this.props.company.title ? this.props.company.title : "",
      city: this.props.company.city ? this.props.company.city : "",
      country: this.props.company.country ? this.props.company.country : "",
      dic: this.props.company.dic ? this.props.company.dic : "",
      ic_dph: this.props.company.ic_dph ? this.props.company.ic_dph : "",
      ico: this.props.company.ico ? this.props.company.ico : "",
      street: this.props.company.street ? this.props.company.street : "",
      zip: this.props.company.zip ? this.props.company.zip : "",
      company_data:JSON.stringify(company_data),
    }
    console.log(areObjectsSame(newState,originalState));
    console.log(newState);
    console.log(originalState);
    this.setState({changed:!areObjectsSame(newState,originalState)})
  }

  submit(e) {
    e.preventDefault(); //prevent default form behaviour
    this.setState({submitError:true});
    if(containsNullRequiredAttribute(processCustomAttributes({...this.state.company_data},[...this.props.companyAttributes]),[...this.props.companyAttributes])||
    this.state.title===''){
      return;
    }


    this.props.editCompany(
      {
        title: this.state.title,
        city: this.state.city,
        country: this.state.country,
        dic: this.state.dic,
        ic_dph: this.state.ic_dph,
        ico: this.state.ico,
        street: this.state.street,
        zip: this.state.zip,
        company_data: JSON.stringify(processCustomAttributes({...this.state.company_data},[...this.props.companyAttributes]))
      },
      this.state.is_active,
      this.props.company.id,
      this.props.token
    );
    this.props.history.goBack();
  }

  render() {
    return (
      <div className="card">
        <h4 className="card-header">Edit company</h4>
        <div className="card-body" style={{border:this.state.changed?'1px solid red':null}}>
          <form
            onSubmit={(event, value) => {
              event.preventDefault();
              this.props.history.goBack();
            }}
            >
            <div className="form-check">
              <label className="form-check-label">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={this.state.is_active}
                  onChange={() =>{
                    this.compareChanges('is_active',!this.state.is_active);
                    this.setState({ is_active: !this.state.is_active });
                  }
                  }
                  />
                Active
              </label>
            </div>

            <div className="form-group">
              <label htmlFor="title">Company name</label>
              <input
                className="form-control"
                id="title"
                value={this.state.title}
                onChange={e => {
                  this.compareChanges('title',e.target.value);
                  this.setState({ title: e.target.value })}}
                placeholder="Enter company name"
                />
              {this.state.submitError && this.state.title===''&&<label htmlFor="title" style={{color:'red'}}>You must enter company title</label>}
            </div>

            <div className="form-group">
              <label htmlFor="ICO">ICO</label>
              <input
                className="form-control"
                id="title"
                value={this.state.ico}
                onChange={e =>{
                  this.compareChanges('ico',e.target.value);
                  this.setState({ ico: e.target.value });
                }}
                placeholder="Enter ICO number"
                />
            </div>

            <div className="form-group">
              <label htmlFor="DIC">DIC</label>
              <input
                className="form-control"
                id="DIC"
                value={this.state.dic}
                onChange={e =>{
                  this.compareChanges('dic',e.target.value);
                  this.setState({ dic: e.target.value });
                }}

                placeholder="Enter DIC"
                />
            </div>

            <div className="form-group">
              <label htmlFor="ic_dph">IČ DPH</label>
              <input
                className="form-control"
                id="ic_dph"
                value={this.state.ic_dph}
                onChange={e =>{
                  this.compareChanges('ic_dph',e.target.value);
                  this.setState({ ic_dph: e.target.value });
                }}
                placeholder="Enter IČ DPH"
                />
            </div>

            <div className="form-group">
              <label htmlFor="street">Street</label>
              <input
                className="form-control"
                id="street"
                value={this.state.street}
                onChange={e =>{
                  this.compareChanges('street',e.target.value);
                  this.setState({ street: e.target.value });
                }}
                placeholder="Enter street"
                />
            </div>

            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                className="form-control"
                id="city"
                value={this.state.city}
                onChange={e =>{
                  this.compareChanges('city',e.target.value);
                  this.setState({ city: e.target.value });
                }}
                placeholder="Enter city"
                />
            </div>

            <div className="form-group">
              <label htmlFor="PSC">PSC</label>
              <input
                className="form-control"
                id="PSC"
                placeholder="Enter PSC"
                value={this.state.zip}
                onChange={e =>{
                  this.compareChanges('zip',e.target.value);
                  this.setState({ zip: e.target.value });
                }}
                />
            </div>

            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input
                className="form-control"
                id="country"
                placeholder="Enter country"
                value={this.state.country}
                onChange={e =>{
                  this.compareChanges('country',e.target.value);
                  this.setState({ country: e.target.value });
                }}
                />
            </div>
            {this.props.companyAttributes.map(attribute => {
              switch (attribute.type) {
                case "input":
                return (
                  <div className="form-group" key={attribute.id}>
                    <label htmlFor={attribute.id}>{attribute.title}</label>
                    <input
                      className="form-control"
                      id={attribute.id}
                      value={this.state.company_data[attribute.id]}
                      onChange={e => {
                        let newData = { ...this.state.company_data };
                        newData[attribute.id] = e.target.value;
                        this.compareChanges('company_data',newData);
                        this.setState({ company_data: newData });
                      }}
                      placeholder={"Enter " + attribute.title}
                      />
                    {attribute.required && this.state.submitError  && this.state.company_data[attribute.id] ===''&&<label htmlFor="title" style={{color:'red'}}>This field is required!</label>}
                  </div>
                );
                case "text_area":
                return (
                  <div className="form-group" key={attribute.id}>
                    <label htmlFor={attribute.id}>{attribute.title}</label>
                    <textarea
                      className="form-control"
                      id={attribute.id}
                      value={this.state.company_data[attribute.id]}
                      onChange={e => {
                        let newData = { ...this.state.company_data };
                        newData[attribute.id] = e.target.value;
                        this.compareChanges('company_data',newData);
                        this.setState({ company_data: newData });
                      }}
                      placeholder={"Enter " + attribute.title}
                      />
                    {attribute.required && this.state.submitError  && this.state.company_data[attribute.id] ===''&&<label htmlFor="title" style={{color:'red'}}>This field is required!</label>}
                  </div>
                );
                case "simple_select":
                return (
                  <div className="form-group" key={attribute.id}>
                    <label htmlFor={attribute.id}>{attribute.title}</label>
                    <select
                      className="form-control"
                      id={attribute.id}
                      value={this.state.company_data[attribute.id]}
                      onChange={e => {
                        let newData = { ...this.state.company_data };
                        newData[attribute.id] = e.target.value;
                        this.compareChanges('company_data',newData);
                        this.setState({ company_data: newData });
                      }}
                      >
                      {Array.isArray(attribute.options) &&
                        attribute.options.map(opt => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                        {!Array.isArray(attribute.options) &&
                          Object.keys(attribute.options).map(key => (
                            <option key={key} value={key}>
                              {key}
                            </option>
                          ))}
                        </select>
                      </div>
                    );
                    case "multi_select": {
                      let opt = [];
                      attribute.options.map(att =>
                        opt.push({
                          id: attribute.options.indexOf(att),
                          title: att
                        })
                      );
                      return (
                        <div className="form-group" key={attribute.id}>
                          <MultiSelect
                            id={attribute.id}
                            data={opt}
                            displayValue="title"
                            selectedIds={this.state.company_data[attribute.id]}
                            idValue="id"
                            filterBy="title"
                            title={attribute.title}
                            display="row"
                            displayBoxStyle={{ width: 100 }}
                            menuItemStyle={{
                              marginLeft: 7,
                              marginRight: 7,
                              marginTop: 2,
                              marginBottom: 2,
                              paddingTop: 2,
                              paddingBottom: 2
                            }}
                            renderItem={item => (
                              <span
                                className="badge"
                                key={item.id}
                                style={{
                                  margin: "auto",
                                  border: "1px solid black",
                                  borderRadius: "3px",
                                  paddingLeft: 10,
                                  paddingRight: 10,
                                  paddingTop: 5,
                                  paddingBottom: 5,
                                  marginLeft: 5
                                }}
                                >
                                {item.title}
                              </span>
                            )}
                            titleStyle={{
                              backgroundColor: "white",
                              color: "black",
                              size: 15
                            }}
                            toggleStyle={{
                              backgroundColor: "white",
                              border: "none",
                              padding: 0
                            }}
                            label={attribute.title}
                            labelStyle={{ marginLeft: 10 }}
                            searchStyle={{ margin: 5 }}
                            onChange={(ids, items) => {
                              let newData = { ...this.state.company_data };
                              newData[attribute.id] = ids;
                              this.compareChanges('company_data',newData);
                              this.setState({ company_data: newData });
                            }}
                            />
                        </div>
                      );
                    }
                    case "date":
                    return (
                      <div className="form-group" key={attribute.id}>
                        <label htmlFor={attribute.id}>{attribute.title}</label>
                        <DatePicker
                          selected={this.state.company_data[attribute.id]}
                          onChange={e => {
                            let newData = { ...this.state.company_data };
                            newData[attribute.id] = e;
                            this.compareChanges('company_data',newData);
                            this.setState({ company_data: newData });
                          }}
                          locale="en-gb"
                          placeholderText={attribute.title}
                          showTimeSelect
                          timeFormat="HH:mm"
                          timeIntervals={30}
                          dateFormat="DD.MM.YYYY HH:mm"
                          />
                        {attribute.required && this.state.submitError  && this.state.company_data[attribute.id] ===null&&<label htmlFor="title" style={{color:'red'}}>This field is required!</label>}
                      </div>
                    );
                    case "decimal_number":
                    return (
                      <div className="form-group" key={attribute.id}>
                        <label htmlFor={attribute.id}>{attribute.title}</label>
                        <input
                          className="form-control"
                          type="number"
                          id={attribute.id}
                          value={this.state.company_data[attribute.id]}
                          onChange={e => {
                            let newData = { ...this.state.company_data };
                            newData[attribute.id] = e.target.value;
                            this.compareChanges('company_data',newData);
                            this.setState({ company_data: newData });
                          }}
                          placeholder={"Select " + attribute.title}
                          />
                        {attribute.required && this.state.submitError  && isNaN(parseFloat(this.state.company_data[attribute.id]))&&<label htmlFor="title" style={{color:'red'}}>Field is required and isn't valid</label>}
                      </div>
                    );
                    case "integer_number":
                    return (
                      <div className="form-group" key={attribute.id}>
                        <label htmlFor={attribute.id}>{attribute.title}</label>
                        <input
                          className="form-control"
                          type="number"
                          id={attribute.id}
                          value={this.state.company_data[attribute.id]}
                          onChange={e => {
                            let newData = { ...this.state.company_data };
                            newData[attribute.id] = e.target.value;
                            this.compareChanges('company_data',newData);
                            this.setState({ company_data: newData });
                          }}
                          placeholder={"Select " + attribute.title}
                          />
                        {attribute.required && this.state.submitError  && isNaN(parseFloat(this.state.company_data[attribute.id]))&&<label htmlFor="title" style={{color:'red'}}>Field is required and isn't valid!</label>}
                      </div>
                    );
                    case "checkbox":
                    return (
                      <div className="form-group" key={attribute.id}>
                        <label className="form-check-label">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={this.state.company_data[attribute.id]}
                            onChange={() => {
                              let newData = { ...this.state.company_data };
                              newData[attribute.id] = !newData[
                                attribute.id
                              ];
                              this.compareChanges('company_data',newData);
                              this.setState({ company_data: newData });
                            }}
                            />
                          {attribute.title}
                        </label>
                      </div>
                    );

                    default:
                    return <div>{attribute.title}</div>;
                    }
                  })}
                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn btn-primary mr-2"
                      onClick={this.submit.bind(this)}
                      >
                      Submit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => this.props.history.goBack()}
                      >
                      Cancel
                    </button>
                  </div>

                </form>
              </div>
            </div>
          );
        }
      }

      // All below is just redux storage
      const mapStateToProps = ({
        companiesReducer,
        companyAttributesReducer,
        login
      }) => {
        const { company } = companiesReducer;
        const { token } = login;
        const { companyAttributes } = companyAttributesReducer;
        return { company, companyAttributes, token };
      };

      export default connect(mapStateToProps, { editCompany })(CompanyEdit);
