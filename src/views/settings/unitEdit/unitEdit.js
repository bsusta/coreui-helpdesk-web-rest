import { Link } from "react-router-dom";
import React, { Component } from "react";
import { editUnit } from '../../../redux/actions';
import { connect } from 'react-redux';

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
        style={{ maxWidth: 1380, margin: "auto", borderTop: "0",border:this.state.changed?'1px solid red':null }}
        >

        <h4 className="card-header">Edit unit</h4>
        <div className="card-body">
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
                Active
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="title">Unit title</label>
              <input
                className="form-control"
                id="title"
                value={this.state.title}
                onChange={event =>{
                  this.compareChanges("title",event.target.value);
                  this.setState({ title: event.target.value })
                }
              }
              placeholder="Enter title"
              />
          </div>
          {this.state.submitError && this.state.title===''&&<label htmlFor="title" style={{color:'red'}}>You must enter title</label>}

          <div className="form-group">
            <label htmlFor="shortcut">Shortcut</label>
            <input
              className="form-control"
              id="shortcut"
              value={this.state.shortcut}
              onChange={event =>{
                this.compareChanges("shortcut",event.target.value);
                this.setState({ shortcut: event.target.value })
              }
            }
            placeholder="Enter shortcut"
            />
          {this.state.submitError && this.state.shortcut===''&&<label htmlFor="shortcut" style={{color:'red'}}>You must enter shortcut</label>}

        </div>
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
