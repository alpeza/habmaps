import React, { useState } from "react";
import Header from "../Headers/Header";
import {Card, CardHeader, Col, Container, Row} from "reactstrap";
import Form from "@rjsf/core";
import {NotificationContainer, NotificationManager} from "react-notifications";
import Loader from "react-loader-spinner";

export default class FormC extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            schema: {},
            formdata: {},
            error: ''
        };
        this.getConfs()
        this.getConfs = this.getConfs.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    getConfs(){
        fetch('/config/schema')
            .then( response => response.json() )
            .then(result => {
                this.setState({
                    schema: result.schema,
                    formdata: result.formdata,
                    isLoaded: true
                })
            });
    };
    onSubmit(ev){
        //Hacemos el update
        console.log(ev.formData)
        NotificationManager.info('Trying to update the info')
        this.setState({
            isLoaded: false
        })
        fetch('/config/shared',
            {
                method: 'PUT',
                body: JSON.stringify(ev.formData)
            })
            .then( response => response.json() )
            .then(result => {
                NotificationManager.success('Configuration updated');
                this.getConfs();
            },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                });
    }

    render() {
        const { error, schema,formdata,isLoaded } = this.state;
        if (error) {
            return <div>Algo fue mal al cargar el componente :( : {error.message}</div>;
        } else if (!isLoaded) {
            return (<div>
                    <Header/>
                    <Container className="mt--7" fluid>
                        <div>
                            <Row className="mt-5">
                                <Col className="mb-5 mb-xl-0" xl="12">
                                    <Card className="shadow">
                                        <Loader
                                            type="Puff"
                                            color="#00BFFF"
                                            height={20}
                                            width={20}
                                        />
                                        <CardHeader className="border-0"></CardHeader>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    </Container>
            </div>);
        } else {
            return (
                <>
                    <Header/>
                    {/* Page content */}
                    <Container className="mt--7" fluid>
                        <div>
                            <Row className="mt-5">
                                <Col className="mb-5 mb-xl-0" xl="12">
                                    <Card className="shadow">
                                        <CardHeader className="border-0"></CardHeader>
                                        <Container>
                                            <Form schema={schema}
                                                  formData={formdata}
                                                  onChange={console.log("changed")}
                                                  onSubmit={this.onSubmit}
                                                  onError={console.log("errors")}/>
                                        </Container>
                                        <CardHeader className="border-0"></CardHeader>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                        <NotificationContainer/>
                    </Container>
                </>

            );
        }
    }
}
