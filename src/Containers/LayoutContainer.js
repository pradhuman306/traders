import React, { useState } from "react";
import SideNav from "../pages/SideNav";
import AuthContext from "../context/authContext";
import HeaderContainer from "../pages/Header/HeaderContainer";
function LayoutContainer({ children, auth }) {
  return (
    <>
      <AuthContext.Provider value={{ ...auth }}>
      <HeaderContainer role={auth} logo={children.props.logo} />
        <main className="d-flex">
            <>
              <SideNav
                role={auth}
              />
                <section className="body-main" >
                  {children}
                </section>
              
            </>
        </main>
      </AuthContext.Provider>
    </>
  );
}

export default LayoutContainer;
