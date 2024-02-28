import { Container, Card, Spinner } from "react-bootstrap"
import { Heading } from "../../../component/common/heading/heading.component"
import Breadcrumb from "../../../component/cms/breadcrumb/breadcrumb.component"
import { useNavigate, useParams } from "react-router-dom"
import ProductForm from "./product-form.component"
import { useEffect, useState } from "react"
import productSvc from "./product.service"
import { toast } from "react-toastify"

const ProductEdit = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const params = useParams()
    const [detail, setDetail] = useState()
    
    const editProduct = async (data) => {
        try {
            setLoading(true);
            let response = await productSvc.updateProduct(params.id, data)
            toast.success("Product updated successfully.")
            navigate("/admin/product")
        } catch(exception) {
            toast.error("Product cannot be edited at this moment.")
            console.log(exception)

        } finally{
            setLoading(false)
        }
    }

    const getById = async () => {
        try {
            setLoading(true)
            const response = await productSvc.getProductById(params.id)
            setDetail({
                title: response.result.title, 
                summary: response.result.summary, 
                status: response.result.status, 
                price: response.result.price, 
                discount: response.result.discount, 
                images: response.result.images
            })
        } catch(exception) {
            toast.error("Product cannot be fetched at this moment")
            navigate("/admin/product")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getById()
    }, [params])

    return (<>
        <Container fluid className="px-4">
          <Heading type={"h1"} className="mt-4" value={"Product Edit"}></Heading>
          <Breadcrumb data={[
            {title: "Dashboard", link: "/admin"},
            {title: "Product List", link: "/admin/product"},
            {title: "Product Edit", link: null}
          ]}/>
          <Card className="mb-4">
            <Card.Header>
              <Heading type={"h4"} className={"float-start"} value={"Product Edit Form"}></Heading>
            </Card.Header>
            <Card.Body>
                
                {
                    loading ? <><Spinner variant="dark"/></> : 
                    <ProductForm 
                        submitEvent={editProduct}
                        loading={loading}
                        detail={detail}
                    />
                }

            </Card.Body>
              
          </Card>
        </Container>
    </>)
}

export default ProductEdit