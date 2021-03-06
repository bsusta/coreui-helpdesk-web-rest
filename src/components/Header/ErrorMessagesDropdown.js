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
import { timestampToString } from "../../helperFunctions";
import {clearErrors} from '../../redux/actions';

class ErrorMessages extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      showAll:false,
    };
  }

  render() {
    return (
      <Dropdown nav className="d-md-down-none noDots" isOpen={this.state.dropdownOpen} toggle={()=>this.setState({ dropdownOpen: !this.state.dropdownOpen })}>
        <DropdownToggle className="headerIcons">
          <i className="fa fa-exclamation-triangle colorRed"/><Badge pill color="red" className="colorRed">{this.props.errorMessages.length}</Badge>
        </DropdownToggle>
        <DropdownMenu right className="dropdown-menu"  style={{width:450,overflowY:'scroll',overflowX:'visible',maxHeight:'80vh'}}>
          <DropdownItem header tag="div"><strong>Some error(s) has occured</strong></DropdownItem>
            <div className="row" style={{color:'#536c79', margin:0}}>
              <button
                type="button"
                className="btn btn-link"
                style={{ width:'50%' }}
                onClick={()=>this.setState({showAll:!this.state.showAll})}
                >
                {!this.state.showAll?'Show':'Hide'} all
              </button>
              <button
                type="button"
                className="btn btn-link"
                style={{ width:'50%' }}
                onClick={this.props.clearErrors}
                >
                Clear all
              </button>
            </div>

          {
            //switches between small and large message window
            (this.state.showAll?this.props.errorMessages:this.props.errorMessages.slice(0,5)).map((message, key)=>
                <div className= "list-group-item" key={Math.random()} style={{fontSize:14,fontWeight:'bold',color:'red',backgroundColor:key===0?'#d3d3d3':'white', border:'none'}}>
                  <div>
                    {message.message}
                  </div>
                  <small className="text-muted mt-1">{timestampToString(message.date)}</small>
                </div>
          )
        }
      </DropdownMenu>
    </Dropdown>
  );

}
}

//all below is just redux storage
const mapStateToProps = ({errorsReducer}) => {
  const {errorMessages}=errorsReducer;
  return {errorMessages};
};

export default connect(mapStateToProps, {clearErrors})(ErrorMessages);
