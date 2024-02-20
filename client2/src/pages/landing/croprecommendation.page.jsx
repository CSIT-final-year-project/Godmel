import { Container, Row, Col, Button, Form } from "react-bootstrap"
import { Title, Divider } from "../../component/common/heading/heading.component"

const CropRecommendationPage = () => {
    return (<>
        <Container className="my-5">
            <Row>
                <Col sm={12} md={{ offset: 3, span: 6 }}>
                    <Title>Crop Recommendation</Title>
                </Col>
            </Row>
            <Divider />
            <Row className="my-3 pb-5">
                <Col sm={12} md={{ offset: 3, span: 6 }}>
                    <Form>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={2}>
                                Nitrogen
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="number" placeholder="Enter nitrogen content of soil" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={2}>
                                Phosphorous
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="number" placeholder="Enter phosphorous content of soil" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={2}>
                                Potassium
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="number" placeholder="Enter potassium content of soil" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={2}>
                                pH 
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="number" placeholder="Enter pH value of soil" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={2}>
                                Rainfall
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="number" placeholder="Enter rainfall" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={2}>
                                City
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" placeholder="Enter your cityname" />
                            </Col>
                        </Form.Group>

                        
                        <Form.Group as={Row} className="mb-3">
                            <Col sm={{ span: 10, offset: 2 }}>
                                <Button className="btn btn-sm btn-success" type="submit">Get Recommendation</Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    </>)
}

export default CropRecommendationPage