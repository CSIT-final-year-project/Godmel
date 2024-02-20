import { Container, Row, Col, Form, FloatingLabel, FormGroup, Image } from "react-bootstrap";
import "./index.css";
import { Divider, Title } from "../../../../components/common/heading/heading.component";
import { ButtonComponent } from "../../../../components/common/button/button.component";
import { NavLink, useNavigate } from "react-router-dom";
import {useForm} from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup"
import Select from 'react-select'
import { useState, useEffect } from "react";
import {toast} from "react-toastify"
import placeholder from "../../../../assets/images/image-placeholder.jpg"
import authSvc from "../auth.service";

const options = [
    { value: 'farmer', label: 'Farmer' },
    { value: 'customer', label: 'Customer' }
]

const RegisterPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [thumb, setThumb] = useState();
    const registerSchema = Yup.object({
        name: Yup.string().min(2).max(50).required(),
        email: Yup.string().email().required(),
        role: Yup.object({
            value: Yup.string().matches(/farmer|customer/),
            label: Yup.string().matches(/Farmer|Customer/)
        }).required()
    })

    const {register, handleSubmit, setValue, setError, formState: {errors}} = useForm({
        resolver: yupResolver(registerSchema)
    });

    const submitHandler = async(data)=>{
        try{
            setLoading(true);
            const response = await authSvc.register(data);
            toast.success(response.message);
            navigate('/');
        }
        catch(except){
            console.log(except);
            toast.error(except.message);
            except.result.map((obj)=>{
                const keys = Object.keys(obj);
                setError(keys[0], {message: obj[keys[0]]});
            })
        }
        finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
        let token = localStorage.getItem('RESTRO_token');
        let user = JSON.parse(localStorage.getItem("_user"));
        if(token && user){
            toast.info("You are already loggedIn");
            navigate('/'+user.role)
        }
    }, [])

    return (<>
        <Container className="register-wrapper p-3 my-5" sm={12} md={{ offset: 4, span: 4 }}>
            <Row>
                <Col sm={12} md={{ offset: 4, span: 4 }}>
                    <Title>Create your account</Title>
                    <Divider></Divider>
                </Col>
            </Row>
            <Row>
                <Col sm={12} md={{ offset: 4, span: 4 }}>
                    <Form onSubmit={handleSubmit(submitHandler)}> 
                        <FormGroup>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Full Name"
                            >
                                <Form.Control type="text" size="sm" {...register("name", {required: true, disabled: loading})} placeholder="Full Name" />
                                <span className="text-danger"><em>{errors?.name?.message}</em></span>
                            </FloatingLabel>
                        </FormGroup>
                        <FormGroup>
                            <FloatingLabel controlId="floatingPassword" label="Email">
                                <Form.Control type="email" size="sm" {...register("email", {required: true, disabled: loading})} placeholder="Your email" />
                                <span className="text-danger"><em>{errors?.email?.message}</em></span>
                            </FloatingLabel>
                        </FormGroup>
                        <FormGroup className="row">
                            <FloatingLabel controlId="floatingImage" label="Image" className="col-sm-8 p-2">
                                <Form.Control type="file" size="sm" placeholder="Profile Picture" disabled={loading} onChange={(e)=>{
                                    const image = e.target.files[0];
                                    const ext = image.name.split(".").pop();
                                    const allowed = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg', 'bmp'];
                                    if(allowed.includes(ext)){
                                        if(image.size <= 3000000){
                                            setThumb(image);
                                            setValue("image", image)
                                        }
                                        else{
                                            setError("image", {message: "File too large. Upload file less than 3MB"})
                                        }
                                    }
                                    else{
                                        setError("image", {message: "File format not supported"})
                                    }
                                }} />
                                <span className="text-danger"><em>{errors?.image?.message}</em></span>
                            </FloatingLabel>
                            <Col sm={4}>
                                <Image src={thumb?URL.createObjectURL(thumb):placeholder} alt="" fluid/>
                            </Col>
                        </FormGroup>
                        <FormGroup className="row mt-3">
                            <Col className="mb-3 text-center">
                                <ButtonComponent label="Sign Up" loading={loading} type="submit"/>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                        <Col className="text-center">
                            Or <br/>
                            <NavLink to="/login">Have account?</NavLink>
                        </Col>
                    </FormGroup>
                    </Form>
                </Col>
            </Row>
        </Container>
    </>)
}

export default RegisterPage;