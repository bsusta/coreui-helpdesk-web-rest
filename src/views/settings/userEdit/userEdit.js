import React, { Component } from "react";
import { connect } from 'react-redux';
import {editUser} from '../../../redux/actions';

class UserEdit extends Component {
  constructor(props){
    super(props);
    const user = this.props.user;
    this.state={
      is_active:user.is_active,
      username:user.username?user.username:'',
      password:'',
      email:user.email?user.email:'',
      language:user.language?user.language:'',
      name:user.detailData.name?user.detailData.name:'',
      surname:user.detailData.surname?user.detailData.surname:'',
      title_before:user.detailData.title_before?user.detailData.title_before:'',
      title_after:user.detailData.title_after?user.detailData.title_after:'',
      func:user.detailData.function?user.detailData.function:'',
      mobile:user.detailData.mobile?user.detailData.mobile:'',
      tel:user.detailData.tel?user.detailData.tel:'',
      fax:user.detailData.fax?user.detailData.fax:'',
      signature:user.detailData.signature?user.detailData.signature:'',
      street:user.detailData.street?user.detailData.street:'',
      city:user.detailData.city?user.detailData.city:'',
      zip:user.detailData.zip?user.detailData.zip:'',
      country:user.detailData.country?user.detailData.country:'',
      facebook:user.detailData.facebook?user.detailData.facebook:'',
      twitter:user.detailData.twitter?user.detailData.twitter:'',
      linkdin:user.detailData.linkdin?user.detailData.linkdin:'',
      google:user.detailData.google?user.detailData.google:'',
      image:user.image?user.image:'',
      userRole:user.user_role.id?user.user_role.id:'',
      company:user.company.id?user.company.id:''
    }
  }

