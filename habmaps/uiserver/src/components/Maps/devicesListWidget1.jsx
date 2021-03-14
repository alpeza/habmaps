import React from "react";
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
import { BiCar,BiPlanet } from "react-icons/bi";
import Loader from "react-loader-spinner";

var mqtt = require('mqtt')
var client  = mqtt.connect('ws://localhost:8081/socket')

export default class DevicesList extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        data: []
      };
      this.mqtth();
    }

  componentDidMount() {

  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  mqtth(){
    //https://gist.github.com/smching/3582d2fbae417fc919e23b4e61c036d1
    const { error, data, isLoaded } = this.state;
    console.log("Se va a conectar ...")
    //1.- Conexión al topic
    client.subscribe('devices/status', (err,msg) => {
      console.log("Subscrito al topic ...")
      //2.- Cargamos la información actual desde el buffer
      fetch("/devices/status", {crossDomain:true,method: 'GET',
        headers: {Accept: 'application/json',}})
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
    });
    //3.- Mantenemos un conexión abierta con el broker de mq para cuando
    //lleguen mensajes
    client.on('message', (topic, message, packet) => {
      console.log("Llega un mensaje de " + topic);
      console.log(message.toString());
      // Cargamos el resultado que llega de mqtt
      this.setState({
        data: JSON.parse(message.toString())
      });
    });
  }
  render() {
    const { error, data, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
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
        <div className="mwidget">
          <Table className="align-items-center" responsive>
            <thead className="thead-light">
              <tr>
                <th scope="col">Type</th>
                <th scope="col">Id</th>
                <th scope="col">Status</th>
                <th scope="col">Last Seen</th>
                <th scope="col">Minutes Ago</th>
              </tr>
            </thead>
            <tbody>
              {
              data.habs.map(item => (
                <tr>
                  <td><BiPlanet/></td>
                  <td>{ item.id }</td>
                  <td>
                    <Badge color={ item.online ? 'success' : 'danger'}>{ item.online ? 'ONLINE' : 'OFFLINE'}</Badge>
                  </td>
                  <td>{ item.lastseen }</td>
                  <td>{ item.minutesago }</td>
                </tr>
              ))
              }

              {
                data.basestations.map(item => (
                <tr>
                  <td><BiCar/></td>
                  <td>{ item.id }</td>
                  <td><Badge color={ item.online ? 'success' : 'danger'}>{ item.online ? 'ONLINE' : 'OFFLINE'}</Badge></td>
                  <td>{ item.lastseen }</td>
                  <td>{ item.minutesago }</td>
                </tr>
              ))
              }
            </tbody>
          </Table>
        </div>
      );
    }
  }
}
