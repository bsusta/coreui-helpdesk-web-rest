import React, { Component } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ButtonGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  Input,
  Label,
  FormGroup
} from "reactstrap";
import DatePicker from "react-datepicker";
import { connect } from "react-redux";
import {
  addRepeat, deleteRepeat,editRepeat
} from "../../redux/actions";
import i18n from 'i18next';
import moment from "moment";

class Repeat extends Component {
  constructor(props) {
    super(props);
    let defaultState=this.props.defaultState?this.props.defaultState:{};
    this.state = {
      repeatStart:defaultState.startAt?moment(defaultState.startAt*1000):moment(),
      repeatEvery:defaultState.intervalLength?defaultState.intervalLength:0,
      repeatFrequency:defaultState.interval?defaultState.interval:'week',
      repeatUntil:defaultState.repeatsNumber!==null?'number':'forever',
      numberOfRepeats:defaultState.repeatsNumber?defaultState.repeatsNumber:1,
      added: this.props.defaultState!==null ? true : false
    };
    this.submit.bind(this);
    this.delete.bind(this);
  }

  delete() {
    if (confirm(i18n.t('deleteRepeatMessage'))) {
      this.props.deleteRepeat(this.props.defaultState.id, this.props.token);
      this.setState({
        repeatStart:moment(),
        repeatEvery:0,
        repeatFrequency:'week',
        repeatUntil:'forever',
        numberOfRepeats:1,
        added:false,
      })
      this.props.onToogle();
    } else {
      return;
    }
  }

  submit(){
    let body={
      title:'repeat',
      startAt:Math.ceil(this.state.repeatStart.valueOf() / 1000),
      interval:this.state.repeatFrequency,
      intervalLength: this.state.repeatEvery,
    }
    if(this.state.repeatUntil==='number'){
      body.repeatsNumber=parseInt(this.state.numberOfRepeats);
    }
    if(!this.state.added){
      this.props.addRepeat(body,this.props.taskID,this.props.token);
    }else{
      this.props.editRepeat(body,this.props.defaultState.id,this.props.token);
    }
    this.setState({added:true});
    this.props.onToogle();
  }

  render() {
    return (
      <FormGroup>
        <label htmlFor="assigned" className="input-label">{i18n.t("repeat")}</label>
        <InputGroup>
          <InputGroupAddon>
            <i className="fa fa-repeat" />
          </InputGroupAddon>
          <Dropdown
            isOpen={this.props.open}
            toggle={this.props.onToogle}
            style={{ width: "100%" }}
            >
            <DropdownToggle
              style={{
                width: "100%",
                textAlign: "left",
                backgroundColor: "white"
              }}
              >
              {this.state.added&& this.props.defaultState!==null ?i18n.t("every")+' '+this.props.defaultState.intervalLength+' '+i18n.t(this.props.defaultState.interval):i18n.t("noRepeat")}
            </DropdownToggle>
            <DropdownMenu style={{ width: "100%", borderWidth:4 }}>
              <div
                className="form-group"
                style={{ width: "100%", padding:5 }}
                >
                <FormGroup>
                  <label htmlFor="repeatStart" className="input-label">{i18n.t("repeatStart")}</label>
                  <InputGroup>
                    <div style={{ width: "100%" }} className="datepickerWrap">
                      <DatePicker
                        onChange={e => {
                          this.setState({ repeatStart: e });
                        }}
                        selected={this.state.repeatStart}
                        locale="en-gb"
                        placeholderText={i18n.t("repeatStart")}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={30}
                        dateFormat="DD.MM.YYYY HH:mm"
                        />
                    </div>
                  </InputGroup>
                </FormGroup>

                <FormGroup>
                  <label htmlFor="workTime" className="input-label">{i18n.t("repeatEvery")}</label>
                  <InputGroup>
                    <input
                      className="form-control"
                      type="number"
                      id="repeatEvery"
                      value={this.state.repeatEvery}
                      onChange={e => {
                        this.setState({ repeatEvery: e.target.value });
                      }}
                      placeholder={i18n.t("enterNumber")}
                      />
                  </InputGroup>
                </FormGroup>

                <FormGroup>
                  <label htmlFor="repeatFrequency" className="input-label">{i18n.t("repeatFrequency")}</label>
                  <InputGroup>
                    <select
                      className="form-control"
                      id="repeatFrequency"
                      value={this.state.repeatFrequency}
                      onChange={e => {
                        this.setState({ repeatFrequency: e.target.value });
                      }}
                      >
                      {['day','week','month','year'].map(type => (
                        <option key={type} value={type}>
                          {i18n.t(type)}
                        </option>
                      ))}
                    </select>
                  </InputGroup>
                </FormGroup>

                <FormGroup tag="fieldset">
                  <FormGroup check>
                    <Label check>
                      <Input type="radio" name="repetitionTill" checked={this.state.repeatUntil==='forever'} onChange={()=>this.setState({repeatUntil:'forever'})} />{' '}
                        {i18n.t('noLimit')}
                      </Label>
                    </FormGroup>
                    <FormGroup check className="d-flex justify-content-between">
                      <Label check>
                        <Input type="radio" name="repetitionTill" checked={this.state.repeatUntil==='number'} onChange={()=>this.setState({repeatUntil:'number'})}/>{' '}
                          {i18n.t('numberOfRepeatitions')}
                        </Label>
                        <input
                          style={{maxWidth:80}}
                          className="form-control"
                          type="number"
                          disabled={this.state.repeatUntil!=='number'}
                          id="numberOfRepeats"
                          value={this.state.numberOfRepeats}
                          onChange={e => {
                            this.setState({ numberOfRepeats: e.target.value });
                          }}
                          placeholder={i18n.t("enterNumber")}
                          />
                      </FormGroup>
                    </FormGroup>
                    <div className="d-flex flex-row justify-content-between">
                      <button onClick={()=>this.props.onToogle()} className="btn btn-danger">
                        {i18n.t('close')}
                      </button>
                      { this.state.added &&
                        <button onClick={this.delete.bind(this)} className="btn btn-danger">
                          {i18n.t('delete')}
                        </button>
                      }
                      <button
                        disabled={(this.state.repeatUntil==='number' && (isNaN(parseInt(this.state.numberOfRepeats))||parseInt(this.state.numberOfRepeats) < 1))||
                          isNaN(parseInt(this.state.repeatEvery))||parseInt(this.state.repeatEvery) < 1}
                        onClick={this.submit.bind(this)}
                        className="btn btn-primary">
                        {i18n.t('submit')}
                      </button>
                    </div>
                  </div>
                </DropdownMenu>
              </Dropdown>
            </InputGroup>
          </FormGroup>
        );
      }
    }

    const mapStateToProps = ({
      login
    }) => {
      const { token } = login;
      return { token };
    };

    export default connect(mapStateToProps, {
      addRepeat, deleteRepeat, editRepeat
    })(Repeat);
