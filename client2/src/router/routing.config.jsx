import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as layouts from "../pages/layouts/index"
import { Error404 } from "../pages/common/error.page";
import { ToastContainer } from "react-toastify";
import HomePage from "../pages/landing/home.page";
import CropRecommendationPage from "../pages/landing/croprecommendation.page";
import CropCurePage from "../pages/landing/cropcure.page";

export const Routing = ()=>{
    return (
        <>
            <ToastContainer/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<layouts.HomeLayout/>}>
                        <Route index element={<HomePage/>}/>
                        <Route path="/crop-recommendation" element={<CropRecommendationPage/>}/>
                        <Route path="/crop-cure" element={<CropCurePage/>}/>
                    </Route>

                    <Route path="*" element={<Error404/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}