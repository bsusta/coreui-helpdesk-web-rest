import React, {Component} from 'react';
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Dropdown,
  Progress,
} from 'reactstrap';
import { connect } from 'react-redux';
import {getTopMessages} from '../../redux/actions';
import {timestampToString, messageBodyToString} from '../../helperFunctions';

class MessagesDropdown extends Component {

  constructor(props) {
    super(props);
    //load messages and set it to automaticly load new after X ms
    this.props.getTopMessages(this.props.token);
    let intervalID=window.setInterval(()=>this.props.getTopMessages(this.props.token), 7500);
    this.state = {
      dropdownOpen: false,
      intervalID
    };
  }

  //when logging out, stop the updates
  componentWillUnmount(){
    clearInterval(this.state.intervalID);
  }

  render() {
    return (
      <Dropdown style={{zindex:"1040"}} nav className="d-md-down-none noDots" isOpen={this.state.dropdownOpen} toggle={()=>this.setState({ dropdownOpen: !this.state.dropdownOpen })}>
        <DropdownToggle className="headerIcons">
          <i className="icon-envelope-letter"></i><Badge pill color="info">{this.props.count}</Badge>
        </DropdownToggle>
        <DropdownMenu right className="dropdown-menu-lg" >
          <DropdownItem header tag="div"><strong>You have {this.props.count} new message/s</strong></DropdownItem>
          {
            this.props.messages.map((message)=>
            <DropdownItem href={message.task?"#/task/edit/"+message.task.id: '#/messages'} key={message.id}>
              <div className="message">
                <div className=" float-left">
                    <i style={{fontSize:'1em'}} className={message.comment?"fa fa-comment-o fa-lg":"icon-envelope-letter fa-lg"}></i>
                </div>
                <div>
                  <small className="text-muted" style={message.read?{fontSize:15}:{fontSize:15,fontWeight:'bold'}}>{message.task?message.task.title:'No task'}</small>
                  <small className="text-muted float-right mt-1" style={message.read?{}:{fontWeight:'bold'}}>{timestampToString(message.createdAt)}</small>
                </div>
                <div className="small text-muted text-truncate" style={message.read?{fontSize:14}:{fontSize:14,fontWeight:'bold'}}>{messageBodyToString(message.body)}
                </div>
              </div>
            </DropdownItem>
          )
        }
        <DropdownItem href="#/messages" className="text-center"><strong>View all messages</strong></DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
}

//all below is just redux storage
const mapStateToProps = ({messagesReducer, login }) => {
  const {topMessages, count} = messagesReducer;
  const {token} = login;
  return {messages:topMessages,count, token};
};

export default connect(mapStateToProps, {getTopMessages})(MessagesDropdown);
