import { Navigate, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import authSvc from "../home/auth/auth.service";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

const PermissionCheck = ({ accessBy, Component})=>{
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState()
    const navigate = useNavigate();

    const getLoggedInUser = async()=>{
        try{
            const response = await authSvc.getLoggedInUser();
            setUser(response.result);

        }
        catch(except){
            localStorage.removeItem("_au");
            toast.error("Session Expired");
            navigate('/login')
        }
        finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
        let token = localStorage.getItem("_au");
        if(!token){
            toast.error('you are not logged in');
            navigate('/login')
        }
        else{
            getLoggedInUser()
        }
    }, [])

    if(loading){
        return(<>
            <Container>
                <Row sm={12}>
                    <Col className="text-center my-5 py-5">
                        <Spinner variant="success"></Spinner>
                    </Col>
                </Row>
            </Container>
        </>)
    }
    else if(user.role === accessBy)
        return Component
    else
        return <Navigate to={'/'+ user.role}/>
}

export default PermissionCheck