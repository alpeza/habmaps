import React from "react";
import DevicesList from "components/Maps/devicesListWidget.jsx";

export default class MapSideBar extends React.Component {
  constructor(props) {
  super(props);
  this.items = props.items
  /*console.log(this.items)*/
  }
  render() {
    return (
            <div className="msidebar">
              {
                this.items.map( It => (
                  <It.widget></It.widget>
                ))
              }
            </div>
    );

  }
}
