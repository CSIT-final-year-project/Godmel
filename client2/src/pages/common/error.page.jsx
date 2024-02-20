import { Container, Row, Col } from "react-bootstrap"
import { NavLink } from "react-router-dom"

export const Error404 = ()=>{
    return(<>
        <Container className="my-5" style={{background: "rgb(255 0 0 / 37%)"}}>
            <Row>
                <Col sm={12}>
                    <p className="text-danger text-center">Oops! Page not found</p>
                    <p className="text-danger text-center">Redirect
                        &nbsp; &nbsp; 
                        <NavLink to={"/"}> back to home page</NavLink> 
                    </p>
                </Col>
            </Row>
        </Container>
    </>)
}