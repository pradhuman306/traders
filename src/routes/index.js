// export * from "./routes";
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import LayoutContainer from "../Containers/LayoutContainer";
import HomeContainer from "../Containers/HomeContainer";
import ResetPassword from "../pages/ResetPassword";
import CreateNewPassword from "../pages/ResetPassword/CreateNewPassword";
import Setting from "../pages/Setting";
import Signin from "../pages/Signin";
import Resetlink from "../pages/ResetPassword/Resetlink";
import BuySell from "../pages/BuySell";
import BalanceSheet from "../pages/BalanceSheet";
import TransportRent from "../pages/TransportRent";
import Stock from "../pages/Stock";
import Bank from "../pages/Bank";
import AddTransportRent from "../pages/TransportRent/AddTransportRent";
import EditTransportRent from "../pages/TransportRent/EditTransportRent";
import AddParty from "../pages/BalanceSheet/AddParty";
import EditParty from "../pages/BalanceSheet/EditParty";
import AccountDetails from "../pages/Bank/AccountDetails";
import Items from "../pages/Items";
import GoDown from "../pages/Stock";

function Router(props) {
  const auth = props.auth;
  return (
    <Routes>
      {!props.auth.isAuthenticated && (
        <>
          <Route key="signin" path="signin" element={<Signin />} />
          <Route
            key="signincustomer"
            path="signin"
            element={<Signin />}
          />
          <Route
            key="reset-password"
            path="reset-password"
            element={<ResetPassword />}
          />
          <Route key="reset-link" path="reset-link" element={<Resetlink />} />

          <Route
            key="reset-password_token"
            path="reset-password/:token"
            element={<CreateNewPassword />}
          />
        </>
      )}
      {auth.isAuthenticated && (
        <>
          <Route
            key="dashboard"
            path="dashboard"
            element={
              <PrivateRoute>
                <LayoutContainer
                  auth={auth}
                  children={<HomeContainer {...props} />}
                />
              </PrivateRoute>
            }
          />
          <Route
            key="buysell"
            path="buysell"
            element={
              <PrivateRoute>
                <LayoutContainer
                  auth={auth}
                  children={<BuySell {...props} />}
                />
              </PrivateRoute>
            }
          />
          <Route
            key="balancesheet"
            path="balancesheet"
            element={
              <PrivateRoute>
                <LayoutContainer
                  auth={auth}
                  children={<BalanceSheet {...props} />}
                />
              </PrivateRoute>
            }
          />
            <Route
            key="items"
            path="items"
            element={
              <PrivateRoute>
                <LayoutContainer
                  auth={auth}
                  children={<Items {...props} />}
                />
              </PrivateRoute>
            }
          />
          <Route
            key="addparty"
            path="addparty"
            element={
              <PrivateRoute>
                <LayoutContainer
                  auth={auth}
                  children={<AddParty {...props} />}
                />
              </PrivateRoute>
            }
          />

          <Route
            key="editparty"
            path="editparty/:id"
            element={
              <PrivateRoute>
                <LayoutContainer
                  auth={auth}
                  children={<EditParty {...props} />}
                />
              </PrivateRoute>
            }
          />
          <Route
            key="transportrent"
            path="transportrent"
            element={
              <PrivateRoute>
                <LayoutContainer
                  auth={auth}
                  children={<TransportRent {...props} />}
                />
              </PrivateRoute>
            }
          />
          <Route
            key="addtransportrent"
            path="addtransportrent"
            element={
              <PrivateRoute>
                <LayoutContainer
                  auth={auth}
                  children={<AddTransportRent {...props} />}
                />
              </PrivateRoute>
            }
          />
          <Route
            key="edittransportrent"
            path="edittransportrent/:id"
            element={
              <PrivateRoute>
                <LayoutContainer
                  auth={auth}
                  children={<EditTransportRent {...props} />}
                />
              </PrivateRoute>
            }
          />
          <Route
            key="stock"
            path="stock"
            element={
              <PrivateRoute>
                <LayoutContainer
                  auth={auth}
                  children={<GoDown {...props} />}
                />
              </PrivateRoute>
            }
          />
          <Route
            key="bank"
            path="bank"
            element={
              <PrivateRoute>
                <LayoutContainer
                  auth={auth}
                  children={<Bank {...props} />}
                />
              </PrivateRoute>
            }
          />

          <Route
            key="accountid"
            path="accountdetails/:accountid"
            element={
              <PrivateRoute>
                <LayoutContainer
                  auth={auth}
                  children={<AccountDetails {...props} />}
                />
              </PrivateRoute>
            }
          />


          <Route
            key="settings"
            path="settings"
            element={
              <PrivateRoute>
                <LayoutContainer
                  auth={auth}
                  children={<Setting {...props} />}
                />
              </PrivateRoute>
            }
          />
        </>
      )}
      <>
        <Route
          path="*"
          element={
            <Navigate
              to={auth.isAuthenticated ? "/dashboard" : "/signin"}
            />
          }
        />
      </>
    </Routes>
  );
}

export default Router;
