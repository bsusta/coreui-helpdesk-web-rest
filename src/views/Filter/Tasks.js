import React, { Component } from "react";
import { connect } from "react-redux";
import { loadUnsavedFilter, setCanUpdate } from "../../redux/actions";
import Filter from './Filter';
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

class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
        displayFilter:!this.props.hideFilter,
    };
    this.canUpdate.bind(this);
  }

  componentWillMount(){
    if(this.props.originalBody){
      let page=this.props.match.params?this.props.match.params.page:1;
      let count = this.props.match.params?this.props.match.params.count:20;
      loadUnsavedFilter(page,count,this.props.token,this.props.body,this.props.originalBody,false);
    }
  }

  canUpdate(){
    this.props.setCanUpdate(true);
  }

  componentWillReceiveProps(props){
      if(this.props.hideFilter!==props.hideFilter){
        this.setState({displayFilter:!props.hideFilter});
      }
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
      <div className="table-div row">
        <div className="col-4" style={{display:this.state.displayFilter?'block':'none'}}>
          <Filter history={this.props.history} match={this.props.match} setPageNumber={()=>{}} page={this.props.page}/>
        </div>
        <div className={this.state.displayFilter?"col-8":''}>
          {
            !this.props.hideFilter && <i className="fa fa-filter" style={{fontSize:20}} onClick={()=>this.setState({displayFilter:!this.state.displayFilter})} />
          }
          <h2>+ Filter</h2>
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
    
              {this.props.tasks.map(task => (
                <tr style={{ cursor: "pointer" }} key={task.id}>
                  <td style={{ verticalAlign: "center" }}>{task.id}</td>
                  <td>
                    <span className="badge badge-success" style={{backgroundColor:task.status.color}}>{task.status.title}</span>
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
            link={"filter"}
            history={this.props.history}
            numberOfPages={this.props.numberOfPages}
            refetchData={this.props.loadUnsavedFilter}
            token={this.props.token}
            disabled={this.props.body?false:true}
            refetchParameters={[this.props.body,this.props.originalBody,this.props.hideFilter]}
            pageNumber={this.props.match.params.page?(this.props.tasks.length>0?parseInt(this.props.match.params.page, 10):0):0}
            setPageNumber={(pageNumber)=>{}}
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

const mapStateToProps = ({ filtersReducer,  login }) => {
  const { tasks,numberOfPages, body,originalBody,hideFilter } = filtersReducer;
  const { token } = login;
  return {
    tasks,
    token,
    numberOfPages,
    hideFilter,
    body,
    originalBody
  };
};

export default connect(mapStateToProps, { loadUnsavedFilter, setCanUpdate })(Tasks);
