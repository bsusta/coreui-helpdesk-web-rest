import React, { Component } from "react";
import { connect } from "react-redux";
import { addCompany } from "../../../redux/actions";
import MultiSelect from "../../../components/multiSelect";
import {initialiseCustomAttributes,containsNullRequiredAttribute,processCustomAttributes} from '../../../helperFunctions';
import DatePicker from "react-datepicker";
import i18n from 'i18next';

class CompanyAdd extends Component {
  constructor(props) {
    super(props);
    //creates company_data state className= "input-label" htmlFor each field

    this.state = {
      title: "",
      city: "",
      country: "",
      dic: "",
      ic_dph: "",
      ico: "",
      street: "",
      zip: "",
      company_data:initialiseCustomAttributes(this.props.companyAttributes), //adds it to the others here
      submitError:false
    };
  }

  submit(e) {
    e.preventDefault(); //prevent default form behaviour
    this.setState({submitError:true});

    if(containsNullRequiredAttribute(processCustomAttributes({...this.state.company_data},[...this.props.companyAttributes]),[...this.props.companyAttributes])||
    this.state.title===''){
      return;
    }


    this.props.addCompany(
      {
        title: this.state.title,
        city: this.state.city === "" ? "null" : this.state.city,
        country: this.state.country === "" ? "null" : this.state.country,
        dic: this.state.dic === "" ? "null" : this.state.dic,
        ic_dph: this.state.ic_dph === "" ? "null" : this.state.ic_dph,
        ico: this.state.ico === "" ? "null" : this.state.ico,
        street: this.state.street === "" ? "null" : this.state.street,
        zip: this.state.zip === "" ? "null" : this.state.zip,
        company_data: JSON.stringify(processCustomAttributes({...this.state.company_data},[...this.props.companyAttributes]))
      },
      this.props.token
    );
    if(this.props.modal){
      this.props.modal();
    }
    else{
      this.props.history.goBack();
    }
  }

