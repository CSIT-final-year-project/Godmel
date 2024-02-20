import { Nav } from "react-bootstrap"
import { FaBookmark, FaHome, FaImages, FaMoneyBillWave, FaShoppingCart, FaSitemap, FaStore, FaTachometerAlt, FaUsers } from "react-icons/fa"
import { NavLink } from "react-router-dom"

const SideNavMenu = ({ children }) => {
    return (<>
        <div className="sb-sidenav-menu">{children}</div>
    </>)
}

const NavHeading = ({ children }) => {
    return (<>
        <div className="sb-sidenav-menu-heading">{children}</div>
    </>)
}

const NavLinkIcon = ({ children }) => {
    return (<>
        <div className="sb-nav-link-icon">
            {children}
        </div>
    </>)
}

const SideNavFooter = ({ children }) => {
    return (<>
        <div className="sb-sidenav-footer">
            {children}
        </div>
    </>)
}

const LoggedInUserName = ({children})=>{
    return (<>
        <div className="small">Logged in as: {children}</div>
    </>) 
}

const SidebarComponent = () => {
    return (<>
        <Nav as={"nav"} className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
            <SideNavMenu>
                <Nav>
                    <NavHeading>Core</NavHeading>
                    <NavLink className={"nav-link"} to="/admin">
                        <NavLinkIcon>
                            <FaTachometerAlt />
                        </NavLinkIcon>
                        Dashboard
                    </NavLink>
                    <NavLink className={"nav-link"} to="/">
                        <NavLinkIcon>
                            <FaHome />
                        </NavLinkIcon>
                        Home
                    </NavLink>
                    <NavHeading>Features</NavHeading>
                    <NavLink className={"nav-link"} to="/admin/banner">
                        <NavLinkIcon>
                            <FaImages />
                        </NavLinkIcon>
                        Banner
                    </NavLink>
                    <NavLink className={"nav-link"} to="/admin/brand">
                        <NavLinkIcon>
                            <FaBookmark />
                        </NavLinkIcon>
                        Brand
                    </NavLink>
                    <NavLink className={"nav-link"} to="/admin/category">
                        <NavLinkIcon>
                            <FaSitemap />
                        </NavLinkIcon>
                        Category
                    </NavLink>
                    <NavLink className={"nav-link"} to="/admin/users">
                        <NavLinkIcon>
                            <FaUsers />
                        </NavLinkIcon>
                        Users
                    </NavLink>
                    <NavLink className={"nav-link"} to="/admin/product">
                        <NavLinkIcon>
                            <FaStore />
                        </NavLinkIcon>
                        Product
                    </NavLink>
                    <NavLink className={"nav-link"} to="/admin/orders">
                        <NavLinkIcon>
                            <FaShoppingCart />
                        </NavLinkIcon>
                        Order
                    </NavLink>
                    <NavLink className={"nav-link"} to="/admin/transactions">
                        <NavLinkIcon>
                            <FaMoneyBillWave />
                        </NavLinkIcon>
                        Transactions
                    </NavLink>
                    <SideNavFooter>
                        <LoggedInUserName>
                            Ashish Khatri
                        </LoggedInUserName>
                    </SideNavFooter>
                </Nav>
            </SideNavMenu>
        </Nav>
    </>)
}

export default SidebarComponent