import { Link } from "react-router-dom";
import React, { Component } from 'react';

const mockData=[
  {id:1,active:true,title:'Centimeter',shortcut:'cm'},
  {id:2,active:false,title:'Kilometer',shortcut:'km'},
  {id:3,active:true,title:'Kilogram',shortcut:'kg'},
  {id:4,active:true,title:'Kus',shortcut:'ks'},
  {id:5,active:false,title:'Piece',shortcut:'pcs'},
  {id:6,active:true,title:'Gram',shortcut:'g'}
]

class UnitEdit extends Component {
  constructor(props){
    super(props);
    let original=mockData[parseInt(this.props.match.params.id,10)-1];
    this.state={
      title:original.title,
      shortcut:original.shortcut,
      active:original.active,
    }
  }
  render() {
    return (
      <div class="card">
        <h4 class="card-header">Edit unit</h4>
        <div class="card-body">
          <div class="list-group">
            <form onSubmit={(event,value)=>{event.preventDefault();this.props.history.goBack();}}>
              <div class="form-group">
                <label for="title">Unit title</label>
                <input class="form-control" id="title" value={this.state.title} onChange={(event)=>this.setState({title:event.target.value})} placeholder="Enter title"/>
              </div>
              <div class="form-group">
                <label for="shortcut">Shortcut</label>
                <input class="form-control" id="shortcut" value={this.state.shortcut} onChange={(event)=>this.setState({shortcut:event.target.value})} placeholder="Enter shortcut"/>
              </div>
              <div class="form-check">
                <label class="form-check-label">
                  <input type="checkbox" checked={this.state.active} onChange={()=>this.setState({active:!this.state.active})} class="form-check-input"/>
                  Active
                </label>
              </div>
            </form>
            <div class="card-footer">
              <button type="submit" class="btn btn-primary">Submit</button>
              <button type="button" class="btn btn-danger" onClick={()=>this.props.history.goBack()}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UnitEdit;
