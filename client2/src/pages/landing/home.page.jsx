import { NavLink } from "react-router-dom"
import HomePageBanner from "../../component/home/banner/banner.component"

const HomePage = () => {
    return (<>
        <HomePageBanner />

        <div className="container px-4 py-5" id="hanging-icons">
            <h2 className="pb-2 border-bottom">Our Services</h2>
            <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
            <div className="col d-flex align-items-start">
                    <div className="icon-square rounded p-2 text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                        <i className="fa-solid fa-store"></i>                    </div>
                    <div>
                        <h3 className="fs-2 text-body-emphasis">Farmers Market</h3>
                        <p>Want to buy fresh farm products directly from the farm? We have got live farmer selling their products on our website. Order Now for healthy products righ into your door step.</p>
                        <NavLink to="/farmer-market" className="btn btn-success">
                            Buy Now
                        </NavLink>
                    </div>
                </div>
                <div className="col d-flex align-items-start">
                    <div className="icon-square rounded p-2 text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                        <i className="fa-solid fa-leaf"></i>
                    </div>
                    <div>
                        <h3 className="fs-2  text-body-emphasis">Crop Recommendation</h3>
                        <p>Are you a farmer? Do you want to know the best crop for your soil? We got you cover. Click the link below.</p>
                        <NavLink to="/crop-recommendation" className="btn btn-success">
                            Crop
                        </NavLink>
                    </div>
                </div>
                <div className="col d-flex align-items-start">
                    <div className="icon-square rounded p-2 text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                        <i className="fa-solid fa-hand-holding-droplet"></i>                    </div>
                    <div>
                        <h3 className="fs-2 text-body-emphasis">Crop Cure</h3>
                        <p>Do you think, your soil lacks some nutrients? Find out which one. And get the productivity high. Click the link below.</p>
                        <NavLink to="/crop-cure" className="btn btn-success">
                            Cure
                        </NavLink>
                    </div>
                </div>
                <div className="col d-flex align-items-start">
                    <div className="icon-square rounded p-2 text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                        <i className="fa-solid fa-shop"></i>                    </div>
                    <div>
                        <h3 className="fs-2 text-body-emphasis">Sell your products</h3>
                        <p>Want to sell your farm products? Register as a farmer now and get lots of feature for free from our app.</p>
                        <NavLink to="/register" className="btn btn-success">
                            Sign Up
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default HomePage