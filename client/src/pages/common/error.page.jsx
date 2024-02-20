import { Image } from "react-bootstrap"
// import error404 from "../../assets/images/404.png"
// import "../../assets/images/404.png"
import { NavLink } from "react-router-dom"

export const Error404 = ()=>{
    return(<>
        <div id="layoutError">
            <div id="layoutError_content">
                <main>
                    <div className="container fluid">
                        <div className="row justify-content-center">
                            <div className="col-lg-6">
                                <div className="text-center mt-4">
                                    {/* <Image className="mb-4 img-error" src={error404}/> */}
                                    <p className="lead">This requested URL was not found on this server.</p>
                                    <NavLink to="/">
                                        <i className="fas fa-arrow-left me-1"></i>
                                        Return to Homepage
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    </>)
}