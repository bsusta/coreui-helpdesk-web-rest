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
    if(this.props.sidebar.length!==0){
      let tag=this.props.tags.find((item)=>item.id && item.id.toString()===this.props.match.params.tagID);
      tag.label=tag.name;
      tag.value=tag.id;
      this.props.setFilterBody('tag='+this.props.match.params.tagID,{tags:[tag]},1);
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
    let tag=props.tags.find((item)=>item.id&&item.id.toString()===props.match.params.tagID);
    if(tag===undefined){
      this.props.history.push('/404');
      return;
    }
    tag.label=tag.name;
    tag.value=tag.id;
    props.setFilterBody('tag='+props.match.params.tagID,{tags:[tag]},1);
    }
  }
}
//all below is just redux storage

const mapStateToProps = ({sidebarReducer }) => {
  const { sidebar } = sidebarReducer;
  let index = sidebar.findIndex(item => item.name === "tags");
  return {sidebar,tags:(index===-1?[]:sidebar[index].children)};
};


export default connect(mapStateToProps, {setFilterBody})(TagLoader);
