import React, { Component } from "react";
import Filter from '../Filter';
import {setFilterBody} from '../../redux/actions';
import { connect } from 'react-redux';

class TagLoader extends Component {
  constructor(props){
    super(props);
  }

  //before loader page is loaded, we send requests to get all available units
  componentWillMount(){
    if(this.props.sidebar){
      let tag=this.props.tags.find((item)=>item.id && item.id.toString()===this.props.match.params.tagID);
      tag.label=tag.name;
      tag.value=tag.id;
      if(this.props.match.params.projectID!=='all'){
        let project=this.props.projects.find((item)=>item.id && item.id.toString()===this.props.match.params.projectID);
        project.label=project.name;
        project.value=project.id;

        this.props.setFilterBody('tag='+this.props.match.params.tagID+'&project='+this.props.match.params.projectID,{tags:[tag], projects:[project]},1);
      }
      else{
        this.props.setFilterBody('tag='+this.props.match.params.tagID,{tags:[tag]},1);
      }
    }
  }

  render(){
    if(!this.props.sidebar){
    return null;
    }
    return <Filter history={this.props.history} match={this.props.match}/>
  }

componentWillReceiveProps(props){
  if(props.sidebar && !this.props.sidebar){
    let tag=props.tags.find((item)=>item.id&&item.id.toString()===props.match.params.tagID);
    if(tag===undefined){
      this.props.history.push('/404');
      return;
    }
    tag.label=tag.name;
    tag.value=tag.id;
    if(props.match.params.projectID!=='all'){
      let project=props.projects.find((item)=>item.id && item.id.toString()===props.match.params.projectID);
      project.label=project.name;
      project.value=project.id;

      this.props.setFilterBody('tag='+this.props.match.params.tagID+'&project='+this.props.match.params.projectID,{tags:[tag], projects:[project]},1);
    }
    else{
      this.props.setFilterBody('tag='+this.props.match.params.tagID,{tags:[tag]},1);
    }
    }
  }
}
//all below is just redux storage

const mapStateToProps = ({sidebarReducer }) => {
  const { sidebar } = sidebarReducer;
  let tags = sidebar?sidebar.tags.children:[];
  let projectsOnly = sidebar?sidebar.projects.children:[];
  let archived = sidebar?sidebar.archived.children:[];
  return {sidebar,tags,projects:projectsOnly.concat(archived)};
};


export default connect(mapStateToProps, {setFilterBody})(TagLoader);
