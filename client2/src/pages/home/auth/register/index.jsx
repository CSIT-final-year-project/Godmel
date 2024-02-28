import { Container, Row, Col, Form, Image } from "react-bootstrap";
import { Title } from "../../../../component/common/heading/heading.component";
import { Divider } from "../../../../component/common/heading/heading.component";
import { ButtonComponent } from "../../../../component/common/button/button.component";
import {useForm} from "react-hook-form"
import placeholder from "../../../../assets/image/placeholder.webp"
import { useState, useEffect } from "react";

import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";

import Select from 'react-select'
import { toast } from "react-toastify";
import authSvc from "../auth.service";
import { useNavigate } from "react-router-dom";

const options = [
    { value: 'farmer', label: 'Farmer' },
    { value: 'customer', label: 'Consumer' }
]


const RegistrationPage = () => {
    const [thumb, setThumb] = useState()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const registerSchema = Yup.object({
        name: Yup.string().min(2).max(30).required(),
        email: Yup.string().email().required(),
        role: Yup.object({
            value: Yup.string().matches(/customer|farmer/),
            label: Yup.string().matches(/Consumer|Farmer/)
        }).required()
    })
    const {register, handleSubmit,setValue, setError, formState: {errors}} = useForm({
        resolver: yupResolver(registerSchema)
    })
    
    const registerSubmit = async(data) => {
        try{
            setLoading(true)
            data.role = data.role.value;
            
            const response = await authSvc.registerProcess(data)
            
            toast.success("Check email for further processing");
            navigate("/")
        } catch(exception) {
            console.log(exception)
            toast.error(exception.message)
            
            exception.result.map((obj)=>{
                const keys = Object.keys(obj);
                setError(keys[0], {message: obj[keys[0]]});
            })
        } finally {
            setLoading(false)
        }
    }


    useEffect(()=>{
        let token = localStorage.getItem('_au')
        let user = JSON.parse(localStorage.getItem("_user"));
        if(token && user) {
            toast.info("You are already logged In")
            navigate('/'+user.role)
        }
    },[])

    return (<>
    <Container className="login-wrapper my-5">
            <Row>
                <Col sm={12} md={{offset: 3, span:6}}>
                    <Title>Register Page</Title>
                </Col>
            </Row>
            <Divider />
            <Row className="my-3 pb-5">
                <Col sm={12} md={{offset: 2, span:8}}>
                    <Form onSubmit={handleSubmit(registerSubmit)}>
                        <Form.Group className="row mb-3">
                            <Form.Label className="col-sm-3">Full name: </Form.Label>
                            <Col sm={9}>
                                <Form.Control 
                                    type="text"
                                    size="sm"
                                    {...register("name", {required: true, disabled: loading})}
                                    placeholder="Enter your Name"
                                />
                                <span className="text-danger">
                                    <em>{errors?.name?.message}</em>
                                </span>
                            </Col>
                        </Form.Group>
                        <Form.Group className="row mb-3">
                            <Form.Label className="col-sm-3">Email: </Form.Label>
                            <Col sm={9}>
                                <Form.Control 
                                    type="email"
                                    size="sm"
                                    {...register("email", {required: true, disabled: loading})}
                                    placeholder="Enter your email"
                                />
                                <span className="text-danger">
                                    <em>{errors?.email?.message}</em>
                                </span>
                            </Col>
                        </Form.Group>
                        
                        <Form.Group className="row mb-3">
                            <Form.Label className="col-sm-3">Role: </Form.Label>
                            <Col sm={9}>
                                <Select 
                                    isDisabled={loading}
                                    options={options} 
                                    onChange={(selOpts) => {
                                        setValue("role", selOpts)
                                    }}
                                />
                                <span className="text-danger">
                                    <em>{errors?.role?.message}</em>
                                </span>
                            </Col>
                        </Form.Group>

                        <Form.Group className="row mb-3">
                            <Form.Label className="col-sm-3">Image: </Form.Label>
                            <Col sm={7}>
                                <Form.Control 
                                    type="file"
                                    size="sm"
                                    disabled={loading}
                                    onChange={(e) => {
                                        //{{},{},{}} ==> [{},{},{}]
                                        // const files = Object.values(e.target.files); 
                                        const image = e.target.files[0]
                                        const ext = (image.name.split(".")).pop();
                                        if(['jpg','png','jpeg','gif','svg','bmp','webp'].includes(ext.toLowerCase())){
                                            if(image.size <= 3000000){
                                                // 
                                                setThumb(image);
                                                setValue('image', image)
                                            } else {
                                                setError("image", "File should be less then 3mb.")
                                            }
                                        } else {
                                            setError("image", "File format not supported")
                                        }
                                    }}
                                />
                                <span className="text-danger">
                                    <em>{errors?.image?.message}</em>
                                </span>
                            </Col>
                            <Col sm={2}>
                                <Image src={thumb ? URL.createObjectURL(thumb) : placeholder} fluid alt="" />
                            </Col>
                        </Form.Group>

                        <Form.Group className="row mb-3">
                            <Col sm={{offset: 3,span: 9}}>
                                Or&nbsp;&nbsp;&nbsp;&nbsp;
                                <a href="/forget-password">
                                    Forget Password?
                                </a>
                            </Col>
                        </Form.Group>
                        <Form.Group className="row mb-3">
                            <Col sm={{offset: 3,span: 9}}>
                                <ButtonComponent loading={loading} className="btn-danger me-3" type="reset" label="Cancel"></ButtonComponent>
                                <ButtonComponent loading={loading} type="submit" label="Submit"></ButtonComponent>
                            </Col>
                        </Form.Group>
                    </Form>

                    Or&nbsp;&nbsp;&nbsp;&nbsp; <a href="/register">Create an Account</a>
                </Col>
            </Row>
        </Container>
    </>)
}

export default RegistrationPage;