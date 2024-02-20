import { Breadcrumb } from "react-bootstrap";
import { NavLink } from "react-router-dom";
const BreadcrumbItem = ({className, children})=>{
    return (<>
        <li className={`breadcrumb-item ${className? className: ''}`}>
            {children}
        </li>
    </>)
}

const BreadcrumbComponent = ({data})=>{
    return(<>
        <Breadcrumb className="mb-4">
            {
                data && data.map((row, ind)=>(
                    <BreadcrumbItem key={ind} className={`${row.link?'':'active'}`}>
                        {
                            row.link ? <NavLink to={row.link}>{row.title}</NavLink> : row.title

                        }
                    </BreadcrumbItem>
                ))
            }
        </Breadcrumb>
    </>)
}

export default BreadcrumbComponent