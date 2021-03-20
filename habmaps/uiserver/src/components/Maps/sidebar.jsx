import React from "react";
export default class MapSideBar extends React.Component {
  constructor(props) {
  super(props);
  this.items = props.items
  this.state = {
    openPanel: true,
    setOpenPanel: false
  };
  }
  render() {
    return (
          <div>
              <div className="msidebar">
                {
                  this.items.map( It => (
                    <It.widget></It.widget>
                  ))
                }
              </div>
          </div>

    );

  }
}
