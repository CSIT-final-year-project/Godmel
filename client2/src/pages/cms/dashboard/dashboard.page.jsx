import { Container, Row, Col, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import dashboardSvc from "./dashboard.service";

const AdminDashboard = () => {
  const [user, setUser] = useState({ userId: "", name: "", role: "" });
  const [dashboardData, setDashboardData] = useState(null);

  const getUser = () => {
    let userData = localStorage.getItem("_user");
    userData = JSON.parse(userData);
    setUser(userData);
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let response;
      if (user.role === "admin") {
        response = await dashboardSvc.adminDash();
        console.log(response)
      } else {
        response = await dashboardSvc.farmerDash();
      }
      setDashboardData(response);
      console.log(response)
    };
    fetchData();
  }, [user]);

  return (
    <>
      <Container fluid>
        <h1 className="mt-4">Dashboard</h1>
        <Row>
          {dashboardData && (
            <>
              <Col lg={3} md={6}>
                <Card className="my-2">
                  <Card.Body>
                    <h5 className="card-title">Total Products</h5>
                    <p className="card-text">{dashboardData.result.product}</p>
                  </Card.Body>
                </Card>
              </Col>
              {user.role === "admin" && (
                <>
                  <Col lg={3} md={6}>
                    <Card className="my-2">
                      <Card.Body>
                        <h5 className="card-title">Total Users</h5>
                        <p className="card-text">{dashboardData.result.user}</p>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col lg={3} md={6}>
                    <Card className="my-2">
                      <Card.Body>
                        <h5 className="card-title">Total Seeds</h5>
                        <p className="card-text">{dashboardData.result.seed}</p>
                      </Card.Body>
                    </Card>
                  </Col>
                </>
              )}
              <Col lg={3} md={6}>
                <Card className="my-2">
                  <Card.Body>
                    <h5 className="card-title">Completed Orders</h5>
                    <p className="card-text">{dashboardData.result.completedOrder}</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={3} md={6}>
                <Card className="my-2">
                  <Card.Body>
                    <h5 className="card-title">Pending Orders</h5>
                    <p className="card-text">{dashboardData.result.pendingOrder}</p>
                  </Card.Body>
                </Card>
              </Col>
            </>
          )}
        </Row>
      </Container>
    </>
  );
};

export default AdminDashboard;
