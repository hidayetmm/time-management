import React from "react";
import { Result, Button } from "antd";

const NotFound = () => {
  return (
    <Result
      style={{ paddingTop: "12%" }}
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button href="/" type="primary">
          Back Home
        </Button>
      }
    />
  );
};

export default NotFound;
