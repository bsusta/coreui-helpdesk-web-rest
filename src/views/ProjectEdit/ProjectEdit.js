import React, { Component } from "react";
import { connect } from 'react-redux';
import { editProject, savePermissions } from '../../redux/actions';

class ProjectEdit extends Component {
  constructor(props) {
    super(props);
    let filteredUsers = [...this.props.users];
    this.props.project.userHasProjects.map((user)=>filteredUsers.splice(filteredUsers.findIndex((item)=>item.id===user.user.id),1));
    filteredUsers.splice(filteredUsers.findIndex((item)=>item.id===this.props.user.id),1);
    this.state = {
      title: this.props.project.title?this.props.project.title:'',
      description: this.props.project.description?this.props.project.description:'',
      is_active: this.props.project.is_active?true:false,
      permissions:this.props.project.userHasProjects?this.props.project.userHasProjects:[],
      newUser: filteredUsers.length===0?'':filteredUsers[0].id,
      filteredUsers,
      lastSavedPermissions:this.props.project.userHasProjects?this.props.project.userHasProjects:[],
      submitError:false
    };
    this.setPermission.bind(this);
  }

  submit(){
    this.setState({submitError:true});
    let body ={
      title:this.state.title,
      description:this.state.description===''?"null":this.state.description }
      if(body.title===''){
        return;
      }
    this.props.editProject(body,this.state.is_active,this.props.project.id,this.props.token);
    this.props.history.goBack();
  }

  setPermission(perm,permission){
    let newPermissions = [...this.state.permissions];
    let index = newPermissions.findIndex((permission)=>permission.user.id===perm.user.id);
    if(newPermissions[index].acl.includes(permission)){
      newPermissions[index].acl.splice(newPermissions[index].acl.findIndex((acl)=>acl===permission),1);
    }
    else{
      newPermissions[index].acl.push(permission);
    }
    this.setState({
      permissions:newPermissions,
    });
  }

