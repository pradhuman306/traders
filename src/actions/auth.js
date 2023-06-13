import config from "../config";
import * as api from "../common/api";
import * as ajaxCall from "../common/ajaxCall";
import * as actionTypes from "../constants/actionTypes";
import * as localstorage from "../common/localStorage";
import * as Cookie from "../common/Cookies";
const loginSuccess = (type, text) => ({
  type,
  payload: text,
});

export const signout = () => (dispatch) => {
  localstorage.clear();
  dispatch({
    type: actionTypes.USER_LOGOUT,
  });
  dispatch({
          type: actionTypes.AUTH_ERROR,
        });
  dispatch({
    type: actionTypes.SUCCESS_MESSAGE,
    payload: "Signed out successfully",
  });

};

export const login = (loginDetails) => (dispatch) => {
  const { email, password, rememberme } = loginDetails;

  const payload = { email, password };
  if (rememberme) {
    Cookie.setCookie("email", email, 30);
    Cookie.setCookie("password", password, 30);
  } else {
    Cookie.clear("email");
    Cookie.clear("password");
  }
  api
    .post(`${config.BASE_URL}login`, payload)
    .then((response) => {
      let {
        token,
        role,
        data,
        message,
      } = response.data;
      if (response.status == 200) {
        console.log(response.data.token);
        let date = new Date();
        date = new Date(date.setDate(date.getDate() + 7));
        console.log("🚀 ~ file: auth.js ~ line 63 ~ .then ~ date", date);
        localstorage.set("exp", btoa(date));
        localstorage.set("traders_token", btoa(token));
        localstorage.set("userdata", JSON.stringify(data));
        dispatch(loginSuccess(actionTypes.USER_LOADED, response.data));
        dispatch({
          type: actionTypes.SUCCESS_MESSAGE,
          payload: response.data.message,
        });
      }
    })
    .catch((error) => {

     
      dispatch({
        type: actionTypes.AUTH_ERROR,
      });
      dispatch({
        type: actionTypes.ERROR_MESSAGE,
        payload: error.response.data.message,
      });
    });
};

export const ResetEmailSend = (payload, nav, setBtnPending) => (dispatch) => {
  api
    .post(`${config.BASE_URL}forgotpassword`,{email:payload.email})
    .then((response) => {
      setBtnPending(false);
      if (response.status == 200) {
        dispatch({
          type: actionTypes.SUCCESS_MESSAGE,
          payload: response.data.message,
        });
        nav("/reset-link");
      }
    })
    .catch((error) => {
      setBtnPending(false);
      dispatch({
        type: actionTypes.ERROR_MESSAGE,
        payload: error.response.data.message,
      });
    });
};

export const ResetPassword = (payload,nav,setBtnPending) => (dispatch) => {
  api
    .post(`${config.BASE_URL}resetpassword`, payload)
    .then((response) => {
      setBtnPending(false);
      if (response.status == 200) {
        nav('/signin');
        dispatch({
          type: actionTypes.SUCCESS_MESSAGE,
          payload: response.data.message,
        });
      }
    })
    .catch((error) => {
      setBtnPending(false);
      dispatch({
        type: actionTypes.ERROR_MESSAGE,
        payload: error.response.data.message,
      });
    });
};

export const UpdateProfile = (payload,setBtnPending) => (dispatch) => {
  ajaxCall
    .post(`${config.BASE_URL}updateprofile`, payload)
    .then((response) => {
      setBtnPending(false);
      payload.id = payload.user_id;
      if (response.status == 200) {
        localstorage.set("userdata", JSON.stringify(payload));
        if (response.data.status === 1) {
          dispatch({
            type: actionTypes.SUCCESS_MESSAGE,
            payload: "User updated successfully!",
          });
          dispatch({
            type: actionTypes.SET_USER_DATA,
            payload: payload,
          });
          
        }
      }
    })
    .catch((error) => {
      setBtnPending(false);
      dispatch({
        type: actionTypes.ERROR_MESSAGE,
        payload: error.response.data.message,
      });
    });
};

export const updateLogo = (payload,setBtnPending) => (dispatch) => {
  ajaxCall
    .post(`${config.BASE_URL}updatelogo`, payload)
    .then((response) => {
      setBtnPending(false);
      payload.id = payload.user_id;
      if (response.status == 200) {
        // localstorage.set("userdata", JSON.stringify(payload));
        if (response.data.status === 1) {
      
          dispatch({
            type: actionTypes.SET_LOGO,
            payload: response.data.data.logo,
          });
          localstorage.set("userprofile", JSON.stringify(response.data.data.logo));
        }
      }
    })
    .catch((error) => {
      setBtnPending(false);
      dispatch({
        type: actionTypes.ERROR_MESSAGE,
        payload: error.response.data.message,
      });
    });
};

export const getLogo = () => (dispatch) => {
  api
    .get(`${config.BASE_URL}getsitelogo`)
    .then((response) => {
      if (response.status == 200) {
        console.log(response.data);

        dispatch({
          type: actionTypes.SET_LOGO,
          payload: response.data.data.logo,
        });
        localstorage.set("userprofile", JSON.stringify(response.data.data.logo));
      
    }
    })
    .catch((error) => {
    if(error.response){
      dispatch({
        type: actionTypes.ERROR_MESSAGE,
        payload: error.response.data.message,
      });
    }
 
    });
};


export const UpdatePassword = (payload,resetForm,setBtnPending) => (dispatch) => {
  ajaxCall
    .post(`${config.BASE_URL}updatepassword`, payload)
    .then((response) => {
      setBtnPending(false);
      if (response.status == 200) {
        resetForm();
        dispatch({
          type: actionTypes.SUCCESS_MESSAGE,
          payload: "Password updated successfully",
        });
      }
    })
    .catch((error) => {
      setBtnPending(false);
      dispatch({
        type: actionTypes.ERROR_MESSAGE,
        payload: error.response.data.message,
      });
    });
};

