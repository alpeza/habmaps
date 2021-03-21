import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import Operations from "views/Operations.js";
import Servicesx from "views/Services.js";


var routes = [
  {
    path: "/index",
    name: "Operations",
    icon: "ni ni-folder-17 text-blue",
    component: Operations,
    layout: "/admin",
  },
  {
    path: "/services",
    name: "Services",
    icon: "ni ni-archive-2 text-yellow",
    component: Servicesx,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/",
    name: "Map",
    icon: "ni ni-map-big text-red",
    component: Icons,
    layout: "/mapa",
  }
];

/*
var routes = [
  {
    path: "/index",
    name: "Operations",
    icon: "ni ni-folder-17 text-blue",
    component: Operations,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/",
    name: "Map",
    icon: "ni ni-map-big text-red",
    component: Icons,
    layout: "/mapa",
  }
];*/

export default routes;
