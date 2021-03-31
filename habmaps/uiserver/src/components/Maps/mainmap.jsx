import React from "react";
import { Polyline, MapContainer, TileLayer,Tooltip, Popup } from 'react-leaflet';
import Marker from 'react-leaflet-enhanced-marker'
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
import Loader from "react-loader-spinner";
import mqtth from "./wscoms"

const string2color = require('string-to-color');
class ReactComponent extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        name: props.name,
        mcolor: string2color(props.name),
      };
      //console.log(props);
      console.log(this.state)
    }
  render() {
    const { name, mcolor } = this.state;
    const markerStyle = {
      backgroundColor: this.state.mcolor,
      color: "white",
      display: "flex",
      justifyContent: "center",
      width: "50px",
      height: "50px",
      borderRadius: "50px",
      alignItems: "center"
    };
    return <div style={markerStyle}> { name } </div>;
  }
}

export default class MainMap extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        date: new Date(),
        error: null,
        isLoaded: false,
        position: [41.390205, 2.154007],
        data: []
      };
      mqtth("/devices/tracespoly","/devices/tracespoly/500",this);
    }
  componentDidMount() {}
  componentWillUnmount() {}


  getColor(str){
    return {
      color: string2color(str)
    }
  }

  //https://leaflet-extras.github.io/leaflet-providers/preview/
  //url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  render() {
    const { error, data, isLoaded, items,position } = this.state;
    if (error) {
      return <div>Algo fue mal al cargar el componente :( : {error.message}</div>;
    } else if (!isLoaded) {
      return (<div>
          <Loader
          type="Puff"
          color="#00BFFF"
          height={20}
          width={20}
          />
      </div>);
    } else {
      return (
        <div>
          <MapContainer zoomControl={false} className="mainmap" center={position} zoom={10} scrollWheelZoom={true}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
            {
            data.habs.map(item => (
              <div>
              <Polyline pathOptions={ this.getColor(item.id) } positions={item.data} />
                <Marker  icon={<ReactComponent name= {item.id} />}  position={item.data.slice(-1).pop()}>
                    <Popup>
                      Lat: {item.data.slice(-1).pop()[0]}, Long: {item.data.slice(-1).pop()[1]}
                      <a href={"https://www.google.com/maps/dir/?api=1&travelmode=driving&destination=" + item.data.slice(-1).pop()[0] + "," + item.data.slice(-1).pop()[1] } target="_blank" >GoogleMaps</a>
                    </Popup>
                </Marker>
              </div>
            ))
            }

            {
            data.basestations.map(item => (
              <div>
              <Polyline pathOptions={ this.getColor(item.id) } positions={item.data} />
                <Marker  icon={<ReactComponent name= {item.id} />}  position={item.data.slice(-1).pop()}>
                  <Popup>
                    Lat: {item.data.slice(-1).pop()[0]}, Long: {item.data.slice(-1).pop()[1]}
                    <a href={"https://www.google.com/maps/dir/?api=1&travelmode=driving&destination=" + item.data.slice(-1).pop()[0] + "," + item.data.slice(-1).pop()[1] } target="_blank" >GoogleMaps</a>
                  </Popup>
                </Marker>
              </div>
            ))
            }
          </MapContainer>
        </div>
      );
    }
  }
}
