import React from "react";
import {
  Table
} from "reactstrap";
import Loader from "react-loader-spinner";
import Dropdown from 'react-dropdown';
import eventBus from "./EventBus";
const prettyMilliseconds = require('pretty-ms');


export default class SelectMapWidget extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: true,
        maps: [ 'Satelite', 'OpenStreet', 'Dark', 'Stadia'],
        mapurl: {
                'Satelite': 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
                'OpenStreet' : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                'Dark': 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
                'Stadia': 'https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png'
                }
      };
      this._onSelect = this._onSelect.bind(this)
    }

  componentDidMount() {}
  componentWillUnmount() {}

  _onSelect(ev){
    console.log(ev)
    eventBus.dispatch("setMap", { map: this.state.mapurl[ev.value] });
  }

  render() {
    const { error, maps, isLoaded } = this.state;
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
          <div>
        <div className="mwidget">
            <Table className="align-items-center" responsive>
                <thead className="thead-light">
                <tr>
                    <th scope="col">Map Style</th>
                </tr>
                </thead>
            </Table>
            <Dropdown options={maps} onChange={this._onSelect} value={maps[0]} placeholder="Select an option" />
        </div>
        </div>
      );
    }
  }
}
