import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, CardHeader } from "reactstrap";
import i18n from 'i18next';

class ProjectInfo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card>
        <CardHeader>
          <button className="btn btn-link" onClick={this.props.history.goBack}>
            <i className="fa fa-angle-left" /> {i18n.t('goBack')}
          </button>
          {this.props.project.canEdit && (
            <button
              type="button"
              className="btn btn btn-link"
              onClick={() =>
                this.props.history.push(
                  "/project/edit/" + this.props.project.id
                )
              }
            >
              Edit
            </button>
          )}
        </CardHeader>
        <div style={{ paddingLeft: 20, paddingRight: 20 }}>
          <h2 className="h2">
            {" "}
            {this.props.project.title}
          </h2>

          <div style={{ marginTop: 10 }}>
            <p>
              Status: {this.props.project.is_active ? i18n.t('activated') : i18n.t('archived')}
            </p>

            <div
              className="card-text"
              dangerouslySetInnerHTML={{
                __html: this.props.project.description
                  ? this.props.project.description
                  : "<p/>"
              }}
            />
          </div>
        </div>
      </Card>
    );
  }
}

const mapStateToProps = ({ projectsReducer }) => {
  const { project } = projectsReducer;
  return { project };
};

export default connect(mapStateToProps, {})(ProjectInfo);
