import React from "react";
function Admin(props) {
  return (
    <>
      <div className="body-content">
        <div className="body-content-wrap">
        <h1 className="mt-0 mb-1">
           
        Hello {props.auth.userdata.name},
        </h1>
        <h4 className="sub-heading mb-3">Welcome note</h4>
        <p>Admin welcome content</p>
      </div>
      </div>
    </>
  );
}

export default Admin;