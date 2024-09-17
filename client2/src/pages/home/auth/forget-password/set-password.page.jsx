import React, { useEffect, useState } from "react";

import { Container, Row, Col, Spinner } from "react-bootstrap";
import { Title } from "../../../../component/common/heading/heading.component";
import { Divider } from "../../../../component/common/heading/heading.component";
import PasswordSetComponent from "../../../../component/home/auth/password-set.component";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import authSvc from "../auth.service";

const SetPasswordPage = () => {
  // TODO: Verify the token
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [loading2, setLoading2] = useState();

  const verifyToken = async () => {
    try {
      const verified = await authSvc.getActivationTokenVerify(params.token);
      console.log(verified);
      setLoading(false);
      setLoading2(false);
      console.log(loading2);
    } catch (exception) {
      console.log("exception", exception);
      toast.error(exception.message);
      navigate("/login");
    }
  };
  useEffect(() => {
    verifyToken();
  }, [params]);

  useEffect(() => {
    setLoading2(true);
  }, []);

  const submitEvent = async (data) => {
    try {
      let response = await authSvc.activateUser(params.token, data);
      toast.success(response.message);
      navigate("/login");
    } catch (exception) {
      //
      toast.error(exception.message);
      console.log("here");
      navigate("/");
    }
  };

  return (
    <>
      <Container className="login-wrapper my-5">
        <Row>
          <Col sm={12} md={{ offset: 3, span: 6 }}>
            <Title>Set Password Page</Title>
          </Col>
        </Row>
        <Divider />
        <Row className="my-3 pb-5">
          <Col sm={12} md={{ offset: 3, span: 6 }}>
            {loading2 ? (
              <>
                <div className="text-center">
                  <Spinner variant="dark" />
                </div>
              </>
            ) : (
              <PasswordSetComponent submitEvent={submitEvent} />
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default SetPasswordPage;
