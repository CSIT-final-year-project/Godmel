import { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { FaBookmark, FaHome, FaImage, FaImages, FaLeaf, FaMoneyBillWave, FaShoppingCart, FaSitemap, FaStore, FaTachometerAlt, FaUsers } from "react-icons/fa";
import { NavLink } from "react-router-dom";
const SideNavMenu = ({ children }) => {
    return (<>
        <div className="sb-sidenav-menu">
            {children}
        </div>
    </>)
}

const NavHeading = ({ children }) => {
    return (<>
        <div className="sb-sidenav-menu-heading">
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

const LoggedInUserName = ({ children }) => {
    return (<>
        <div className="small">Logged in as:</div>
        {children}
    </>)
}
const NavLinkIcon = ({ children }) => {
    return (<>
        <div className="sb-nav-link-icon">
            {children}
        </div>
    </>)
}

const SidebarComponent = () => {
    const [user, setUser] = useState({ userId: "", name: "", role: "" });
    const getUser = () => {
        let userData = localStorage.getItem("_user");
        userData = JSON.parse(userData)
        setUser(userData);
    }
    useEffect(() => {
        getUser();
    }, []);
    return (
        <>
            <Nav as={"nav"} className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <SideNavMenu>
                    <Nav>
                        <NavHeading>Core</NavHeading>
                        <NavLink className={"nav-link"} to={"/" + user.role}>
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
                        <NavLink className={"nav-link"} to={"/" + user.role + "/banner"}>
                            <NavLinkIcon>
                                <FaImages />
                            </NavLinkIcon>
                            Banner Management
                        </NavLink>
                        <NavLink className={"nav-link"} to={"/" + user.role + "/product"}>
                            <NavLinkIcon>
                                <FaStore />
                            </NavLinkIcon>
                            Product Management
                        </NavLink>
                        {
                            user.role === "admin" ? <>
                                <NavLink className={"nav-link"} to={"/" + user.role + "/seed"}>
                                    <NavLinkIcon>
                                        <FaLeaf />
                                    </NavLinkIcon>
                                    Seed Management
                                </NavLink>
                                <NavLink className={"nav-link"} to={"/" + user.role + "/user"}>
                                    <NavLinkIcon>
                                        <FaUsers />
                                    </NavLinkIcon>
                                    Users Management
                                </NavLink>
                            </> : <></>
                        }

                        <NavLink className={"nav-link"} to={"/" + user.role + "/order"}>
                            <NavLinkIcon>
                                <FaShoppingCart />
                            </NavLinkIcon>
                            Order Management
                        </NavLink>
                        <NavLink className={"nav-link"} to={"/" + user.role + "/transaction"}>
                            <NavLinkIcon>
                                <FaMoneyBillWave />
                            </NavLinkIcon>
                            Transactions
                        </NavLink>
                        <SideNavFooter>
                            <LoggedInUserName>
                                {user.name}
                            </LoggedInUserName>
                        </SideNavFooter>
                    </Nav>
                </SideNavMenu>
            </Nav>
        </>
    );
};

export default SidebarComponent;
