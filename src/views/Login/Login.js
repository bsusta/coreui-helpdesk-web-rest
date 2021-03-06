import React, { Component } from "react";
import Navigation from "../../navigation";
import { connect } from "react-redux";
import { loginUser } from "../../redux/actions";
import {
  Container,
  Row,
  Col,
  CardGroup,
  Card,
  CardBody,
  Button,
  Input,
  InputGroup,
  InputGroupAddon
} from "reactstrap";
import i18n from 'i18next';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: true,
      loginName: "admin@admin.sk",
      loginPassword: "12345678",
      resetName: ""
    };
  }
  render() {
    if (this.props.authenticated) {
      return (
        <div>
          <Navigation {...this.props} />
        </div>
      );
    }
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="4">
              <CardGroup>
                <Card className="p-4 smallCard">
                  <CardBody className="smallCard" style={{width:300}}>
                    <h1>{this.state.login ? i18n.t('login') : i18n.t('passwordReset')}</h1>
                    <p className="text-muted">
                      {this.state.login
                        ? i18n.t('signIn')
                        : i18n.t('forgotYourPassword')}
                    </p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon>
                        <i className="icon-user" />
                      </InputGroupAddon>
                      <Input
                        type="text"
                        placeholder={i18n.t('username')}
                        value={
                          this.state.login
                            ? this.state.loginName
                            : this.state.resetName
                        }
                        onChange={value => {
                          if (this.state.login) {
                            this.setState({ loginName: value.target.value });
                          } else {
                            this.setState({ resetName: value.target.value });
                          }
                        }}
                      />
                    </InputGroup>
                    {this.state.login && (
                      <InputGroup className="mb-4">
                        <InputGroupAddon>
                          <i className="icon-lock" />
                        </InputGroupAddon>
                        <Input
                          type="password"
                          placeholder={i18n.t('password')}
                          value={this.state.loginPassword}
                          onChange={value =>
                            this.setState({ loginPassword: value.target.value })
                          }
                        />
                      </InputGroup>
                    )}
                    {this.state.login && (
                      <div
                        style={{
                          color: "red",
                          fontSize: 15,
                          paddingBottom: 15
                        }}
                      >
                        {this.props.error}
                      </div>
                    )}
                    <Button
                      color="primary"
                      style={{ width: "100%" }}
                      onClick={() => {
                        if (this.state.login) {
                          this.props.loginUser(
                            this.state.loginName,
                            this.state.loginPassword
                          );
                        } else {
                          this.setState({ login: true });
                        }
                      }}
                    >
                      {this.state.login ? i18n.t('login') : i18n.t('resetPassword')}
                    </Button>
                    <Button
                      color="link"
                      style={{ margin: "auto", width: "100%" }}
                      onClick={() =>
                        this.setState({ login: !this.state.login })
                      }
                    >
                      {this.state.login ? i18n.t('forgotPassword') : i18n.t('backToLogin')}
                    </Button>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = ({ login }) => {
  const { authenticated, error, loading } = login;
  return { authenticated, error, loading };
};

export default connect(mapStateToProps, { loginUser })(Login);
