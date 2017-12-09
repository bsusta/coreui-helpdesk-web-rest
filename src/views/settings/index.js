
import React, { Component } from 'react';
class Settings extends Component {
  render() {
    return (
      <div class="card">
        <h4 class="card-header">Settings</h4>
        <div class="list-group card-body">
          <button type="button" class="list-group-item list-group-item-action">Companies</button>
          <button type="button" class="list-group-item list-group-item-action">Imaps</button>
          <button type="button" class="list-group-item list-group-item-action">Roles</button>
          <button type="button" class="list-group-item list-group-item-action">SMTPs</button>
          <button type="button" class="list-group-item list-group-item-action">Statuses</button>
          <button type="button" class="list-group-item list-group-item-action">Task Attributes</button>
          <button type="button" class="list-group-item list-group-item-action" onClick={()=>this.props.history.push('/unitsList')}>Units</button>
          <button type="button" class="list-group-item list-group-item-action">Users</button>
        </div>
      </div>
    );
  }
}

export default Settings;
