import React, { Component } from "react";
import { connect } from "react-redux";
import { addUnit } from "../../../redux/actions";
import i18n from 'i18next';

class UnitAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      shortcut: "",
      submitError:false
    };
  }

  //gets the state and send API request to add newly defined unit
  submit(e) {
    e.preventDefault();
    this.setState({submitError:true});
    let body={
      title:this.state.title,
      shortcut:this.state.shortcut
    }
    if(body.title===''||body.shortcut===''){
      return;
    }

    this.props.addUnit(
      body,
      this.props.token
    );
    this.props.history.goBack();
  }

  render() {
    return (
      <div className="card">
        <h4 className="card-header">{i18n.t('addUnit')}</h4>
        <div className="card-body">
          <form
            onSubmit={(event, value) => {
              event.preventDefault();
              this.props.history.goBack();
            }}
          >
            <div className="form-group">
              <label htmlFor="title" className="req">{i18n.t('title')}</label>
              <input
                className="form-control"
                id="title"
                placeholder={i18n.t('enterTitle')}
                value={this.state.title}
                onChange={value => this.setState({ title: value.target.value })}
              />
            {this.state.submitError && this.state.title===''&&<label htmlFor="title" style={{color:'red'}}>{i18n.t('restrictionMustEnterTitle')}</label>}
            </div>


            <div className="form-group">
              <label htmlFor="shortcut" className="req">{i18n.t('shortcut')}</label>
              <input
                className="form-control"
                id="shortcut"
                placeholder={i18n.t('enterShortcut')}
                value={this.state.shortcut}
                onChange={value =>
                  this.setState({ shortcut: value.target.value })
                }
              />
            {this.state.submitError && this.state.shortcut===''&&<label htmlFor="shortcut" style={{color:'red'}}>{i18n.t('restrictionMustEnterShortcut')}</label>}
            </div>

            <div className="form-group">
              <button
                type="submit"
                className="btn btn-primary mr-2"
                onClick={this.submit.bind(this)}
              >
                {i18n.t('submit')}
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => this.props.history.goBack()}
              >
                {i18n.t('cancel')}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ login }) => {
  const { token } = login;
  return { token };
};

export default connect(mapStateToProps, { addUnit })(UnitAdd);
