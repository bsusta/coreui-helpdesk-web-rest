import React, { Component } from "react";
import { connect } from "react-redux";
import { editProfile } from "../../redux/actions";
import {isEmail,areObjectsSame} from "../../helperFunctions";
import i18n from 'i18next';
const languages=[{id:'en',name:'English'},{id:'sk',name:'Slovensky'}];

class UserEdit extends Component {
  constructor(props) {
    super(props);
    const user = this.props.user;
    this.state = {
      username: user.username ? user.username : "",
      password: "",
      email: user.email ? user.email : "",
      language: user.language ? user.language : "sk",
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
      imageURL: null,
      submitError:false,
      changed:false
    };
    this.compareChanges.bind(this);
  }
  //we compare if there have been made any changes to the user in comparison to the original props, if yes we trigger warning htmlFor the user
  compareChanges(change,val){
    let newState = {...this.state};
    newState.submitError=undefined;
    newState.changed=undefined;
    newState.image=undefined;
    newState.imageURL=undefined;
    newState[change]=val;

    const user = this.props.user;
    let originalState = {
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
    };
    this.setState({changed:!areObjectsSame(newState,originalState)});
  }


  submit(e) {
    e.preventDefault();
    this.setState({submitError:true});
    let body = {
      username: this.state.email,
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
    (body.password&&body.password.length<8)){
      return;
    }

    this.props.editProfile(
      body,
      this.props.user.id,
      this.state.image,
      this.props.user.company.id,
      this.props.user.user_role.id,
      this.props.token
    );
    this.props.history.goBack();
  }

