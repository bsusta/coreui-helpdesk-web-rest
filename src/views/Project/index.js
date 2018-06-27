import React, { Component } from "react";
import Filter from '../Filter';
import {setFilterBody} from '../../redux/actions';
import { connect } from 'react-redux';

class ProjectLoader extends Component {
  constructor(props){
    super(props);
  }

  //before loader page is loaded, we send requests to get all available units
  componentWillMount(){
    if(this.props.sidebar.length!==0){
      let project=this.props.projects.find((item)=>item.id && item.id.toString()===this.props.match.params.projectID);
      project.label=project.name;
      project.value=project.id;
      this.props.setFilterBody('project='+this.props.match.params.projectID,{projects:[project]},1);
    }
  }

  render(){
    if(this.props.sidebar.length===0){
    return null;
    }
    return <Filter history={this.props.history} match={this.props.match}/>
  }

componentWillReceiveProps(props){
  if(props.sidebar.length!==0 && this.props.sidebar.length===0){
    let project=props.projects.find((item)=>item.id&&item.id.toString()===props.match.params.projectID);
    if(project===undefined){
      this.props.history.push('/404');
      return;
    }
    project.label=project.name;
    project.value=project.id;
    props.setFilterBody('project='+props.match.params.projectID,{projects:[project]},1);
    }
  }
}
//all below is just redux storage

const mapStateToProps = ({sidebarReducer }) => {
  const { sidebar } = sidebarReducer;
  let index = sidebar.findIndex(item => item.name === "projects");
  let index2 = sidebar.findIndex(item => item.name === "archived");
  return {sidebar,projects:(index===-1?[]:sidebar[index].children).concat(index2===-1?[]:sidebar[index2].children)};
};


export default connect(mapStateToProps, {setFilterBody})(ProjectLoader);
