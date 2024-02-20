import { Container, Row, Col, Spinner } from "react-bootstrap"
import { Divider, Title } from "../../../../components/common/heading/heading.component"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import authSvc from "../auth.service";
import { toast } from "react-toastify";
import PasswordSetComponent from "../../../../components/home/auth/password.component";

const ActivationPage = ()=>{
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const navigate = useNavigate();

    const verifyToken = async()=>{
        try{
            const verified = await authSvc.getActivationTokenVerify(params.token);
            setLoading(false);
        }
        catch(except){
            console.log("Verify Token" , except);
            toast.error(except.message);
            navigate('/')
        }
    }

    useEffect(()=>{
        verifyToken()
    }, [params])

    const submitHandler = async(data)=>{
        try{
            let response = await authSvc.setPassword(params.token, data);
            toast.success(response.message);
            navigate('/login');
        }
        catch(except){
            toast.error(except.message);
            navigate('/');
        }
    }   
    return (<>
        <Container className="my-5">
            <Row>
                <Col sm={12} md={{offset: 4, span: 4}}>
                    <Title>Activate Your Account</Title>
                    <Divider/>
                </Col>
            </Row>
            <Row>
                <Col sm={12} md={{offset:4, span:4}}>
                    {
                        (loading)?<>
                            <div className="text-center">
                                <Spinner variant="dark"/>   
                            </div>
                            
                        </>:<PasswordSetComponent submitHandler={submitHandler}/>
                    }
                </Col>
            </Row>
        </Container>
    </>)
}

export default ActivationPage