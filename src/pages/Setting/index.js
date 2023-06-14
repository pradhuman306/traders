import React, { useEffect } from "react";
import Header from "../Header/Header";
import { Link , Outlet ,useLocation} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getItems } from "../../actions/items";
import { getFirm } from "../../actions/firm";
import { getGoDownList } from "../../actions/godown";
function Setting(props) {
  const dispatch = useDispatch();
  const pathname = useLocation().pathname;
  const itemListAll = useSelector((state)=>state.itemReducer).itemList;
  const firmListAll = useSelector((state)=>state.firmReducer).firmList;
  const godownListAll = useSelector((state)=>state.godownReducer).godownList;
  const userId = props.auth.userdata.id;
  useEffect(() => {
    dispatch(getItems(userId));
    dispatch(getFirm(userId));
    dispatch(getGoDownList(userId));
}, []);

  return (
    <>
      <Header heading="Settings" {...props} />

      <div className="body-content">
        <div className="setting-form row">

          <div className="col-md-12">
            <ul className="report-filter tabs">
            <li className={`${pathname === "/settings/accountinfo" ? "active" : ""}`}>
                <Link to="/settings/accountinfo"
                >
                  Basic Information
                </Link>
              </li>
          
              <li className={`${pathname === "/settings/updatepass" ? "active" : ""}`}>
              <Link to="/settings/updatepass"
                >
                  Update Password
                </Link>
              </li>
              <li className={`${pathname === "/settings/items" ? "active" : ""}`}>
              <Link to="/settings/items"
                >
                 Items <span className="badge rounded-pill bg-text text-bg-primary">{itemListAll.length?itemListAll.length:""}</span>
                </Link>
              </li>
              <li className={`${pathname === "/settings/firm" ? "active" : ""}`}>
              <Link to="/settings/firm"
                >
                 Firm <span className="badge rounded-pill bg-text text-bg-primary">{firmListAll.length?firmListAll.length:""}</span>
                </Link>
              </li>
              <li className={`${pathname === "/settings/godown" ? "active" : ""}`}>
              <Link to="/settings/godown"
                >
                 Godown <span className="badge rounded-pill bg-text text-bg-primary">{godownListAll.length?godownListAll.length:""}</span>
                </Link>
              </li>
              <li className={`${pathname === "/settings/investment" ? "active" : ""}`}>
              <Link to="/settings/investment"
                >
                 Investment
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-12">
          <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default Setting;
