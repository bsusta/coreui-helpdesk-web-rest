import React, { Component } from "react";
import { connect } from "react-redux";
import { editUser } from "../../../redux/actions";
import {isEmail,areObjectsSame} from "../../../helperFunctions";

class UserEdit extends Component {
  constructor(props) {
    super(props);
    const user = this.props.user;
    this.state = {
      is_active: user.is_active,
      username: user.username ? user.username : "",
      password: "",
      email: user.email ? user.email : "",
      language: user.language ? user.language : "",
      name: user.detailData.name ? user.detailData.name : "",
      surname: user.detailData.surname ? user.detailData.surname : "",
      title_before: user.detailData.title_before
        ? user.detailData.title_before
        : "",
      title_after: user.detailData.title_after
        ? user.detailData.title_after
        : "",
      func: user.detailData.function ? user.detailData.function : "",
      mobile: user.detailData.mobile ? user.detailData.mobile : "",
      tel: user.detailData.tel ? user.detailData.tel : "",
      fax: user.detailData.fax ? user.detailData.fax : "",
      signature: user.detailData.signature ? user.detailData.signature : "",
      street: user.detailData.street ? user.detailData.street : "",
      city: user.detailData.city ? user.detailData.city : "",
      zip: user.detailData.zip ? user.detailData.zip : "",
      country: user.detailData.country ? user.detailData.country : "",
      facebook: user.detailData.facebook ? user.detailData.facebook : "",
      twitter: user.detailData.twitter ? user.detailData.twitter : "",
      linkdin: user.detailData.linkdin ? user.detailData.linkdin : "",
      google: user.detailData.google ? user.detailData.google : "",
      image: null,
      userRole: user.user_role.id ? user.user_role.id : "",
      company: user.company.id ? user.company.id : "",
      imageURL: null,
      submitError:false,
      changed:false
    };
    this.compareChanges.bind(this);
  }
  //we compare if there have been made any changes to the user in comparison to the original props, if yes we trigger warning for the user
  compareChanges(change,val){
    let newState = {...this.state};
    newState.submitError=undefined;
    newState.changed=undefined;
    newState.image=undefined;
    newState.imageURL=undefined;
    newState[change]=val;

    const user = this.props.user;
    let originalState = {
      is_active: user.is_active,
      username: user.username ? user.username : "",
      password: "",
      email: user.email ? user.email : "",
      language: user.language ? user.language : "",
      name: user.detailData.name ? user.detailData.name : "",
      surname: user.detailData.surname ? user.detailData.surname : "",
      title_before: user.detailData.title_before
        ? user.detailData.title_before
        : "",
      title_after: user.detailData.title_after
        ? user.detailData.title_after
        : "",
      func: user.detailData.function ? user.detailData.function : "",
      mobile: user.detailData.mobile ? user.detailData.mobile : "",
      tel: user.detailData.tel ? user.detailData.tel : "",
      fax: user.detailData.fax ? user.detailData.fax : "",
      signature: user.detailData.signature ? user.detailData.signature : "",
      street: user.detailData.street ? user.detailData.street : "",
      city: user.detailData.city ? user.detailData.city : "",
      zip: user.detailData.zip ? user.detailData.zip : "",
      country: user.detailData.country ? user.detailData.country : "",
      facebook: user.detailData.facebook ? user.detailData.facebook : "",
      twitter: user.detailData.twitter ? user.detailData.twitter : "",
      linkdin: user.detailData.linkdin ? user.detailData.linkdin : "",
      google: user.detailData.google ? user.detailData.google : "",
      userRole: user.user_role.id ? user.user_role.id : "",
      company: user.company.id ? user.company.id : ""
    };
    this.setState({changed:!areObjectsSame(newState,originalState)});
  }


