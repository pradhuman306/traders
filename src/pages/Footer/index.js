import React from "react";

function Footer() {

  const date = new Date();
  return (
    <div className="footer">
      <p>
        © {date.getFullYear()} Pankaj Traders All right reserved.
      </p>
    </div>
  );
}

export default Footer;
