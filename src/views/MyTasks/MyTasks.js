import React, { Component } from "react";

class MyTasks extends Component {
  render() {
    return (
      <div>
        <h2 style={{ marginTop: 25, marginBottom: 25 }}>MyTasks</h2>
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
              <span class="badge badge-primary mr-1">Primary</span>
              <span class="badge badge-secondary mr-1">Secondary</span>
              <span class="badge badge-success mr-1">Success</span>
              <span class="badge badge-danger mr-1">Danger</span>
              <span class="badge badge-warning mr-1">Warning</span>
              <span class="badge badge-info mr-1">Info</span>
              <span class="badge badge-light mr-1">Light</span>
              <span class="badge badge-dark mr-1">Dark</span>
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
              <span class="badge badge-primary mr-1">Primary</span>
              <span class="badge badge-secondary mr-1">Secondary</span>
              <span class="badge badge-success mr-1">Success</span>
              <span class="badge badge-danger mr-1">Danger</span>
              <span class="badge badge-warning mr-1">Warning</span>
              <span class="badge badge-info mr-1">Info</span>
              <span class="badge badge-light mr-1">Light</span>
              <span class="badge badge-dark mr-1">Dark</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MyTasks;
