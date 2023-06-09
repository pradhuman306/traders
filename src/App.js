import React, { useEffect } from "react";
import Router from "./routes/index";
import { BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { SET_LOADED } from "./constants/actionTypes";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const auth = useSelector((state) => state.authReducer);
  const message = useSelector((state) => state.toasterReducer);
  const pendingData = useSelector((state) => state.loaderReducer).pending;
  const profilePic = useSelector((state) => state.logoReducer).logo;
  const [btnPending, setBtnPending] = useState(false);
  const dispatch = useDispatch();

  const handleClick = (e) => {
    document.body.classList.toggle("menu-open");
    const navIcon = document.getElementById("nav-icon");
    navIcon.classList.toggle("open");
  };

  useEffect(() => {
    switch (message.type) {
      case "success":
        toast.success(message.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
          theme: "colored",
        });
        break;
      case "error":
        toast.error(message.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
          theme: "colored",
        });
        break;
      case "warning":
        toast.warning(message.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
          theme: "colored",
        });
        break;
      default:
        toast.info(message.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
          theme: "colored",
        });
        break;
    }

    dispatch({ type: SET_LOADED });
  }, [message]);



  return (
    <>
      <BrowserRouter>
        <Router
          auth={auth}
          setBtnPending={setBtnPending}
          btnPending={btnPending}
          pendingData={pendingData}
          profilePic={profilePic}
          handleClick={handleClick}
        />
        <ToastContainer limit={2} autoClose={1000} />
      </BrowserRouter>
    </>
  );
}
export default App;
