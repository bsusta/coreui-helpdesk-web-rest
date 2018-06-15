import { Link } from "react-router-dom";
import React, { Component } from "react";
import {
  InputGroup,
  InputGroupAddon,
  Input,
  Card,
  CardHeader,
  CardBody
} from "reactstrap";
import { connect } from "react-redux";
import { getUsers } from "../../../redux/actions";
import Pagination from "../../../components/pagination";
import i18n from 'i18next';

class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "",
      name: "",
      email: "",
      id: ""
    };
    this.getFilteredData.bind(this);
  }

  getFilteredData() {
    return this.props.users
      .filter(item =>
        (item.name + " " + item.surname)
          .toLowerCase()
          .includes(this.state.name.toLowerCase())
      )
      .filter(item =>
        item.email.toLowerCase().includes(this.state.email.toLowerCase())
      )
      .filter(item =>
        item.id
          .toString()
          .toLowerCase()
          .includes(this.state.id.toLowerCase())
      )
      .filter(
        item =>
          item.is_active ==
            (this.state.active.toLowerCase().includes("y") ||
              this.state.active.toLowerCase().includes("t") ||
              this.state.active.toLowerCase().includes("c")) ||
          this.state.active == ""
      )
      .sort((item, item2) => item.surname > item2.surname);
  }

  render() {
    return (
      <Card>
        <CardHeader>
          <button className="btn btn-link" onClick={this.props.history.goBack}>
            <i className="fa fa-angle-left" /> {i18n.t('goBack')}
          </button>
          <button
            type="button"
            className="btn btn-link"
            onClick={() => this.props.history.push("/user/add")}
          >
            <i className="fa fa-plus" /> {i18n.t('user')}
          </button>
        </CardHeader>
        <div className="table-div-panel">
          <h2 className="mb-3">{i18n.t('usersList')}</h2>

          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th className="td-small" style={{ borderTop: "0px" }}>{i18n.t('id')}</th>
                <th style={{ borderTop: "0px" }}>{i18n.t('name')}</th>
                <th style={{ borderTop: "0px" }}>{i18n.t('email')}</th>
                <th style={{ borderTop: "0px" }}>{i18n.t('activated')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>
                  <Input
                    type="text"
                    id="input1-group1"
                    value={this.state.id}
                    name="input1-group1"
                    onChange={e => this.setState({ id: e.target.value })}
                  />
                </th>
                <th>
                  <Input
                    type="text"
                    id="input1-group1"
                    value={this.state.name}
                    name="input1-group1"
                    onChange={e => this.setState({ name: e.target.value })}
                  />
                </th>
                <th>
                  <Input
                    type="text"
                    id="input1-group1"
                    value={this.state.email}
                    name="input1-group1"
                    onChange={e => this.setState({ email: e.target.value })}
                  />
                </th>
                <th>
                  <Input
                    type="text"
                    id="input1-group1"
                    value={this.state.active}
                    name="input1-group1"
                    onChange={e => this.setState({ active: e.target.value })}
                  />
                </th>
              </tr>
              {this.getFilteredData().map(user => (
                <tr
                  key={user.id}
                  onClick={() =>
                    this.props.history.push("/user/edit/" + user.id)
                  }
                >
                  <td>{user.id}</td>
                  <td>
                    {user.surname} {user.name}
                  </td>
                  <td>{user.email}</td>
                  <td>
                    {user.is_active ? (
                      <span className="badge badge-success">Yes</span>
                    ) : (
                      <span className="badge badge-danger">No</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/*<Pagination
          link="usersList"
          history={this.props.history}
          numberOfPages={this.props.numberOfPages}
          refetchData={this.props.getUsers}
          token={this.props.token}
          filter=""
          pageNumber={this.state.pageNumber}
          setPageNumber={this.setPage.bind(this)}
          paginationOptions={[{title:20,value:20},{title:50,value:50},{title:100,value:100},{title:'all',value:999}]}
          pagination={this.props.match.params.nop?parseInt(this.props.match.params.nop, 10):20}
          />*/}
        </div>
      </Card>
    );
  }
}

const mapStateToProps = ({ usersReducer, login }) => {
  const { users } = usersReducer;
  const { token } = login;
  return { users, token };
};

export default connect(mapStateToProps, { getUsers })(UsersList);
