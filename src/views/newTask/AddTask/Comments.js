import React, { Component } from "react";
import { Card, CardHeader, CardBody } from "reactstrap";

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0
    };
  }
  render() {
    return (
      <div className="animated fadeIn">
        <div className="email-app mb-4" style={{ border: 0 }}>
          <main className="inbox">
            <ul className="messages">
              
            </ul>
          </main>
        </div>
      </div>
    );
  }
}

export default Comments;
