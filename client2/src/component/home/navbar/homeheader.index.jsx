import { useContext } from "react";
import { Nav, Navbar, Container, NavDropdown, Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../../../config/theme.context";
const HomeHeaderComponent = ()=>{

    const { theme, toggleTheme } = useContext(ThemeContext);
    const changeTheme = (e)=>{
        e.preventDefault();
        toggleTheme(theme);
    }
    return (<>
        <Navbar
        expand="lg"
        className="bg-body-tertiary"
        bg={theme}
        data-bs-theme={theme}>
        <Container>
          <Navbar.Brand><NavLink to={'/'} className={'nav-link'}>Smart Kishan</NavLink></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/" className="nav-link">Home</NavLink>
              <NavLink to="/crop-recommendation" className={"nav-link"}>Crop Recommendation</NavLink>
              <NavLink to="/crop-cure" className={"nav-link"}>Crop Cure</NavLink>
              <Nav.Link href="#link">Farmer's Market</Nav.Link>
              
            </Nav>
            <Nav>
              <Form>
                <Form.Control type="Search" size="sm" placeholder="search..">

                </Form.Control>
              </Form>
            </Nav>
            <Nav className="float-end">
              <NavLink to="/login" className="nav-link">Login</NavLink>
              <NavLink to="/register" className={"nav-link"}>SignUp</NavLink>
              <Nav.Link onClick={changeTheme}><i className="fa-solid fa-circle-half-stroke"></i></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
    )
}

export default HomeHeaderComponent