import { useEffect, useState } from "react";
import { Container, Row, Spinner, Col } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import authSvc from "../home/auth/auth.service";

const PermissionCheck = ({
    accessBy, 
    Component,
    children
}) => {
    // if loggedin, and has accessBy role 
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState()
    const navigate = useNavigate()


    const getLoggedInUser = async () => {
        try {
            const response = await authSvc.getLoggedInUser()

            setUser(response.result)
        } catch(exception) {
            localStorage.removeItem("_au")
            toast.error("You are not logged In!!")
            navigate("/")
        } finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        let token = localStorage.getItem("_au")
        if(!token) {
            toast.error("You are not logged In!!")
            navigate("/")
        } else {
            getLoggedInUser()
        }
    }, [])
    
    if(loading) {
        return (<>
            <Container>
                <Row>
                    <Col className="text-center my-5 py-5">
                        <Spinner variant="success"></Spinner>
                    </Col>
                </Row>
            </Container>
        </>)
    } else if(user.role === accessBy) {
        return Component
    } else {
        return <Navigate to={"/"+user.role}></Navigate>
    }
    
}

export default PermissionCheck