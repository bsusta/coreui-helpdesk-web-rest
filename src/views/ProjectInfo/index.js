import React, { Component } from "react";

const mockData={id:0,title:'Project title',archivated:false,description:`This is the first project that we have ever created.  Why? We dont know.`}

class ProjectInfo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="card">
        <h3 class="card-header">{mockData.title}</h3>
        <div class="card-body">
          <button type="button" class="btn btn-danger" style={{color:'white'}} onClick={this.props.history.goBack}>Close</button>
          <button type="button" class="btn btn-primary" style={{color:'white',marginLeft:5}} onClick={()=>this.props.history.push(mockData.id+"/edit")}>Edit</button>
          <div style={{marginTop:10}}>
            <h4 class="card-title">Status: {mockData.archivated?"Active":"Archivated"}</h4>
            <div class="card-text">
              {mockData.description}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectInfo;
