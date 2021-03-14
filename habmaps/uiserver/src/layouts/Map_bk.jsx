import React from "react";

// reactstrap components
import 'leaflet/dist/leaflet.css';
import 'assets/css/map.css';
import { Polyline, MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import MapMain from "components/Maps/mapmain.jsx";
import MapSideBar from "components/Maps/sidebar.jsx";
import DevicesList from "components/Maps/devicesListWidget.jsx";

const overflow_list = {
  "width" : "100vw",
  "height": "100vh",
  "min-height": "100vh",
}
//https://leaflet-extras.github.io/leaflet-providers/preview/
const polyline = [
  [51.505, -0.09],
  [51.51, -0.1],
  [51.51, -0.12],
]
const limeOptions = { color: 'lime' }
const position = [41.390205, 2.154007]


const MapViewer = (props) => {
  const mainContent = React.useRef(null);
  const components = [{name:'lista',widget:DevicesList}]
  return (
    <div>
      < MapSideBar items= {components}></MapSideBar>
      <MapContainer style={overflow_list} center={position} zoom={10} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
          //url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />
        <Polyline pathOptions={limeOptions} positions={polyline} />
      </MapContainer>
    </div>
    );
};

export default MapViewer;
