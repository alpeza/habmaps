import React from "react";
import {
    Container,
    Row,Col
} from "reactstrap";

import Loader from "react-loader-spinner";
import mqtth from "./wscoms"
import Chart from 'react-apexcharts'
import LocalCache from "./LocalCache";

export default class PayloadWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            data: [],
            selected: 'superhab',
            vault: {}
        };
        this.lc = new LocalCache()
        this.setState({
            selected: this.lc.getKey('current_hab')
        })
        this.isRenderable = this.isRenderable.bind(this)
        this.proportional = this.proportional.bind(this)
        mqtth("/devices/lastframe","/devices/lastframe",this);
    }

    componentDidMount() {}
    componentWillUnmount() {}

    isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }

    proportional (val){
        var retval = val * 100;
        if(val >= 0.0 && val < 1.0){
            retval = retval / 1
        }else if(val >= 1.0 && val < 10.0){
            retval = retval / 10
        }else if(val >= 10.0 && val < 100.0){
            retval = retval / 100
        }else if(val >= 100.0 && val < 1000.0){
            retval = retval / 1000
        }else if(val >= 1000.0 && val < 3000.0){
            retval = retval / 3000
        }else{
            retval = val
        }
        retval = Math.round(retval * 100) / 100
        //console.log(retval)
        return [retval,val]
    }

    isRenderable(dat){
        var selected= this.lc.getKey('current_hab');
        console.log(selected);
        var arr=[]
        for (var i = 0; i < dat.habs.length; i++) {
            if (dat.habs[i].id == selected){
               var els = Object.keys(dat.habs[i].trace)
                for (var j = 0; j < els.length; j++) {
                    if (this.isNumber(dat.habs[i].trace[els[j]])){
                        arr.push({
                            "id": els[j],
                            "name": els[j].charAt(0).toUpperCase() + els[j].slice(1).replace(/([a-z](?=[A-Z]))/g, '$1 '),
                            "value": Math.round(dat.habs[i].trace[els[j]] * 100 )/100,
                            "type": "Number"
                        })
                    }else{
                        arr.push({
                            "id": els[j],
                            "name": els[j].charAt(0).toUpperCase() + els[j].slice(1).replace(/([a-z](?=[A-Z]))/g, '$1 '),
                            "value": dat.habs[i].trace[els[j]],
                            "type": "Notnumber"
                        })
                    }
                }
                return arr;
            }
        }
        return[]
    }


    render() {
        const { error, data, isLoaded } = this.state;
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
                <div className="mwidget payloadind">
                    <Container>
                        <Row>
                                {
                                    this.isRenderable(data).map(item => {
                                            return item.type == "Number" ?
                                                <Col id="circli" align="center">
                                                    <Chart
                                                        options={{
                                                            chart: {
                                                                type: "radialBar",
                                                            },
                                                            //colors: ["#2873b5"],
                                                            plotOptions: {
                                                                radialBar: {
                                                                    startAngle: -110,
                                                                    endAngle: 110,
                                                                    hollow: {
                                                                        margin: 25,
                                                                        size: "70%"
                                                                    },
                                                                    track: {
                                                                        background: '#ddd',
                                                                        startAngle: -110,
                                                                        endAngle: 110,
                                                                        strokeWidth: '97%',
                                                                        opacity: 0.0,
                                                                    },
                                                                    dataLabels: {
                                                                        name: {
                                                                            show: true,
                                                                            offsetY: 40,
                                                                            color: "#888",
                                                                            fontSize: "16px"
                                                                        },
                                                                        value: {
                                                                            fontSize: "35px",
                                                                            offsetY: -3,
                                                                            color: "#2873B5",
                                                                            show: true,
                                                                            formatter: function (val) {
                                                                                //return val;
                                                                                return val.toString().length > 5 ? Math.ceil(val) : val
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            },
                                                            fill: {
                                                                type: "gradient",
                                                                gradient: {
                                                                    shade: "dark",
                                                                    type: "vertical",
                                                                    gradientToColors: ["#6096dc"],
                                                                    stops: [0,50, 100],
                                                                    opacityFrom: 0.0,
                                                                    opacityTo: 0.0,
                                                                }
                                                            },
                                                            stroke: {
                                                                lineCap: "butt"
                                                            },
                                                            labels: [item.name]
                                                        }}
                                                        series={[item.value]}
                                                        type="radialBar"
                                                        width="200px"
                                                        height="auto"
                                                    />

                                                </Col>
                                                :
                                                <Col id="circli">
                                                    <Row>
                                                        {[item.name]}
                                                    </Row>
                                                    <Row>
                                                        {[item.value]}
                                                    </Row>
                                                </Col>
                                        }
                                    )
                                }
                        </Row>
                    </Container>
                </div>
            );
        }
    }
}
