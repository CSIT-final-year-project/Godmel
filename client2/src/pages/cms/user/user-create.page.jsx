import { Container, Card } from "react-bootstrap"
import { Heading } from "../../../component/common/heading/heading.component"
import Breadcrumb from "../../../component/cms/breadcrumb/breadcrumb.component"
import { useNavigate } from "react-router-dom"
import UserForm from "./user-form.component"
import { useState } from "react"
import userSvc from "./user.service"
import { toast } from "react-toastify"
const UserCreate = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const createUser = async (data) => {
        try {
            setLoading(true);
            let response = await userSvc.storeUser(data)
            toast.success("User Created successfully.")
            navigate("/admin/user")
        } catch(exception) {
            toast.error("User cannot be created at this moment.")
            console.log(exception)

        } finally{
            setLoading(false)
        }
    }
    return (<>
        <Container fluid className="px-4">
          <Heading type={"h1"} className="mt-4" value={"Create Admin"}></Heading>
          <Breadcrumb data={[
            {title: "Dashboard", link: "/admin"},
            {title: "User List", link: "/admin/user"},
            {title: "User Create", link: null}
          ]}/>
          <Card className="mb-4">
            <Card.Header>
              <Heading type={"h4"} className={"float-start"} value={"User Create Form"}></Heading>
            </Card.Header>
            <Card.Body>
                <UserForm 
                submitEvent={createUser}
                loading={loading}
                createnew={true}
                />
            </Card.Body>
              
          </Card>
        </Container>
    </>)
}

export default UserCreate