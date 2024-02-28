import { Pagination } from "react-bootstrap"
const TablePagination = ({pagination, dataFetch }) => {
    return (<>
    {
        pagination ? 
        <Pagination className="float-end">
            
            {
            pagination.currentPage > 1 ? <>
            <Pagination.First onClick={(e) => {
                e.preventDefault()
                dataFetch({page: 1})
                }} />
            <Pagination.Prev 
            onClick={(e) => {
                e.preventDefault()
                dataFetch({page: (+pagination.currentPage - 1)})
            }} 
            /></> : <></>
            }

            {
            [...Array(Math.max(0, pagination.pages))].map((item, ind) => (
                <Pagination.Item key={ind} 
                active={+pagination.currentPage === (ind+1) ? true : false}
                onClick={(e) => {
                    e.preventDefault()
                    dataFetch({page: (ind+1)})
                }}   
                >
                {ind+1}
                </Pagination.Item>
            
            ))
            }
            
            {
            pagination.currentPage < pagination.pages ? <>
                <Pagination.Next onClick={(e) => {
                e.preventDefault()
                dataFetch({page: (+pagination.currentPage + 1)})
                }} />
                <Pagination.Last 
                onClick={(e) => {
                e.preventDefault()
                dataFetch({page: pagination.pages})
                }} 
                />
            </> : <></>
            }
        </Pagination> 
        : <></>
        }
    </>)
}

export default TablePagination;