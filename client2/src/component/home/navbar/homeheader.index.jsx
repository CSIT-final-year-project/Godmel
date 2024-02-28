import { useContext, useEffect, useState } from "react";
import { Nav, Navbar, Container, Dropdown, Button, Image, Modal } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../../config/theme.context";
import logo from "../../../assets/logo.png"
import authSvc from "../../../pages/home/auth/auth.service";
import { toast } from "react-toastify";
const HomeHeaderComponent = () => {

  const [user, setUser] = useState()

  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const changeTheme = (e) => {
    e.preventDefault();
    toggleTheme(theme);
  }

useEffect(() => {
  const fetchUserData = async () => {
    try {
      const loggedInUser = await authSvc.getLoggedInUser();
      setUser(loggedInUser);
    } catch (error) {
      localStorage.removeItem("_au")
      console.log(error)
      navigate("/")

      // toast.error(error.message);
    }
  };

  fetchUserData();
}, []);
  return (<>
    <Navbar
      expand="lg"
      className="bg-body-tertiary"
      sticky="top"
      bg={theme}
      data-bs-theme={theme}>
      <Container>
        <Navbar.Brand><NavLink to={'/'} className={'nav-link'}><Image src={logo} alt="logo" height={40} /> &nbsp; Smart Kishan</NavLink></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link">Home</NavLink>
            <NavLink to="/crop-recommendation" className={"nav-link"}>Crop Recommendation</NavLink>
            <NavLink to="/crop-cure" className={"nav-link"}>Crop Cure</NavLink>
            <NavLink to="/farmer-market" className={"nav-link"}>Farmer Market</NavLink>

          </Nav>

          <Nav className="float-end">
            {
              (!user || user.userId === "") ? <>
                <NavLink to="/login" className="nav-link">Login</NavLink>
                <NavLink to="/register" className={"nav-link"}>SignUp</NavLink>
              </> : <>
                {
                  user.role === "customer" ? <></> : <>
                    <NavLink to={"/" + user.role} className={"nav-link"}>{user.name}</NavLink>
                  </>
                }
                <Dropdown className="ms-auto ms-md-0 me-3 me-lg-4" align={"end"}>
                  <Dropdown.Toggle variant="link" className=" " id="dropdown-basic">
                    <i className="fas fa-user fa-fw"></i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {/* <NavLink className={"dropdown-item"} to={'/me'}>Update Profile</NavLink> */}
                    <NavLink className={"dropdown-item"} to={'/change-password'}>Change Password</NavLink>
                    <NavLink className={"dropdown-item"} to={'/logout'}>Logout</NavLink>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            }
            <NavLink to={"/cart"} className={"nav-link"}><i className="fa-solid fa-cart-shopping"></i>{/*<Badge pill bg="danger">9</Badge>*/}</NavLink>

            <Nav.Link onClick={changeTheme}><i className="fa-solid fa-circle-half-stroke"></i></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </>
  )
}

export default HomeHeaderComponent