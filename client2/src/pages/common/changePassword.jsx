import * as Yup from "yup";
import { Form, Col, Container, Row } from "react-bootstrap"
import { Title, Divider } from "../../component/common/heading/heading.component";
import { ButtonComponent } from "../../component/common/button/button.component"
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import { useEffect, useState } from "react";
import userSvc from "../cms/user/user.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ChangePassword = ()=>{
    const [loading, setLoading ] = useState(false)
    const [user, setUser] = useState({name: "", role: "", userId: ""});
    const navigate = useNavigate();
    const yupSchema = Yup.object({
        oldPassword: Yup.string().required(),
        newPassword: Yup.string()
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,25}$/,
                "Password must contain atlease one small letter, one Uppercase letter, one number and a special Character"
            ).required(), 
        confirmNewPassword: Yup.string().oneOf(
            [Yup.ref('newPassword'), null], "Password does not match"
        )
    })

    const {register, handleSubmit, setError, setValue, formState: {errors}} = useForm({
        resolver: yupResolver(yupSchema)
    })

    useEffect(()=>{
        let user = localStorage.getItem("_user");
        user = JSON.parse(user);
        setUser(user);
    }, [])

    const submitEvent = async(data)=>{
        try{
            setLoading(true);
            let response = await userSvc.changePassword(data);
            toast.success("Password Changed Successfully");
            navigate("/" + user.role);
        }
        catch(except){
            toast.error("Password can't be changed at the moment")
        }
        finally{
            setLoading(false);
        }
    }
    return (<>
        <Container className="login-wrapper my-5">
            <Row>
                <Col sm={12} md={{offset: 3, span:6}}>
                    <Title>Change Password</Title>
                </Col>
            </Row>
            <Divider />
            <Row className="my-3 pb-5">
                <Col sm={12} md={{offset: 3, span:6}}>
                    {
                        <Form onSubmit={handleSubmit(submitEvent)}>
                            <Form.Group className="row mb-3">
                                <Form.Label className="col-sm-3">Old Password: </Form.Label>
                                <Col sm={9}>
                                    <Form.Control 
                                        type="password"
                                        size="sm"
                                        {...register("oldPassword", {required: true, disabled: loading, minLength: 8, maxLength: 25})}
                                        placeholder="Enter your old Password"
                                    />
                                    <span className="text-danger">
                                        <em>{
                                            errors?.oldPassword?.message
                                        }</em>
                                    </span>
                                </Col>
                            </Form.Group>
                            <Form.Group className="row mb-3">
                                <Form.Label className="col-sm-3">New Password: </Form.Label>
                                <Col sm={9}>
                                    <Form.Control 
                                        type="password"
                                        size="sm"
                                        {...register("newPassword", {required: true, disabled: loading, minLength: 8, maxLength: 25})}
                                        placeholder="Enter your Password"
                                    />
                                    <span className="text-danger">
                                        <em>{
                                            errors?.newPassword?.message
                                        }</em>
                                    </span>
                                </Col>
                            </Form.Group>
                            <Form.Group className="row mb-3">
                                <Form.Label className="col-sm-3">Re-Password: </Form.Label>
                                <Col sm={9}>
                                    <Form.Control 
                                        type="password"
                                        size="sm"
                                        {...register("confirmNewPassword", {required: true, disabled: loading})}
                                        placeholder="Re-Enter your new Password"
                                    />
                                    <span className="text-danger">
                                        <em>
                                            {errors?.confirmNewPassword?.message}
                                        </em>
                                    </span>
                                </Col>
                            </Form.Group>
                            
                            <Form.Group className="row mb-3">
                                <Col sm={{offset: 3,span: 9}}>
                                    <ButtonComponent className="btn-danger me-3" type="reset" label="Cancel"></ButtonComponent>
                                    <ButtonComponent type="submit" label="Submit"></ButtonComponent>
                                </Col>
                            </Form.Group>
                        </Form>
                    }
                    
                </Col>
            </Row>
        </Container>
    </>)
}

export default ChangePassword