  render() {
    return (
      <div className="card">
        <h4 className="card-header">{i18n.t('editUser')}</h4>
        <div className="card-body" style={{border:this.state.changed?'1px solid red':null}}>
          <form
            onSubmit={(event, value) => {
              event.preventDefault();
              this.props.history.goBack();
            }}
          >
            <label htmlFor="avatar">{i18n.t('avatarUpload')} </label>
            <label htmlFor="avatar" style={{ fontSize: 10 }}>
              {i18n.t('willBeResized')}
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
                        self.compareChanges('image',image);
                        self.setState({
                          image,
                          imageURL
                        });
                      };
                      img.src = reader.result;
                    };
                    reader.readAsDataURL(value);
                  } else {
                    alert(i18n.t('onlyImageFormats'));
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

            <div className="form-group">
              <label htmlFor="email" className="req">{i18n.t('username')+"/"+i18n.t('email')}</label>
              <input
                className="form-control"
                id="email"
                value={this.state.email}
                onChange={target =>{
                  this.compareChanges('email', target.target.value);
                  this.setState({ email: target.target.value })}
                }
                placeholder={i18n.t('enterUsername')+'/'+i18n.t('enterEmail')}
              />
              { this.state.email!==''&&!isEmail(this.state.email)&&<label htmlFor="email" style={{color:'red'}}>{i18n.t('restrictionEmailNotValid')}</label>}
                { this.state.submitError && this.state.email===''&&<label htmlFor="email" style={{color:'red'}}>{i18n.t('restrictionMustEnterEmailAddress')}</label>}
            </div>

            <div className="form-group">
              <label htmlFor="password">{i18n.t('password')}</label>
              <input
                className="form-control"
                id="password"
                value={this.state.password}
                onChange={target =>
                  this.setState({ password: target.target.value })
                }
                placeholder={i18n.t('enterPassword')}
              />
              {this.state.password.length>0 && this.state.password.length<8 &&<label htmlFor="password" style={{color:'red'}}>{i18n.t('restrictionPasswordMustBe8')}</label>}
            </div>

            <div className="form-group">
              <label htmlFor="language">{i18n.t('language')}</label>
              <select
                value={this.state.language}
                id="language"
                onChange={value =>{
                  this.compareChanges('language', value.target.value);
                  this.setState({ language: value.target.value });}
                }
                className="form-control"
              >
                {languages.map(opt => (
                  <option key={opt.id} value={opt.id}>
                    {opt.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="name">{i18n.t('firstname')}</label>
              <input
                className="form-control"
                id="name"
                value={this.state.name}
                onChange={target =>{
                  this.compareChanges('name', target.target.value);
                  this.setState({ name: target.target.value })}
                }
                placeholder={i18n.t('enterFirstName')}
              />
            </div>
            <div className="form-group">
              <label htmlFor="surname">{i18n.t('surname')}</label>
              <input
                className="form-control"
                id="surname"
                value={this.state.surname}
                onChange={target =>{
                  this.compareChanges('surname', target.target.value);
                  this.setState({ surname: target.target.value })}
                }
                placeholder={i18n.t('enterSurname')}
              />
            </div>
            <div className="form-group">
              <label htmlFor="title_before">{i18n.t('titleBeforeName')}</label>
              <input
                className="form-control"
                id="title_before"
                value={this.state.title_before}
                onChange={target =>{
                  this.compareChanges('title_before', target.target.value);
                  this.setState({ title_before: target.target.value })}
                }
                placeholder={i18n.t('enterTitleBeforeName')}
              />
            </div>
            <div className="form-group">
              <label htmlFor="title_after">{i18n.t('titleAfterName')}</label>
              <input
                className="form-control"
                id="title_after"
                value={this.state.title_after}
                onChange={target =>{
                  this.compareChanges('title_after', target.target.value);
                  this.setState({ title_after: target.target.value })}
                }
                placeholder={i18n.t('enterTitleAfterName')}
              />
            </div>
            <div className="form-group">
              <label htmlFor="func">{i18n.t('func')}</label>
              <input
                className="form-control"
                id="func"
                value={this.state.func}
                onChange={target =>{
                  this.compareChanges('func', target.target.value);
                  this.setState({ func: target.target.value })}
                }
                placeholder={i18n.t('enterFunc')}
              />
            </div>

            <div className="form-group">
              <label htmlFor="mobile">{i18n.t('mobileNumber')}</label>
              <input
                className="form-control"
                id="mobile"
                value={this.state.mobile}
                onChange={target =>{
                  this.compareChanges('mobile', target.target.value);
                  this.setState({ mobile: target.target.value })}
                }
                placeholder={i18n.t('enterMobileNumber')}
              />
            </div>
            <div className="form-group">
              <label htmlFor="tel">{i18n.t('telephoneNumber')}</label>
              <input
                className="form-control"
                id="tel"
                value={this.state.tel}
                onChange={target =>{
                  this.compareChanges('tel', target.target.value);
                  this.setState({ tel: target.target.value })}
                }
                placeholder={i18n.t('enterTelephoneNumber')}
              />
            </div>
            <div className="form-group">
              <label htmlFor="fax">{i18n.t('fax')}</label>
              <input
                className="form-control"
                id="fax"
                value={this.state.fax}
                onChange={target =>{
                  this.compareChanges('fax', target.target.value);
                  this.setState({ fax: target.target.value })}
                }
                placeholder={i18n.t('enterFax')}
              />
            </div>
            <div className="form-group">
              <label htmlFor="signature">{i18n.t('signature')}</label>
              <input
                className="form-control"
                id="signature"
                value={this.state.signature}
                onChange={target =>{
                  this.compareChanges('signature', target.target.value);
                  this.setState({ signature: target.target.value })}
                }
                placeholder={i18n.t('enterSignature')}
              />
            </div>
            <div className="form-group">
              <label htmlFor="street">{i18n.t('street')}</label>
              <input
                className="form-control"
                id="street"
                value={this.state.street}
                onChange={target =>{
                  this.compareChanges('street', target.target.value);
                  this.setState({ street: target.target.value })}
                }
                placeholder={i18n.t('enterStreet')}
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">{i18n.t('city')}</label>
              <input
                className="form-control"
                id="city"
                value={this.state.city}
                onChange={target =>{
                  this.compareChanges('city', target.target.value);
                  this.setState({ city: target.target.value })}
                }
                placeholder={i18n.t('enterCity')}
              />
            </div>
            <div className="form-group">
              <label htmlFor="zip">{i18n.t('zip')}</label>
              <input
                className="form-control"
                id="zip"
                value={this.state.zip}
                onChange={target =>{
                  this.compareChanges('zip', target.target.value);
                  this.setState({ zip: target.target.value })}
                }
                placeholder={i18n.t('enterZIP')}
              />
            </div>
            <div className="form-group">
              <label htmlFor="country">{i18n.t('country')}</label>
              <input
                className="form-control"
                id="country"
                value={this.state.country}
                onChange={target =>{
                  this.compareChanges('country', target.target.value);
                  this.setState({ country: target.target.value })}
                }
                placeholder={i18n.t('enterCity')}
              />
            </div>
            <div className="form-group">
              <label htmlFor="facebook">{i18n.t('facebook')}</label>
              <input
                className="form-control"
                id="facebook"
                value={this.state.facebook}
                onChange={target =>{
                  this.compareChanges('facebook', target.target.value);
                  this.setState({ facebook: target.target.value })}
                }
                placeholder={i18n.t('enterFacebook')}
              />
            </div>
            <div className="form-group">
              <label htmlFor="twitter">{i18n.t('twitter')}</label>
              <input
                className="form-control"
                id="twitter"
                value={this.state.twitter}
                onChange={target =>{
                  this.compareChanges('twitter', target.target.value);
                  this.setState({ twitter: target.target.value })}
                }
                placeholder={i18n.t('enterTwitter')}
              />
            </div>
            <div className="form-group">
              <label htmlFor="linkdin">{i18n.t('linkdin')}</label>
              <input
                className="form-control"
                id="linkdin"
                value={this.state.linkdin}
                onChange={target =>{
                  this.compareChanges('linkdin', target.target.value);
                  this.setState({ linkdin: target.target.value })}
                }
                placeholder={i18n.t('enterLinkdin')}
              />
            </div>
            <div className="form-group">
              <label htmlFor="google">{i18n.t('google')}</label>
              <input
                className="form-control"
                id="google"
                value={this.state.google}
                onChange={target =>{
                  this.compareChanges('google', target.target.value);
                  this.setState({ google: target.target.value })}
                }
                placeholder={i18n.t('enterGoogle')}
              />
            </div>

            <div className="form-group">
              <button
                type="submit"
                className="btn btn-primary mr-2"
                onClick={this.submit.bind(this)}
              >
              {i18n.t('submit')}
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => this.props.history.goBack()}
              >
                {i18n.t('cancel')}
              </button>
            </div>
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
  return { companies, token, userRoles, user, userID:login.user.id };
};

export default connect(mapStateToProps, { editProfile })(UserEdit);
