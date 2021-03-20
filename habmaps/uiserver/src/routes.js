import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import Operations from "views/Operations.js";


var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-orange",
    component: Maps,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
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
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
  },
];


var routes = [
  {
    path: "/index",
    name: "Operations",
    icon: "ni ni-folder-17 text-blue",
    component: Operations,
    layout: "/admin",
  },
  {
    path: "/jobs",
    name: "Jobs",
    icon: "ni ni-spaceship text-green",
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/settings",
    name: "Settings",
    icon: "ni ni-settings text-yellow",
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/",
    name: "Map",
    icon: "ni ni-map-big text-red",
    component: Icons,
    layout: "/mapa",
  }
];


var routes = [
  {
    path: "/index",
    name: "Operations",
    icon: "ni ni-folder-17 text-blue",
    component: Operations,
    layout: "/admin",
  },
  {
    path: "/",
    name: "Map",
    icon: "ni ni-map-big text-red",
    component: Icons,
    layout: "/mapa",
  }
];

export default routes;