  render() {
    return (
      <div className="card">
       <div className="card-header"/>
        <div className="card-body">
        <h2 className="h2" className="h2-setting-form">{i18n.t('addCompany')}</h2>
          <form
            onSubmit={(event, value) => {
              event.preventDefault();
            }}
            >
            <div className="form-group">
              <label className= "input-label" htmlFor="title" className="req input-label">{i18n.t('companyName')}</label>
              <input
                className="form-control"
                id="title"
                value={this.state.title}
                onChange={e => this.setState({ title: e.target.value })}
                placeholder={i18n.t('enterCompanyName')}
                />
              {this.state.submitError && this.state.title===''&&<label className= "input-label" htmlFor="title" style={{color:'red'}}>You must enter company title</label>}
            </div>

            <div className="form-group">
              <label className= "input-label" htmlFor="ICO">{i18n.t('ico')}</label>
              <input
                className="form-control"
                id="title"
                value={this.state.ico}
                onChange={e => this.setState({ ico: e.target.value })}
                placeholder={i18n.t('enterICONumber')}
                />
            </div>

            <div className="form-group">
              <label className= "input-label" htmlFor="DIC">{i18n.t('dic')}</label>
              <input
                className="form-control"
                id="DIC"
                value={this.state.dic}
                onChange={e => this.setState({ dic: e.target.value })}
                placeholder={i18n.t('enterDIC')}
                />
            </div>

            <div className="form-group">
              <label className= "input-label" htmlFor="ic_dph">{i18n.t('icDPH')}</label>
              <input
                className="form-control"
                id="ic_dph"
                value={this.state.ic_dph}
                onChange={e => this.setState({ ic_dph: e.target.value })}
                placeholder={i18n.t('enterICDPH')}
                />
            </div>

            <div className="form-group">
              <label className= "input-label" htmlFor="street">{i18n.t('street')}</label>
              <input
                className="form-control"
                id="street"
                value={this.state.street}
                onChange={e => this.setState({ street: e.target.value })}
                placeholder={i18n.t('enterStreet')}
                />
            </div>

            <div className="form-group">
              <label className= "input-label" htmlFor="city">{i18n.t('city')}</label>
              <input
                className="form-control"
                id="city"
                value={this.state.city}
                onChange={e => this.setState({ city: e.target.value })}
                placeholder={i18n.t('enterCity')}
                />
            </div>

            <div className="form-group">
              <label className= "input-label" htmlFor="PSC">{i18n.t('zip')}</label>
              <input
                className="form-control"
                id="PSC"
                placeholder={i18n.t('enterZIP')}
                value={this.state.zip}
                onChange={e => this.setState({ zip: e.target.value })}
                />
            </div>

            <div className="form-group">
              <label className= "input-label" htmlFor="country">{i18n.t('country')}</label>
              <input
                className="form-control"
                id="country"
                placeholder={i18n.t('enterCountry')}
                value={this.state.country}
                onChange={e => this.setState({ country: e.target.value })}
                />
            </div>

            {this.props.companyAttributes.map(attribute => {
              switch (attribute.type) {
                case "input":
                return (
                  <div className="form-group" key={attribute.id}>
                    <label className= "input-label" htmlFor={attribute.id}>{attribute.title}</label>
                    <input
                      className="form-control"
                      id={attribute.id}
                      value={this.state.company_data[attribute.id]}
                      onChange={e => {
                        let newData = { ...this.state.company_data };
                        newData[attribute.id] = e.target.value;
                        this.setState({ company_data: newData });
                      }}
                      placeholder={i18n.t('enter')+' ' + attribute.title}
                      />
                    {attribute.required && this.state.submitError  && this.state.company_data[attribute.id] ===''&&<label className= "input-label" htmlFor="title" style={{color:'red'}}>This field is required!</label>}
                  </div>
                );
                case "text_area":
                return (
                  <div className="form-group" key={attribute.id}>
                    <label className= "input-label" htmlFor={attribute.id}>{attribute.title}</label>
                    <textarea
                      className="form-control"
                      id={attribute.id}
                      value={this.state.company_data[attribute.id]}
                      onChange={e => {
                        let newData = { ...this.state.company_data };
                        newData[attribute.id] = e.target.value;
                        this.setState({ company_data: newData });
                      }}
                      placeholder={i18n.t('enter')+' ' + attribute.title}
                      />
                    {attribute.required && this.state.submitError  && this.state.company_data[attribute.id] ===''&&<label className= "input-label" htmlFor="title" style={{color:'red'}}>This field is required!</label>}
                  </div>
                );
                case "simple_select":
                return (
                  <div className="form-group" key={attribute.id}>
                    <label className= "input-label" htmlFor={attribute.id}>{attribute.title}</label>
                    <select
                      className="form-control"
                      id={attribute.id}
                      value={this.state.company_data[attribute.id]}
                      onChange={e => {
                        let newData = { ...this.state.company_data };
                        newData[attribute.id] = e.target.value;
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
                              this.setState({ company_data: newData });
                            }}
                            />
                        </div>
                      );
                    }
                    case "date":
                    return (
                      <div className="form-group" key={attribute.id}>
                        <label className= "input-label" htmlFor={attribute.id}>{attribute.title}</label>
                        <DatePicker
                          selected={this.state.company_data[attribute.id]}
                          onChange={e => {
                            let newData = { ...this.state.company_data };
                            newData[attribute.id] = e;
                            this.setState({ company_data: newData });
                          }}
                          locale="en-gb"
                          placeholderText={i18n.t('select')+' '+attribute.title}
                          showTimeSelect
                          timeFormat="HH:mm"
                          timeIntervals={30}
                          dateFormat="DD.MM.YYYY HH:mm"
                          />
                        {attribute.required && this.state.submitError  && this.state.company_data[attribute.id] ===null&&<label className= "input-label" htmlFor="title" style={{color:'red'}}>This field is required!</label>}
                      </div>
                    );
                    case "decimal_number":
                    return (
                      <div className="form-group" key={attribute.id}>
                        <label className= "input-label" htmlFor={attribute.id}>{attribute.title}</label>
                        <input
                          className="form-control"
                          type="number"
                          id={attribute.id}
                          value={this.state.company_data[attribute.id]}
                          onChange={e => {
                            let newData = { ...this.state.company_data };
                            newData[attribute.id] = e.target.value;
                            this.setState({ company_data: newData });
                          }}
                          placeholder={i18n.t('enter')+ ' ' + attribute.title}
                          />
                        {attribute.required && this.state.submitError  && isNaN(parseFloat(this.state.company_data[attribute.id]))&&<label className= "input-label" htmlFor="title" style={{color:'red'}}>Field is required and isn't valid</label>}
                      </div>
                    );
                    case "integer_number":
                    return (
                      <div className="form-group" key={attribute.id}>
                        <label className= "input-label" htmlFor={attribute.id}>{attribute.title}</label>
                        <input
                          className="form-control"
                          type="number"
                          id={attribute.id}
                          value={this.state.company_data[attribute.id]}
                          onChange={e => {
                            let newData = { ...this.state.company_data };
                            newData[attribute.id] = e.target.value;
                            this.setState({ company_data: newData });
                          }}
                          placeholder={i18n.t('enter')+ ' ' + attribute.title}
                          />
                        {attribute.required && this.state.submitError  && isNaN(parseFloat(this.state.company_data[attribute.id]))&&<label className= "input-label" htmlFor="title" style={{color:'red'}}>Field is required and isn't valid!</label>}
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
                      {i18n.t('submit')}
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => {
                        if(this.props.modal){
                          this.props.modal();
                        }
                        else{
                          this.props.history.goBack();
                        }
                      }}
                      >
                      {i18n.t('cancel')}
                    </button>
                  </div>

                </form>
              </div>
            </div>
          );
        }
      }

      // All below is just redux storage
      const mapStateToProps = ({ login, companyAttributesReducer }) => {
        const { token } = login;
        const { companyAttributes } = companyAttributesReducer;
        return { token, companyAttributes };
      };

      export default connect(mapStateToProps, { addCompany })(CompanyAdd);
