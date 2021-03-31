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
    PaginationItem,
    PaginationLink,
    Progress,
    Table,
    Container,CardTitle,
    Row,Col,CardBody,
    UncontrolledTooltip,
} from "reactstrap";
import { BiCar,BiPlanet } from "react-icons/bi";
import Loader from "react-loader-spinner";
import mqtth from "./wscoms"
import Chart from 'react-apexcharts'



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
        this.isRenderable = this.isRenderable.bind(this)
        mqtth("/devices/lastframe","/devices/lastframe",this);
    }

    componentDidMount() {}
    componentWillUnmount() {}

    isRenderable(dat){
        console.log(dat);
        var arr=[]
        for (var i = 0; i < dat.habs.length; i++) {
            if (dat.habs[i].id == this.state.selected){
               var els = Object.keys(dat.habs[i].trace)
                for (var j = 0; j < els.length; j++) {
                    arr.push({
                        "name": els[j].charAt(0).toUpperCase() + els[j].slice(1).replace(/([a-z](?=[A-Z]))/g, '$1 '),
                        "value": Math.round(dat.habs[i].trace[els[j]] * 100 )/100
                    })
                }
                return arr;
            }
        }
        return[]
    }


    render() {
        const { selected, error, data, isLoaded, items } = this.state;
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
                                    this.isRenderable(data).map(item => (
                                        <Col id="circli">

                                                            <Chart
                                                                options={{
                                                                    chart: {
                                                                        height: 380,
                                                                        type: "radialBar",
                                                                    },
                                                                    series: [40],
                                                                    colors: ["#2873B5"],
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
                                                                                strokeWidth: '97%'
                                                                            },
                                                                            dataLabels: {
                                                                                name: {
                                                                                    show: true,
                                                                                    offsetY: -30,
                                                                                    color: "#888",
                                                                                    fontSize: "20px"
                                                                                },
                                                                                value: {
                                                                                    fontSize: "40px",
                                                                                    offsetY: -3,
                                                                                    color:"#2873B5",
                                                                                    show: true,
                                                                                    formatter: function (val) {
                                                                                        return val
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    },
                                                                    fill: {
                                                                        type: "gradient",
                                                                        gradient: {
                                                                            shade: "dark",
                                                                            type: "horizontal",
                                                                            gradientToColors: ["#6096DC"],
                                                                            stops: [0, 100]
                                                                        }
                                                                    },
                                                                    stroke: {
                                                                        lineCap: "butt"
                                                                    },
                                                                    labels: [item.name]
                                                                }}
                                                                series={[item.value]}
                                                                type="radialBar"
                                                                width="100%"
                                                            />

                                        </Col>
                                        )
                                    )
                                }
                        </Row>
                    </Container>
                </div>
            );
        }
    }
}
