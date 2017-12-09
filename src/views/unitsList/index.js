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
class UnitsList extends Component {
  render() {
    return (
      <div class="card">
        <h4 class="card-header">Units list</h4>
        <div class="card-body">
          <button type="button" class="btn btn-success" onClick={()=>this.props.history.push('/unit/add')}>Add new unit</button>

          <div class="list-group">
            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Shortcut</th>
                  <th>Activated</th>
                </tr>
              </thead>
              <tbody>
                {
                  mockData.map((unit)=>
                  <tr key={unit.id} onClick={()=>this.props.history.push('/unit/edit/'+unit.id)}>

                    <td>{unit.title}</td>
                    <td>{unit.shortcut}</td>
                    <td>
                      {unit.active?<span class="badge badge-success">Yes</span>:
                        <span class="badge badge-danger">No</span>}
                        </td>


                      </tr>
                    )
                  }
                </tbody>
              </table>

            </div>
          </div>
        </div>
      );
    }
  }

  export default UnitsList;
