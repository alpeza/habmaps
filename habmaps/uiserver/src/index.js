import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import MapLayout from "layouts/Map.jsx";

import 'react-notifications/lib/notifications.css';

import AuthManager from 'components/Login/AuthManager.js'
/*
<Route path="/admin" render={(props) => <AdminLayout {...props} />} />
<Route path="/auth" render={(props) => <AuthLayout {...props} />} />
*/
ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/mapa" render={(props) => <MapLayout {...props} />} />
      <Route path="/admin" render={(props) => {
          let am = new AuthManager()
          return am.isLogged() ? <AdminLayout {...props} /> : <Redirect to="/auth" />
          }
        } />
      <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
      <Redirect from="/" to="/mapa" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
