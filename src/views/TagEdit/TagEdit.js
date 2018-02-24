import React, { Component } from "react";
import { connect } from 'react-redux';
import { editTag, deleteTag } from '../../redux/actions';
import { SketchPicker } from 'react-color';

class TagEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.tag.title?this.props.tag.title:'',
      public: this.props.tag.public?true:false,
      color:this.props.tag.color
    };
  }

  deleteTag(e){
    e.preventDefault();
    if (confirm("Are you sure you wish to delete tag named '"+this.state.title+"'?")) {
        this.props.deleteTag(this.props.tag.id,this.props.token);
    } else {
        return;
    }
    this.props.history.goBack();
  }

  submit(){
    this.props.editTag({
      title:this.state.title,
      color:this.state.color,
      public:this.state.public
    },this.props.tag.id,this.props.token);
    this.props.history.goBack();
  }

  render() {
    return (
      <div style={{ paddingLeft: 20, paddingRight: 20 }}>
        <h2 style={{ paddingTop: 20, marginBottom: 20 }}>
          Editing {this.state.title}
        </h2>

        <div>
          <button
            type="button"
            class="btn btn-danger btn-sm"
            style={{ color: "white" }}
            onClick={this.props.history.goBack}
          >
            Close
          </button>
          <button
            type="button"
            class="btn btn-primary btn-sm"
            style={{ color: "white", marginLeft: 5 }}
            onClick={this.submit.bind(this)}
          >
            Save changes
          </button>
          <button
            type="button"
            class="btn btn-danger btn-sm"
            style={{ color: "white" }}
            onClick={this.deleteTag.bind(this)}
          >
            Delete
          </button>
          <form style={{ marginTop: 15 }}>
            <div class="form-group">
              <p>
                <label class="switch switch-3d switch-primary">
                  <input
                    type="checkbox"
                    class="switch-input"
                    checked={this.state.public}
                    onChange={() =>
                      this.setState({ public: !this.state.public })
                    }
                  />
                  <span class="switch-label" />
                  <span class="switch-handle" />
                </label>
                <label style={{ paddingLeft: 10 }}>
                  {this.state.public ? "Public" : "Private"}
                </label>
              </p>
              <label for="title">Tag name</label>
              <input
                class="form-control"
                placeholder="Enter tag title"
                value={this.state.title}
                onChange={target =>
                  this.setState({ title: target.target.value })
                }
              />
            </div>
            <div class="form-group">
              <label for="color">Color</label>
              <SketchPicker
                id="color"
                color={ this.state.color }
                onChangeComplete={ (value) => this.setState({color:value.hex})}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({tagsReducer, login }) => {
  const {tag} = tagsReducer;
  const {token} = login;
  return {tag,token};
};

export default connect(mapStateToProps, {editTag, deleteTag})(TagEdit);
