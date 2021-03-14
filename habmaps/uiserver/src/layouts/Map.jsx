import React from "react";

// reactstrap components
import 'leaflet/dist/leaflet.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import 'assets/css/map.css';
import { Polyline, MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import MapSideBar from "components/Maps/sidebar.jsx";
import DevicesList from "components/Maps/devicesListWidget.jsx";
import SignalsWidget from "components/Maps/signalsWidget.jsx";
import MainMap from "components/Maps/mainmap.jsx";

//< MainMap />
const MapViewer = (props) => {
  const mainContent = React.useRef(null);
  const components = [{name:'lista',widget:DevicesList},
                      {name:'signals',widget:SignalsWidget}]
  return (
    <div>
      < MapSideBar items= {components}></MapSideBar>
      < MainMap />
    </div>
    );
};

export default MapViewer;
