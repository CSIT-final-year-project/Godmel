import { useContext, useEffect, useState } from "react";
import { Nav, Navbar, Container, Dropdown, Image } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../../config/theme.context";
import logo from "../../../assets/logo.png";
import authSvc from "../../../pages/home/auth/auth.service";
import { toast } from "react-toastify";
const HomeHeaderComponent = () => {
  const [user, setUser] = useState({ userId: "", name: "", role: "" });

  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const changeTheme = (e) => {
    e.preventDefault();
    toggleTheme(theme);
  };

  const getLoggedInUser = async () => {
    try {
      const response = await authSvc.getLoggedInUser();

      setUser(response.result);
    } catch (exception) {
      localStorage.removeItem("_au");
      navigate("/");
    }
  };

  useEffect(() => {
    let token = localStorage.getItem("_au");
    if (!token) {
      toast.error("You are not logged In!!");
      navigate("/");
    } else {
      getLoggedInUser();
    }
  }, []);
  // console.log(user)
  return (
    <>
      <Navbar
        expand="lg"
        className="bg-body-tertiary"
        sticky="top"
        bg={theme}
        data-bs-theme={theme}
      >
        <Container>
          <Navbar.Brand>
            <NavLink to={"/"} className={"nav-link"}>
              <Image src={logo} alt="logo" height={40} /> &nbsp; Smart Kishan
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
              <NavLink to="/crop-recommendation" className={"nav-link"}>
                Crop Recommendation
              </NavLink>
              <NavLink to="/crop-cure" className={"nav-link"}>
                Crop Cure
              </NavLink>
              <NavLink to="/farmer-market" className={"nav-link"}>
                Marketplace
              </NavLink>
            </Nav>

            <Nav className="float-end">
              {user ? (
                <>
                  <NavLink to={"/" + user.role} className="nav-link">
                    {user.name}
                  </NavLink>
                  <NavLink to={"/cart"} className={"nav-link"}>
                    <i className="fa-solid fa-cart-shopping"></i>
                    {/*<Badge pill bg="danger">9</Badge>*/}
                  </NavLink>
                </>
              ) : (
                <></>
              )}

              <Nav.Link onClick={changeTheme}>
                <i className="fa-solid fa-circle-half-stroke"></i>
              </Nav.Link>
              {!user || user.userId === "" ? (
                <>
                  <NavLink to="/login" className="nav-link">
                    Login
                  </NavLink>
                  <NavLink to="/register" className={"nav-link"}>
                    SignUp
                  </NavLink>
                </>
              ) : (
                <>
                  <Dropdown
                    className="ms-auto ms-md-0 me-3 me-lg-4"
                    align={"end"}
                  >
                    <Dropdown.Toggle
                      variant="link"
                      className=""
                      id="dropdown-basic"
                    >
                      <i className="fas fa-user fa-fw"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {/* <NavLink className={"dropdown-item"} to={'/me'}>Update Profile</NavLink> */}

                      <NavLink
                        className={"dropdown-item"}
                        to={"/change-password"}
                      >
                        Change Password
                      </NavLink>
                      <NavLink className={"dropdown-item"} to={"/logout"}>
                        Logout
                      </NavLink>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default HomeHeaderComponent;
