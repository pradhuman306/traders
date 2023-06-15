import React from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { signout } from "../../actions/auth";
import { titleCase } from "../../actions/common";
export default function Header(props) {
  const dispatch = useDispatch();
  const logout = (e) => {
    dispatch(signout());
  };

  const handleClick = () => {
    document.body.classList.toggle("menu-open");

    const navIcon = document.getElementById("nav-icon");

    navIcon.classList.toggle("open");
  };

  console.log(props);
  let name = props.auth.userdata.name;
  return (
    <div className="">
      <div className="main-header">
        
      <div className="overlay-close" onClick={(e) => {
                handleClick(e);
              }}></div>
        <div className="l-items">
          <h2>{titleCase(props.heading)}</h2>
        </div>
        <div className="r-items">
          <div className="account-info-wrapper">
            <div className="account-info">
              <span>P</span>
            </div>
            <div className="drop-down">
              <div className="drop-down-body">
                <div className="sidebar-header">
                  <figure>
                    <img src={props.profilePic} alt="" />
                  </figure>
                  <label>
                    <span>{titleCase(name)}</span>Admin
                  </label>
                </div>
                <ul className="side-foot-menus">
                  <li>
                    <div className="sub-divider"></div>
                  </li>
                  <li>
                    <Link to="/settings/accountinfo">
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
                      <span>Settings</span>
                    </Link>
                  </li>
                  <li className="">
                    <a onClick={() => logout()} href="">
                      <svg
                        className="icon-logout"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          className="fill"
                          d="M2 12L1.21913 11.3753L0.719375 12L1.21913 12.6247L2 12ZM11 13C11.5523 13 12 12.5523 12 12C12 11.4477 11.5523 11 11 11V13ZM5.21913 6.3753L1.21913 11.3753L2.78087 12.6247L6.78087 7.6247L5.21913 6.3753ZM1.21913 12.6247L5.21913 17.6247L6.78087 16.3753L2.78087 11.3753L1.21913 12.6247ZM2 13H11V11H2V13Z"
                          fill="#000"
                        ></path>
                        <path
                          className="fill"
                          d="M13.3424 20.5571L13.5068 19.5707L13.3424 20.5571ZM20.9391 20.7477L21.5855 21.5107L20.9391 20.7477ZM15.0136 3.1644L14.8492 2.178L15.0136 3.1644ZM20.9391 3.25232L21.5855 2.4893L20.9391 3.25232ZM13.5068 4.42933L15.178 4.15079L14.8492 2.178L13.178 2.45654L13.5068 4.42933ZM21 9.08276V14.9172H23V9.08276H21ZM15.178 19.8492L13.5068 19.5707L13.178 21.5435L14.8492 21.822L15.178 19.8492ZM11 8.13193V7.38851H9V8.13193H11ZM11 16.6115V16.066H9V16.6115H11ZM13.5068 19.5707C12.6833 19.4334 12.1573 19.3439 11.7726 19.2294C11.4147 19.1228 11.301 19.0276 11.237 18.9521L9.71094 20.2449C10.1209 20.7288 10.6432 20.9799 11.202 21.1462C11.7339 21.3046 12.4052 21.4147 13.178 21.5435L13.5068 19.5707ZM9 16.6115C9 17.395 8.99818 18.0752 9.06695 18.626C9.13917 19.2044 9.30096 19.7609 9.71094 20.2449L11.237 18.9521C11.173 18.8766 11.0978 18.7487 11.0515 18.3782C11.0018 17.9799 11 17.4463 11 16.6115H9ZM21 14.9172C21 16.5917 20.9976 17.7403 20.8773 18.5879C20.7609 19.4077 20.5567 19.7611 20.2927 19.9847L21.5855 21.5107C22.3825 20.8356 22.7086 19.9176 22.8575 18.8689C23.0024 17.8479 23 16.5306 23 14.9172H21ZM14.8492 21.822C16.4406 22.0872 17.7396 22.3061 18.7705 22.3311C19.8294 22.3566 20.7885 22.1858 21.5855 21.5107L20.2927 19.9847C20.0288 20.2082 19.6467 20.3516 18.8189 20.3316C17.963 20.311 16.8297 20.1245 15.178 19.8492L14.8492 21.822ZM15.178 4.15079C16.8297 3.87551 17.963 3.68904 18.8189 3.66836C19.6467 3.64836 20.0288 3.79177 20.2927 4.01534L21.5855 2.4893C20.7885 1.81418 19.8294 1.64336 18.7705 1.66895C17.7396 1.69385 16.4406 1.91277 14.8492 2.178L15.178 4.15079ZM23 9.08276C23 7.46941 23.0024 6.15211 22.8575 5.13109C22.7086 4.08239 22.3825 3.16442 21.5855 2.4893L20.2927 4.01534C20.5567 4.23891 20.7609 4.59225 20.8773 5.41214C20.9976 6.25971 21 7.40829 21 9.08276H23ZM13.178 2.45654C12.4052 2.58534 11.7339 2.69537 11.202 2.85375C10.6432 3.0201 10.1209 3.27116 9.71094 3.75513L11.237 5.04788C11.301 4.97236 11.4147 4.87716 11.7726 4.77061C12.1573 4.65609 12.6833 4.56658 13.5068 4.42933L13.178 2.45654ZM11 7.38851C11 6.55366 11.0018 6.02008 11.0515 5.62183C11.0978 5.25128 11.173 5.1234 11.237 5.04788L9.71094 3.75513C9.30096 4.2391 9.13917 4.79555 9.06695 5.37405C8.99818 5.92484 9 6.60502 9 7.38851H11Z"
                          fill="#000"
                        ></path>
                      </svg>
                      <span>Log out</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
              className="sideToggle"
              onClick={(e) => {
                handleClick(e);
              }}
            >
              <div id="nav-icon">
                <span></span> <span></span> <span></span>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
