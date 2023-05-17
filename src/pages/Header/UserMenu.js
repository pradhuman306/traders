import React, { useContext } from "react";
import AuthContext from "../../context/authContext";
import { useLocation, Link } from "react-router-dom";
function UserMenu() {
  const path = useLocation().pathname;
  const auth = useContext(AuthContext);
  const { role } = auth;
  return (
    <>
     


      
      
    </>
  );
}

export default UserMenu;
