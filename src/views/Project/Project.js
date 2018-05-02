import React, { Component } from "react";
import { connect } from "react-redux";
import { getProjectTasks } from "../../redux/actions";
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
import Pagination from "../../components/pagination";
import { timestampToString } from "../../helperFunctions";
import i18n from 'i18next';

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNumber: this.props.match.params.page
        ? parseInt(this.props.match.params.page, 10)
        : 1
    };
  }

  setPage(number) {
    this.setState({ pageNumber: number });
  }

  usersToString(users) {
    if (users.length === 0) {
      return  i18n.t('none');
    }
    let text = "";
    Object.values(users).map(
      solver => (text = text + (solver.user.username + " "))
    );
    return text;
  }

  render() {
    return (
      <div className="table-div">
        <h2>
          {
            this.props.projects[
              this.props.projects.findIndex(project =>
                project.url.includes(this.props.match.params.id)
              )
            ].name
          }{" "}
          <a
            href={(this.props.project.canEdit?"#/project/edit/":"#/project/info/") + parseInt(this.props.match.params.id, 10)}
            className="fa fa-info-circle fa-lg"
            style={{
              border: "none",
              backgroundColor: "white",
              color: "grey",
              textDecoration: "none"
            }}
          />
        </h2>

        <div>
          <table className="table table-striped table-hover table-sm">
            <thead className="thead-inverse">
              <tr>
                <th style={{ width: "3%", borderTop: "0px" }}>{i18n.t('id')}</th>
                <th style={{ width: "5%", borderTop: "0px" }}>{i18n.t('status')}</th>
                <th style={{ borderTop: "0px" }}>{i18n.t('title')}</th>
                <th style={{ width: "10%", borderTop: "0px" }}>{i18n.t('requester')}</th>
                <th style={{ width: "10%", borderTop: "0px" }}>{i18n.t('company')}</th>
                <th style={{ width: "10%", borderTop: "0px" }}>{i18n.t('assigned')}</th>
                <th style={{ width: "10%", borderTop: "0px" }}>{i18n.t('project')}</th>
                <th style={{ width: "10%", borderTop: "0px" }}>{i18n.t('createdAt')}</th>
                <th style={{ width: "10%", borderTop: "0px" }}>{i18n.t('dueDate')}</th>
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
              {this.props.tasks.map(task => (
                <tr style={{ cursor: "pointer" }} key={task.id}>
                  <td style={{ verticalAlign: "center" }}>{task.id}</td>
                  <td>
                    <span className="badge badge-success">{task.status.title}</span>
                  </td>
                  <td
                    onClick={() =>
                      this.props.history.push("/task/edit/" + task.id)
                    }
                  >
                    {task.title}
                    <p>
                      {task.tags.map(tag => (
                        <span
                          key={tag.id}
                          className="badge mr-1"
                          style={{
                            backgroundColor:
                              (tag.color.includes("#") ? "" : "#") + tag.color,
                            color: "white"
                          }}
                        >
                          {tag.title}
                        </span>
                      ))}
                    </p>
                  </td>
                  <td>{task.requestedBy.username}</td>
                  <td>{task.company.title}</td>
                  <td>{this.usersToString(task.taskHasAssignedUsers)}</td>
                  <td>{task.project.title}</td>
                  <td>{timestampToString(task.createdAt)}</td>
                  <td>
                    {task.deadline ? timestampToString(task.deadline) :  i18n.t('none')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            link={"project/" + this.props.match.params.id}
            history={this.props.history}
            numberOfPages={this.props.numberOfPages}
            refetchData={this.props.getProjectTasks}
            token={this.props.token}
            refetchParameters={[parseInt(this.props.match.params.id, 10)]}
            pageNumber={this.state.pageNumber}
            setPageNumber={this.setPage.bind(this)}
            paginationOptions={[
              { title: 20, value: 20 },
              { title: 50, value: 50 },
              { title: 100, value: 100 }
            ]}
            pagination={
              this.props.match.params.count
                ? parseInt(this.props.match.params.count, 10)
                : 20
            }
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ tasksReducer,projectsReducer, sidebarReducer, login }) => {
  const { tasks, projectLinks } = tasksReducer;
  const { project } = projectsReducer;
  const { sidebar } = sidebarReducer;
  const { token } = login;
  return {
    tasks,
    project,
    projects:
      sidebar[sidebar.findIndex(item => item.name === "projects")].children,
    numberOfPages: projectLinks.numberOfPages,
    projectID: projectLinks.id,
    token
  };
};

export default connect(mapStateToProps, { getProjectTasks })(Project);
