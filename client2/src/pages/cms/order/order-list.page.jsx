import { Card, Container, Table, Row, Spinner, Badge, Image } from "react-bootstrap"
import { Heading } from "../../../component/common/heading/heading.component"
import Breadcrumb from "../../../component/cms/breadcrumb/breadcrumb.component"
import { NavLink } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import orderSvc from "./order.service"

import Swal from 'sweetalert2'

const OrderList = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [dispatched, setDispatched] = useState(false)

  const listOrders = async () => {
    try {
      setLoading(true)
      const response = await orderSvc.orderLists()
      setData(response.result)
    } catch (exception) {
      console.log(exception)
      toast.error(exception.message)
    } finally {
      setLoading(false)
    }
  }

  const markDispatch = async (id) => {
    try {
      // console.log(id)
      let response = await orderSvc.markDispatched(id, {});
      
      setDispatched(true)
      listOrders()
      toast.success(response.message)
    }
    catch (except) {
      console.log(except)
      toast.error(except.message)
    }
  }

  useEffect(() => {
    // api consume 
    listOrders()
  }, [])

  return (<>
    <Container fluid className="px-4">
      <Heading type={"h1"} className="mt-4" value={"Order List"}></Heading>
      <Breadcrumb data={[
        { title: "Dashboard", link: "/admin" },
        { title: "Order List", link: null }
      ]} />
      <Card className="mb-4">
        <Card.Header>
          <Heading type={"h4"} className={"float-start"} value={"Order List"}></Heading>
        </Card.Header>
        <Card.Body>
          <Table size="sm" bordered hover striped>
            <thead className="table-dark">
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Customer</th>
                <th>Delivery at</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Dispatch</th>
              </tr>
            </thead>
            <tbody>
              {
                loading ? (<tr>
                  <td colSpan={5} className="text-center">
                    <Spinner variant="dark"></Spinner>
                  </td>
                </tr>) : (

                  data && data.length > 0 ? <>
                    {
                      data.map((row, ind) => (
                        <tr key={ind}>
                          <td>{row.detail.title}</td>
                          <td>{row.qty}</td>
                          <td>{row.buyerId.name}</td>
                          <td>{row.orderId.deliveryAddress}</td>
                          <td>{row.amount}</td>
                          <td>
                            <Badge bg={`${row.status === 'dispatched' ? 'success' : 'warning'}`}>
                              {row.status}
                            </Badge>
                          </td>
                          <td>
                            {
                              row.status === "dispatched" ? <></> : <>
                                <NavLink onClick={(e) => {
                                  e.preventDefault()
                                  Swal.fire({
                                    title: "Are you sure?",
                                    text: "You won't be able to revert this!",
                                    icon: "warning",
                                    showCancelButton: true,
                                    confirmButtonColor: "#3085d6",
                                    cancelButtonColor: "#d33",
                                    confirmButtonText: "Yes, Mark dispatched!"
                                  }).then((result) => {
                                    if (result.isConfirmed) {
                                      markDispatch(row._id)
                                    }
                                  })
                                }} to={'/admin/order/' + row._id} className={"btn btn-sm btn-success me-1"}>
                                  <i className="fa fa-check text-white"></i> Mark
                                </NavLink>

                              </>
                            }
                          </td>
                        </tr>
                      ))
                    }
                  </> : <tr>
                    <td colSpan={5} className="text-center">
                      No data found
                    </td>
                  </tr>
                )
              }
            </tbody>
          </Table>

        </Card.Body>

      </Card>
    </Container>

  </>)
}
export default OrderList