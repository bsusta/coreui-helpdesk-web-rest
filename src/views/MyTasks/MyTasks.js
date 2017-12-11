import React, { Component } from "react";

class MyTasks extends Component {
  render() {
    return (
      <div>
        <div class="card">
          <div class="d-flex justify-content-end">
            <div class="mr-auto p-2">Oprava PC</div>
            <div class="p-2">
              {" "}
              <span class="badge badge-success">Success</span>
            </div>
          </div>
          <div class="d-flex justify-content-end">
            <div class="mr-auto p-2">
              Zadal: Branislav Šusta, LAN Systems s.r.o.
            </div>
            <div class="p-2"> Created: 14:00 27.4.2017 </div>
          </div>
          <div class="d-flex justify-content-end">
            <div class="mr-auto p-2">Rieši: Branislav Šusta</div>
            <div class="p-2"> Deadline: 14:00 27.4.2017 </div>
          </div>
          <div class="d-flex justify-content-end">
            <div class="mr-auto p-2">
              <span class="badge badge-primary">Primary</span>
              <span class="badge badge-secondary">Secondary</span>
              <span class="badge badge-success">Success</span>
              <span class="badge badge-danger">Danger</span>
              <span class="badge badge-warning">Warning</span>
              <span class="badge badge-info">Info</span>
              <span class="badge badge-light">Light</span>
              <span class="badge badge-dark">Dark</span>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="d-flex justify-content-end">
            <div class="mr-auto p-2">Oprava PC</div>
            <div class="p-2">
              {" "}
              <span class="badge badge-success">Success</span>
            </div>
          </div>
          <div class="d-flex justify-content-end">
            <div class="mr-auto p-2">
              Zadal: Branislav Šusta, LAN Systems s.r.o.
            </div>
            <div class="p-2"> Created: 14:00 27.4.2017 </div>
          </div>
          <div class="d-flex justify-content-end">
            <div class="mr-auto p-2">Rieši: Branislav Šusta</div>
            <div class="p-2"> Deadline: 14:00 27.4.2017 </div>
          </div>
          <div class="d-flex justify-content-end">
            <div class="mr-auto p-2">
              <span class="badge badge-primary">Primary</span>
              <span class="badge badge-secondary">Secondary</span>
              <span class="badge badge-success">Success</span>
              <span class="badge badge-danger">Danger</span>
              <span class="badge badge-warning">Warning</span>
              <span class="badge badge-info">Info</span>
              <span class="badge badge-light">Light</span>
              <span class="badge badge-dark">Dark</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MyTasks;
