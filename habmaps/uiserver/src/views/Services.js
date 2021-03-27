import React, { useState } from "react";
import classnames from "classnames";
// reactstrap components

import FormC from "../components/Services/FormC";

const Servicesx  = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");

  return (
    <>
       <FormC></FormC>
    </>
  );
};

export default Servicesx;
