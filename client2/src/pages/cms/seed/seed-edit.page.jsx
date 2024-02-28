import { Container, Card, Spinner } from "react-bootstrap"
import { Heading } from "../../../component/common/heading/heading.component"
import Breadcrumb from "../../../component/cms/breadcrumb/breadcrumb.component"
import { useNavigate, useParams } from "react-router-dom"
import SeedForm from "./seed-form.component"
import { useEffect, useState } from "react"
import seedSvc from "./seed.service"
import { toast } from "react-toastify"

const SeedEdit = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const params = useParams()
    const [detail, setDetail] = useState()
    
    const editSeed = async (data) => {
        try {
            setLoading(true);
            let response = await seedSvc.updateSeed(params.id, data)
            toast.success("Seed updated successfully.")
            navigate("/admin/seed")
        } catch(exception) {
            toast.error("Seed cannot be edited at this moment.")
            console.log(exception)

        } finally{
            setLoading(false)
        }
    }

    const getById = async () => {
        try {
            setLoading(true)
            const response = await seedSvc.getSeedById(params.id)
            setDetail({
                title: response.result.title, 
                summary: response.result.summary, 
                status: response.result.status, 
                price: response.result.price, 
                discount: response.result.discount, 
                images: response.result.images
            })
        } catch(exception) {
            toast.error("Seed cannot be fetched at this moment")
            navigate("/admin/seed")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getById()
    }, [params])

    return (<>
        <Container fluid className="px-4">
          <Heading type={"h1"} className="mt-4" value={"Seed Edit"}></Heading>
          <Breadcrumb data={[
            {title: "Dashboard", link: "/admin"},
            {title: "Seed List", link: "/admin/seed"},
            {title: "Seed Edit", link: null}
          ]}/>
          <Card className="mb-4">
            <Card.Header>
              <Heading type={"h4"} className={"float-start"} value={"Seed Edit Form"}></Heading>
            </Card.Header>
            <Card.Body>
                
                {
                    loading ? <><Spinner variant="dark"/></> : 
                    <SeedForm 
                        submitEvent={editSeed}
                        loading={loading}
                        detail={detail}
                    />
                }

            </Card.Body>
              
          </Card>
        </Container>
    </>)
}

export default SeedEdit