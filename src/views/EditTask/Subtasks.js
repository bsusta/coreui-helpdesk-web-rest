import React, { Component } from "react";
import { Card, CardHeader, CardBody } from "reactstrap";
import { connect } from 'react-redux';
import {addSubtask,editSubtask,deleteSubtask} from '../../redux/actions';

class Subtasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newSubtask:'',
      editedSubtask:'',
      focusedSubtask:null,
    };
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
        {/*
        <table class="table table-hover table-sm">
          <thead className="thead-inverse">
            <tr>
              <th style={{ borderTop: "0px" }}>Material</th>
              <th style={{ width: "10%", borderTop: "0px" }}>Pocet</th>
              <th style={{ width: "10%", borderTop: "0px" }}>Cena/ks</th>

              <th
                style={{ width: "10%", borderTop: "0px", textAlign: "right" }}
              />
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  style={{ border: "none" }}
                  type="text"
                  id="name"
                  class="form-control"
                  placeholder="Klavesnica"
                />
              </td>
              <td>
                <input
                  style={{ border: "none" }}
                  type="text"
                  id="name"
                  class="form-control"
                  placeholder="1"
                />
              </td>
              <td>
                <input
                  style={{ border: "none" }}
                  type="text"
                  id="name"
                  class="form-control"
                  placeholder="5"
                />
              </td>

              <td>
                <button
                  style={{ float: "right" }}
                  className="btn  btn-sm btn-danger mr-1"
                >
                  <i className="fa fa-remove" />
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <input type="text" id="name" class="form-control" />
              </td>
              <td>
                <input type="text" id="name" class="form-control" />
              </td>
              <td>
                <input type="text" id="name" class="form-control" />
              </td>

              <td>
                <button
                  style={{ float: "right" }}
                  className="btn-sm btn btn-primary mr-1"
                >
                  <i className="fa fa-plus" />
                </button>
              </td>
            </tr>
            <tr className="table-info">
              <td style={{ textAlign: "right" }} colSpan="5">
                Cena spolu bez DPH: 10
              </td>
            </tr>
            <tr className="table-info">
              <td style={{ borderTop: 0, textAlign: "right" }} colSpan="5">
                Cena spolu s DPH: 12
              </td>
            </tr>
          </tbody>
        </table>*/}
      </div>
    );
  }
}

const mapStateToProps = ({subtasksReducer,login}) => {
  const {subtasks} = subtasksReducer;
  const {token} = login;
  return {subtasks, token};
};


export default connect(mapStateToProps, {addSubtask,editSubtask,deleteSubtask})(Subtasks);
