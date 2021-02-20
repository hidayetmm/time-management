import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import { Row, Col } from "antd";
import TimeManager from "./TimeManager/TimeManager";
import ManagerData from "./ManagerData/ManagerData";

import { Layout } from "antd";

const { Content, Footer } = Layout;

function RecordManagement() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = () => {
    setIsLoading(true);

    let url = "https://time-mgm-demo.getsandbox.com:443/records";
    axios
      .get(url)
      .then((response) => {
        setIsLoading(false);
        setData(response.data.data);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <AuthContext.Consumer>
      {(value) => {
        console.log("CONTEXT: ", value);
        return (
          <div>
            <Layout style={{ height: "100vh" }}>
              <Content style={{ padding: "150px 40px" }}>
                <Row>
                  <Col span={22} offset={1}>
                    <TimeManager fetchProp={fetchData} />
                  </Col>
                </Row>
                <Row>
                  <Col span={22} offset={1}>
                    <ManagerData
                      data={data}
                      loading={isLoading}
                      fetchProp={fetchData}
                    />
                  </Col>
                </Row>
              </Content>
              <Footer style={{ textAlign: "center" }}>
                Time Management ©2021
              </Footer>
            </Layout>
          </div>
        );
      }}
    </AuthContext.Consumer>
  );
}

export default RecordManagement;