  render() {
    return (
      <div style={{ paddingLeft: 20, paddingRight: 20 }}>
        <h2 style={{ paddingTop: 20, marginBottom: 20 }}>
          Editing {this.state.title}
        </h2>

        <div>
          <button
            type="button"
            class="btn btn-danger btn-sm"
            style={{ color: "white" }}
            onClick={this.props.history.goBack}
          >
            Close
          </button>
          <button
            type="button"
            class="btn btn-primary btn-sm"
            style={{ color: "white", marginLeft: 5 }}
            onClick={this.submit.bind(this)}
          >
            Save changes
          </button>
          <form style={{ marginTop: 15 }}>
            <div class="form-group">
              <p>
                <label class="switch switch-3d switch-primary">
                  <input
                    type="checkbox"
                    class="switch-input"
                    checked={this.state.is_active}
                    onChange={() =>
                      this.setState({ is_active: !this.state.is_active })
                    }
                  />
                  <span class="switch-label" />
                  <span class="switch-handle" />
                </label>
                <label style={{ paddingLeft: 10 }}>
                  {this.state.is_active ? "Active" : "Archived"}
                </label>
              </p>
              <label for="title">Project name</label>
              <input
                class="form-control"
                placeholder="Enter project title"
                value={this.state.title}
                onChange={target =>
                  this.setState({ title: target.target.value })
                }
              />
              {this.state.submitError && this.state.title===''&&<label for="title" style={{color:'red'}}>You must enter title</label>}
            </div>
            <div class="form-group">
              <label for="description">Description</label>
              <textarea
                class="form-control"
                id="description"
                placeholder="Enter project description"
                value={this.state.description}
                onChange={target =>
                  this.setState({ description: target.target.value })
                }
              />
            </div>
          </form>
        </div>

        <h2 style={{ paddingTop: 20, marginBottom: 20 }}>
          {" "}
          Project permissions
        </h2>

        <div className="form-inline">
          <select
            value={this.state.newUser}
            id="company"
            onChange={(e)=>this.setState({newUser:parseInt(e.target.value,10)})}
            class="form-control">
            {this.state.filteredUsers.map(opt => (
              <option
                key={opt.id}
                value={opt.id}>
                {opt.username+' , '+opt.email}
              </option>
            ))}
          </select>
          <button
            type="button"
            class="btn btn-success"
            style={{ color: "white", marginLeft:5, paddingLeft: 5 }}
            onClick={() =>{
              let index = this.state.filteredUsers.findIndex((user)=>user.id===this.state.newUser);
              let newFilteredUsers = [...this.state.filteredUsers];
              newFilteredUsers.splice(index,1);

              this.setState({
                newUser:newFilteredUsers.length===0?'':newFilteredUsers[0].id,

                filteredUsers:newFilteredUsers,
                permissions: [
                  ...this.state.permissions,
                  {
                    acl: [],
                    user:{id:this.state.filteredUsers[index].id,username:this.state.filteredUsers[index].username,email:this.state.filteredUsers[index].email}
                  }
                ]
              });
            }}
          >
            Add user
          </button>
        </div>

        <table
          class="table table-striped table-hover table-sm"
          style={{ marginTop: 10 }}>
          <thead className="thead-inverse">
            <tr>
              <th>Username</th>
              <th>View own tasks</th>
              <th>View company users tasks</th>
              <th>View all tasks</th>
              <th>Create tasks</th>
              <th>Resolve tasks</th>
              <th>Delete task</th>
              <th>View internal note</th>
              <th>Edit internal note</th>
              <th>Edit project</th>
              <th>Remove user</th>
            </tr>
          </thead>
          <tbody>
            {this.state.permissions.map(perm => (
              <tr>
                <td>{perm.user.username}</td>
                <td>
                  <input type="checkbox" disabled={perm.user.id===this.props.user.id} checked={perm.acl.includes("view_own_tasks")} onChange={()=>this.setPermission(perm,"view_own_tasks")} />
                </td>
                <td>
                  <input type="checkbox" disabled={perm.user.id===this.props.user.id} checked={perm.acl.includes("view_tasks_from_users_company")} onChange={()=>this.setPermission(perm,"view_tasks_from_users_company")} />
                </td>
                <td>
                  <input type="checkbox" disabled={perm.user.id===this.props.user.id} checked={perm.acl.includes("view_all_tasks")} onChange={()=>this.setPermission(perm,"view_all_tasks")} />
                </td>
                <td>
                  <input type="checkbox" disabled={perm.user.id===this.props.user.id} checked={perm.acl.includes("create_task")} onChange={()=>this.setPermission(perm,"create_task")} />
                </td>
                <td>
                  <input type="checkbox" disabled={perm.user.id===this.props.user.id} checked={perm.acl.includes("resolve_task")} onChange={()=>this.setPermission(perm,"resolve_task")} />
                </td>
                <td>
                  <input type="checkbox" disabled={perm.user.id===this.props.user.id} checked={perm.acl.includes("delete_task")} onChange={()=>this.setPermission(perm,"delete_task")} />
                </td>
                <td>
                  <input type="checkbox" disabled={perm.user.id===this.props.user.id} checked={perm.acl.includes("view_internal_note")} onChange={()=>this.setPermission(perm,"view_internal_note")} />
                </td>
                <td>
                  <input type="checkbox" disabled={perm.user.id===this.props.user.id} checked={perm.acl.includes("edit_internal_note")} onChange={()=>this.setPermission(perm,"edit_internal_note")} />
                </td>
                <td>
                  <input type="checkbox" disabled={perm.user.id===this.props.user.id} checked={perm.acl.includes("edit_project")} onChange={()=>this.setPermission(perm,"edit_project")} />
                </td>
                <td>
                  { perm.user.id!==this.props.user.id && <button className="btn btn-sm btn-danger"
                      onClick={()=>{
                        let newPermissions=[...this.state.permissions];
                        newPermissions.splice(newPermissions.findIndex((permis)=>permis.user.id===perm.user.id),1);
                        this.setState({permissions:newPermissions,filteredUsers:[this.props.users[this.props.users.findIndex((user)=>user.id===perm.user.id)],...this.state.filteredUsers]});
                      }}>
                      <i className="fa fa-remove" />
                    </button>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          type="button"
          class="btn btn-primary"
          onClick={()=>{
            this.props.savePermissions(this.state.permissions,this.state.lastSavedPermissions,this.props.project.id,this.props.token);
            this.setState({lastSavedPermissions:this.state.permissions});
          }}
          style={{ color: "white", marginLeft: 5 }}
        >
          Save permissions
        </button>
        {
          this.props.permissionsSaved && <label
           style={{ color: "green", marginLeft: 10 }}>Permissions saved!</label>
        }
      </div>
    );
  }
}

const mapStateToProps = ({projectsReducer,usersReducer, login }) => {
  const {project,permissionsSaved} = projectsReducer;
  const { users } = usersReducer;
  const {user,token} = login;
  return {project,users,user,token,permissionsSaved};
};

export default connect(mapStateToProps, {editProject,savePermissions})(ProjectEdit);
