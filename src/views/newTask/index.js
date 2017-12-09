import React, { Component } from 'react';

let mockOptions=[
  {id:0,title:'Moznost 1',color:'#57b141'},
  {id:1,title:'Moznost 2',color:'#8ebfbe'},
  {id:2,title:'Moznost 3',color:'#a8bbbc'},
  {id:3,title:'Moznost 4',color:'#0eb2ac'},
  {id:4,title:'Moznost 5',color:'#7329b1'}
]

class NewTask extends Component {
  constructor(props){
    super(props);
    this.state={
      selected:0,
    }
  }
  render() {
    return (
      <div class="row">
        <div class="card col-8">
          <h4 class="card-header">Add task</h4>
          <div class="card-body">
            <div>
              <button class="btn btn-success" onClick={()=>this.props.history.goBack()}>Save</button>
              <button class="btn btn-warning" onClick={()=>this.props.history.goBack()}>Cancel</button>
              <button class="btn btn-primary">Print</button>
            </div>
            <form>
              <div class="form-group">
                <label for="title">Task name</label>
                <input class="form-control" id="title" placeholder="Enter task name"/>
              </div>
              <div class="form-group">
                <label for="tags">Tags</label>
                <input class="form-control" id="tags" placeholder="Enter tags"/>
              </div>
              <div class="form-group">
                <label for="description">Description</label>
                <textarea class="form-control" id="description" placeholder="Enter description"/>
              </div>
              <div class="form-group">
                <label for="worktime">Add work time</label>
                <input class="form-control" id="worktime" placeholder="Enter work time"/>
              </div>
            </form>
          </div>
        </div>

        <div class="card col-4">
          <h4 class="card-header">Attributes</h4>
          <div class="card-body">
            <form>{/*INLINE STYLE*/}
              <label for="status">Status</label>
              <select class="form-control" style={{color:'white',backgroundColor:mockOptions[this.state.selected].color}} selected={this.state} id="status" onChange={(event,value)=>{this.setState({selected:event.target.value});}}>
                {mockOptions.map((opt)=>
                  <option key={opt.id} style={{color:'white',backgroundColor:opt.color}} value={opt.id}>{opt.title}</option>
                )}
              </select>
              <label for="project">Project</label>
              <select class="form-control" id="project">
                {mockOptions.map((opt)=>
                  <option key={opt.id} value={opt.id}>{opt.title}</option>
                )}
              </select>
              <label for="requester">Requester</label>
              <select class="form-control" id="requester">
                {mockOptions.map((opt)=>
                  <option key={opt.id} value={opt.id}>{opt.title}</option>
                )}
              </select>
              <label for="company">Company</label>
              <select class="form-control" id="company">
                {mockOptions.map((opt)=>
                  <option key={opt.id} value={opt.id}>{opt.title}</option>
                )}
              </select>
              <label for="assigned">Assigned</label>
              <select class="form-control" id="assigned">
                {mockOptions.map((opt)=>
                  <option key={opt.id} value={opt.id}>{opt.title}</option>
                )}
              </select>
            </form>
          </div>
        </div>

      </div>
    );
  }
}

export default NewTask;
