import React, { useEffect } from "react";
import Router from "./routes/index";
import { BrowserRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";


import "react-toastify/dist/ReactToastify.css";

function App() {
  const auth = useSelector((state) => state.authReducer);
  const message = useSelector((state) => state.toasterReducer);
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
  }, [message]);


  return (
    <>
      <BrowserRouter>
        <Router auth={auth} />
        <ToastContainer limit={2} autoClose={1000} />
      </BrowserRouter>
    </>
  );
}

export default App;
