import React, { Component } from "react";
import { connect } from "react-redux";
import { editTag, deleteTag } from "../../redux/actions";
import { SketchPicker } from "react-color";
import { Card, CardHeader } from "reactstrap";
import i18n from 'i18next';

class TagEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.tag.title ? this.props.tag.title : "",
      public: this.props.tag.public ? true : false,
      color: this.props.tag.color,
      submitError: false
    };
  }

  deleteTag(e) {
    e.preventDefault();
    if (
      confirm(
        i18n.t('deleteTagMessage') + this.state.title + "?"
      )
    ) {
      this.props.deleteTag(this.props.tag.id, this.props.token);
    } else {
      return;
    }
    this.props.history.goBack();
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
    this.props.editTag(body, this.props.tag.id, this.props.token);
    this.props.history.goBack();
  }

  render() {
    return (
      <Card>
        <CardHeader>
          <button className="btn btn-link" onClick={this.props.history.goBack}>
            <i className="fa fa-angle-left" /> {i18n.t('goBack')}
          </button>

          <button
            type="button"
            className="btn btn-link"
            onClick={this.submit.bind(this)}
          >
            {i18n.t('saved')}
          </button>
          <button
            type="button"
            className="btn btn-link"
            onClick={this.deleteTag.bind(this)}
          >
            {i18n.t('delete')}
          </button>
        </CardHeader>
        <div style={{ paddingLeft: 20, paddingRight: 20 }}>
          <h2 style={{ paddingTop: 20, marginBottom: 20 }}>
            {i18n.t('editing')} {this.state.title}
          </h2>

          <div>
            <form style={{ marginTop: 15 }}>
              <div className="form-group">
                <p>
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
                      {i18n.t('restrictionMustEnterTitle')}
                    </label>
                  )}
              </div>
              <div className="form-group">
                <label htmlFor="color" className="req">{i18n.t('color')}</label>
                <SketchPicker
                  id="color"
                  color={this.state.color}
                  onChangeComplete={value =>
                    this.setState({ color: value.hex })
                  }
                />
              </div>
            </form>
          </div>
        </div>
      </Card>
    );
  }
}

const mapStateToProps = ({ tagsReducer, login }) => {
  const { tag } = tagsReducer;
  const { token } = login;
  return { tag, token };
};

export default connect(mapStateToProps, { editTag, deleteTag })(TagEdit);
