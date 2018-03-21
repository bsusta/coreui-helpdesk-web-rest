import React, { Component } from "react";
import { connect } from 'react-redux';
import {getProjectTasks} from '../../redux/actions';
import {
  Row,
  Col,
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  Form,
  FormGroup,
  FormText,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButton
} from "reactstrap";
import Pagination from '../../components/pagination';

class Project extends Component {
  constructor(props) {
    super(props);
    this.state={
      pageNumber:this.props.match.params.page?parseInt(this.props.match.params.page, 10):1,
    }
  }

  setPage(number){
    this.setState({pageNumber:number});
  }

  render() {
    return (
      <div style={{ paddingLeft: 20, paddingRight: 20 }}>
        <h2 style={{ marginTop: 20 }}>
          {this.props.projects[this.props.projects.findIndex((project)=>project.url.includes(this.props.match.params.id))].name} {" "}
          <a
            href={"#/project/info/"+parseInt(this.props.match.params.id, 10)}
            class="fa fa-info-circle fa-lg"
            style={{
              border: "none",
              backgroundColor: "white",
              color: "grey",
              textDecoration: "none"
            }}
            />
        </h2>

        <div className="card" style={{ border: "0px" }}>
          <table className="table table-striped table-hover table-sm">
            <thead className="thead-inverse">
              <tr>
                <th style={{ width: "3%", borderTop: "0px" }}>#</th>
                <th style={{ width: "5%", borderTop: "0px" }}>Status</th>
                <th style={{ borderTop: "0px" }}>Názov</th>
                <th style={{ width: "10%", borderTop: "0px" }}>Zadal</th>
                <th style={{ width: "10%", borderTop: "0px" }}>Firma</th>
                <th style={{ width: "10%", borderTop: "0px" }}>Rieši</th>
                <th style={{ width: "10%", borderTop: "0px" }}>Projekt</th>
                <th style={{ width: "10%", borderTop: "0px" }}>Created</th>
                <th style={{ width: "10%", borderTop: "0px" }}>Due Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>
                  <Input type="text" id="input1-group1" name="input1-group1" />
                </th>
                <th>
                  <Input type="text" id="input1-group1" name="input1-group1" />
                </th>
                <th>
                  <Input type="text" id="input1-group1" name="input1-group1" />
                </th>
                <th>
                  <Input type="text" id="input1-group1" name="input1-group1" />
                </th>
                <th>
                  <Input type="text" id="input1-group1" name="input1-group1" />
                </th>
                <th>
                  <Input type="text" id="input1-group1" name="input1-group1" />
                </th>
                <th>
                  <Input type="text" id="input1-group1" name="input1-group1" />
                </th>
                <th>
                  <Input type="text" id="input1-group1" name="input1-group1" />
                </th>
                <th>
                  <Input type="text" id="input1-group1" name="input1-group1" />
                </th>
              </tr>
              {
                this.props.tasks.map((task)=><tr style={{ cursor: "pointer" }}>
                <td style={{ verticalAlign: "center" }}>{task.id}</td>
                <td>
                  <span class="badge badge-success">{task.status.title}</span>
                </td>
                <td onClick={() => this.props.history.push("/task/edit/"+task.id)}>
                  {task.title}
                  <p>
                    <span class="badge badge-primary mr-1">Primary</span>
                    <span class="badge badge-secondary mr-1">Secondary</span>
                    <span class="badge badge-success mr-1">Success</span>
                    <span class="badge badge-danger mr-1">Danger</span>
                  </p>
                </td>
                <td>{task.requestedBy.username}</td>
                <td>{task.company.title}</td>
                <td>{task.taskHasAssignedUsers.length===0?'None':task.taskHasAssignedUsers.map((assignedTo)=>assignedTo.username+' ')}</td>
                <td>{task.project.title}</td>
                <td>{(new Date(task.createdAt*1000)).getHours()+":"+(new Date(task.createdAt*1000)).getMinutes()+" "+(new Date(task.createdAt*1000)).getDate()+"."+(new Date(task.createdAt*1000)).getMonth()+"."+(new Date(task.createdAt*1000)).getFullYear()}</td>
                <td>{task.deadline?(new Date(task.deadline*1000)).getHours()+":"+(new Date(task.deadline*1000)).getMinutes()+" "+(new Date(task.deadline*1000)).getDate()+"."+(new Date(task.deadline*1000)).getMonth()+"."+(new Date(task.deadline*1000)).getFullYear():'None'}</td>
              </tr>
            )}
          </tbody>
        </table>
        <Pagination
          link={"project/"+this.props.match.params.id}
          history={this.props.history}
          numberOfPages={this.props.numberOfPages}
          refetchData={this.props.getProjectTasks}
          token={this.props.token}
          refetchParameters={[parseInt(this.props.match.params.id, 10)]}
          pageNumber={this.state.pageNumber}
          setPageNumber={this.setPage.bind(this)}
          pagination={this.props.match.params.count?parseInt(this.props.match.params.count, 10):20}
          />

      </div>
    </div>
  );
}
}

const mapStateToProps = ({ tasksReducer, sidebarReducer , login}) => {
  const { tasks, projectLinks } = tasksReducer;
  const {sidebar} = sidebarReducer;
  const {token} = login;
  return { tasks, projects:sidebar[sidebar.findIndex((item)=>item.name==='Projects')].children,numberOfPages:projectLinks.numberOfPages,projectID:projectLinks.id, token };
};


export default connect(mapStateToProps, {getProjectTasks})(Project);
