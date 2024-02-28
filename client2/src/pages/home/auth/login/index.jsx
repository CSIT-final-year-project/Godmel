import { Container, Row, Col, Form, FormGroup } from "react-bootstrap";
import { ButtonComponent } from "../../../../component/common/button/button.component";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Title, Divider } from "../../../../component/common/heading/heading.component";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup"
import authSvc from "../auth.service";
import { toast } from "react-toastify";
import { useEffect } from "react";


const LoginPage = (props)=>{
    const navigate = useNavigate();
    const LoginSchema = Yup.object({
        email: Yup.string().email().required(),
        password: Yup.string().required()
    })
    const { register, handleSubmit,  formState: {errors}} = useForm({
        resolver: yupResolver(LoginSchema)
    });

    const loginSubmit = async (data)=>{
        try{
            let response = await authSvc.loginUser(data);
            console.log(response)
            const userDetail = response.user;
            localStorage.setItem("_user", JSON.stringify({
                ...userDetail
            }))
            console.log(userDetail.name, userDetail.role);
            toast.success(`${userDetail.name}!!!Welcome to ${userDetail.role} panel !!!`);
            navigate('/'+userDetail.role);
            
        }
        catch(except){
            toast.error(except.message)
        }
    }

    console.log(errors)
    useEffect(()=>{
        let token = localStorage.getItem('_au');
        let user = JSON.parse(localStorage.getItem("_user"));
        if(token && user){
            toast.info("You are already loggedIn");
            navigate('/'+user.role)
        }
    })
   
    return (<>
        <Container className="login-wrapper my-5">
            <Row>
                <Col sm={12} md={{offset: 3, span: 6}}> 
                    <Title>Login Page</Title>
                </Col>
            </Row>
            <Divider/>
            <Col sm={12} md={{offset:3, span: 6}}>
                <Form onSubmit={handleSubmit(loginSubmit)}>
                    <FormGroup className="row mb-3">
                        <Form.Label className="col-sm-3">Email</Form.Label>
                        <Col sm={9}>
                            <Form.Control type="email" size="sm" {...register("email", {required: true})} placeholder="Enter your username"/>
                            <span className="text-danger"><em>{errors?.email?.message}</em></span>
                        </Col>
                    </FormGroup>
                    <FormGroup className="row mb-3">
                        <Form.Label className="col-sm-3">Password</Form.Label>
                        <Col sm={9}>
                            <Form.Control type="password" size="sm" {...register("password", {required: true})} placeholder="Enter your password"/>
                            <span className="text-danger"><em>{ errors?.password?.message}</em></span>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={{offset:3, span: 9}} className="mb-3"> 
                            Or &nbsp; <NavLink to="/forget-password">Forget password? </NavLink>
                        </Col>
                    </FormGroup>
                    <FormGroup className="row mb-3">
                        <Col sm={{offset:3, span: 9}}>
                            <ButtonComponent label="Submit" className="btn-success me-3" type="submit"/>
                            <ButtonComponent label="Reset" className="btn-danger me-3" type="reset"/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col>
                            Or <NavLink to="/register">No account?</NavLink>
                        </Col>
                    </FormGroup>
                </Form>
            </Col>
        </Container>
    </>
    )
}



export default LoginPage