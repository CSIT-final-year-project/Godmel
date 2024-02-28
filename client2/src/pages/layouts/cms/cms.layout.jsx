import { Outlet } from "react-router-dom";
import "./cms.layout.css";

import { TopHeaderComponent, SidebarComponent, FooterComponent } from "../../../component/cms";

const CMSLayout = () => {
    
  return (
    <>
      <TopHeaderComponent />
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <SidebarComponent />
        </div>
        <div id="layoutSidenav_content">
          <main>
            <Outlet />
          </main>
          <FooterComponent />
        </div>
      </div>
    </>
  );
};

export default CMSLayout;
