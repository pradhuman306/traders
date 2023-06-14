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
import Bank from "../pages/Bank";
import AddTransportRent from "../pages/TransportRent/AddTransportRent";
import EditTransportRent from "../pages/TransportRent/EditTransportRent";
import AddParty from "../pages/BalanceSheet/AddParty";
import EditParty from "../pages/BalanceSheet/EditParty";
import AccountDetails from "../pages/Bank/AccountDetails";
import Items from "../pages/Items";
import StockDetails from "../pages/Stock/StockDetails";
import PartyHistory from "../pages/BalanceSheet/PartyHistory";
import TransportDetails from "../pages/TransportRent/TransportDetails";
import Firm from "../pages/Firm";
import AccountInfo from "../component/AccountInfo";
import UpdatePass from "../component/UpdatePass";
import Invoice from "../pages/Invoice";
import Stocks from "../pages/Stock/Stocks";
import StocksGodown from "../pages/Stock/StocksGodown";
import Investment from "../pages/Investment";

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
            element={<ResetPassword {...props} />}
          />
          <Route key="reset-link" path="reset-link" element={<Resetlink />} />

          <Route
            key="reset-password_token"
            path="reset-password/:token"
            element={<CreateNewPassword {...props} />}
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
            key="firm"
            path="firm"
            element={
              <PrivateRoute>
                <LayoutContainer
                  auth={auth}
                  children={<Firm {...props} />}
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
            key="partyhistory"
            path="balancesheet/:partyid"
            element={
              <PrivateRoute>
                <LayoutContainer
                  auth={auth}
                  children={<PartyHistory {...props} />}
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
                  children={<Stocks {...props} />}
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
            key="Invoice"
            path="invoice/:partyid/:id"
            element={
              <PrivateRoute>
                <Invoice {...props}/>
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
            key="stockdetails"
            path="stockdetails/:stockid"
            element={
              <PrivateRoute>
                <LayoutContainer
                  auth={auth}
                  children={<StockDetails {...props} />}
                />
              </PrivateRoute>
            }
          />

        <Route
            key="transportdetails"
            path="transportdetails/:transid"
            element={
              <PrivateRoute>
                <LayoutContainer
                  auth={auth}
                  children={<TransportDetails {...props} />}
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
          >
            <Route
            key="accountInfo"
            path="accountinfo"
            element={
              <PrivateRoute>
              <AccountInfo {...props} />
              </PrivateRoute>
            }
          />
             <Route
            key="investment"
            path="investment"
            element={
               <PrivateRoute>
         <Investment {...props} />
               </PrivateRoute>
            }
          />
              <Route
            key="updatePass"
            path="updatepass"
            element={
              <PrivateRoute>
              <UpdatePass {...props} />
              </PrivateRoute>
            }
          />
              <Route
            key="items"
            path="items"
            element={
              <PrivateRoute>
              <Items {...props} />
              </PrivateRoute>
            }
          />
           
              <Route
            key="firm"
            path="firm"
            element={
              <PrivateRoute>
              <Firm {...props} />
              </PrivateRoute>
            }
          />
               <Route
            key="goDown"
            path="godown"
            element={
              <PrivateRoute>
              <StocksGodown {...props} />
              </PrivateRoute>
            }
          />
          </Route>


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