  submit(e) {
    e.preventDefault();
    this.setState({submitError:true});
    let body = {
      username: this.state.username,
      email: this.state.email,
      language: this.state.language === "" ? "null" : this.state.language,
      detail_data: {
        name: this.state.name === "" ? "null" : this.state.name,
        surname: this.state.surname === "" ? "null" : this.state.surname,
        title_before:
          this.state.title_before === "" ? "null" : this.state.title_before,
        title_after:
          this.state.title_after === "" ? "null" : this.state.title_after,
        'function': this.state.func === "" ? "null" : this.state.func,
        mobile: this.state.mobile === "" ? "null" : this.state.mobile,
        tel: this.state.tel === "" ? "null" : this.state.tel,
        fax: this.state.fax === "" ? "null" : this.state.fax,
        signature: this.state.signature === "" ? "null" : this.state.signature,
        street: this.state.street === "" ? "null" : this.state.street,
        city: this.state.city === "" ? "null" : this.state.city,
        zip: this.state.zip === "" ? "null" : this.state.zip,
        country: this.state.country === "" ? "null" : this.state.country,
        facebook: this.state.facebook === "" ? "null" : this.state.facebook,
        twitter: this.state.twitter === "" ? "null" : this.state.twitter,
        linkdin: this.state.linkdin === "" ? "null" : this.state.linkdin,
        google: this.state.google === "" ? "null" : this.state.google
      }
    };
    if (this.state.password !== "") {
      body["password"] = this.state.password;
    }
    if(!isEmail(body.email)||
    body.username===''||
    (body.password&&body.password.length<8)){
      return;
    }

    this.props.editUser(
      body,
      this.state.company,
      this.state.userRole,
      this.props.user.id,
      this.state.is_active,
      this.state.image,
      this.props.token
    );
    this.props.history.goBack();
  }
  render() {
    return (
      <div class="card">
        <h4 class="card-header">Edit user</h4>
        <div class="card-body" style={{border:this.state.changed?'1px solid red':null}}>
          <form
            onSubmit={(event, value) => {
              event.preventDefault();
              this.props.history.goBack();
            }}
          >
            <div class="form-check">
              <label class="form-check-label">
                <input
                  type="checkbox"
                  class="form-check-input"
                  checked={this.state.is_active}
                  onChange={() =>{
                    this.compareChanges('is_active',!this.state.is_active);
                    this.setState({ is_active: !this.state.is_active });
                  }
                  }
                />
                Active
              </label>
            </div>

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
                        this.compareChanges('image',image);
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
              {!this.state.image &&
                this.props.user.image && (
                  <img
                    style={{ maxWidth: 50, maxHeight: 50 }}
                    src={this.props.user.image}
                  />
                )}
            </div>

            <div class="form-group">
              <label for="username">Username</label>
              <input
                class="form-control"
                id="username"
                value={this.state.username}
                onChange={target =>{
                  this.compareChanges('username', target.target.value);
                  this.setState({ username: target.target.value })}
                }
                placeholder="Enter username"
              />
              {this.state.submitError && this.state.username===''&&<label for="username" style={{color:'red'}}>You must enter username</label>}
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
              {this.state.password.length>0 && this.state.password.length<8 &&<label for="password" style={{color:'red'}}>Password must be at least 8 characters</label>}
            </div>
            <div class="form-group">
              <label for="email">E-mail</label>
              <input
                class="form-control"
                id="email"
                value={this.state.email}
                onChange={target =>{
                  this.compareChanges('email', target.target.value);
                  this.setState({ email: target.target.value })}
                }
                placeholder="Enter e-mail"
              />
              { this.state.email!==''&&!isEmail(this.state.email)&&<label for="email" style={{color:'red'}}>This e-mail address is not valid</label>}
              { this.state.submitError && this.state.email===''&&<label for="email" style={{color:'red'}}>You must enter e-mail address</label>}
            </div>

            <div class="form-group">
              <label for="language">Language</label>
              <input
                class="form-control"
                id="language"
                value={this.state.language}
                onChange={target =>{
                  this.compareChanges('language', target.target.value);
                  this.setState({ language: target.target.value })}
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
                onChange={target =>{
                  this.compareChanges('email', target.target.value);
                  this.setState({ email: target.target.value })}
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
                onChange={target =>{
                  this.compareChanges('surname', target.target.value);
                  this.setState({ surname: target.target.value })}
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
                onChange={target =>{
                  this.compareChanges('title_before', target.target.value);
                  this.setState({ title_before: target.target.value })}
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
                onChange={target =>{
                  this.compareChanges('title_after', target.target.value);
                  this.setState({ title_after: target.target.value })}
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
                onChange={target =>{
                  this.compareChanges('func', target.target.value);
                  this.setState({ func: target.target.value })}
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
                onChange={target =>{
                  this.compareChanges('mobile', target.target.value);
                  this.setState({ mobile: target.target.value })}
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
                onChange={target =>{
                  this.compareChanges('tel', target.target.value);
                  this.setState({ tel: target.target.value })}
                }
                placeholder="Enter telephone number"
              />
            </div>
            <div class="form-group">
              <label for="fax">Fax</label>
              <input
                class="form-control"
                id="fax"
                value={this.state.fax}
                onChange={target =>{
                  this.compareChanges('fax', target.target.value);
                  this.setState({ fax: target.target.value })}
                }
                placeholder="Enter fax"
              />
            </div>
            <div class="form-group">
              <label for="signature">Signature</label>
              <input
                class="form-control"
                id="signature"
                value={this.state.signature}
                onChange={target =>{
                  this.compareChanges('signature', target.target.value);
                  this.setState({ signature: target.target.value })}
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
                onChange={target =>{
                  this.compareChanges('street', target.target.value);
                  this.setState({ street: target.target.value })}
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
                onChange={target =>{
                  this.compareChanges('city', target.target.value);
                  this.setState({ city: target.target.value })}
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
                onChange={target =>{
                  this.compareChanges('zip', target.target.value);
                  this.setState({ zip: target.target.value })}
                }
                placeholder="Enter ZIP number"
              />
            </div>
            <div class="form-group">
              <label for="country">Country</label>
              <input
                class="form-control"
                id="country"
                value={this.state.country}
                onChange={target =>{
                  this.compareChanges('country', target.target.value);
                  this.setState({ country: target.target.value })}
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
                onChange={target =>{
                  this.compareChanges('facebook', target.target.value);
                  this.setState({ facebook: target.target.value })}
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
                onChange={target =>{
                  this.compareChanges('twitter', target.target.value);
                  this.setState({ twitter: target.target.value })}
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
                onChange={target =>{
                  this.compareChanges('linkdin', target.target.value);
                  this.setState({ linkdin: target.target.value })}
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
                onChange={target =>{
                  this.compareChanges('google', target.target.value);
                  this.setState({ google: target.target.value })}
                }
                placeholder="Enter google"
              />
            </div>

            <div class="form-group">
              <label for="company">Company</label>
              <select
                id="company"
                value={this.state.company}
                onChange={target =>{
                  this.compareChanges('company', target.target.value);
                  this.setState({ company: target.target.value })}
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
                onChange={target =>{
                  this.compareChanges('userRole', target.target.value);
                  this.setState({ userRole: target.target.value })}
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

const mapStateToProps = ({
  companiesReducer,
  login,
  userRolesReducer,
  usersReducer
}) => {
  const { companies } = companiesReducer;
  const { userRoles } = userRolesReducer;
  const { user } = usersReducer;
  const { token } = login;
  return { companies, token, userRoles, user };
};

export default connect(mapStateToProps, { editUser })(UserEdit);
