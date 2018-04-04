import React, { Component } from "react";
import { Card, CardHeader, CardBody } from "reactstrap";
import { connect } from 'react-redux';
import {addSubtask,editSubtask,deleteSubtask, addItem, editItem, deleteItem} from '../../redux/actions';

class Subtasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newSubtask:'',
      editedSubtask:'',
      focusedSubtask:null,
      newItem:'',
      newItemCount:1,
      newItemUnit:this.props.units.length===0?null:this.props.units[0].id,
      newItemPrice:1,
      editedItem:null,
    };
  }
  sumItems(items){
    let count=0;
    items.map((item)=>count=count+item.amount*item.unit_price);
    return count;
  }

  render() {
    return (
      <div>
        <table class="table table-hover table-sm">
          <thead className="thead-inverse">
            <tr>
              <th style={{ borderTop: "0px" }}>Subtasks</th>
              <th
                style={{ width: "40px", borderTop: "0px", textAlign: "right" }}
              />
            </tr>
          </thead>
          <tbody>
            {
              this.props.subtasks.map((subtask)=><tr>
                  <td>
                    <div style={{ display: "flex" }}>
                      <input
                        key={subtask}
                        type="checkbox"
                        checked={subtask.done}
                        onChange={()=>this.props.editSubtask({done:!subtask.done,title:subtask.title},subtask.id,this.props.taskID,this.props.token)}
                        style={{ margin: "auto", marginRight: 10 }}
                        />
                      <input
                        type="text"
                        id="name"
                        value={subtask.id===this.state.focusedSubtask?this.state.editedSubtask:subtask.title}
                        onBlur={()=>{this.props.editSubtask({done:subtask.done,title:this.state.editedSubtask},subtask.id,this.props.taskID,this.props.token);this.setState({focusedSubtask:null});}}
                        onFocus={()=>{this.setState({editedSubtask:subtask.title,focusedSubtask:subtask.id});}}
                        onChange={(e)=>this.setState({editedSubtask:e.target.value})}
                        class="form-control"
                        placeholder="Enter subtask"
                        style={{ border: "none" }}
                        />
                    </div>
                  </td>

                  <td>
                    <div
                      style={{ float: "right", paddingRight: 20 }}
                      className="row"
                      >
                      <button className="btn btn-sm btn-danger"
                        onClick={()=>{this.props.deleteSubtask(subtask.id,this.props.taskID,this.props.token);}}>
                        <i className="fa fa-remove" />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            }
            <tr>
              <td colSpan="3">
                <div style={{ display: "flex" }}>
                  <input
                    type="text"
                    id="name"
                    class="form-control"
                    placeholder="Enter new subtask"
                    value={this.state.newSubtask}
                    onChange={(e)=>this.setState({newSubtask:e.target.value})}
                  />
                  <button
                    style={{ float: "right" }}
                    className="btn btn-sm btn-primary mr-1"
                    onClick={()=>{
                      this.props.addSubtask({done:false,title:this.state.newSubtask},this.props.taskID,this.props.token);
                      this.setState({newSubtask:''});
                    }}
                  >
                    <i className="fa fa-plus " />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <table class="table table-hover table-sm">
          <thead className="thead-inverse">
            <tr>
              <th style={{ borderTop: "0px" }}>Material</th>
              <th style={{ width: "10%", borderTop: "0px" }}>Pocet</th>
              <th style={{ width: "10%", borderTop: "0px" }}>Cena/ks</th>
              <th style={{ width:'15%',borderTop: "0px" }}>Jednotka</th>
              <th
                style={{ width: "40px", borderTop: "0px", textAlign: "right" }}
              />
            </tr>
          </thead>
          <tbody>
            {this.props.items.map((item)=><tr>
                <td>
                  <input
                    style={{ border: "none" }}
                    type="text"
                    value={(this.state.editedItem&&item.id===this.state.editedItem.id)?this.state.editedItem.title:item.title}
                    onBlur={()=>{this.props.editItem({title:this.state.editedItem.title,amount:this.state.editedItem.amount,unit_price:this.state.editedItem.unit_price},item.id,this.state.editedItem.unit.id,this.props.taskID,this.props.token);this.setState({editedItem:null});}}
                    onFocus={()=>this.setState({editedItem:item})}
                    onChange={(e)=>this.setState({editedItem:{...this.state.editedItem,title:e.target.value}})}
                    class="form-control"
                    placeholder="Item name"
                    />
                </td>
                <td>
                  <input
                    style={{ border: "none" }}
                    type="text"
                    value={(this.state.editedItem&&item.id===this.state.editedItem.id)?this.state.editedItem.amount:item.amount}
                    onBlur={()=>{this.props.editItem({title:this.state.editedItem.title,amount:this.state.editedItem.amount,unit_price:this.state.editedItem.unit_price},item.id,this.state.editedItem.unit.id,this.props.taskID,this.props.token);this.setState({editedItem:null});}}
                    onFocus={()=>this.setState({editedItem:item})}
                    onChange={(e)=>this.setState({editedItem:{...this.state.editedItem,amount:e.target.value}})}
                    class="form-control"
                    placeholder="Amount"
                    />
                </td>
                <td>
                  <input
                    style={{ border: "none" }}
                    type="text"
                    value={(this.state.editedItem&&item.id===this.state.editedItem.id)?this.state.editedItem.unit_price:item.unit_price}
                    onBlur={()=>{this.props.editItem({title:this.state.editedItem.title,amount:this.state.editedItem.amount,unit_price:this.state.editedItem.unit_price},item.id,this.state.editedItem.unit.id,this.props.taskID,this.props.token);this.setState({editedItem:null});}}
                    onFocus={()=>this.setState({editedItem:item})}
                    onChange={(e)=>this.setState({editedItem:{...this.state.editedItem,unit_price:e.target.value}})}
                    class="form-control"
                    placeholder="Price per unit"
                    />
                </td>
                <td>
                  <select
                    class="form-control"
                    value={item.unit.id}
                    id="status"
                    onChange={(e) =>{this.props.editItem({title:item.title,amount:item.amount,unit_price:item.unit_price},item.id,e.target.value,this.props.taskID,this.props.token);}}>
                    {this.props.units.map((unit) => (
                      <option
                        key={unit.id}
                        value={unit.id}
                      >
                        {unit.title}
                      </option>
                    ))}
                  </select>
                </td>

                <td>
                  <button
                    style={{ float: "right" }}
                    className="btn  btn-sm btn-danger mr-1"
                    onClick={()=>{this.props.deleteItem(item.id,this.props.taskID,this.props.token);}}>
                    <i className="fa fa-remove" />
                  </button>
                </td>
              </tr>

            )}
            <tr>
              <td>
                <input type="text" value={this.state.newItem} onChange={(e)=>this.setState({newItem:e.target.value})} class="form-control" />
              </td>
              <td>
                <input type="text" value={this.state.newItemCount} type="number" onChange={(e)=>this.setState({newItemCount:e.target.value})} class="form-control" />
              </td>
              <td>
                <input type="text" value={this.state.newItemPrice}  type="number" onChange={(e)=>this.setState({newItemPrice:e.target.value})} class="form-control" />
              </td>
              <td>
                <select
                  class="form-control"
                  value={this.state.newItemUnit}
                  id="status"
                  onChange={(e) => {
                    this.setState({ newItemUnit: e.target.value });
                  }}>
                  {this.props.units.map((unit) => (
                    <option
                      key={unit.id}
                      value={unit.id}
                    >
                      {unit.title}
                    </option>
                  ))}
                </select>
              </td>

              <td>
                <button
                  style={{ float: "right" }}
                  onClick={()=>{this.props.addItem({title:this.state.newItem,amount:this.state.newItemCount,unit_price:this.state.newItemPrice},this.state.newItemUnit,this.props.taskID,this.props.token); this.setState({newItem:'',newItemCount:1,newItemPrice:1});}}
                  className="btn-sm btn btn-primary mr-1">
                  <i className="fa fa-plus" />
                </button>
              </td>
            </tr>
            <tr className="table-info">
              <td style={{ textAlign: "right" }} colSpan="5">
                Cena spolu bez {this.sumItems(this.props.items)*0.8}
              </td>
            </tr>
            <tr className="table-info">
              <td style={{ borderTop: 0, textAlign: "right" }} colSpan="5">
                Cena spolu s DPH: {this.sumItems(this.props.items)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = ({subtasksReducer,login,itemsReducer}) => {
  const {subtasks} = subtasksReducer;
  const {items} = itemsReducer;
  const {token} = login;
  return {subtasks,items, token};
};


export default connect(mapStateToProps, {addSubtask,editSubtask,deleteSubtask, addItem, editItem, deleteItem})(Subtasks);