  submit(e){
    e.preventDefault();
    let body={
      username:this.state.username,
      email:this.state.email,
      language:this.state.language,
      image:this.state.image,
      detail_data:{
        name:this.state.name,
        surname:this.state.surname,
        title_before:this.state.title_before,
        title_after:this.state.title_after,
        function:this.state.func,
        mobile:this.state.mobile,
        tel:this.state.tel,
        fax:this.state.fax,
        signature:this.state.signature,
        street:this.state.street,
        city:this.state.city,
        zip:this.state.zip,
        country:this.state.country,
        facebook:this.state.facebook,
        twitter:this.state.twitter,
        linkdin:this.state.linkdin,
        google:this.state.google
      }
    }
    if(this.state.password!=''){
      body['password']=this.state.password;
    }
    this.props.editUser(body,
    this.state.company,this.state.userRole,this.props.user.id,this.state.is_active,this.props.token);
    this.props.history.goBack();
  }
  render() {
    return (
      <div
        class="card"
        style={{ maxWidth: 1380, margin: "auto", borderTop: "0" }}
        >
        <h4 class="card-header">Add user</h4>
        <div class="card-body">
          <form
            onSubmit={(event, value) => {
              event.preventDefault();
              this.props.history.goBack();
            }}
            >
            <div class="form-check">
              <label class="form-check-label">
                <input type="checkbox" class="form-check-input" checked={this.state.is_active} onChange={()=>this.setState({is_active:!this.state.is_active})} />
                Active
              </label>
            </div>

            <div class="form-group">
              <label for="username">Username</label>
              <input
                class="form-control"
                id="username"
                value={this.state.username}
                onChange={(target)=>this.setState({username:target.target.value}) }
                placeholder="Enter username"
                />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input
                class="form-control"
                id="password"
                value={this.state.password}
                onChange={(target)=>this.setState({password:target.target.value}) }
                placeholder="Enter password"
                />
            </div>
            <div class="form-group">
              <label for="email">E-mail</label>
              <input
                class="form-control"
                id="email"
                value={this.state.email}
                onChange={(target)=>this.setState({email:target.target.value}) }
                placeholder="Enter e-mail"
                />
            </div>
            <div class="form-group">
              <label for="language">Language</label>
              <input
                class="form-control"
                id="language"
                value={this.state.language}
                onChange={(target)=>this.setState({language:target.target.value}) }
                placeholder="Enter language"
                />
            </div>
            <div class="form-group">
              <label for="name">Name</label>
              <input
                class="form-control"
                id="name"
                value={this.state.name}
                onChange={(target)=>this.setState({name:target.target.value}) }
                placeholder="Enter name"
                />
            </div>
            <div class="form-group">
              <label for="surname">Surname</label>
              <input
                class="form-control"
                id="surname"
                value={this.state.surname}
                onChange={(target)=>this.setState({surname:target.target.value}) }
                placeholder="Enter surname"
                />
            </div>
            <div class="form-group">
              <label for="title_before">Title before name</label>
              <input
                class="form-control"
                id="title_before"
                value={this.state.title_before}
                onChange={(target)=>this.setState({title_before:target.target.value}) }
                placeholder="Enter title before name"
                />
            </div>
            <div class="form-group">
              <label for="title_after">Title after</label>
              <input
                class="form-control"
                id="title_after"
                value={this.state.title_after}
                onChange={(target)=>this.setState({title_after:target.target.value}) }
                placeholder="Enter title after"
                />
            </div>
            <div class="form-group">
              <label for="func">Function</label>
              <input
                class="form-control"
                id="func"
                value={this.state.func}
                onChange={(target)=>this.setState({func:target.target.value}) }
                placeholder="Enter users function"
                />
            </div>

            <div class="form-group">
              <label for="mobile">Mobile number</label>
              <input
                class="form-control"
                id="mobile"
                value={this.state.mobile}
                onChange={(target)=>this.setState({mobile:target.target.value}) }
                placeholder="Enter mobile number"
                />
            </div>
            <div class="form-group">
              <label for="tel">Telephone number</label>
              <input
                class="form-control"
                id="tel"
                value={this.state.tel}
                onChange={(target)=>this.setState({tel:target.target.value}) }
                placeholder="Enter telephone number"
                />
            </div>
            <div class="form-group">
              <label for="fax">Fax</label>
              <input
                class="form-control"
                id="fax"
                value={this.state.fax}
                onChange={(target)=>this.setState({fax:target.target.value}) }
                placeholder="Enter fax"
                />
            </div>
            <div class="form-group">
              <label for="signature">Signature</label>
              <input
                class="form-control"
                id="signature"
                value={this.state.signature}
                onChange={(target)=>this.setState({signature:target.target.value}) }
                placeholder="Enter signature"
                />
            </div>
            <div class="form-group">
              <label for="street">Street</label>
              <input
                class="form-control"
                id="street"
                value={this.state.street}
                onChange={(target)=>this.setState({street:target.target.value}) }
                placeholder="Enter street"
                />
            </div>
            <div class="form-group">
              <label for="city">City</label>
              <input
                class="form-control"
                id="city"
                value={this.state.city}
                onChange={(target)=>this.setState({city:target.target.value}) }
                placeholder="Enter city"
                />
            </div>
            <div class="form-group">
              <label for="zip">ZIP</label>
              <input
                class="form-control"
                id="zip"
                value={this.state.zip}
                onChange={(target)=>this.setState({zip:target.target.value}) }
                placeholder="Enter ZIP number"
                />
            </div>
            <div class="form-group">
              <label for="country">Country</label>
              <input
                class="form-control"
                id="country"
                value={this.state.country}
                onChange={(target)=>this.setState({country:target.target.value}) }
                placeholder="Enter country"
                />
            </div>
            <div class="form-group">
              <label for="facebook">Facebook</label>
              <input
                class="form-control"
                id="facebook"
                value={this.state.facebook}
                onChange={(target)=>this.setState({facebook:target.target.value}) }
                placeholder="Enter facebook"
                />
            </div>
            <div class="form-group">
              <label for="twitter">Twitter</label>
              <input
                class="form-control"
                id="twitter"
                value={this.state.twitter}
                onChange={(target)=>this.setState({twitter:target.target.value}) }
                placeholder="Enter twitter"
                />
            </div>
            <div class="form-group">
              <label for="linkdin">Linkdin</label>
              <input
                class="form-control"
                id="linkdin"
                value={this.state.linkdin}
                onChange={(target)=>this.setState({linkdin:target.target.value}) }
                placeholder="Enter linkdin"
                />
            </div>
            <div class="form-group">
              <label for="google">Google</label>
              <input
                class="form-control"
                id="google"
                value={this.state.google}
                onChange={(target)=>this.setState({google:target.target.value}) }
                placeholder="Enter google"
                />
            </div>
            <div class="form-group">
              <label for="image">Image</label>
              <input
                class="form-control"
                id="image"
                value={this.state.image}
                onChange={(target)=>this.setState({image:target.target.value}) }
                placeholder="Enter image"
                />
            </div>

            <div class="form-group">
              <label for="company">Company</label>
              <select
                id="company"
                value={this.state.company}
                onChange={(value)=>this.setState({company:value.target.value})}
                class="form-control">
                {this.props.companies.map(opt => (
                  <option
                    key={opt.id}
                    value={opt.id}>
                    {opt.title}
                  </option>
                ))}
              </select>
            </div>
            <div class="form-group">
              <label for="role">Role</label>
              <select
                value={this.state.userRole}
                onChange={(value)=>this.setState({userRole:value.target.value})}
                id="role"
                class="form-control">
                {this.props.userRoles.map(opt => (
                  <option
                    key={opt.id}
                    value={opt.id}>
                    {opt.title}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" class="btn btn-primary" onClick={this.submit.bind(this)}>
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({companiesReducer, login, userRolesReducer, usersReducer }) => {
  const {companies} = companiesReducer;
  const {userRoles} = userRolesReducer;
  const {user} = usersReducer;
  const {token} = login;
  return {companies,token,userRoles,user};
};

export default connect(mapStateToProps, {editUser})(UserEdit);
