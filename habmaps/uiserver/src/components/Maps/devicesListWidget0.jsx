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

export default class DevicesList extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        date: new Date(),
        error: null,
        isLoaded: false,
        data: []
      };
    }
  componentDidMount() {
      this.timerID = setInterval(
        () => this.fetchdata(),
        9000
      );
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  fetchdata() {
      fetch("http://127.0.0.1:5000/devices/status", {
        //mode: 'no-cors',
        //mode: 'cors',
        crossDomain:true,
        method: 'GET',
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
