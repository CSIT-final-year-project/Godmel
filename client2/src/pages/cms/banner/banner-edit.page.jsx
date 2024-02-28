import { Container, Card, Spinner } from "react-bootstrap"
import { Heading } from "../../../component/common/heading/heading.component"
import Breadcrumb from "../../../component/cms/breadcrumb/breadcrumb.component"
import { useNavigate, useParams } from "react-router-dom"
import BannerForm from "./banner-form.component"
import { useEffect, useState } from "react"
import bannerSvc from "./banner.service"
import { toast } from "react-toastify"

const BannerEdit = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const params = useParams()
    const [detail, setDetail] = useState()
    
    const editBanner = async (data) => {
        try {
            setLoading(true);
            let response = await bannerSvc.updateBanner(params.id, data)
            toast.success("Banner updated successfully.")
            navigate("/admin/banner")
        } catch(exception) {
            toast.error("Banner cannot be editd at this moment.")
            console.log(exception)

        } finally{
            setLoading(false)
        }
    }

    const getById = async () => {
        try {
            setLoading(true)
            const response = await bannerSvc.getBannerById(params.id)
            setDetail({
                title: response.result.title, 
                url: response.result.url, 
                status: response.result.status, 
                image: response.result.image
            })
        } catch(exception) {
            toast.error("Banner cannot be fetched at this moment")
            navigate("/admin/banner")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getById()
    }, [params])

    return (<>
        <Container fluid className="px-4">
          <Heading type={"h1"} className="mt-4" value={"Banner Edit"}></Heading>
          <Breadcrumb data={[
            {title: "Dashboard", link: "/admin"},
            {title: "Banner List", link: "/admin/banner"},
            {title: "Banner Edit", link: null}
          ]}/>
          <Card className="mb-4">
            <Card.Header>
              <Heading type={"h4"} className={"float-start"} value={"Banner Edit Form"}></Heading>
            </Card.Header>
            <Card.Body>
                
                {
                    loading ? <><Spinner variant="dark"/></> : 
                    <BannerForm 
                        submitEvent={editBanner}
                        loading={loading}
                        detail={detail}
                    />
                }

            </Card.Body>
              
          </Card>
        </Container>
    </>)
}

export default BannerEdit