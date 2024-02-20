import { Outlet } from "react-router-dom"
import HomeHeaderComponent from "../../../component/home/navbar/homeheader.index"

const HomeLayout = ()=>{
    return (<>
        <HomeHeaderComponent/>
        <Outlet/>
    </>)
}

export default HomeLayout