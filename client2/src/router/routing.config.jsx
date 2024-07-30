import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as layouts from "../pages/layouts"
import * as landing from "../pages/landing"
import * as banner from "../pages/cms/banner"
import * as product from "../pages/cms/product"
import * as seed from "../pages/cms/seed"
import * as user from "../pages/cms/user"
import PermissionCheck from "../pages/common/checkPermission.page";
import { Error404 } from "../pages/common/error.page";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import RegistrationPage from "../pages/home/auth/register";
import SetPasswordPage from "../pages/home/auth/forget-password/set-password.page";
import LoginPage from "../pages/home/auth/login";
import AdminDashboard from "../pages/cms/dashboard/dashboard.page";
import ChangePassword from "../pages/common/changePassword";
import LogoutPage from "../pages/common/logout";
import OrderList from "../pages/cms/order/order-list.page";
import OrderLayout from "../pages/cms/order/order.layout";
import CartPage from "../pages/common/cart";
import TransactionLayout from "../pages/cms/order/transaction.layout";
import TransactionList from "../pages/cms/order/transaction-list.page";
import ForgetPassword from "../pages/home/auth/forget-password/forget-password.page";


export const Routing = ()=>{
    return (
        <>
            <ToastContainer position="bottom-right"/>
            <BrowserRouter>
                <Routes>

                    {/* login free pages */}
                    <Route path="/" element={<layouts.HomeLayout/>}>
                        <Route index element={<landing.HomePage/>}/>
                        <Route path="/crop-recommendation" element={<landing.CropRecommendationPage/>}/>
                        <Route path="/crop-cure" element={<landing.CropCurePage/>}/>
                        <Route path="/farmer-market" element={<landing.FarmerMarketPage/>}/>
                        <Route path="/register" element={<RegistrationPage/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/verify-token/:token" element={<SetPasswordPage/>}/>
                        <Route path="/forget-password" element={<ForgetPassword/>}/>
                    </Route>

                    {/* admin authorization need */}
                    <Route path="/admin" element={<PermissionCheck accessBy={"admin"} Component={<layouts.CMSLayout />}>Content</PermissionCheck>}>
                    
                        <Route index element={<AdminDashboard/>}></Route>
                    
                        <Route path="banner" element={<banner.BannerLayout />}>
                            <Route index element={<banner.BannerList />}></Route>
                            <Route path="create" element={<banner.BannerCreate />}></Route>
                            <Route path=":id" element={<banner.BannerEdit />}></Route>
                        </Route>

                        <Route path="product" element={<product.ProductLayout />}>
                            <Route index element={<product.ProductList />}></Route>
                            <Route path="create" element={<product.ProductCreate />}></Route>
                            <Route path=":id" element={<product.ProductEdit />}></Route>
                        </Route>

                        <Route path="seed" element={<seed.SeedLayout />}>
                            <Route index element={<seed.SeedList />}></Route>
                            <Route path="create" element={<seed.SeedCreate />}></Route>
                            <Route path=":id" element={<seed.SeedEdit />}></Route>
                        </Route>

                        <Route path="user" element={<user.UserLayout />}>
                            <Route index element={<user.UserList />}></Route>
                            <Route path="create" element={<user.UserCreate />}></Route>
                            <Route path=":id" element={<user.UserEdit />}></Route>
                        </Route>

                        <Route path="order" element={<OrderLayout/>}>
                            <Route index element={<OrderList/>}></Route>
                        </Route>
                        <Route path="transaction" element={<TransactionLayout/>}>
                            <Route index element={<TransactionList/>}></Route>
                        </Route>
                        <Route path="change-password" element={<ChangePassword/>}/>
                        <Route path="*" element={<Error404 />}/>
                    </Route>

                    {/* farmer authorization need */}
                    <Route path="/farmer" element={<PermissionCheck accessBy={"farmer"} Component={<layouts.CMSLayout />}>Content</PermissionCheck>}>
                    
                        <Route index element={<AdminDashboard/>}></Route>

                        <Route path="product" element={<product.ProductLayout />}>
                            <Route index element={<product.ProductList />}></Route>
                            <Route path="create" element={<product.ProductCreate />}></Route>
                            <Route path=":id" element={<product.ProductEdit />}></Route>
                        </Route>

                        <Route path="order" element={<OrderLayout/>}>
                            <Route index element={<OrderList/>}></Route>
                        </Route>
                        <Route path="transaction" element={<TransactionLayout/>}>
                            <Route index element={<TransactionList/>}></Route>
                        </Route>
                        <Route path="change-password" element={<ChangePassword/>}/>
                        <Route path="*" element={<Error404 />}/>
                    </Route>

                    <Route path="/customer" element={<PermissionCheck accessBy={"customer"}  Component={<layouts.HomeLayout/>}>Content</PermissionCheck>}>
                        <Route index element={<landing.FarmerMarketPage/>}/>
                    </Route>
                    <Route path="/cart" element={<layouts.HomeLayout/>}>
                        <Route index element={<CartPage/>}/>
                    </Route>

                    <Route path="/change-password" element={<ChangePassword/>}/>
                    <Route path="/logout" element={<LogoutPage />}/>
                    {/* <Route path="/cart" element={<CartPage/>}/> */}
                    <Route path="*" element={<Error404/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}