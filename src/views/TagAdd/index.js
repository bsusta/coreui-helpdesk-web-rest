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
      color:'FFF',
      submitError:false
    };
  }

  submit(){
    this.setState({submitError:true});
    let body ={
      title:this.state.title,
      color:this.state.color,
      public:this.state.public}
      if(body.title===''){
        return;
      }
    this.props.addTag(body,this.props.token);
    this.props.history.goBack();
  }

  render() {
    return (
      <div style={{ paddingLeft: 20, paddingRight: 20 }}>
        <div>
          <button
            type="button"
            className="btn btn-danger btn-sm"
            style={{ color: "white" }}
            onClick={this.props.history.goBack}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            style={{ color: "white", marginLeft: 5 }}
            onClick={this.submit.bind(this)}
          >
            Add new tag
          </button>
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
                  {this.state.public ? "Public" : "Private"}
                </label>
              </p>
              <label htmlFor="title">Tag name</label>
              <input
                className="form-control"
                placeholder="Enter tag title"
                value={this.state.title}
                onChange={target =>
                  this.setState({ title: target.target.value })
                }
              />
              {this.state.submitError && this.state.title===''&&<label htmlFor="title" style={{color:'red'}}>You must enter title</label>}
            </div>
            <div className="form-group">
              <label htmlFor="color">Color</label>
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
