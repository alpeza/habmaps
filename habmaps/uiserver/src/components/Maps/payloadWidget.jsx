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
    Container,
    Row,Col,
    UncontrolledTooltip,
} from "reactstrap";
import { BiCar,BiPlanet } from "react-icons/bi";
import Loader from "react-loader-spinner";
import mqtth from "./wscoms"
import GaugeChart from 'react-advanced-gauge-chart'

export default class PayloadWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            data: []
        };
        mqtth("devices/status","/devices/status",this);
    }

    componentDidMount() {}
    componentWillUnmount() {}

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
                <div className="mwidget payloadind">
                    <Container>
                        <Row>
                            <Col>
                                <div className="wtitle">Temperatura 1</div>
                                <GaugeChart id="gauge-chart2"
                                            percent={0.06}
                                            nrOfLevels={3}
                                            marginInPercent={0.05}
                                            arcWidth={0.06}
                                            textColor= 'white'
                                            cornerRadius={2}
                                            style={{
                                                "width" : '20%'
                                            }}
                                            formatTextValue= { value =>  value }
                                /><
                            /Col>

                        </Row>
                    </Container>
                </div>
            );
        }
    }
}
