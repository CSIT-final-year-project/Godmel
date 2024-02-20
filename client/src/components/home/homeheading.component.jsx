import { Form, Image, Nav, Navbar } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import logo from "../../assets/images/logo.png"
import { useTheme } from "../../config/theme.context";


const HomeHeading = () => {
    const { theme, toggleTheme } = useTheme()
    const switchTheme = (e) => {
        e.preventDefault()
        toggleTheme(theme)
    }

    return (<>
        <Navbar
            expand="lg"
            className="bg-body-tertiary"
            bg={theme} data-bs-theme={theme}
        >
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                        <h3><Image src={logo} height={50} alt="" /></h3>
                    </a>



                    <Nav className="col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <NavLink to="/" className="nav-link px-2 ms-3 me-3">Home</NavLink>
                        <NavLink to="#" className="nav-link px-2 ms-3 me-3">Crop Recommendation</NavLink>
                        <NavLink to="#" className="nav-link px-2 me-3">Cure</NavLink>
                        {/* <li><a href="#" className="nav-link px-2 text-white">Your Tickets</a></li> */}
                        <NavLink to="#" className="nav-link px-2">Farmers Market</NavLink>
                    </Nav>

                    <Form className="col-12 col-lg-auto me-1" role="search">
                        <Form.Control type="search" className=" form-control-sm text-bg-dark" placeholder="Search..." aria-label="Search" />
                    </Form>
                    <button className="btn btn-sm btn-outline-light me-lg-3 mt-2"><i className="fa-solid fa-search"></i></button>


                    <div className="text-end">
                        <NavLink to='/login' type="button" className="btn btn-sm btn-outline-light ms-2 mt-2 me-2">Login</NavLink>
                        <NavLink to='/register' type="button" className="btn btn-sm btn-success mt-2 me-3">SignUp</NavLink>
                        <button onClick={switchTheme} className="btn btn-sm btn-outline-light mt-2"><i className="fa-solid fa-circle-half-stroke"></i></button>
                    </div>
                </div>
            </div>
        </Navbar>
    </>)
}

export default HomeHeading