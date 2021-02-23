import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col } from "antd";
import UserManager from "./UserManager/UserManager";
import UserData from "./UserData/UserData";

import { Layout } from "antd";

const { Content, Footer } = Layout;

function UserManagement() {
  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const fetchData = () => {
    setIsLoading(true);

    let url = "https://time-mgm-demo.getsandbox.com:443/users";
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
    <div>
      <Layout style={{ height: "100vh" }}>
        <Content style={{ padding: "200px 150px 100px 150px" }}>
          <Row>
            <Col span={22} offset={1}>
              <UserManager fetchProp={fetchData} />
            </Col>
          </Row>
          <Row>
            <Col span={22} offset={1}>
              <UserData data={data} loading={isLoading} fetchProp={fetchData} />
            </Col>
          </Row>
        </Content>
        <Footer style={{ textAlign: "center" }}>Time Management ©2021</Footer>
      </Layout>
    </div>
  );
}

export default UserManagement;
