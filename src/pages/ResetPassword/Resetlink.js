import React, { useCallback, useEffect } from "react";
import Footer from "../Footer";
function Resetlink() {



  return (
    <>
      <section className="login-main">
        <div className="column">
          <div className="column after-layer before-layer">

            <div className="c-card">
              <div className="c-card-wrap">
                <div className="form-header">
                  <img src="/assets/images/icon.svg" className="image" />
                  <h1>Reset link sent successfully!</h1>
                  <h4> Password reset link sent succeessfully to your email address.
                    <br />
                    Please click on the link to reset password!</h4>
                </div>

              </div>
            </div>
          </div>
          <div className="login-head text-center">
            <div className="login-in">
              <div className="login-logo">
                <img src="/assets/images/logo.svg" alt="" />
              </div>
              <Footer />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Resetlink;
