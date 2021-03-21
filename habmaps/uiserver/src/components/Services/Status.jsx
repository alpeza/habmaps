import React, { useState } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,Badge
} from "reactstrap";

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import Loader from "react-loader-spinner";

const prettyMilliseconds = require('pretty-ms');
const prettyBytes = require('pretty-bytes');



class PRow extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      item : props.element,
      current: 'Nothing',
      options: ['Nothing','start','stop','restart'],
      isLoaded: true
    }
    this._onSelect = this._onSelect.bind(this);
    this.getFrames = this.getFrames.bind(this);
  }

  _onSelect(ev){
      const action = ev.value;
      if (action == 'Nothing') return false;

      NotificationManager.info('Sending ' + action );

      fetch('/proc/action/'+action+'/'+this.state.item.name,{method: 'PUT'})
      .then( response => response.json() )
      .then(result => {
        this.getFrames()
        NotificationManager.info('Refreshed');
      });
  }

  getFrames(){
    this.setState({ isLoaded: false })
    fetch('/proc/list')
    .then( response => response.json() )
    .then(result => {
      for (var i = 0; i < result.length; i++) {
        if (result[i].name == this.state.item.name) {
          this.setState({
            item: result[i],
            current: 'Nothing',
            isLoaded: true
          })
        }
      }
    });
  };

  render() {
    const { isLoaded, options, current,item } = this.state;
    if ( !isLoaded ){
      return (
        <tr><td></td><td></td><td></td>
        <td className="align-items-center"><Loader type="Bars" color="#00BFFF" height={20} width={20}/></td></tr>
      );
    }else{
      return (
        <tr>
          <th scope="row"><b>{ item.name }</b></th>
          <td>
            <Badge color={ item.status == 'online' ? "success" : "danger" } pill>{ item.status }</Badge>
          </td>
          <td>{ item.restarts }</td>
          <td>{ prettyMilliseconds(Date.now() - item.uptime) }</td>
          <td>{ item.monit.cpu }</td>
          <td>{ prettyBytes(item.monit.memory) }</td>
          <td><Dropdown options={ options } onChange={ this._onSelect } value={ current } placeholder="" /></td>
        </tr>
      );
    }
  }
}


export default class Statusx extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isLoaded: false
    };
    this.getFrames()
    this.getFrames = this.getFrames.bind(this);
  }

  getFrames(){
    fetch('/proc/list')
    .then( response => response.json() )
    .then(result => {
      this.setState({
        tasks: result,
        isLoaded: true
      })
    });
  };

  render() {
      const { tasks,isLoaded } = this.state;
      return (
          <div>
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="12">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Current Services</h3>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Service Name</th>
                      <th scope="col">Status</th>
                      <th scope="col">Restarts</th>
                      <th scope="col">Uptime</th>
                      <th scope="col">CPU</th>
                      <th scope="col">Mem</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    { !isLoaded ? (
                        <tr><td></td><td></td><td></td>
                        <td className="align-items-center"><Loader type="Bars" color="#00BFFF" height={20} width={20}/></td></tr>
                      ) : (
                        tasks.map(item => (
                            <PRow element= { item }></PRow>
                        ))
                      )
                    }
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>
          <NotificationContainer/>
          </div>
  );
  }
}
