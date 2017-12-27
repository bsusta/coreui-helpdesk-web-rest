import React, {Component} from 'react';
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Dropdown,
  Progress,
} from 'reactstrap';

const mockData=[
  {id:0,date:'12.11.2018',taskName:'Vymena Klavesnic',message:'Marian Sint pridal komentar k ulohe',comment:true},
  {id:1,date:'11.11.2018',taskName:'Vymena PC',message:'Potreba vymenit PC na 14 poschodi',comment:false},
  {id:2,date:'10.10.2018',taskName:'Vymena Klavesnic',message:'Potreba vymenit klavesnice na 4 poschodi',comment:false},
  {id:3,date:'10.7.2018',taskName:'Opravit server',message:'Nutne opravte PC na 1 poschodi',comment:false},
  {id:4,date:'10.4.2018',taskName:'Implementovat popup',message:'Bez implementovaneho popupu sa nevieme pohnut dalej, vyriešte tento problém čím skor.',comment:false},
  {id:5,date:'22.2.2018',taskName:'Zmenit tasklist',message:'Zmente vzhlad tasklistu, nie je vobec predladny neda sa prepnut z nastaveni priamo d tasku...',comment:false},
]

class HeaderDropdown extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
    };
  }

  render() {
    return (
      <Dropdown nav className="d-md-down-none" isOpen={this.state.dropdownOpen} toggle={()=>this.setState({ dropdownOpen: !this.state.dropdownOpen })}>
        <DropdownToggle nav>
          <i className="icon-envelope-letter"></i><Badge pill color="info">{mockData.length}</Badge>
        </DropdownToggle>
        <DropdownMenu right className="dropdown-menu-lg">
          <DropdownItem header tag="div"><strong>You have {mockData.length} messages</strong></DropdownItem>
          {
            mockData.map((message)=>
            <DropdownItem href={"#/messages/"+message.id} key={message.id}>
              <div className="message">
                <div className=" float-left">
                    <i className={message.comment?"fa fa-comment-o fa-lg":"icon-envelope-letter fa-lg"}></i>
                </div>
                <div>
                  <small className="text-muted" style={{fontSize:15}}>{message.taskName}</small>
                  <small className="text-muted float-right mt-1">{message.date}</small>
                </div>
                <div className="small text-muted text-truncate" style={{fontSize:16}}>{message.message}
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

export default HeaderDropdown;
