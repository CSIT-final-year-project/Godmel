import { Container, Row, Col, Button, Form } from "react-bootstrap"
import { Title, Divider } from "../heading/heading.component"
import { useForm } from "react-hook-form"
import * as Yup from "yup"

import { yupResolver } from "@hookform/resolvers/yup"
import { ErrorMessage } from "../validation-message/validation-message.component"
import { ButtonComponent } from "../button/button.component"


const CropRecommendationForm = ({submitHandler, loading=false})=>{
    const cropSchema = Yup.object({
        nitrogen: Yup.number().min(0).max(200).required(),
        phosphorous: Yup.number().min(0).max(200).required(),
        potassium: Yup.number().min(0).max(300).required(),
        ph: Yup.number().min(0).max(10).required(),
        rainfall: Yup.number().min(0).max(400).required(),
        city: Yup.string().required()
    })

    const {register, handleSubmit, formState: {errors}} =useForm({
        resolver: yupResolver(cropSchema)
    })
    const submitForm =(data) => {
        // mapping 
        console.log(data)
        submitHandler(data);
    }
    return (<>
        <Container className="my-5">
            <Row>
                <Col sm={12} md={{ offset: 3, span: 6 }}>
                    <Title>Crop Recommendation</Title>
                </Col>
            </Row>
            <Divider />
            <Row className="my-3 pb-5">
                <Col sm={12} md={{ offset: 2, span: 8 }}>
                    <Form onSubmit={handleSubmit(submitForm)}>
                        <Form.Group as={Row} className="mb-3" >
                            <Form.Label column sm={3}>
                                Nitrogen
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control type="number" placeholder="Enter nitrogen content of soil" {...register("nitrogen", {required: true, disabled: loading})} />
                                <span className="text-danger">
                                    <em>{errors?.nitrogen?.message}</em>
                                </span>                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" >
                            <Form.Label column sm={3}>
                                Phosphorous
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control type="number" placeholder="Enter phosphorous content of soil" {...register("phosphorous", {required: true})}/>
                                <span className="text-danger">
                                    <em>{errors?.phosphorous?.message}</em>
                                </span>                            
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" >
                            <Form.Label column sm={3}>
                                Potassium
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control type="number" placeholder="Enter potassium content of soil" {...register("potassium", {required: true})}/>
                                <span className="text-danger">
                                    <em>{errors?.potassium?.message}</em>
                                </span>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" >
                            <Form.Label column sm={3}>
                                pH 
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control type="number" placeholder="Enter pH value of soil" {...register("ph", {required: true})}/>
                                <span className="text-danger">
                                    <em>{errors?.ph?.message}</em>
                                </span>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" >
                            <Form.Label column sm={3}>
                                Rainfall
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control type="number" placeholder="Enter rainfall" {...register("rainfall", {required: true})}/>
                                <span className="text-danger">
                                    <em>{errors?.rainfall?.message}</em>
                                </span>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" >
                            <Form.Label column sm={3}>
                                City
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control type="text" placeholder="Enter your cityname" {...register("city", {required: true})}/>
                                <span className="text-danger">
                                    <em>{errors?.city?.message}</em>
                                </span>
                            </Col>
                        </Form.Group>
                        
                        <Form.Group className="row mb-3">
                            <Col sm={{ span: 10, offset: 2 }}>
                                <ButtonComponent label="Get Recommendation" type="submit" className="btn-success"/>
                            </Col>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    </>)
}

export default CropRecommendationForm