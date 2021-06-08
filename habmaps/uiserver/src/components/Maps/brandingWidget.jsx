import React from "react";
import {
  Table
} from "reactstrap";
import Loader from "react-loader-spinner";
const prettyMilliseconds = require('pretty-ms');


export default class BrandingWidget extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: true,
      };
    }

  componentDidMount() {}
  componentWillUnmount() {}

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
          <div class='brandpic'>
            <div style={{background: 'rgba(0,0,0,0.0)', marginTop: '15px', transform: 'scale(0.9)'}} >
              <img
                            alt="..."
                            style={{
                                width: 'auto',
                                height: '5em',
                                'mix-blend-mode': 'multiply',
                                'background-blend-mode': 'multiply'
                            }}
                            src={
                                require("../../assets/img/brand/company.png").default
                            }
                        />
              </div>
        </div>
      );
    }
  }
}
