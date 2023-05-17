import React, { useCallback, useEffect } from "react";
import Footer from "../Footer";
function Resetlink() {



  return (
    <>
      <section className="login-main">
        <div className="column after-layer before-layer">
          <div className="login-head text-center mb-4">
            <a href="">
              <img src="/assets/images/logo.svg" className="image" />
            </a>
          </div>
          <div className="c-card">
            <div className="c-card-wrap">
              <div className="form-header text-center mb-4">
                <img src="/assets/images/right.png" className="right-image" />
                <h1>Reset link sent successfully!</h1>
              </div>
              <div className="login-form">
                <p className="text-center">
                  Password reset link sent succeessfully to your email address
                  please click on the link to reset password!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Resetlink;
