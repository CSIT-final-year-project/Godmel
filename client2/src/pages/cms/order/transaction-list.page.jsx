import { Card, Container, Table, Row, Spinner, Badge, Image } from "react-bootstrap"
import { Heading } from "../../../component/common/heading/heading.component"
import Breadcrumb from "../../../component/cms/breadcrumb/breadcrumb.component"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import orderSvc from "./order.service"


const TransactionList = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [dispatched, setDispatched] = useState(false)

  const listOrders = async () => {
    try {
      setLoading(true)
      const response = await orderSvc.transactionLists()
      console.log(response)
      setData(response.result)
    } catch (exception) {
      console.log(exception)
      toast.error(exception.message)
    } finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    // api consume 
    listOrders()
  }, [])

  return (<>
    <Container fluid className="px-4">
      <Heading type={"h1"} className="mt-4" value={"Transaction List"}></Heading>
      <Breadcrumb data={[
        { title: "Dashboard", link: "/admin" },
        { title: "Transaction List", link: null }
      ]} />
      <Card className="mb-4">
        <Card.Header>
          <Heading type={"h4"} className={"float-start"} value={"Transaction List"}></Heading>
        </Card.Header>
        <Card.Body>
          <Table size="sm" btransactioned hover striped>
            <thead className="table-dark">
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
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
                          <td>{row.amount}</td>
                          <td>
                            <Badge bg={`${row.status === 'dispatched' ? 'success' : 'warning'}`}>
                              {row.status}
                            </Badge>
                          </td>
                        </tr>
                      ))
                    }
                    <tr>
                      <td colSpan={3}></td>
                      <td>
                        <strong>Total:</strong>
                      </td>
                      <td>
                        <strong>
                          {data.reduce((total, row) => total + row.amount, 0)}
                        </strong>
                      </td>
                    </tr>
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
export default TransactionList