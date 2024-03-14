import { Card, Container, Table, Pagination, Spinner, Badge, Image } from "react-bootstrap"
import { Heading } from "../../../component/common/heading/heading.component"
import Breadcrumb from "../../../component/cms/breadcrumb/breadcrumb.component"
import { NavLink } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import seedSvc from "./seed.service"
import TablePagination from "../../../component/common/pagination/pagination.component"

import Swal from 'sweetalert2'

const SeedList = () => {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState()

  const listSeeds = async ({page=1,search="", limit=10}) => {
    try {
      setLoading(true)
      const response = await seedSvc.seedLists({page, search, limit})
      setData(response.result)
      setPagination({
        ...response.meta,
        pages: (Math.ceil(response.meta.total/response.meta.limit))
      })
    } catch(exception) {
      console.log(exception)
      toast.error(exception.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // api consume 
      listSeeds({page: 1})
  }, [])

  const handleDelete = async(id) => {
    try{
      setLoading(true)
      let response = await seedSvc.deleteById(id)
      toast.success("Seed deleted Successfully")
      listSeeds({page: 1})
    } catch(exception) {
      toast.error("Seed cannot be deleted or already deleted.")
    } finally{
      setLoading(false)
    }
  }

    return (<>
        <Container fluid className="px-4">
          <Heading type={"h1"} className="mt-4" value={"Seed List"}></Heading>
          <Breadcrumb data={[
            {title: "Dashboard", link: "/admin"},
            {title: "Seed List", link: null}
          ]}/>
          <Card className="mb-4">
            <Card.Header>
              <Heading type={"h4"} className={"float-start"} value={"Seed List"}></Heading>
              <NavLink className={"btn btn-sm btn-success float-end"} to="/admin/seed/create">
                <i className="fa fa-plus"></i>&nbsp;Add Seed
              </NavLink>
            </Card.Header>
            <Card.Body>
              <Table size="sm" bordered hover striped>
                <thead className="table-dark">
                  <tr>
                    <th>Seed</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    loading ? <tr>
                    <td colSpan={5}  className="text-center">
                      <Spinner variant="dark"></Spinner>
                    </td>
                  </tr> : (
                    
                      data ? <>
                        {
                          data.map((row, ind) => (
                            <tr key={ind}>
                              <td>{row.title}</td>
                              <td>
                                {row.price + "(-" + row.discount + "% off) = " + row.afterDiscount}
                              </td>
                              <td>
                                <Image onError={(e) => {
                                  e.target.src="https://dummyimage.com/50x30/f2f2f2/000000&text=No+image+found"
                                }} style={{maxWidth: "50px"}} fluid src={import.meta.env.VITE_IMAGE_URL+'product/'+row.images[0]} />
                              </td>
                              <td>
                                <Badge bg={`${row.status === 'active'? 'success' : 'danger'}`}>
                                  {row.status}
                                </Badge>
                              </td>
                              <td>
                                <NavLink to={'/admin/seed/'+row._id} className={"btn btn-sm btn-warning rounded-circle me-1"}>
                                  <i className="fa fa-pen text-white"></i>
                                </NavLink>
                                <NavLink onClick={(e) => {
                                  e.preventDefault()
                                  Swal.fire({
                                    title: "Are you sure?",
                                    text: "You won't be able to revert this!",
                                    icon: "warning",
                                    showCancelButton: true,
                                    confirmButtonColor: "#3085d6",
                                    cancelButtonColor: "#d33",
                                    confirmButtonText: "Yes, delete it!"
                                  }).then((result) => {
                                    if (result.isConfirmed) {
                                      handleDelete(row._id)
                                    }
                                  })
                                }} to={'/admin/seed/'+row._id} className={"btn btn-sm btn-danger rounded-circle me-1"}>
                                  <i className="fa fa-trash text-white"></i>
                                </NavLink>
                              </td>
                            </tr>
                          ))
                        }
                      </> : <tr>
                      <td colSpan={5}  className="text-center">
                        No data found
                      </td>
                    </tr>                    
                  )
                  }
                </tbody>
              </Table>
              
              <TablePagination 
                pagination={pagination}
                dataFetch={listSeeds}
              />

            </Card.Body>
              
          </Card>
        </Container>
        
    </>)
}
export default SeedList