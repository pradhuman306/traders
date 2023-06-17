import React, { useState } from "react";
import SideNav from "../pages/SideNav";
import AuthContext from "../context/authContext";

function LayoutContainer({ children, auth }) {
  return (
    <>
      <AuthContext.Provider value={{ ...auth }}>
        <main className="d-flex">
          <>
            <SideNav role={auth} />
            <section className="body-main">{children}</section>
          </>
        </main>
      </AuthContext.Provider>
    </>
  );
}

export default LayoutContainer;
