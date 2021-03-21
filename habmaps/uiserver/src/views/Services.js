import React, { useState } from "react";
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

import Header from "components/Headers/Header.js";
import Form from "@rjsf/core";



const Servicesx  = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");
  const schema = {
  title: "Ejemplo de formulario 1",
  type: "object",
  required: ["title"],
  properties: {
    title: {type: "string", title: "Title", default: "A new task"},
    valor: {type: "string", title: "otro", default: "A new task"},
    done: {type: "boolean", title: "Done?", default: false}
  }
};
  const log = (type) => console.log.bind(console, type);

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
      <div>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">
              <Card className="shadow">
                <CardHeader className="border-0"></CardHeader>
                <Container>
                <Form schema={schema}
                  onChange={log("changed")}
                  onSubmit={log("submitted")}
                  onError={log("errors")} />
                </Container>
                <CardHeader className="border-0"></CardHeader>
              </Card>
            </Col>
        </Row>
      </div>
      </Container>
    </>
  );
};

export default Servicesx;
