import { Link } from "react-router-dom";
import React, { Component } from "react";
import { InputGroup, InputGroupAddon, Input } from "reactstrap";
const mockData = [
  { id: 1, active: true, name: 'New' ,description:'preco je tu popis',color:'#42a5f5'},
  { id: 2, active: true, name: 'Solved' ,description:'bude priliz dlhy',color:'#66bb6a'},
  { id: 3, active: true, name: 'Closed',description:'pravdepodobne',color:'#ffa726'},
  { id: 4, active: true, name: 'Pending',description:'mozno nieeee',color:'#bdbdbd'},
];
class StatusesList extends Component {
  constructor(props){
    super(props);
    this.state={
      active:'',
      name:''
    }
    this.getFilteredData.bind(this);
  }

  getFilteredData(){
    return mockData.filter((item)=>item.name.toLowerCase().includes(this.state.name.toLowerCase()))
    .filter((item)=>item.active == (this.state.active.toLowerCase().includes('y')||
    this.state.active.toLowerCase().includes('t')||
    this.state.active.toLowerCase().includes('c'))||
    this.state.active=='')
    .sort((item,item2)=>item.name>item2.name);
  }

  render() {
    return (
      <div style={{ paddingLeft: 20, paddingRight: 20 }}>
        <h2 style={{ marginTop: 20 }} className="mb-3">
          Statuses list
        </h2>

        <button
          type="button"
          class="btn btn-success"
          onClick={() => this.props.history.push("/status/add")}
          >
          Add new status
        </button>

        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th style={{ borderTop: "0px" }}>Name</th>
              <th style={{ borderTop: "0px" }}>Description</th>
              <th style={{ borderTop: "0px" }}>Color</th>
              <th style={{ borderTop: "0px" }}>Active</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>
                <Input type="text" id="input1-group1" value={this.state.name} name="input1-group1" onChange={(e)=>this.setState({name:e.target.value})} />
              </th>
              <th>
                <Input type="text" id="input1-group1" value={this.state.active} name="input1-group1" onChange={(e)=>this.setState({active:e.target.value})} />
              </th>
              <th>
                <Input type="text" id="input1-group1" name="input1-group1" />
              </th>
              <th>
                <Input type="text" id="input1-group1" name="input1-group1" />
              </th>
            </tr>
            {this.getFilteredData().map(status => (
              <tr
                key={status.id}
                onClick={() => this.props.history.push("/status/edit/" + status.id)}
                >
                <td>{status.name}</td>
                <td>{status.description}</td>
                <td>
                  <span class="badge" style={{color:'white',backgroundColor:status.color,padding:10,fontSize:15}}>{status.name}</span>
                </td>
                <td>
                  {status.active ? (
                    <span class="badge badge-success">Yes</span>
                  ) : (
                    <span class="badge badge-danger">No</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default StatusesList;
