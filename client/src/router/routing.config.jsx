import {BrowserRouter, Routes, Route} from "react-router-dom"

import Homelayout from "../pages/layouts/home/home.layout"
import LandingPage from "../pages/home/landing/landing.page"
import RegisterPage from "../pages/home/auth/register"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.min.css"
import ActivationPage from "../pages/home/auth/activation"
import LoginPage from "../pages/home/auth/login"
import CMSLayout from "../pages/layouts/cms/cms.layout"
import { Error404 } from "../pages/common/error.page"
import PermissionCheck from "../pages/common/check-permission"


export const Routing = ()=>{
    return (<>
        <ToastContainer/>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Homelayout/>}>
                    <Route index element={<LandingPage/>}/>
                    <Route path='register' element={<RegisterPage/>}/>
                    <Route path='verify-token/:token' element={<ActivationPage/>}/>
                    <Route path='login' element={<LoginPage/>}/>
                </Route>

                <Route path="/admin" element={<PermissionCheck accessBy={"admin"} Component={<CMSLayout/>}/>}>
                    
                </Route>


                <Route path="*" element={<Error404/>}/>
            </Routes>
        </BrowserRouter>
    </>)
}

export default Routing