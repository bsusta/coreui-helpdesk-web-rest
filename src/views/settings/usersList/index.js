import { Link } from "react-router-dom";
import React, { Component } from "react";
import { InputGroup, InputGroupAddon, Input } from "reactstrap";
const mockData = [
  { id: 1, active: true, name: 'Martin', surname:'Kahili', email:'martin.kahili@gmail.com', company: 'Lansystems', phone:'09487654565' },
  { id: 2, active: false, name: 'Marian', surname:'Mastrin', email:'marian.mastrin@zoznam.sk', company: 'Preston', phone:'50975468455' },
  { id: 3, active: true, name: 'Pavel', surname:'Sentraz', email:'pavel.sentraz@gmail.com', company: 'Preston', phone:'45646545646' },
  { id: 4, active: true, name: 'Patrik', surname:'Fastrad', email:'patrik.fastrad@seznam.sk', company: 'Microsoft', phone:'12354679879' },
  { id: 5, active: false, name: 'Maros', surname:'Petrovic', email:'maros.petrovic@yahoo.com', company: 'Microsoft', phone:'12345678977' },
  { id: 6, active: true, name: 'Sebastian', surname:'Petrenka', email:'sebastian.petrenka@gmail.com', company: 'Preston', phone:'11223344556' }
];
class UsersList extends Component {
  constructor(props){
    super(props);
    this.state={
      active:'',
      name:'',
      email:'',
      company:''
    }
    this.getFilteredData.bind(this);
  }

  getFilteredData(){
    return mockData.filter((item)=>(item.name+' '+item.surname).toLowerCase().includes(this.state.name.toLowerCase()))
    .filter((item)=>item.email.toLowerCase().includes(this.state.email.toLowerCase()))
    .filter((item)=>item.company.toLowerCase().includes(this.state.company.toLowerCase()))
    .filter((item)=>item.active == (this.state.active.toLowerCase().includes('y')||
    this.state.active.toLowerCase().includes('t')||
    this.state.active.toLowerCase().includes('c'))||
    this.state.active=='')
    .sort((item,item2)=>item.surname>item2.surname);
  }

  render() {
    return (
      <div style={{ paddingLeft: 20, paddingRight: 20 }}>
        <h2 style={{ marginTop: 20 }} className="mb-3">
          Users list
        </h2>

        <button
          type="button"
          class="btn btn-success"
          onClick={() => this.props.history.push("/user/add")}
          >
          Add new user
        </button>

        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th style={{ borderTop: "0px" }}>Activated</th>
              <th style={{ borderTop: "0px" }}>Name</th>
              <th style={{ borderTop: "0px" }}>E-mail</th>
              <th style={{ borderTop: "0px" }}>Company</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>
                <Input type="text" id="input1-group1" value={this.state.active} name="input1-group1" onChange={(e)=>this.setState({active:e.target.value})} />
              </th>
              <th>
                <Input type="text" id="input1-group1" value={this.state.name} name="input1-group1" onChange={(e)=>this.setState({name:e.target.value})} />
              </th>
              <th>
                <Input type="text" id="input1-group1" value={this.state.email} name="input1-group1" onChange={(e)=>this.setState({email:e.target.value})} />
              </th>
              <th>
                <Input type="text" id="input1-group1" value={this.state.company} name="input1-group1" onChange={(e)=>this.setState({company:e.target.value})} />
              </th>
            </tr>
            {this.getFilteredData().map(user => (
              <tr
                key={user.id}
                onClick={() => this.props.history.push("/user/edit/" + user.id)}
                >
                <td>
                  {user.active ? (
                    <span class="badge badge-success">Yes</span>
                  ) : (
                    <span class="badge badge-danger">No</span>
                  )}
                </td>
                <td>{user.surname} {user.name}</td>
                <td>{user.email}</td>
                <td>{user.company}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default UsersList;
