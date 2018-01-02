import React, { Component } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ButtonGroup
} from "reactstrap";
/*
data              //set data array
displayValue      //object parameter to display (for example title for objects that cointains parameter title)
selectedIds       //array of selected IDs
idValue           //object unique parameter more commonly key or id
filterBy          //by what object parameter can user filter data
display           //row if selected elements should be displayed next to each other
displayBoxStyle   //style for box,which contains selected items
displayItemStyle  //style of each selected item in the box
menuItemStyle     //style of each item in list of all items
colored           //true if they have color argument and should use it as a background
label             //text that will be displayed above all selected items and used to edit them
labelStyle        //set the labels style
onChange          //enter function, that will recieve two parameters, ids and items
title             //select window title
renderItem        //function for one render of selected item
toggleStyle       //style of toggle button

example:
<MultiSelect
  data={[{id:0,title:"A0"},{id:1,title:"A1"},{id:2,title:"A2"}]}
  displayValue="title"
  selectedIds={[2,0]}
  idValue="id"
  filterBy="title"
  title= "select users"
  display="row"
  displayBoxStyle={{width:100}}
  displayItemStyle={{border:"1px solid grey", marginLeft:10}}
  menuItemStyle={{padding:3}}
  colored={false}
  label={"Edit here"}
  labelStyle={{backgroundColor:'blue',color:'white'}}
  onChange={(ids,items)=>{console.log(ids);console.log(items);}}
  />
*/

export default class MultiSelect extends Component {
  constructor(props){
    super(props);
    let selected=[];
    if(this.props.selectedIds){
      this.props.selectedIds.map((item)=>selected.push(item+""));
    }
    let idValue=this.props.idValue?this.props.idValue:'id';
    let displayValue = this.props.displayValue?this.props.displayValue:idValue;
    let filterBy = this.props.filterBy?this.props.filterBy:idValue;
    let displayBoxStyle = this.props.displayBoxStyle?this.props.displayBoxStyle:{};
    let displayItemStyle = this.props.displayItemStyle?this.props.displayItemStyle:{};
    let menuItemStyle = this.props.menuItemStyle?this.props.menuItemStyle:{};
    this.state={
      selected,
      displayBoxStyle,
      opened:false,
      filter:'',
      idValue,
      displayValue,
      filterBy,
      displayItemStyle,
      menuItemStyle,
      colored:this.props.colored?this.props.colored:false,
    };
    this.onChange.bind(this);
  }

  onChange(id){
    if(this.state.selected.includes(id)){
      let newSelected=[...this.state.selected];
      newSelected.splice(newSelected.findIndex((item)=>item==id),1);
      this.setState({selected:newSelected});
    }
    else{
      this.setState({selected:[id,...this.state.selected]})
    }
    if(this.props.onChange){
      this.props.onChange(this.state.selected,this.props.data.filter((item)=>this.state.selected.includes(item[this.state.idValue]+"")));
    }
    else{
      console.log('implement onChange func, returns (ids,values)');
    }
  }

  render() {
    return (
      <div style={{display:this.props.display=="row"?"flex":"block"}}>
      <Dropdown
      isOpen={this.state.opened}
      toggle={()=>{this.setState({opened:!this.state.opened});}}
      >
      <DropdownToggle caret style={this.props.labelStyle?this.props.labelStyle:null} style={this.props.toggleStyle?this.props.toggleStyle:{}}>{this.props.label?this.props.label:''}</DropdownToggle>
      <DropdownMenu>
      <div class="list-group">
      <div  class="list-group-item active">
      {this.props.title?this.props.title:''}
      </div>
      <input
      placeholder="Filter"
      onChange={(value)=>this.setState({filter:value.target.value})}
      />
      {this.props.data.filter((item)=>(item[this.state.filterBy]+"").toLowerCase().includes(this.state.filter.toLowerCase())).map((item)=>(
        <div class="list-group-item list-group-item-action"
        onClick={(value)=>{this.onChange(item[this.state.idValue]+"")}}
        style={{flex:1,display:"flex",backgroundColor:this.state.colored?item.color:'white',color:this.state.colored?'white':'black',...this.state.menuItemStyle,cursor:'pointer'}}>
        <input
        checked={this.state.selected.includes(item[this.state.idValue]+"")}
        type="checkbox"
        value={item[this.state.idValue]+""}
        onClick={(value)=>{this.onChange(value.target.value)}} />
        {item[this.state.displayValue]}
        </div>)

      )}

      </div>
      </DropdownMenu>
      </Dropdown>
      <div style={{...this.state.displayBoxStyle,display:this.props.display=="row"?"flex":"block"}}>
      {
        this.props.data.filter((item)=>this.state.selected.includes(item[this.state.idValue]+"")).map((item)=>
        {
          if(this.props.renderItem){
            return this.props.renderItem(item);
          }
          return(
        <div style={{backgroundColor:this.state.colored?item.color:'white',color:this.state.colored?'white':'black',...this.state.displayItemStyle}}>
        {item[this.state.displayValue]}
        </div>)
      })
    }
    </div>
    </div>)
  }
}
