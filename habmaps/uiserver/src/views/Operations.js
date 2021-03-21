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
  Col,
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import ReactTerminal from 'react-terminal-component';
import Statusx from "components/Services/Status.jsx";

class Cleaner extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      frames: ['None'],
      current: ''
    };
    this.getFrames()
    this.getFrames = this.getFrames.bind(this);
    this.onCleanFrame = this.onCleanFrame.bind(this);
    this.onCleanCache = this.onCleanCache.bind(this);
    this._onSelect = this._onSelect.bind(this);
  }

  _onSelect(ev){
    this.setState({current: ev.value})
  };

  onCleanCache(ev){
    //alert("Se clica")
    NotificationManager.info('Cleaning buffer ');
    fetch('/data/FrameParser',{method: 'delete'})
    .then( response => {
      if ( response.status == 200 ){
        NotificationManager.success('Buffer cleaned');
        this.getFrames();
      }else
        NotificationManager.error('Something went wrong cleaning the buffer HTTP: ' + response.status.toString())
      console.log(response)
    })
    .catch( err  => {
      NotificationManager.error('Something went wrong for cleaning ');
      console.log(err)
    })

  }

  onCleanFrame(ev){
    const { current } = this.state;
    console.log("Cleaning frame: " + current)
    NotificationManager.info('Cleaning frame ' + current );

    fetch('/data/traces/'+ current,{method: 'delete'})
    .then( response => {
      if ( response.status == 200 ){
        NotificationManager.success('Frame ' + current + ' cleaned');
        this.getFrames();
      }else
        NotificationManager.error('Something went wrong for cleaning ' + current + " HTTP: " + response.status.toString())
    })
    .catch( err  => {
      NotificationManager.error('Something went wrong for cleaning ' + current );
      console.log(err)
    })

  }

  getFrames(){
    fetch('/data/distinct/hab')
    .then( response => response.json() )
    .then(result => {
      var arr=[]
      for (var i = 0; i < result.length; i++) {
        arr.push('hab/' + result[i])
      }
      this.setState({
        frames: arr.length > 0 ? arr : ['None'],
        current: result && arr.length > 0 ? arr[0] : 'None'
      })
    });

    fetch('/data/distinct/basestation')
    .then( response => response.json() )
    .then(result => {
      var arr2 = []
      for (var i = 0; i < result.length; i++) {
        arr2.push('basestation/' + result[i])
      }
      this.setState({
        frames: arr2.length > 0 ? this.state.frames.concat(arr2) : this.state.frames
      })
    });
  };


  render() {
      const { frames } = this.state;
  return (
    <div>
    <Row className="mt-5">
      <Col className="mb-5 mb-xl-0" xl="12">
        <Card className="shadow">
          <CardHeader className="border-0">
            <Row className="align-items-center">
              <div className="col">
                <h3 className="mb-0">Buffer Operations</h3>
              </div>
            </Row>
          </CardHeader>
          <Table className="align-items-center table-flush" responsive>
            <thead className="thead-light">
              <tr>
                <th scope="col">Action Name</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Clean Frame</th>
                <td><Dropdown options={ this.state.frames } onChange={ this._onSelect } value={ this.state.current } placeholder="Select a frame" /></td>
                <td><Button className="float-right" color="default" onClick={ this.onCleanFrame } size="sm" > Apply </Button></td>
              </tr>
              <tr>
                <th scope="row">Clean Buffer</th>
                <td></td>
                <td> <Button className="float-right" color="default" onClick={ this.onCleanCache } size="sm" > Apply </Button>
                </td>
              </tr>
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


const Operations  = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
        </Row>
          <Statusx></Statusx>
          
          <Cleaner></Cleaner>

      </Container>
    </>
  );
};

export default Operations;
