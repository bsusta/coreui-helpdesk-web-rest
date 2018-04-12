import React, { Component } from "react";
import { connect } from "react-redux";
import { addUser } from "../../../redux/actions";

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
      imageURL: null
    };
  }

  submit(e) {
    e.preventDefault();
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
      <div class="card">
        <h4 class="card-header">Add user</h4>
        <div class="card-body">
          <form
            onSubmit={(event, value) => {
              event.preventDefault();
            }}
          >
            <label for="avatar">Avatar upload </label>
            <label for="avatar" style={{ fontSize: 10 }}>
              Your image will be resized to 50x50 px
            </label>
            <div class="form-group" style={{ marginBottom: 0 }}>
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
                        //converts it to file ready for upload
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
            <div class="form-group">
              <label for="username">Username</label>
              <input
                class="form-control"
                id="username"
                value={this.state.username}
                onChange={target =>
                  this.setState({ username: target.target.value })
                }
                placeholder="Enter username"
              />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input
                class="form-control"
                id="password"
                value={this.state.password}
                onChange={target =>
                  this.setState({ password: target.target.value })
                }
                placeholder="Enter password"
              />
            </div>
            <div class="form-group">
              <label for="email">E-mail</label>
              <input
                class="form-control"
                id="email"
                value={this.state.email}
                onChange={target =>
                  this.setState({ email: target.target.value })
                }
                placeholder="Enter e-mail"
              />
            </div>
            <div class="form-group">
              <label for="language">Language</label>
              <input
                class="form-control"
                id="language"
                value={this.state.language}
                onChange={target =>
                  this.setState({ language: target.target.value })
                }
                placeholder="Enter language"
              />
            </div>
            <div class="form-group">
              <label for="name">Name</label>
              <input
                class="form-control"
                id="name"
                value={this.state.name}
                onChange={target =>
                  this.setState({ name: target.target.value })
                }
                placeholder="Enter name"
              />
            </div>
            <div class="form-group">
              <label for="surname">Surname</label>
              <input
                class="form-control"
                id="surname"
                value={this.state.surname}
                onChange={target =>
                  this.setState({ surname: target.target.value })
                }
                placeholder="Enter surname"
              />
            </div>
            <div class="form-group">
              <label for="title_before">Title before name</label>
              <input
                class="form-control"
                id="title_before"
                value={this.state.title_before}
                onChange={target =>
                  this.setState({ title_before: target.target.value })
                }
                placeholder="Enter title before name"
              />
            </div>
            <div class="form-group">
              <label for="title_after">Title after</label>
              <input
                class="form-control"
                id="title_after"
                value={this.state.title_after}
                onChange={target =>
                  this.setState({ title_after: target.target.value })
                }
                placeholder="Enter title after"
              />
            </div>
            <div class="form-group">
              <label for="func">Function</label>
              <input
                class="form-control"
                id="func"
                value={this.state.func}
                onChange={target =>
                  this.setState({ func: target.target.value })
                }
                placeholder="Enter users function"
              />
            </div>

            <div class="form-group">
              <label for="mobile">Mobile number</label>
              <input
                class="form-control"
                id="mobile"
                value={this.state.mobile}
                onChange={target =>
                  this.setState({ mobile: target.target.value })
                }
                placeholder="Enter mobile number"
              />
            </div>
            <div class="form-group">
              <label for="tel">Telephone number</label>
              <input
                class="form-control"
                id="tel"
                value={this.state.tel}
                onChange={target => this.setState({ tel: target.target.value })}
                placeholder="Enter telephone number"
              />
            </div>
            <div class="form-group">
              <label for="fax">Fax</label>
              <input
                class="form-control"
                id="fax"
                value={this.state.fax}
                onChange={target => this.setState({ fax: target.target.value })}
                placeholder="Enter fax"
              />
            </div>
            <div class="form-group">
              <label for="signature">Signature</label>
              <input
                class="form-control"
                id="signature"
                value={this.state.signature}
                onChange={target =>
                  this.setState({ signature: target.target.value })
                }
                placeholder="Enter signature"
              />
            </div>
            <div class="form-group">
              <label for="street">Street</label>
              <input
                class="form-control"
                id="street"
                value={this.state.street}
                onChange={target =>
                  this.setState({ street: target.target.value })
                }
                placeholder="Enter street"
              />
            </div>
            <div class="form-group">
              <label for="city">City</label>
              <input
                class="form-control"
                id="city"
                value={this.state.city}
                onChange={target =>
                  this.setState({ city: target.target.value })
                }
                placeholder="Enter city"
              />
            </div>
            <div class="form-group">
              <label for="zip">ZIP</label>
              <input
                class="form-control"
                id="zip"
                value={this.state.zip}
                onChange={target => this.setState({ zip: target.target.value })}
                placeholder="Enter ZIP number"
              />
            </div>
            <div class="form-group">
              <label for="country">Country</label>
              <input
                class="form-control"
                id="country"
                value={this.state.country}
                onChange={target =>
                  this.setState({ country: target.target.value })
                }
                placeholder="Enter country"
              />
            </div>
            <div class="form-group">
              <label for="facebook">Facebook</label>
              <input
                class="form-control"
                id="facebook"
                value={this.state.facebook}
                onChange={target =>
                  this.setState({ facebook: target.target.value })
                }
                placeholder="Enter facebook"
              />
            </div>
            <div class="form-group">
              <label for="twitter">Twitter</label>
              <input
                class="form-control"
                id="twitter"
                value={this.state.twitter}
                onChange={target =>
                  this.setState({ twitter: target.target.value })
                }
                placeholder="Enter twitter"
              />
            </div>
            <div class="form-group">
              <label for="linkdin">Linkdin</label>
              <input
                class="form-control"
                id="linkdin"
                value={this.state.linkdin}
                onChange={target =>
                  this.setState({ linkdin: target.target.value })
                }
                placeholder="Enter linkdin"
              />
            </div>
            <div class="form-group">
              <label for="google">Google</label>
              <input
                class="form-control"
                id="google"
                value={this.state.google}
                onChange={target =>
                  this.setState({ google: target.target.value })
                }
                placeholder="Enter google"
              />
            </div>

            <div class="form-group">
              <label for="company">Company</label>
              <select
                value={this.state.company}
                id="company"
                onChange={value =>
                  this.setState({ company: value.target.value })
                }
                class="form-control"
              >
                {this.props.companies.map(opt => (
                  <option key={opt.id} value={opt.id}>
                    {opt.title}
                  </option>
                ))}
              </select>
            </div>
            <div class="form-group">
              <label for="role">Role</label>
              <select
                value={this.state.userRole}
                onChange={value =>
                  this.setState({ userRole: value.target.value })
                }
                id="role"
                class="form-control"
              >
                {this.props.userRoles.map(opt => (
                  <option key={opt.id} value={opt.id}>
                    {opt.title}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              class="btn btn-primary"
              onClick={this.submit.bind(this)}
            >
              Submit
            </button>
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
