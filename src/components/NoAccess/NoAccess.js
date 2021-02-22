import React from "react";
import { Result, Button } from "antd";

const NoAccess = () => {
  return (
    <Result
      style={{ paddingTop: "12%" }}
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button href="/" type="primary">
          Back Home
        </Button>
      }
    />
  );
};

export default NoAccess;
