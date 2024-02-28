import { Container, Card } from "react-bootstrap"
import { Heading } from "../../../component/common/heading/heading.component"
import Breadcrumb from "../../../component/cms/breadcrumb/breadcrumb.component"
import { useNavigate } from "react-router-dom"
import SeedForm from "./seed-form.component"
import { useState } from "react"
import seedSvc from "./seed.service"
import { toast } from "react-toastify"
const SeedCreate = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const createSeed = async (data) => {
        try {
            setLoading(true);
            let response = await seedSvc.storeSeed(data)
            toast.success("Seed Created successfully.")
            navigate("/admin/seed")
        } catch(exception) {
            toast.error("Seed cannot be created at this moment.")
            console.log(exception)

        } finally{
            setLoading(false)
        }
    }
    return (<>
        <Container fluid className="px-4">
          <Heading type={"h1"} className="mt-4" value={"Seed Create"}></Heading>
          <Breadcrumb data={[
            {title: "Dashboard", link: "/admin"},
            {title: "Seed List", link: "/admin/seed"},
            {title: "Seed Create", link: null}
          ]}/>
          <Card className="mb-4">
            <Card.Header>
              <Heading type={"h4"} className={"float-start"} value={"Seed Create Form"}></Heading>
            </Card.Header>
            <Card.Body>
                <SeedForm 
                submitEvent={createSeed}
                loading={loading}
                />
            </Card.Body>
              
          </Card>
        </Container>
    </>)
}

export default SeedCreate