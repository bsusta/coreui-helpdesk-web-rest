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
          <main
            className="inbox"
            style={{ padding: 0, backgroundColor: "#f0f3f5" }}
          >
            <ul className="messages">
              <li
                className="message unread"
                style={{ borderTop: "1px solid #c2cfd6", paddingLeft:5 }}
              >
                  <div className="header">
                    <img src={'img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" style={{height:35,marginRight:10}} onClick={(e)=>e.preventDefault()}/>
                    <span className="from">Lukasz Holeczek wrote comment</span>
                    <span className="date">
                      <span className="fa fa-paper-clip" /> Today, 3:47 PM
                    </span>
                  </div>
                  <div className="description" style={{display:'flex',paddingLeft:23}}>
                    <div className="actions" style={{marginTop:'auto',marginBottom:'auto'}}>
                      <span className="action">
                        <i className="fa fa-comment" />
                      </span>
                    </div>

                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur.
                  </div>
              </li>
              <li className="message"
                style={{ paddingLeft:5 }}>
                  <div className="header">
                    <img src={'img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" style={{height:30,marginRight:10}} onClick={(e)=>e.preventDefault()}/>
                    <span className="from">
                      Lukasz Holeczek send email to:susta@lansystems.sk
                    </span>
                    <span className="date">
                      <span className="fa fa-paper-clip" /> Today, 3:47 PM
                    </span>
                  </div>
                  <div className="title">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </div>
                  <div className="description" style={{display:'flex',paddingLeft:23}}>
                    <div className="actions" style={{marginTop:'auto',marginBottom:'auto'}}>
                      <span className="action">
                        <i className="fa fa-mail-forward" />
                      </span>
                    </div>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur.
                  </div>
              </li>
              <li className="message" style={{ paddingLeft:5 }}>
                  <div className="header">
                    <img src={'img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" style={{height:25,marginRight:10}} onClick={(e)=>e.preventDefault()}/>
                    <span className="from">
                      email from branislav.susta@gmail.com
                    </span>
                    <span className="date">Today, 3:47 PM</span>
                  </div>
                  <div className="title">Lorem ipsum dolor sit amet.</div>
                    <div className="description" style={{display:'flex',paddingLeft:23}}>
                      <div className="actions" style={{marginTop:'auto',marginBottom:'auto'}}>
                        <span className="action">
                          <i className="fa fa-envelope-o" />
                        </span>
                      </div>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur.
                  </div>
              </li>
            </ul>
          </main>
        </div>
      </div>
    );
  }
}

export default Comments;
