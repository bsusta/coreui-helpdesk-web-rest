import React, { Component } from "react";
import { connect } from "react-redux";
import { addCompany } from "../../../redux/actions";
import MultiSelect from "../../../components/multiSelect";
import {initialiseCustomAttributes,processCustomAttributes} from '../../../helperFunctions';
import DatePicker from "react-datepicker";

class CompanyAdd extends Component {
  constructor(props) {
    super(props);
    //creates company_data state htmlFor each field

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
    this.props.history.goBack();
  }

  render() {
    return (
      <div className="card">
        <h4 className="card-header">Add company</h4>
        <div className="card-body">
          <form
            onSubmit={(event, value) => {
              event.preventDefault();
              this.props.history.goBack();
            }}
          >
            <div className="form-group">
              <label htmlFor="title">Company name</label>
              <input
                className="form-control"
                id="title"
                value={this.state.title}
                onChange={e => this.setState({ title: e.target.value })}
                placeholder="Enter company name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="ICO">ICO</label>
              <input
                className="form-control"
                id="title"
                value={this.state.ico}
                onChange={e => this.setState({ ico: e.target.value })}
                placeholder="Enter ICO number"
              />
            </div>

            <div className="form-group">
              <label htmlFor="DIC">DIC</label>
              <input
                className="form-control"
                id="DIC"
                value={this.state.dic}
                onChange={e => this.setState({ dic: e.target.value })}
                placeholder="Enter DIC"
              />
            </div>

            <div className="form-group">
              <label htmlFor="ic_dph">IČ DPH</label>
              <input
                className="form-control"
                id="ic_dph"
                value={this.state.ic_dph}
                onChange={e => this.setState({ ic_dph: e.target.value })}
                placeholder="Enter IČ DPH"
              />
            </div>

            <div className="form-group">
              <label htmlFor="street">Street</label>
              <input
                className="form-control"
                id="street"
                value={this.state.street}
                onChange={e => this.setState({ street: e.target.value })}
                placeholder="Enter street"
              />
            </div>

            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                className="form-control"
                id="city"
                value={this.state.city}
                onChange={e => this.setState({ city: e.target.value })}
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
                onChange={e => this.setState({ zip: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input
                className="form-control"
                id="country"
                placeholder="Enter country"
                value={this.state.country}
                onChange={e => this.setState({ country: e.target.value })}
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
                          this.autoSubmit("company_data", newData);
                          this.setState({ company_data: newData });
                        }}
                        placeholder={"Enter " + attribute.title}
                      />
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
                          this.autoSubmit("company_data", newData);
                          this.setState({ company_data: newData });
                        }}
                        placeholder={"Enter " + attribute.title}
                      />
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
                          this.autoSubmit("company_data", newData);
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
                      <label htmlFor={attribute.id}>{attribute.title}</label>
                      <DatePicker
                        selected={this.state.company_data[attribute.id]}
                        onChange={e => {
                          let newData = { ...this.state.company_data };
                          newData[attribute.id] = e;
                          this.setState({ company_data: newData });
                        }}
                        locale="en-gb"
                        placeholderText={attribute.title}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={30}
                        dateFormat="DD.MM.YYYY HH:mm"
                      />
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
                          this.setState({ company_data: newData });
                        }}
                        placeholder={"Select " + attribute.title}
                      />
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
                          this.setState({ company_data: newData });
                        }}
                        placeholder={"Select " + attribute.title}
                      />
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
const mapStateToProps = ({ login, companyAttributesReducer }) => {
  const { token } = login;
  const { companyAttributes } = companyAttributesReducer;
  return { token, companyAttributes };
};

export default connect(mapStateToProps, { addCompany })(CompanyAdd);
