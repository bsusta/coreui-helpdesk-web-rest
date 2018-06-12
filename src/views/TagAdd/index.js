import React, { Component } from "react";
import { connect } from "react-redux";
import { addTag } from "../../redux/actions";
import { SketchPicker } from "react-color";
import i18n from 'i18next';
import { Card, CardHeader, CardBody } from "reactstrap";

class TagAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      public: false,
      color: "FFF",
      submitError: false
    };
  }

  submit() {
    this.setState({ submitError: true });
    let body = {
      title: this.state.title,
      color: this.state.color,
      public: this.state.public
    };
    if (body.title === "") {
      return;
    }
    this.props.addTag(body, this.props.token);
    this.props.history.goBack();
  }

  render() {
      let ACL = this.props.user.user_role.acl;
    return (
      <Card>
        <CardHeader>
        <button className="btn btn-link" onClick={this.props.history.goBack}>
            <i className="fa fa-angle-left" /> {i18n.t('goBack')}
          </button>

        <button
            type="button"
            className="btn btn-link"

            onClick={this.props.history.goBack}
          >
            {i18n.t('cancel')}
          </button>
          <button
            type="button"
            className="btn btn-link"

            onClick={this.submit.bind(this)}
          >
            {i18n.t('Save')}
          </button>

        </CardHeader>
      <CardBody>


        <h2 style={{ paddingTop: 20, marginBottom: 20 }}>{i18n.t('addNewTag')}</h2>
        <div>
          <form style={{ marginTop: 15 }}>
            <div className="form-group">
              {
                ACL.includes('share_tags') && <p>
                <label className="switch switch-3d switch-primary">
                  <input
                      type="checkbox"
                      className="switch-input"
                      checked={this.state.public}
                      onChange={() =>
                        this.setState({ public: !this.state.public })
                      }
                      />
                  <span className="switch-label" />
                  <span className="switch-handle" />
                </label>
                <label style={{ paddingLeft: 10 }}>
                  {this.state.public ? i18n.t('public') : i18n.t('private')}
                </label>
              </p>
              }
              <label htmlFor="title" className="req">{i18n.t('name')}</label>
              <input
                className="form-control"
                placeholder={i18n.t('enterName')}
                value={this.state.title}
                onChange={target =>
                  this.setState({ title: target.target.value })
                }
              />
              {this.state.submitError &&
                this.state.title === "" && (
                  <label htmlFor="title" style={{ color: "red" }}>
                    You must enter title
                  </label>
                )}
            </div>
            <div className="form-group">
              <label htmlFor="color" className="req">{i18n.t('color')}</label>
              <SketchPicker
                id="color"
                color={this.state.color}
                onChangeComplete={value => this.setState({ color: value.hex })}
              />
            </div>
          </form>

        </div>

      </CardBody>
      </Card>
     );
  }
}

const mapStateToProps = ({ login }) => {
  const { token, user } = login;
  return { token, user };
};

export default connect(mapStateToProps, { addTag })(TagAdd);
