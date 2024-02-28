import { Container, Card, Spinner } from "react-bootstrap"
import { Heading } from "../../../component/common/heading/heading.component"
import Breadcrumb from "../../../component/cms/breadcrumb/breadcrumb.component"
import { useNavigate, useParams } from "react-router-dom"
import UserForm from "./user-form.component"
import { useEffect, useState } from "react"
import userSvc from "./user.service"
import { toast } from "react-toastify"

const UserEdit = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const params = useParams()
    const [detail, setDetail] = useState()
    
    const editUser = async (data) => {
        try {
            setLoading(true);
            let response = await userSvc.updateUser(params.id, data)
            toast.success("User updated successfully.")
            navigate("/admin/user")
        } catch(exception) {
            toast.error("User cannot be editd at this moment.")
            console.log(exception)

        } finally{
            setLoading(false)
        }
    }

    const getById = async () => {
        try {
            setLoading(true)
            const response = await userSvc.getUserById(params.id)
            setDetail({
                name: response.result.name, 
                email: response.result.email, 
                status: response.result.status, 
                image: response.result.image
            })
        } catch(exception) {
            toast.error("User cannot be fetched at this moment")
            navigate("/admin/user")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getById()
    }, [params])

    return (<>
        <Container fluid className="px-4">
          <Heading type={"h1"} className="mt-4" value={"User Edit"}></Heading>
          <Breadcrumb data={[
            {title: "Dashboard", link: "/admin"},
            {title: "User List", link: "/admin/user"},
            {title: "User Edit", link: null}
          ]}/>
          <Card className="mb-4">
            <Card.Header>
              <Heading type={"h4"} className={"float-start"} value={"User Edit Form"}></Heading>
            </Card.Header>
            <Card.Body>
                
                {
                    loading ? <><Spinner variant="dark"/></> : 
                    <UserForm 
                        submitEvent={editUser}
                        loading={loading}
                        detail={detail}
                    />
                }

            </Card.Body>
              
          </Card>
        </Container>
    </>)
}

export default UserEdit