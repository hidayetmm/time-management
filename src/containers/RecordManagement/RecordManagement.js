import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import moment from "moment";
import AuthContext from "../../context/AuthContext";
import { Row, Col } from "antd";
import TimeManager from "./TimeManager/TimeManager";
import ManagerData from "./ManagerData/ManagerData";

import { Layout } from "antd";

const { Content, Footer } = Layout;

function RecordManagement() {
  const [data, setData] = useState([]);
  const [range, setRange] = useState(null);
  const [filtered, setFiltered] = useState(false);
  const dateFormat = "YYYY-MM-DD";

  const [isLoading, setIsLoading] = useState(false);

  const userValue = useContext(AuthContext);

  const fetchData = () => {
    setIsLoading(true);

    let url = "https://time-mgm-demo.getsandbox.com:443/users/";
    let id = userValue.userDetails.id;
    axios
      .get(url + id + "/records")
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

  const fetchFiltered = (confirm) => {
    confirm();
    setFiltered(true);
    if (range === null) {
      return;
    }
    const dateFrom = moment(range[0]).format(dateFormat);
    const dateTo = moment(range[1]).format(dateFormat);
    setIsLoading(true);

    let url = "https://time-mgm-demo.getsandbox.com:443/users/";
    let id = userValue.userDetails.id;
    axios
      .get(url + id + "/records", {
        params: {
          dateFrom: dateFrom,
          dateTo: dateTo,
        },
      })
      .then((response) => {
        setIsLoading(false);
        setData(response.data.data);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  return (
    <AuthContext.Consumer>
      {(value) => {
        // console.log("CONTEXT: ", value);
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
                      setRange={(range) => setRange(range)}
                      filter={fetchFiltered}
                      filtered={filtered}
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
