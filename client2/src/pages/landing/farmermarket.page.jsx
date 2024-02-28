import { useState, useEffect } from "react"
import { Card, Container, Form, Row, Button, Spinner, Modal } from "react-bootstrap"
import productSvc from "../cms/product/product.service";
import { Divider, Heading } from "../../component/common/heading/heading.component";
import { NavLink } from "react-router-dom";
import TablePagination from "../../component/common/pagination/pagination.component";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup"


const FarmerMarketPage = () => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState();
    const [user, setUser] = useState({ userId: "", name: "", role: "" });
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const searchSchema = Yup.object({
        search: Yup.string().max(50)
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(searchSchema)
    })

    const listProducts = async ({ page = 1, search = "", limit = 20 }) => {
        try {
            setLoading(true)
            const response = await productSvc.getProductForHome({ page, search, limit });
            setData(response.result);
            setPagination({
                ...response.meta,
                pages: (Math.ceil(response.meta.total / response.meta.limit))
            })
        }
        catch (exception) {
            console.log(exception)
            toast.error(exception.message)
        }
        finally {
            setLoading(false)
        }
    }

    const handleSearch = (data) => {
        listProducts({ page: 1, search: data.search })
    }

    useEffect(() => {
        // api consume
        listProducts({ page: 1 })
        let user = JSON.parse(localStorage.getItem("_user"));
        setUser(user);
    }, [])

    return (
        <>
            <Container fluid>
                <Heading type={"h4"} className={"text-center mt-5"} value={"Our Farmer presents"}></Heading>
                <Divider />
                <Row>
                <Modal show={show} centered onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Set Quantity</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary-outline" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Add
                        </Button>
                    </Modal.Footer>
                </Modal>
                    {
                        loading ? <div className="text-center">
                            <Spinner variant="dark"></Spinner>
                        </div> : (
                            data && data.length ? <>
                                <Form className="text-center" onSubmit={handleSubmit(handleSearch)}>
                                    <Form.Control type="Search" size="sm" placeholder="search.." {...register("search")} />
                                    <Button className="btn btn-sm btn-success mt-2" type="submit">Search <i className="fa fa-search" /></Button>
                                </Form>
                                {
                                    data.map((row, ind) => (
                                        <Card style={{ width: '18rem' }} className="m-2" key={ind}>
                                            <Card.Img variant="top" onError={(e) => {
                                                e.target.src = "https://dummyimage.com/50x30/f2f2f2/000000&text=No+image+found"
                                            }} src={import.meta.env.VITE_IMAGE_URL + '/product/' + row.images[0]} />
                                            <Card.Body>
                                                <Card.Title>{row.title}</Card.Title>
                                                <Card.Text>
                                                    {row.summary}
                                                </Card.Text>
                                                {
                                                    user && user.name !== "" ? <>
                                                        <NavLink onClick={handleShow} className="btn btn-sm btn-success"><i className="fa-solid fa-cart-plus"></i>&nbsp;Add to Cart</NavLink>
                                                    </> : <>
                                                        <NavLink to="/login" className="btn btn-sm btn-success"><i className="fa-solid fa-cart-plus"></i>&nbsp;Add to Cart</NavLink>
                                                    </>
                                                }
                                            </Card.Body>
                                        </Card>
                                    ))
                                }
                            </> : <div className="text-center">
                                <Heading type={"h6"} className={"float-start"} value={"No products to show"}></Heading>
                            </div>
                        )
                    }
                </Row>
                <TablePagination
                    pagination={pagination}
                    dataFetch={listProducts}
                />
            </Container>
        </>
    )
}

export default FarmerMarketPage