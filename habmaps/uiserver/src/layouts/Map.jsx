import React from "react";

// reactstrap components
import 'leaflet/dist/leaflet.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import 'assets/css/map.css';

import DevicesList from "components/Maps/devicesListWidget.jsx";
import SignalsWidget from "components/Maps/signalsWidget.jsx";


import MainMap from "components/Maps/mainmap.jsx";
import Mosaic from "components/Maps/mosaic.jsx";

//< MainMap />
// < MapSideBar items= {components}></MapSideBar>
const MapViewer = (props) => {
  const mainContent = React.useRef(null);
  const components = [{name:'DevicesList',widget:DevicesList},
                      {name:'SignalsWidget',widget:SignalsWidget}]
  return (
    <div>
        < MainMap />
        < Mosaic />
    </div>
    );
};

export default MapViewer;
