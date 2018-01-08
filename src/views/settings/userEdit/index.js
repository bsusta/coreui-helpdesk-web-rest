import { Link } from "react-router-dom";
import React, { Component } from "react";

const mockData = [
  { id: 1, active: true, name: 'Martin', surname:'Kahili', email:'martin.kahili@gmail.com', company: 'Lansystems', phone:'09487654565' },
  { id: 2, active: false, name: 'Marian', surname:'Mastrin', email:'marian.mastrin@zoznam.sk', company: 'Preston', phone:'50975468455' },
  { id: 3, active: true, name: 'Pavel', surname:'Sentraz', email:'pavel.sentraz@gmail.com', company: 'Preston', phone:'45646545646' },
  { id: 4, active: true, name: 'Patrik', surname:'Fastrad', email:'patrik.fastrad@seznam.sk', company: 'Microsoft', phone:'12354679879' },
  { id: 5, active: false, name: 'Maros', surname:'Petrovic', email:'maros.petrovic@yahoo.com', company: 'Microsoft', phone:'12345678977' },
  { id: 6, active: true, name: 'Sebastian', surname:'Petrenka', email:'sebastian.petrenka@gmail.com', company: 'Preston', phone:'11223344556' }
];
const mockOptions=[{id:0,title:'Lansystems'},{id:1,title:'Preston'},{id:2,title:'Microsoft'}];

class UserEdit extends Component {
  constructor(props) {
    super(props);
    let original = mockData[parseInt(this.props.match.params.id, 10) - 1];
    this.state = {
      changed:false,
      active: original.active,
      name: original.name,
      surname: original.surname,
      email: original.email,
      company: original.company,
      phone: original.phone
    };
  }

  compareChanges(change,val){
    var original = mockData[parseInt(this.props.match.params.id, 10) - 1];
    var newState = {...this.state};
    newState[change]=val;
    this.setState({changed:newState.active!=original.active||newState.name!=original.name||newState.surname!=original.surname||newState.email!=original.email||newState.company!=original.company||newState.phone!=original.phone});
  }

  componentWillMount(){
    let self = this;
    window.onbeforeunload = function() {
      console.log(self.state.changed);
      if(self.state.changed){
        return "Are you sure you want to leave without saving?";
      }
    }
  }
  render() {
    return (
      <div
        class="card"
        style={{ maxWidth: 1380, margin: "auto", borderTop: "0",border:this.state.changed?'1px solid red':null }}
        >

        <h4 class="card-header">Edit user</h4>
        <div class="card-body">
          <div class="list-group">
            <form
              onSubmit={(event, value) => {
                event.preventDefault();
                this.props.history.goBack();
              }}
              >
              <div class="form-check">
                <label class="form-check-label">
                  <input
                    type="checkbox"
                    checked={this.state.active}
                    onChange={() =>{
                      this.compareChanges("active",!this.state.active);
                      this.setState({ active: !this.state.active })
                    }
                  }
                  class="form-check-input"
                  />
                Active
              </label>
            </div>
            <div class="form-group">
              <label for="title">Name</label>
              <input
                class="form-control"
                id="title"
                value={this.state.name}
                onChange={event =>{
                  this.compareChanges("name",event.target.value);
                  this.setState({ name: event.target.value })
                }
              }
              placeholder="Enter name"
              />
          </div>
          <div class="form-group">
            <label for="title">Surname</label>
            <input
              class="form-control"
              id="title"
              value={this.state.surname}
              onChange={event =>{
                this.compareChanges("surname",event.target.value);
                this.setState({ surname: event.target.value })
              }
            }
            placeholder="Enter surname"
            />
        </div>
        <div class="form-group">
          <label for="title">E-mail</label>
          <input
            class="form-control"
            id="title"
            value={this.state.email}
            onChange={event =>{
              this.compareChanges("email",event.target.value);
              this.setState({ email: event.target.value })
            }
          }
          placeholder="Enter e-mail"
          />
        </div>

        <div class="form-group">
          <label for="title">Company</label>
        <select
          class="form-control"
          selected={this.state.company}
          onChange={(event, value) => {
            this.setState({ company: event.target.value });
          }}
        >
          {mockOptions.map(opt => (
            <option
              key={opt.id}
              value={opt.title}
            >
              {opt.title}
            </option>
          ))}
        </select>
        </div>
        <div class="form-group">
          <label for="title">Phone</label>
          <input
            class="form-control"
            id="title"
            type="number"
            value={this.state.phone}
            onChange={event =>{
              this.compareChanges("phone",event.target.value);
              this.setState({ phone: event.target.value })
            }
          }
          placeholder="Enter phone"
          />
        </div>
        <button type="submit" class="btn btn-primary mr-2">
          Submit
        </button>
        <button
          type="button"
          class="btn btn-danger"
          onClick={() => this.props.history.goBack()}
          >
          Cancel
        </button>
      </form>
    </div>
  </div>
</div>
);
}
}

export default UserEdit;
