import React from "react";
import AuthContext from "../../context/AuthContext";
// import classes from "./TimeManagement.module.css";
import { Row, Col } from "antd";

import TimeManager from "./TimeManager/TimeManager";
import ManagerData from "./ManagerData/ManagerData";
import { Layout } from "antd";

const { Content, Footer } = Layout;

function TimeManagement() {
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
                    <TimeManager />
                  </Col>
                </Row>
                <Row>
                  <Col span={22} offset={1}>
                    <ManagerData />
                  </Col>
                </Row>
              </Content>
              <Footer style={{ textAlign: "center" }}>
                Ant Design ©2018 Created by Ant UED
              </Footer>
            </Layout>
          </div>
        );
      }}
    </AuthContext.Consumer>
  );
}

export default TimeManagement;
