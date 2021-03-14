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
import mqtth from "./wscoms"

export default class DevicesList extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        data: []
      };
      mqtth("devices/status","/devices/status",this);
    }

  componentDidMount() {}
  componentWillUnmount() {}

  render() {
    const { error, data, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return (<div className="mwidget">
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
