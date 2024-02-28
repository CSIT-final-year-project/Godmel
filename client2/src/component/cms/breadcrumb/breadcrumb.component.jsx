import { Breadcrumb as BootstrapBreadcrumb } from "react-bootstrap"
import { NavLink } from "react-router-dom"
const BreadCrumbItem = ({className, children}) => {
    return (<>
        <li className={`breadcrumb-item ${className ? className : ''}`}>
            {children}
        </li>
    </>)
}

const Breadcrumb = ({data}) =>{
    return(<>
    <BootstrapBreadcrumb className="mb-4">
        {
            data && data.map((row, ind) => (
                <BreadCrumbItem key={ind} className={`${row.link ? '' : 'active'}`}>
                    {
                        row.link ? <NavLink to={row.link}>{row.title}</NavLink> : row.title
                    }
                </BreadCrumbItem>
            ))
        }
    </BootstrapBreadcrumb>
    
    </>)
}
export default Breadcrumb