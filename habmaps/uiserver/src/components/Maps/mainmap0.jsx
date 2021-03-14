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

class ReactComponent extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        name: props.name,
      };
      console.log(props);
      console.log(this.state.name)
    }
  render() {
    const { name } = this.state;
    const markerStyle = {
      backgroundColor: "rgba(0,100,200,0.7)",
      boxShadow: "0px 0px 20px rgba(0,10,200,0.5)",
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
    }
  componentDidMount() {
      this.timerID = setInterval(
        () => this.fetchdata(),
        1000
      );
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  fetchdata() {
      fetch("/devices/tracespoly/10", {
        //mode: 'no-cors',
        mode: 'cors',
        method: 'GET',
        crossDomain:true,
        headers: {
          Accept: 'application/json',
        }})
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              data: result
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
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
          <MapContainer className="mainmap" center={position} zoom={10} scrollWheelZoom={true}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
            {
            data.habs.map(item => (
              <div>
              <Polyline positions={item.data} />
                <Marker  icon={<ReactComponent name= {item.id} />}  position={item.data.slice(-1).pop()}>
                      <Popup>Lat: {item.data.slice(-1).pop()[0]}, Long: {item.data.slice(-1).pop()[1]}</Popup>
                </Marker>
              </div>
            ))
            }

            {
            data.basestations.map(item => (
              <Polyline positions={item.data} />
            ))
            }
          </MapContainer>
        </div>
      );
    }
  }
}
