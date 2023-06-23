import React, { useCallback, useEffect } from "react";
import Footer from "../Footer";
import { Link } from "react-router-dom";
function Resetlink() {



  return (
    <>
      <section className="login-main">
      <div className="login-main-wrapper">
        <div className="column">
          <div className="c-card after-layer before-layer">
            <div className="c-card-wrap">
                <div className="form-header">
                  <img src="/assets/images/icon.svg" className="image" />
                  <h1>Reset link sent successfully!</h1>
                  <h4> Password reset link sent succeessfully to your email address.
                    <br />
                    Please click on the link to reset password!</h4>
                    <p className="extra-stuff text-center">
                <Link to="/signin">
                  {" "}
                  <img src="/assets/images/back.svg" alt="" />
                  Back to Login{" "}
                </Link>
              </p>
                </div>
              </div>
              <div className="mobile-footer">
                <Footer />
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
        </div>
      </section>
    </>
  );
}

export default Resetlink;
