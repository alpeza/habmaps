import React from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,NavbarBrand
} from "reactstrap";

import Loader from "react-loader-spinner";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import AuthManager  from "./AuthManager.js"

export default class Loginx extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        user: '',
        password: '',
        submitted: false
      };
      this.handleUserChange = this.handleUserChange.bind(this)
      this.handlePasswordChange = this.handlePasswordChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
    }

  componentDidMount() {}
  componentWillUnmount() {}

  //Eventos
  handleUserChange(ev) {
    this.setState({ user : ev.target.value})
  }
  handlePasswordChange(ev) {
    this.setState({ password : ev.target.value})
  }
  handleSubmit(ev) {
    const user = this.state.user; // user
    const pass = this.state.password;
    console.log(user +" : "+ pass);
    let sm = new AuthManager();

    if ( user == '' || pass == '' ){
      NotificationManager.error('Please fill the login form');
      return false;
    }

    NotificationManager.info('Validating credentials');
    this.setState({ submitted : true})

    sm.checkUser(user,pass).then( data => {
      if ( !data.login){
        NotificationManager.error(data.reason);
        this.setState({ submitted : false})
        return false;
      }
      NotificationManager.success(data.reason);
      window.location.replace("/admin/index");
    });
  }

  render() {
    const { submitted } = this.state;
    return (
          <>
          <Col lg="5" md="7">
            <Card className="bg-secondary shadow border-0">
              <CardHeader className="bg-transparent pb-5" align
                ="center">
                  <img
                    alt="..."
                    width="300px"
                    height="auto"
                    src={
                      require("../../assets/img/brand/argon-react-white.png").default
                    }
                  />
              </CardHeader>
              <CardBody className="px-lg-5 py-lg-5">
                <Form role="form">
                  <FormGroup className="mb-3">
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-email-83" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Email"
                        type="email"
                        autoComplete="username"
                        onChange={this.handleUserChange}
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Password"
                        type="password"
                        autoComplete="current-password"
                        onChange={this.handlePasswordChange}
                      />
                    </InputGroup>
                  </FormGroup>
                  {submitted
                      ? <div className="text-center"><Loader type="Bars" color="#00BFFF" height={20} width={20} /> Validating credentials ...</div>
                      : <div className="text-center"><Button onClick={this.handleSubmit} className="my-4" color="primary" type="button">Sign in</Button></div>
                  }


              </Form>
              </CardBody>
            </Card>
          </Col>
          <NotificationContainer/>
        </>
    );
  }
}
