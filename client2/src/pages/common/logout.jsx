import { useEffect, useState } from "react"
import { Container, Spinner, Row } from "react-bootstrap"
import authSvc from "../home/auth/auth.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LogoutPage = ()=>{
    const navigate = useNavigate();

    const logoutHandler = async()=>{
        try{
            await authSvc.logout();
            localStorage.removeItem("_user");
            localStorage.removeItem("_au");
            localStorage.removeItem("_rt");
            toast.success("Logout Successfully");
            navigate("/");
        }
        catch(except){
            toast.error(except.message);
        }
    }


    useEffect(()=>{
        logoutHandler();
    }, [navigate]);

    return(<>
            <Container className="text-center mt-5">
                <div className="text-center">
                    <Spinner variant="black"/>
                </div>
                <Row>
                    <h4>Logging out ...</h4>
                </Row>
            </Container>
    </>)
}

export default LogoutPage