import React from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import UserMenu from "../Header/UserMenu";

function SideNav(props) {
  const pathname = useLocation().pathname;

  const handleClick = () => {
    document.body.classList.toggle("menu-open");

    const navIcon = document.getElementById("nav-icon");

    navIcon.classList.toggle("open");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-wrap">
        <div className="sidebar-body">
          <div className="sidebar-nav-title">Navigations</div>
          <ul>
            <li
              onClick={(e) => {
                handleClick(e);
              }}
              className={`${pathname === "/dashboard" ? "active" : ""}`}
            >
              <Link to="/dashboard">
                <svg
                  className="icon-dashboard"
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  data-name="Layer 1"
                >
                  <path d="M10,13H4a1,1,0,0,0-1,1v6a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1V14A1,1,0,0,0,10,13ZM9,19H5V15H9ZM20,3H14a1,1,0,0,0-1,1v6a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1V4A1,1,0,0,0,20,3ZM19,9H15V5h4Zm1,7H18V14a1,1,0,0,0-2,0v2H14a1,1,0,0,0,0,2h2v2a1,1,0,0,0,2,0V18h2a1,1,0,0,0,0-2ZM10,3H4A1,1,0,0,0,3,4v6a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1V4A1,1,0,0,0,10,3ZM9,9H5V5H9Z" />
                </svg>
                <span>Home</span>
              </Link>
            </li>
            <li
              onClick={(e) => {
                handleClick(e);
              }}
              className={`${pathname === "/buysell" ? "active" : ""}`}
            >
              <Link to="/buysell">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.41 11.41L12.58 2.58C12.21 2.21 11.7 2 11.17 2H4C2.9 2 2 2.9 2 4V11.17C2 11.7 2.21 12.21 2.59 12.58L11.42 21.41C12.2 22.19 13.47 22.19 14.25 21.41L21.42 14.24C22.2 13.46 22.2 12.2 21.41 11.41ZM12.83 20L4 11.17V4H11.17L20 12.83L12.83 20Z"
                    fill="black"
                  />
                  <path
                    d="M6.5 8C7.32843 8 8 7.32843 8 6.5C8 5.67157 7.32843 5 6.5 5C5.67157 5 5 5.67157 5 6.5C5 7.32843 5.67157 8 6.5 8Z"
                    fill="black"
                  />
                </svg>
                <span>Buy/Sell</span>
              </Link>
            </li>
            <li
              onClick={(e) => {
                handleClick(e);
              }}
              className={`${pathname === "/balancesheet" ? "active" : ""}`}
            >
              <Link to="/balancesheet">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12V18V6V12ZM14 21C14.2833 21 14.521 20.904 14.713 20.712C14.905 20.52 15.0007 20.2827 15 20C15 19.7167 14.904 19.479 14.712 19.287C14.52 19.095 14.2827 18.9993 14 19C13.7167 19 13.479 19.096 13.287 19.288C13.095 19.48 12.9993 19.7173 13 20C13 20.2833 13.096 20.521 13.288 20.713C13.48 20.905 13.7173 21.0007 14 21ZM20 11C20.2833 11 20.521 10.904 20.713 10.712C20.905 10.52 21.0007 10.2827 21 10C21 9.71667 20.904 9.479 20.712 9.287C20.52 9.095 20.2827 8.99934 20 9C19.7167 9 19.479 9.096 19.287 9.288C19.095 9.48 18.9993 9.71734 19 10C19 10.2833 19.096 10.521 19.288 10.713C19.48 10.905 19.7173 11.0007 20 11ZM6 11H11V9H6V11ZM6 15H11V13H6V15ZM4 20C3.45 20 2.979 19.804 2.587 19.412C2.195 19.02 1.99934 18.5493 2 18V6C2 5.45 2.196 4.979 2.588 4.587C2.98 4.195 3.45067 3.99934 4 4H20C20.55 4 21.021 4.196 21.413 4.588C21.805 4.98 22.0007 5.45067 22 6H4V18H9V20H4ZM14 23C13.1667 23 12.4583 22.7083 11.875 22.125C11.2917 21.5417 11 20.8333 11 20C11 19.35 11.1877 18.7667 11.563 18.25C11.9383 17.7333 12.4173 17.375 13 17.175V14H19V12.825C18.4167 12.625 17.9373 12.2667 17.562 11.75C17.1867 11.2333 16.9993 10.65 17 10C17 9.16667 17.2917 8.45833 17.875 7.875C18.4583 7.29167 19.1667 7 20 7C20.8333 7 21.5417 7.29167 22.125 7.875C22.7083 8.45833 23 9.16667 23 10C23 10.65 22.8123 11.2333 22.437 11.75C22.0617 12.2667 21.5827 12.625 21 12.825V16H15V17.175C15.5833 17.375 16.0627 17.7333 16.438 18.25C16.8133 18.7667 17.0007 19.35 17 20C17 20.8333 16.7083 21.5417 16.125 22.125C15.5417 22.7083 14.8333 23 14 23Z"
                    fill="black"
                  />
                </svg>
                <span>Balance Sheet</span>
              </Link>
            </li>
            <li
              onClick={(e) => {
                handleClick(e);
              }}
              className={`${pathname === "/transportrent" ? "active" : ""}`}
            >
              <Link to="/transportrent">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 4H10C9.73478 4 9.48043 4.10536 9.29289 4.29289C9.10536 4.48043 9 4.73478 9 5V16C9 16.2652 9.10536 16.5196 9.29289 16.7071C9.48043 16.8946 9.73478 17 10 17H21C21.2652 17 21.5196 16.8946 21.7071 16.7071C21.8946 16.5196 22 16.2652 22 16V5C22 4.73478 21.8946 4.48043 21.7071 4.29289C21.5196 4.10536 21.2652 4 21 4ZM2 17H9V10H5.5L2 13.231V17Z"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 18C9 18.5304 8.78929 19.0391 8.41421 19.4142C8.03914 19.7893 7.53043 20 7 20C6.46957 20 5.96086 19.7893 5.58579 19.4142C5.21071 19.0391 5 18.5304 5 18M20 18C20 18.5304 19.7893 19.0391 19.4142 19.4142C19.0391 19.7893 18.5304 20 18 20C17.4696 20 16.9609 19.7893 16.5858 19.4142C16.2107 19.0391 16 18.5304 16 18"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Transport Rent</span>
              </Link>
            </li>
            <li
              onClick={(e) => {
                handleClick(e);
              }}
              className={`${pathname === "/stock" ? "active" : ""}`}
            >
              <Link to="/stock">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_347_19)">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4 4C4 3.46957 4.21071 2.96086 4.58579 2.58579C4.96086 2.21071 5.46957 2 6 2H18C18.5304 2 19.0391 2.21071 19.4142 2.58579C19.7893 2.96086 20 3.46957 20 4V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V4ZM18 4H6V20H18V4ZM11.548 6.763C11.7355 6.95053 11.8408 7.20484 11.8408 7.47C11.8408 7.73516 11.7355 7.98947 11.548 8.177L9.603 10.12C9.36861 10.3542 9.05083 10.4857 8.7195 10.4857C8.38817 10.4857 8.07039 10.3542 7.836 10.12L6.952 9.236C6.85649 9.14375 6.78031 9.03341 6.7279 8.9114C6.67549 8.7894 6.6479 8.65818 6.64675 8.5254C6.6456 8.39262 6.6709 8.26094 6.72118 8.13805C6.77146 8.01515 6.84571 7.9035 6.93961 7.80961C7.0335 7.71571 7.14515 7.64146 7.26805 7.59118C7.39094 7.5409 7.52262 7.5156 7.6554 7.51675C7.78818 7.5179 7.9194 7.54549 8.0414 7.5979C8.16341 7.65031 8.27375 7.72649 8.366 7.822L8.72 8.176L10.134 6.762C10.3215 6.57453 10.5758 6.46921 10.841 6.46921C11.1062 6.46921 11.3605 6.57553 11.548 6.763ZM13 9C13 8.73478 13.1054 8.48043 13.2929 8.29289C13.4804 8.10536 13.7348 8 14 8H16C16.2652 8 16.5196 8.10536 16.7071 8.29289C16.8946 8.48043 17 8.73478 17 9C17 9.26522 16.8946 9.51957 16.7071 9.70711C16.5196 9.89464 16.2652 10 16 10H14C13.7348 10 13.4804 9.89464 13.2929 9.70711C13.1054 9.51957 13 9.26522 13 9ZM7 13.5C7 13.1022 7.15804 12.7206 7.43934 12.4393C7.72064 12.158 8.10218 12 8.5 12H10.5C10.8978 12 11.2794 12.158 11.5607 12.4393C11.842 12.7206 12 13.1022 12 13.5V15.5C12 15.8978 11.842 16.2794 11.5607 16.5607C11.2794 16.842 10.8978 17 10.5 17H8.5C8.10218 17 7.72064 16.842 7.43934 16.5607C7.15804 16.2794 7 15.8978 7 15.5V13.5ZM9 14V15H10V14H9ZM13 14.5C13 14.2348 13.1054 13.9804 13.2929 13.7929C13.4804 13.6054 13.7348 13.5 14 13.5H16C16.2652 13.5 16.5196 13.6054 16.7071 13.7929C16.8946 13.9804 17 14.2348 17 14.5C17 14.7652 16.8946 15.0196 16.7071 15.2071C16.5196 15.3946 16.2652 15.5 16 15.5H14C13.7348 15.5 13.4804 15.3946 13.2929 15.2071C13.1054 15.0196 13 14.7652 13 14.5Z"
                      fill="black"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_347_19">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>

                <span>Stock</span>
              </Link>
            </li>
            <li
              onClick={(e) => {
                handleClick(e);
              }}
              className={`${pathname === "/bank" ? "active" : ""}`}
            >
              <Link to="/bank">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_347_23)">
                    <path
                      d="M12.67 2.21701L21.17 6.96701C21.4195 7.09158 21.6294 7.28324 21.776 7.52048C21.9226 7.75772 22.0002 8.03113 22 8.31001V9.75001C22 10.44 21.44 11 20.75 11H20V19H21C21.2652 19 21.5196 19.1054 21.7071 19.2929C21.8946 19.4804 22 19.7348 22 20C22 20.2652 21.8946 20.5196 21.7071 20.7071C21.5196 20.8947 21.2652 21 21 21H3C2.73478 21 2.48043 20.8947 2.29289 20.7071C2.10536 20.5196 2 20.2652 2 20C2 19.7348 2.10536 19.4804 2.29289 19.2929C2.48043 19.1054 2.73478 19 3 19H4V11H3.25C2.56 11 2 10.44 2 9.75001V8.31001C2 7.78801 2.27 7.30801 2.706 7.03601L11.329 2.21701C11.5373 2.11281 11.7671 2.05856 12 2.05856C12.2329 2.05856 12.4617 2.11281 12.67 2.21701ZM18 11H6V19H9V13H11V19H13V13H15V19H18V11ZM12 4.11801L4 8.61801V9.00001H20V8.61801L12 4.11801ZM12 6.00001C12.2652 6.00001 12.5196 6.10537 12.7071 6.29291C12.8946 6.48044 13 6.7348 13 7.00001C13 7.26523 12.8946 7.51958 12.7071 7.70712C12.5196 7.89466 12.2652 8.00001 12 8.00001C11.7348 8.00001 11.4804 7.89466 11.2929 7.70712C11.1054 7.51958 11 7.26523 11 7.00001C11 6.7348 11.1054 6.48044 11.2929 6.29291C11.4804 6.10537 11.7348 6.00001 12 6.00001Z"
                      fill="black"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_347_23">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <span>Bank</span>
              </Link>
            </li>
            <li
              onClick={(e) => {
                handleClick(e);
              }}
              className={`${pathname === "/items" ? "active" : ""}`}
            >
              <Link to="/items">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M20 4H4C3.73478 4 3.48043 4.10536 3.29289 4.29289C3.10536 4.48043 3 4.73478 3 5V19C3 19.2652 3.10536 19.5196 3.29289 19.7071C3.48043 19.8946 3.73478 20 4 20H20C20.2652 20 20.5196 19.8946 20.7071 19.7071C20.8946 19.5196 21 19.2652 21 19V5C21 4.73478 20.8946 4.48043 20.7071 4.29289C20.5196 4.10536 20.2652 4 20 4ZM4 2C3.20435 2 2.44129 2.31607 1.87868 2.87868C1.31607 3.44129 1 4.20435 1 5V19C1 19.7956 1.31607 20.5587 1.87868 21.1213C2.44129 21.6839 3.20435 22 4 22H20C20.7956 22 21.5587 21.6839 22.1213 21.1213C22.6839 20.5587 23 19.7956 23 19V5C23 4.20435 22.6839 3.44129 22.1213 2.87868C21.5587 2.31607 20.7956 2 20 2H4ZM6 7H8V9H6V7ZM11 7C10.7348 7 10.4804 7.10536 10.2929 7.29289C10.1054 7.48043 10 7.73478 10 8C10 8.26522 10.1054 8.51957 10.2929 8.70711C10.4804 8.89464 10.7348 9 11 9H17C17.2652 9 17.5196 8.89464 17.7071 8.70711C17.8946 8.51957 18 8.26522 18 8C18 7.73478 17.8946 7.48043 17.7071 7.29289C17.5196 7.10536 17.2652 7 17 7H11ZM8 11H6V13H8V11ZM10 12C10 11.7348 10.1054 11.4804 10.2929 11.2929C10.4804 11.1054 10.7348 11 11 11H17C17.2652 11 17.5196 11.1054 17.7071 11.2929C17.8946 11.4804 18 11.7348 18 12C18 12.2652 17.8946 12.5196 17.7071 12.7071C17.5196 12.8946 17.2652 13 17 13H11C10.7348 13 10.4804 12.8946 10.2929 12.7071C10.1054 12.5196 10 12.2652 10 12ZM8 15H6V17H8V15ZM10 16C10 15.7348 10.1054 15.4804 10.2929 15.2929C10.4804 15.1054 10.7348 15 11 15H17C17.2652 15 17.5196 15.1054 17.7071 15.2929C17.8946 15.4804 18 15.7348 18 16C18 16.2652 17.8946 16.5196 17.7071 16.7071C17.5196 16.8946 17.2652 17 17 17H11C10.7348 17 10.4804 16.8946 10.2929 16.7071C10.1054 16.5196 10 16.2652 10 16Z"
                    fill="black"
                  />
                </svg>
                <span>Items</span>
              </Link>
            </li>

            <li
              onClick={(e) => {
                handleClick(e);
              }}
              className={`${pathname === "/settings" ? "active" : ""}`}
            >
              <Link to="/settings">
                <svg
                  className="icon-settings"
                  width="24px"
                  height="24px"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 330 330"
                >
                  <g id="XMLID_808_">
                    <path
                      id="XMLID_809_"
                      d="M165,105c-33.084,0-60,26.916-60,60s26.916,60,60,60s60-26.916,60-60S198.084,105,165,105z M165,195
		c-16.542,0-30-13.458-30-30s13.458-30,30-30s30,13.458,30,30S181.542,195,165,195z"
                    />
                    <path
                      id="XMLID_812_"
                      d="M319.806,202.752l-35.009-30.767c0.135-2.331,0.203-4.664,0.203-6.985c0-2.322-0.068-4.655-0.203-6.986
		l35.007-30.766c5.371-4.72,6.663-12.575,3.088-18.767l-30-51.962c-3.575-6.192-11.025-9.001-17.797-6.709l-44.142,14.934
		c-3.901-2.572-7.946-4.912-12.109-7.006l-9.136-45.68C208.307,5.047,202.15,0,195,0h-60c-7.15,0-13.307,5.047-14.709,12.058
		l-9.136,45.68c-4.163,2.094-8.207,4.435-12.108,7.006L54.902,49.81c-6.77-2.29-14.221,0.517-17.797,6.709l-30,51.962
		c-3.575,6.192-2.283,14.047,3.088,18.767l35.008,30.766C45.067,160.342,45,162.675,45,165s0.067,4.659,0.202,6.986l-35.008,30.766
		c-5.371,4.72-6.663,12.575-3.088,18.767l30,51.961c3.576,6.192,11.025,9,17.797,6.709l44.143-14.934
		c3.901,2.572,7.946,4.912,12.109,7.006l9.136,45.68C121.693,324.953,127.85,330,135,330h60c7.15,0,13.307-5.047,14.708-12.058
		l9.136-45.68c4.163-2.094,8.207-4.435,12.108-7.006l44.144,14.934c6.773,2.289,14.222-0.516,17.797-6.709l30-51.962
		C326.47,215.327,325.177,207.472,319.806,202.752z M273.063,247.831l-39.728-13.44c-4.721-1.596-9.925-0.745-13.89,2.271
		c-6.058,4.61-12.66,8.43-19.622,11.354c-4.589,1.928-7.924,6.006-8.9,10.888L182.703,300h-35.406l-8.219-41.096
		c-0.976-4.881-4.311-8.96-8.9-10.888c-6.966-2.926-13.567-6.745-19.621-11.353c-3.965-3.018-9.169-3.87-13.892-2.273l-39.728,13.44
		l-17.703-30.662l31.493-27.677c3.736-3.283,5.602-8.205,4.981-13.139C75.238,172.613,75,168.794,75,165
		c0-3.794,0.238-7.613,0.709-11.352c0.621-4.935-1.245-9.856-4.981-13.14l-31.494-27.677l17.703-30.663l39.729,13.44
		c4.721,1.596,9.924,0.745,13.89-2.271c6.057-4.609,12.659-8.429,19.622-11.354c4.589-1.928,7.924-6.006,8.9-10.888L147.297,30
		h35.406l8.219,41.096c0.976,4.881,4.311,8.96,8.9,10.888c6.963,2.925,13.565,6.745,19.621,11.354
		c3.965,3.017,9.17,3.869,13.891,2.272l39.726-13.439l17.703,30.662l-31.492,27.677c-3.734,3.282-5.6,8.2-4.981,13.132
		c0.471,3.758,0.71,7.58,0.71,11.359c0,3.779-0.239,7.601-0.71,11.359c-0.619,4.933,1.248,9.851,4.982,13.133l31.494,27.677
		L273.063,247.831z"
                    />
                  </g>
                </svg>
                <span>Setting</span>
              </Link>
            </li>
          </ul>
          <div className="management-menu-m">
            <hr />
            <UserMenu />
          </div>
        </div>
        <div className="sidebar-footer"></div>
      </div>
    </aside>
  );
}

export default SideNav;
