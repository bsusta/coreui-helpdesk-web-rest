import React, { Component } from "react";
import { connect } from "react-redux";
import { setFilterPage, setShowFilter, loadUnsavedFilter } from "../../redux/actions";
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

  componentWillMount(){
    return;
    if(this.props.body!==null){
      let page=this.props.match.params?this.props.match.params.page:1;
      let count = this.props.match.params?this.props.match.params.count:20;
      this.props.loadUnsavedFilter(this.props.match.params.count?this.props.match.params.count:20,this.props.page,this.props.body,this.props.token);
    }
  }


  render() {
      let header=i18n.t('unknownSearch');
      let icon = "fa fa-search";
      if(this.props.match.params.id && this.props.match.params.id!=='add'){
        let index = this.props.filters.findIndex(filter =>
          filter.url.includes(this.props.match.params.id)
        );
        if(index!==-1){
          header = this.props.filters[index].name;
          icon = this.props.filters[index].icon;
        }
      }
      else if(this.props.body && this.props.body.includes('search')){
          header= i18n.t('search')+ ': ' + this.props.body.split('=')[1].split('&')[0];
        }
        else{
          header=  i18n.t('search');
        }

    return (
      <div className="table-div row">
        <div className="col-4" style={{display:this.props.showFilter?'block':'none',marginTop:-20,marginLeft:-20}}>
          <Filter history={this.props.history} match={this.props.match} />
        </div>
        <div className={this.props.showFilter?"col-8":''}>
          <h2 className="row">
            <p style={{marginLeft:10, fontSize:20, marginTop:5}}>
              <label className="switch switch-3d switch-primary">
                <input
                  type="checkbox"
                  className="switch-input"
                  checked={this.props.showFilter}
                  onChange={()=>this.props.setShowFilter(!this.props.showFilter)} />
                <span className="switch-label" />
                <span className="switch-handle" />
              </label>
              <label style={{ paddingLeft: 10 }}>
                {this.props.showFilter ? i18n.t('show') : i18n.t('hide')}
              </label>
            </p>
            <i className={icon} style={{fontSize:28, marginLeft:10, marginTop:5}} />
            <span style={{marginLeft:10}}>{ header }</span>
          </h2>
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
                    onClick={() =>{
                      if(task.canEdit){
                        this.props.history.push("/filter/"+this.props.match.params.id+"/task/edit/" + task.id)
                      }else{
                        this.props.history.push("/filter/"+this.props.match.params.id+"/task/view/" + task.id)
                      }
                    }}
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
            history={{push:()=>{}}}
            numberOfPages={this.props.numberOfPages}
            refetchData={()=>{}}
            token={this.props.token}
            disabled={this.props.body===null}
            refetchParameters={[]}
            pageNumber={this.props.match.params.page?(this.props.tasks.length>0?parseInt(this.props.match.params.page, 10):0):0}
            setPageNumber={(pageNumber)=>{this.props.setFilterPage(pageNumber)}}
            paginationOptions={[
              { title: 20, value: 20 },
              { title: 50, value: 50 },
              { title: 100, value: 100 }
            ]}
            onPaginationChange={(count)=>{
              this.props.history.push(
                '/filter/'+(this.props.match.params.id?
                  (this.props.match.params.id+'/1,'+count):('1,'+count)));
            }}
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

const mapStateToProps = ({ filtersReducer,sidebarReducer,  login }) => {
  const { tasks,numberOfPages, body,filterState,showFilter, page } = filtersReducer;
  const { sidebar } = sidebarReducer;
  const { token } = login;
  return {
    tasks,
    numberOfPages,
    body,
    page,
    filterState,
    showFilter,
    filters: sidebar[sidebar.findIndex(item => item.name === "filters")].children,
    token
  };
};

export default connect(mapStateToProps, { setFilterPage, setShowFilter, loadUnsavedFilter })(Tasks);
