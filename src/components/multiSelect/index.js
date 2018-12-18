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
  constructor(props) {
    super(props);
    let idValue = this.props.idValue ? this.props.idValue : "id";
    let displayValue = this.props.displayValue
      ? this.props.displayValue
      : idValue;
    let filterBy = this.props.filterBy ? this.props.filterBy : idValue;
    let displayBoxStyle = this.props.displayBoxStyle
      ? this.props.displayBoxStyle
      : {};
    let displayItemStyle = this.props.displayItemStyle
      ? this.props.displayItemStyle
      : {};
    let menuItemStyle = this.props.menuItemStyle
      ? this.props.menuItemStyle
      : {};
    this.state = {
      displayBoxStyle,
      opened: false,
      filter: "",
      idValue,
      displayValue,
      filterBy,
      displayItemStyle,
      menuItemStyle,
      colored: this.props.colored ? this.props.colored : false
    };
    this.onChange.bind(this);
  }

  onChange(id) {
    let returnIds = [];
    if (this.props.selectedIds.includes(id)) {
      returnIds = [...this.props.selectedIds];
      returnIds.splice(returnIds.findIndex(item => item == id), 1);
    } else {
      returnIds = [id, ...this.props.selectedIds];
    }
    if (this.props.onChange) {
      this.props.onChange(
        returnIds,
        this.props.data.filter(item =>
          returnIds.includes(item[this.state.idValue])
        ),id
      );
    } else {
      console.log("implement onChange func, returns (ids,values)");
    }
  }

  render() {
    return (
      <div
          style={{
          display: this.props.display == "row" ? "flex" : "block",
          marginTop: "auto",
          marginBottom: "auto"
        }}
      >
        <Dropdown
          disabled={this.props.disabled===true?true:false}
          isOpen={this.state.opened}
          toggle={() => {
            if(this.props.disabled){
                return;
            }
            this.setState({ opened: !this.state.opened });
          }}
        >
          <DropdownToggle
            className="card-background tags-multiselect-button"
            style={this.props.toggleStyle ? this.props.toggleStyle : {}}
          >
            <label className={this.props.toggleClassName?this.props.toggleClassName:"input-label"} style={{margin:0}}>{this.props.label ? this.props.label : ""}</label>
          </DropdownToggle>
          <DropdownMenu style={{paddingBottom:15,...(this.props.dropdownStyle?this.props.dropdownStyle:{})}}>
            <div className="list-group">
              {/*
      <div  className="list-group-item" style={this.props.titleStyle?this.props.titleStyle:{}}>
      {this.props.title?this.props.title:''}

      </div>
      */}
              <input
                placeholder="Filter"
                style={this.props.searchStyle ? this.props.searchStyle : {}}
                onChange={value =>
                  this.setState({ filter: value.target.value })
                }
              />
            {(this.props.limit?this.props.data
                .filter(item =>
                  (item[this.state.filterBy] + "")
                    .toLowerCase()
                    .includes(this.state.filter.toLowerCase())
                ).slice(0,Math.min(20,this.props.data
                  .filter(item =>
                    (item[this.state.filterBy] + "")
                      .toLowerCase()
                      .includes(this.state.filter.toLowerCase())
                  ).length)):this.props.data
                      .filter(item =>
                        (item[this.state.filterBy] + "")
                          .toLowerCase()
                          .includes(this.state.filter.toLowerCase())
                      ))
                .map(item => (
                  <div
                    key={item[this.state.displayValue]}
                    className="list-group-item list-group-item-action"
                    onClick={value => {
                      this.onChange(item[this.state.idValue]);
                    }}
                    style={{
                      width: "auto",
                      flex: 1,
                      display: "flex",
                      backgroundColor: this.state.colored
                        ? (item.color.includes("#") ? "" : "#") + item.color
                        : "white",
                      color: this.state.colored ? "white" : "black",
                      ...this.state.menuItemStyle,
                      cursor: "pointer",
                      borderWidth:3,
                      borderColor:this.state.colored
                        ? (item.color.includes("#") ? "" : "#") + item.color
                        : "white",
                      ...(this.props.selectedIds.includes(item[this.state.idValue])?{borderColor:'#20a8d8'}:{})
                    }}
                  >
                  <span>
                      <i
                        className={this.props.selectedIds.includes(item[this.state.idValue])?'fa fa-check':'fa fa-remove'}
                        style={{width:18}}
                        />
                </span>
                    <div
                      style={{
                      ...(this.props.labelStyle ? this.props.labelStyle : {})}}
                    >
                      {item[this.state.displayValue]}
                    </div>
                  </div>
                ))}
            </div>
          </DropdownMenu>
        </Dropdown>
        <div
          style={{
            ...this.state.displayBoxStyle,
            display: this.props.display == "row" ? "flex" : "block"
          }}
        >
          {this.props.data
            .filter(item =>
              this.props.selectedIds.includes(item[this.state.idValue])
            )
            .map(item => {
              if (this.props.renderItem) {
                return this.props.renderItem(item);
              }
              return (
                <div
                  key={item[this.props.id]}
                  style={{
                    backgroundColor: this.state.colored ? item.color : "white",
                    color: this.state.colored ? "white" : "black",
                    ...this.state.displayItemStyle
                  }}
                >
                  {item[this.state.displayValue]}
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}
