import { Link } from "react-router-dom";
import React, { Component } from "react";
import { editUnit } from '../../../redux/actions';
import { connect } from 'react-redux';
import i18n from 'i18next';

class UnitEdit extends Component {
  constructor(props) {
    super(props);
    // we create state according to already recieved informations
    this.state = {
      changed:false,
      title: this.props.unit.title,
      shortcut: this.props.unit.shortcut,
      active: this.props.unit.is_active,
      submitError:false
    };
  }

  //we compare if there have been made any changes to the unit in comparison to the original unit, if yes we trigger warning htmlFor the user
  compareChanges(change,val){
    var newState = {...this.state};
    newState[change]=val;
    this.setState({changed:newState.title!=this.props.unit.title||newState.shortcut!=this.props.unit.shortcut||newState.active!=this.props.unit.is_active});
  }

/*
  //when page will be loaded, we add warning about leaving this site, if unit has been edited but not saved
  componentWillMount(){
    let self = this;
    window.onbeforeunload = function() {
      if(self.state.changed){
        return "Are you sure you want to leave without saving?";
      }
    }
  }
*/
  //gets all data from the state and sends it to the API
  submit(e){
    e.preventDefault(); //prevent default form behaviour
    this.setState({submitError:true});
    let body={
      title:this.state.title,
      shortcut:this.state.shortcut
    }
    if(body.title===''||body.shortcut===''){
      return;
    }
    this.props.editUnit(body,this.state.active,this.props.unit.id,this.props.token);
    this.props.history.goBack();
  }

  render() {
    return (
      <div
        className="card"
        style={{ border:this.state.changed?'1px solid red':null }}
        >

        <div className="card-header"></div>
        <div className="card-body">
        <h2 className="h2-setting-form">{i18n.t('editUnit')}</h2>
          <div className="list-group">
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
                    checked={this.state.active}
                    onChange={() =>{
                      this.compareChanges("active",!this.state.active);
                      this.setState({ active: !this.state.active })
                    }
                  }
                  className="form-check-input"
                  />
                {i18n.t('activated')}
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="title" className="req">{i18n.t('title')}</label>
              <input
                className="form-control"
                id="title"
                value={this.state.title}
                onChange={event =>{
                  this.compareChanges("title",event.target.value);
                  this.setState({ title: event.target.value })
                }
              }
              placeholder={i18n.t('enterTitle')}
              />
          </div>
          {this.state.submitError && this.state.title===''&&<label htmlFor="title" style={{color:'red'}}>{i18n.t('restrictionMustEnterTitle')}</label>}

          <div className="form-group">
            <label htmlFor="shortcut" className="req">{i18n.t('shortcut')}</label>
            <input
              className="form-control"
              id="shortcut"
              value={this.state.shortcut}
              onChange={event =>{
                this.compareChanges("shortcut",event.target.value);
                this.setState({ shortcut: event.target.value })
              }
            }
            placeholder={i18n.t('enterShortcut')}
            />
            {this.state.submitError && this.state.shortcut===''&&<label htmlFor="shortcut" style={{color:'red'}}>{i18n.t('restrictionMustEnterShortcut')}</label>}

        </div>
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
            onClick={() => this.props.history.goBack()}
          >
            {i18n.t('cancel')}
          </button>
        </div>

      </form>
    </div>
  </div>
</div>
);
}
}

// All below is just redux storage
const mapStateToProps = ({unitsReducer, login }) => {
  const {unit} = unitsReducer;
  const {token} = login;
  return {unit,token};
};

export default connect(mapStateToProps, {editUnit})(UnitEdit);
