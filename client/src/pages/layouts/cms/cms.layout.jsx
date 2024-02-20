import { Outlet } from "react-router-dom"
import "../../../assets/index.css"
import { TopHeaderComponent, FooterComponent, SidebarComponent } from "../../../components/cms"

const CMSLayout = ()=>{
    return (<>
        <TopHeaderComponent/>
        <div id="layoutSidenav">
            <div id="layoutSidenav_nav">
                <SidebarComponent/>
            </div>
            <div id="layoutSidenav_content">
                <main>
                    <Outlet/>
                </main>
                <FooterComponent/>
            </div>
        </div>
    </>)
}

export default CMSLayout