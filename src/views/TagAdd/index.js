import React, { Component } from "react";
import { connect } from 'react-redux';
import { addTag } from '../../redux/actions';
import { SketchPicker } from 'react-color';

class TagAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      public: false,
      color:'FFF'
    };
  }

  submit(){
    this.props.addTag({
      title:this.state.title,
      color:this.state.color,
      public:this.state.public
    },this.props.token);
    this.props.history.goBack();
  }

  render() {
    return (
      <div style={{ paddingLeft: 20, paddingRight: 20 }}>
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
            Add new tag
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

const mapStateToProps = ({ login }) => {
  const {token} = login;
  return {token};
};

export default connect(mapStateToProps, {addTag})(TagAdd);
