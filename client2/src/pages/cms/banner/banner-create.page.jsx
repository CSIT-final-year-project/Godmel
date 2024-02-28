import { Container, Card } from "react-bootstrap"
import { Heading } from "../../../component/common/heading/heading.component"
import Breadcrumb from "../../../component/cms/breadcrumb/breadcrumb.component"
import { useNavigate } from "react-router-dom"
import BannerForm from "./banner-form.component"
import { useState } from "react"
import bannerSvc from "./banner.service"
import { toast } from "react-toastify"
const BannerCreate = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const createBanner = async (data) => {
        try {
            setLoading(true);
            let response = await bannerSvc.storeBanner(data)
            toast.success("Banner Created successfully.")
            navigate("/admin/banner")
        } catch(exception) {
            toast.error("Banner cannot be created at this moment.")
            console.log(exception)

        } finally{
            setLoading(false)
        }
    }
    return (<>
        <Container fluid className="px-4">
          <Heading type={"h1"} className="mt-4" value={"Banner Create"}></Heading>
          <Breadcrumb data={[
            {title: "Dashboard", link: "/admin"},
            {title: "Banner List", link: "/admin/banner"},
            {title: "Banner Create", link: null}
          ]}/>
          <Card className="mb-4">
            <Card.Header>
              <Heading type={"h4"} className={"float-start"} value={"Banner Create Form"}></Heading>
            </Card.Header>
            <Card.Body>
                <BannerForm 
                submitEvent={createBanner}
                loading={loading}
                />
            </Card.Body>
              
          </Card>
        </Container>
    </>)
}

export default BannerCreate