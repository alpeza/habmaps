import React from "react";
import DevicesList from "components/Maps/devicesListWidget.jsx";
import SignalsWidget from "components/Maps/signalsWidget.jsx";
import PayloadWidget from "./payloadWidget";
export default class Mosaic extends React.Component {
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
          <div className="mosaic">
              <div className="navmap">
                  <img
                      alt="..."
                      style={{
                          width: 'auto',
                          height: '50px',
                          padding: '10px'
                      }}
                      src={
                          require("../../assets/img/brand/argon-react-white.png").default
                      }
                  />
              </div>
            <div className="right">
                <DevicesList></DevicesList>

            </div>
            <div className="bottomm">
                <PayloadWidget></PayloadWidget>
            </div>
            <div className="top"></div>
              <div className="left">
                  <SignalsWidget></SignalsWidget>
              </div>
          </div>
    );

  }
}
