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
  PaginationItem,Navbar,
  PaginationLink,
  Progress,
  Table,
  Container,NavbarBrand,
  Row,Col,CardTitle,CardBody,
  UncontrolledTooltip,
} from "reactstrap";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { BiCar,BiPlanet } from "react-icons/bi";
import Loader from "react-loader-spinner";
import mqtth from "./wscoms"

export default class PredictHabWidget extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        data: {},
        distinct: [],
        current_hab: '',
        current_coors: []
      };
      this._onSelect = this._onSelect.bind(this)
      mqtth("/devices/lastframe","/devices/lastframe",this);
    }

  componentDidMount() {}
  componentWillUnmount() {}

  _onSelect(ev){
    this.setState({current_hab: ev.value})
    //console.log(ev)
  }

  getCurrentCoors(mydata){
    var curhab = this.state.current_hab;
    console.log('CurHab: ' + curhab)
    if (mydata) {
      var habs = mydata['habs']
      for (var i = 0; i < habs.length; i++) {
        if (habs[i]['id'] == curhab) {
          console.log('Examinando')
          console.log(habs[i])
          var tmparr = [habs[i].pos.lat,habs[i].pos.lon]
          return tmparr
        }
      }
    }
    return [41.387016,2.170047];
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
    }
    return arr
  }

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
                <th scope="col">Predict hab</th>
              </tr>
            </thead>
          </Table>



        </div>
      );
    }
  }
}
