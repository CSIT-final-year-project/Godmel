import { Container, Card } from "react-bootstrap"
import { Heading } from "../../../component/common/heading/heading.component"
import Breadcrumb from "../../../component/cms/breadcrumb/breadcrumb.component"
import { useNavigate } from "react-router-dom"
import ProductForm from "./product-form.component"
import { useState } from "react"
import productSvc from "./product.service"
import { toast } from "react-toastify"
const ProductCreate = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const createProduct = async (data) => {
        try {
            setLoading(true);
            let response = await productSvc.storeProduct(data)
            toast.success("Product Created successfully.")
            navigate("/admin/product")
        } catch(exception) {
            toast.error("Product cannot be created at this moment.")
            console.log(exception)

        } finally{
            setLoading(false)
        }
    }
    return (<>
        <Container fluid className="px-4">
          <Heading type={"h1"} className="mt-4" value={"Product Create"}></Heading>
          <Breadcrumb data={[
            {title: "Dashboard", link: "/admin"},
            {title: "Product List", link: "/admin/product"},
            {title: "Product Create", link: null}
          ]}/>
          <Card className="mb-4">
            <Card.Header>
              <Heading type={"h4"} className={"float-start"} value={"Product Create Form"}></Heading>
            </Card.Header>
            <Card.Body>
                <ProductForm 
                submitEvent={createProduct}
                loading={loading}
                />
            </Card.Body>
              
          </Card>
        </Container>
    </>)
}

export default ProductCreate