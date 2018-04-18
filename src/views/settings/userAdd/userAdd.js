import React, { Component } from "react";
import { connect } from "react-redux";
import { addUser } from "../../../redux/actions";
import {isEmail} from "../../../helperFunctions";

class UserAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      language: "",
      name: "",
      surname: "",
      title_before: "",
      title_after: "",
      func: "",
      mobile: "",
      tel: "",
      fax: "",
      signature: "",
      street: "",
      city: "",
      zip: "",
      country: "",
      facebook: "",
      twitter: "",
      linkdin: "",
      google: "",
      image: "",
      userRole: this.props.userRoles[0].id,
      company: this.props.companies[0].id,
      image: null,
      imageURL: null,
      submitError:false
    };
  }

  submit(e) {
    e.preventDefault();
    this.setState({submitError:true});
    let body = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      detail_data: {
        name: this.state.name,
        surname: this.state.surname,
        title_before: this.state.title_before,
        title_after: this.state.title_after,
        function: this.state.func,
        mobile: this.state.mobile,
        tel: this.state.tel,
        fax: this.state.fax,
        signature: this.state.signature,
        street: this.state.street,
        city: this.state.city,
        zip: this.state.zip,
        country: this.state.country,
        facebook: this.state.facebook,
        twitter: this.state.twitter,
        linkdin: this.state.linkdin,
        google: this.state.google
      }
    };
    if(!isEmail(body.email)||
    body.username===''||
    body.password.length<8){
      return;
    }
    this.props.addUser(
      body,
      this.state.company,
      this.state.userRole,
      this.state.image,
      this.props.token
    );
    this.props.history.goBack();
  }
  render() {
    return (
      <div className="card">
        <h4 className="card-header">Add user</h4>
        <div className="card-body">
          <form
            onSubmit={(event, value) => {
              event.preventDefault();
            }}
          >
            <label htmlFor="avatar">Avatar upload </label>
            <label htmlFor="avatar" style={{ fontSize: 10 }}>
              Your image will be resized to 50x50 px
            </label>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <input
                type="file"
                accept="image/x-png,image/gif,image/jpeg,image/jpg"
                onChange={e => {
                  //check sufix,resize image, save to store
                  let value = e.target.files[0];
                  if (!value) {
                    return;
                  }

                  let extFile = value.name
                    .substr(value.name.lastIndexOf(".") + 1, value.name.length)
                    .toLowerCase();
                  if (
                    extFile == "gif" ||
                    extFile == "jpeg" ||
                    extFile == "png" ||
                    extFile == "jpg"
                  ) {
                    let reader = new FileReader();
                    let img = new Image();
                    let self = this;
                    reader.onloadend = () => {
                      img.onload = function() {
                        let canvas = document.createElement("canvas");
                        canvas.width = 50;
                        canvas.height = 50;
                        let ctx = canvas.getContext("2d");
                        ctx.drawImage(img, 0, 0, 50, 50);
                        let imageURL = canvas.toDataURL("image/png");
                        //converts it to file ready htmlFor upload
                        function dataURLtoFile(dataurl, filename) {
                          var arr = dataurl.split(","),
                            mime = arr[0].match(/:(.*?);/)[1],
                            bstr = atob(arr[1]),
                            n = bstr.length,
                            u8arr = new Uint8Array(n);
                          while (n--) {
                            u8arr[n] = bstr.charCodeAt(n);
                          }
                          return new File([u8arr], filename, { type: mime });
                        }
                        let image = dataURLtoFile(imageURL, value.name);
                        self.setState({
                          image,
                          imageURL
                        });
                      };
                      img.src = reader.result;
                    };
                    reader.readAsDataURL(value);
                  } else {
                    alert("Only jpg/jpeg and png files are allowed!");
                  }
                }}
              />
              {this.state.image && (
                <img
                  style={{ maxWidth: 50, maxHeight: 50 }}
                  src={this.state.imageURL}
                />
              )}
            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                className="form-control"
                id="username"
                value={this.state.username}
                onChange={target =>
                  this.setState({ username: target.target.value })
                }
                placeholder="Enter username"
              />
            {this.state.submitError && this.state.username===''&&<label htmlFor="username" style={{color:'red'}}>You must enter username</label>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                className="form-control"
                id="password"
                value={this.state.password}
                onChange={target =>
                  this.setState({ password: target.target.value })
                }
                placeholder="Enter password"
              />
            {this.state.password.length>0 && this.state.password.length<8 &&<label htmlFor="password" style={{color:'red'}}>Password must be at least 8 characters</label>}
            {this.state.submitError && this.state.password===''&&<label htmlFor="password" style={{color:'red'}}>You must enter users password</label>}
          </div>
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input
                className="form-control"
                id="email"
                value={this.state.email}
                onChange={target =>
                  this.setState({ email: target.target.value })
                }
                placeholder="Enter e-mail"
              />
              { this.state.email!==''&&!isEmail(this.state.email)&&<label htmlFor="email" style={{color:'red'}}>This e-mail address is not valid</label>}
              { this.state.submitError && this.state.email===''&&<label htmlFor="email" style={{color:'red'}}>You must enter e-mail address</label>}
            </div>
            <div className="form-group">
              <label htmlFor="language">Language</label>
              <input
                className="form-control"
                id="language"
                value={this.state.language}
                onChange={target =>
                  this.setState({ language: target.target.value })
                }
                placeholder="Enter language"
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                className="form-control"
                id="name"
                value={this.state.name}
                onChange={target =>
                  this.setState({ name: target.target.value })
                }
                placeholder="Enter name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="surname">Surname</label>
              <input
                className="form-control"
                id="surname"
                value={this.state.surname}
                onChange={target =>
                  this.setState({ surname: target.target.value })
                }
                placeholder="Enter surname"
              />
            </div>
            <div className="form-group">
              <label htmlFor="title_before">Title before name</label>
              <input
                className="form-control"
                id="title_before"
                value={this.state.title_before}
                onChange={target =>
                  this.setState({ title_before: target.target.value })
                }
                placeholder="Enter title before name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="title_after">Title after</label>
              <input
                className="form-control"
                id="title_after"
                value={this.state.title_after}
                onChange={target =>
                  this.setState({ title_after: target.target.value })
                }
                placeholder="Enter title after"
              />
            </div>
            <div className="form-group">
              <label htmlFor="func">Function</label>
              <input
                className="form-control"
                id="func"
                value={this.state.func}
                onChange={target =>
                  this.setState({ func: target.target.value })
                }
                placeholder="Enter users function"
              />
            </div>

            <div className="form-group">
              <label htmlFor="mobile">Mobile number</label>
              <input
                className="form-control"
                id="mobile"
                value={this.state.mobile}
                onChange={target =>
                  this.setState({ mobile: target.target.value })
                }
                placeholder="Enter mobile number"
              />
            </div>
            <div className="form-group">
              <label htmlFor="tel">Telephone number</label>
              <input
                className="form-control"
                id="tel"
                value={this.state.tel}
                onChange={target => this.setState({ tel: target.target.value })}
                placeholder="Enter telephone number"
              />
            </div>
            <div className="form-group">
              <label htmlFor="fax">Fax</label>
              <input
                className="form-control"
                id="fax"
                value={this.state.fax}
                onChange={target => this.setState({ fax: target.target.value })}
                placeholder="Enter fax"
              />
            </div>
            <div className="form-group">
              <label htmlFor="signature">Signature</label>
              <input
                className="form-control"
                id="signature"
                value={this.state.signature}
                onChange={target =>
                  this.setState({ signature: target.target.value })
                }
                placeholder="Enter signature"
              />
            </div>
            <div className="form-group">
              <label htmlFor="street">Street</label>
              <input
                className="form-control"
                id="street"
                value={this.state.street}
                onChange={target =>
                  this.setState({ street: target.target.value })
                }
                placeholder="Enter street"
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                className="form-control"
                id="city"
                value={this.state.city}
                onChange={target =>
                  this.setState({ city: target.target.value })
                }
                placeholder="Enter city"
              />
            </div>
            <div className="form-group">
              <label htmlFor="zip">ZIP</label>
              <input
                className="form-control"
                id="zip"
                value={this.state.zip}
                onChange={target => this.setState({ zip: target.target.value })}
                placeholder="Enter ZIP number"
              />
            </div>
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input
                className="form-control"
                id="country"
                value={this.state.country}
                onChange={target =>
                  this.setState({ country: target.target.value })
                }
                placeholder="Enter country"
              />
            </div>
            <div className="form-group">
              <label htmlFor="facebook">Facebook</label>
              <input
                className="form-control"
                id="facebook"
                value={this.state.facebook}
                onChange={target =>
                  this.setState({ facebook: target.target.value })
                }
                placeholder="Enter facebook"
              />
            </div>
            <div className="form-group">
              <label htmlFor="twitter">Twitter</label>
              <input
                className="form-control"
                id="twitter"
                value={this.state.twitter}
                onChange={target =>
                  this.setState({ twitter: target.target.value })
                }
                placeholder="Enter twitter"
              />
            </div>
            <div className="form-group">
              <label htmlFor="linkdin">Linkdin</label>
              <input
                className="form-control"
                id="linkdin"
                value={this.state.linkdin}
                onChange={target =>
                  this.setState({ linkdin: target.target.value })
                }
                placeholder="Enter linkdin"
              />
            </div>
            <div className="form-group">
              <label htmlFor="google">Google</label>
              <input
                className="form-control"
                id="google"
                value={this.state.google}
                onChange={target =>
                  this.setState({ google: target.target.value })
                }
                placeholder="Enter google"
              />
            </div>

            <div className="form-group">
              <label htmlFor="company">Company</label>
              <select
                value={this.state.company}
                id="company"
                onChange={value =>
                  this.setState({ company: value.target.value })
                }
                className="form-control"
              >
                {this.props.companies.map(opt => (
                  <option key={opt.id} value={opt.id}>
                    {opt.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                value={this.state.userRole}
                onChange={value =>
                  this.setState({ userRole: value.target.value })
                }
                id="role"
                className="form-control"
              >
                {this.props.userRoles.map(opt => (
                  <option key={opt.id} value={opt.id}>
                    {opt.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <button
                type="submit"
                className="btn btn-primary mr-2"
                onClick={this.submit.bind(this)}
              >
                Submit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => this.props.history.goBack()}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ companiesReducer, login, userRolesReducer }) => {
  const { companies } = companiesReducer;
  const { userRoles } = userRolesReducer;
  const { token } = login;
  return { companies, token, userRoles };
};

export default connect(mapStateToProps, { addUser })(UserAdd);
