import React, { Component } from "react";
import { connect } from "react-redux";
import { addProject } from "../../redux/actions";
import RichTextEditor from "react-rte";
import i18n from 'i18next';
import { Card, CardHeader, CardBody } from "reactstrap";

class ProjectAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: RichTextEditor.createValueFromString("", "html"),
      permissions: [],
      submitError: false
    };
  }

  submit() {
    this.setState({ submitError: true });
    let body = {
      title: this.state.title,
      description: this.state.description.toString("html")
    };
    if (body.title === "") {
      return;
    }
    this.props.addProject(body,this.props.history, this.props.token);
  }

  render() {
    return (
      <Card>

      <CardBody>

        <h2 className="h2">{i18n.t('addNewProject')}</h2>

        <div>
          <div style={{ marginTop: 15 }}>
            <div className="form-group">
              <label htmlFor="title" className="req input-label">{i18n.t('projectName')}</label>
              <input
                className="form-control"
                placeholder={i18n.t('enterProjectName')}
                value={this.state.title}
                onChange={target =>
                  this.setState({ title: target.target.value })
                }
              />
              {this.state.submitError &&
                this.state.title === "" && (
                  <label htmlFor="title" className="input-label" style={{ color: "red" }}>
                    {i18n.t('restrictionMustEnterTitle')}
                  </label>
                )}
            </div>
            <div className="form-group">
              <label htmlFor="description" className="input-label">{i18n.t('description')}</label>
              <RichTextEditor
                value={this.state.description}
                onChange={e => {
                  this.setState({ description: e });
                }}
                placeholder={i18n.t('enterDescription')}
                toolbarClassName="demo-toolbar"
                editorClassName="demo-editor"
              />
            </div>
            <button
              type="button"
              className="btn btn-danger btn-sm"
              style={{ color: "white" }}
              onClick={this.props.history.goBack}
            >
              {i18n.t('cancel')}
            </button>

            <button
              type="button"
              className="btn btn-primary btn-sm"
              style={{ color: "white", marginLeft: 5 }}
              onClick={this.submit.bind(this)}
            >
              {i18n.t('saved')}
            </button>
          </div>
        </div>

      </CardBody>
      </Card>

    );
  }
}

const mapStateToProps = ({ login }) => {
  const { token } = login;
  return { token };
};

export default connect(mapStateToProps, { addProject })(ProjectAdd);
