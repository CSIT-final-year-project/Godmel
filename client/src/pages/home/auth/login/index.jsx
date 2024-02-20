import { Container, Row, Col, Form, FormGroup, FloatingLabel, Image } from "react-bootstrap";
import { Divider, Title } from "../../../../components/common/heading/heading.component";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { ButtonComponent } from "../../../../components/common/button/button.component";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import authSvc from "../auth.service";


const LoginPage = () => {
    const loginSchema = Yup.object({
        email: Yup.string().email().required(),
        password: Yup.string().required()
    })
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(loginSchema)
    });

    const submitHandler = async(data)=>{
        try{
            setLoading(true)
            const response = await authSvc.login(data);
            const userDetail = response.result.user;
            console.log(response)
            localStorage.setItem("_user", JSON.stringify({
                ...userDetail
            }))
            toast.success(`Welcome ${userDetail.name}`);
            navigate('/'+userDetail.role);
        }
        catch(except){
            toast.error(except.message);
        }
        finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        let token = localStorage.getItem('_au');
        let user = JSON.parse(localStorage.getItem('_user'));
        if(token && user){
            toast.info("You are already loggedIn");
            navigate('/'+user.role);
        }
    }, [])
    return (<>
        <Container className="register-wrapper p-3 my-5" sm={12} md={{ offset: 4, span: 4 }}>
            <Row>
                <Col sm={12} md={{ offset: 4, span: 4 }}>
                    <Title>Sign In</Title>
                    <Divider></Divider>
                </Col>
            </Row>
            <Row>
                <Col sm={12} md={{ offset: 4, span: 4 }}>
                    <Form onSubmit={handleSubmit(submitHandler)}>
                        <FormGroup>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Email"
                            >
                                <Form.Control type="text" size="sm" {...register("email", { required: true, disabled: loading })} placeholder="Email" />
                                <span className="text-danger"><em>{errors?.email?.message}</em></span>
                            </FloatingLabel>
                        </FormGroup>
                        <FormGroup>
                            <FloatingLabel controlId="floatingPassword" label="Password">
                                <Form.Control type="password" size="sm" {...register("password", { required: true, disabled: loading })} placeholder="Password" />
                                <span className="text-danger"><em>{errors?.password?.message}</em></span>
                            </FloatingLabel>
                        </FormGroup>
                        <FormGroup>
                            <Col className="text-secondary">
                                Or,&nbsp;<NavLink to="/forget-password">Forgot your password?</NavLink>
                            </Col>
                        </FormGroup>
                        
                        <FormGroup className="row mt-3">
                            <Col className="mb-3 text-center">
                                <ButtonComponent label="Log In" loading={loading} type="submit" className="btn-primary"/>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col className="text-center text-secondary">
                                Or <br />
                                <NavLink to="/register">Create an account?</NavLink>
                            </Col>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
        </Container>
    </>)
}

export default LoginPage