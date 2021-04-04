import React from "react";
import {
  Badge,
  Table,
  Container,NavbarBrand,
  Row,Col,CardTitle,CardBody,
  UncontrolledTooltip,
} from "reactstrap";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Loader from "react-loader-spinner";
import mqtth from "./wscoms"
import LocalCache from "./LocalCache";

export default class SignalsWidget extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        data: {},
        distinct: [],
        current_hab: '',
        current_coors: [41.387016,2.170047],
        last_coors: [41.387016,2.170047],
        pause: false
      };
      this.lc = new LocalCache()
      this._onSelect = this._onSelect.bind(this)
      this.toggle = this.toggle.bind(this)
      this.getLastCoords = this.getLastCoords.bind(this)
      this.getCurrentCoors = this.getCurrentCoors.bind(this)
      mqtth("/devices/lastframe","/devices/lastframe",this);
    }

  componentDidMount() {}
  componentWillUnmount() {}

  _onSelect(ev){
    this.setState({current_hab: ev.value})
    this.lc.store('current_hab', ev.value);
    //console.log(ev)
  }

  getCurrentCoors(mydata){
    var curhab = this.state.current_hab;
    //console.log('CurHab: ' + curhab)
    if (mydata) {
      var habs = mydata['habs']
      for (var i = 0; i < habs.length; i++) {
        if (habs[i]['id'] == curhab) {
          var tmparr = [habs[i].pos.lat,habs[i].pos.lon]
          return tmparr
        }
      }
    }
    return [41.387016,2.170047];
  }

  toggle(){
    this.setState({
      pause: ! this.state.pause
    })
    this.setState({
      last_coors : this.getCurrentCoors(this.state.data)
    })
  }

  getLastCoords(){
    return this.state.last_coors;
  }
  getDevices(mydata){
    var elems = mydata;
    var arr = []
    if (elems) {
      var habs = elems['habs']
      for (var i = 0; i < habs.length; i++) {
        arr.push(habs[i].id)
      }
    }
    if (this.state.current_hab == '') {
      this.setState({current_hab: arr[0]})
      this.lc.store('current_hab', arr[0]);
    }
    return arr
  }

  render() {
    const { error,pause, tmparr,data, isLoaded, items } = this.state;
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
        //******* Senales *********
        <div className="mwidget">
          <Table className="align-items-center" responsive>
            <thead className="thead-light">
              <tr>
                <th scope="col">Google maps</th>
              </tr>
            </thead>
          </Table>

          <Container>
            <Row>
              <Col xs="7">
                <Row>
                  <b>  Lat:</b> {this.getCurrentCoors(data)[0]}
                </Row>
                <Row>
                  <b>  Lon:</b> {this.getCurrentCoors(data)[1]}
                </Row>
              </Col>
              <Col xs="2">
                <a href={"https://www.google.com/maps/dir/?api=1&travelmode=driving&destination=" + this.getCurrentCoors(data)[0] + "," + this.getCurrentCoors(data)[1]} target="_blank">
                <Badge color="success">GO</Badge>
                </a>
              </Col>
              <Col xs="2">
                <Badge onClick={this.toggle} color="success">{ pause ? "PLAY" : "PAUSE" }</Badge>
              </Col>
            </Row>
          </Container>

          <div className="google-map-code">
            {pause
                ? <iframe src={"https://maps.google.com/maps?q=" + this.getLastCoords(data)[0] + "," + this.getLastCoords(data)[1] + "&z=13&output=embed"} width="100%" height="350" frameBorder="0" style={{border: 0}} allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>
                : <iframe src={"https://maps.google.com/maps?q=" + this.getCurrentCoors(data)[0] + "," + this.getCurrentCoors(data)[1] + "&z=13&output=embed"} width="100%" height="350" frameBorder="0" style={{border: 0}} allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>
            }

          </div>

            <Dropdown options={this.getDevices(data)} onChange={this._onSelect} value={this.getDevices(data)[0]} placeholder="Select an option" />



        </div>
      );
    }
  }
}
