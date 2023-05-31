import axios from "axios";
import {
  loginStart,
  loginSuccess,
  loginFail,
  registerStart,
  registerSuccess,
  registerFail,
} from "../redux/account/Account";


export const LoginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const response = await axios.post("https://localhost:7284/api/account/login", user);

    const data = response.data;
    if (data.isSuccess === false){
      alert("xảy ra lỗi");
      return;
    }
    dispatch(loginSuccess(response.data));
    navigate("/");

  } catch (error) {
    dispatch(loginFail());
  }
}


export const RegisterUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    const response = await axios.post("https://localhost:7284/api/account/register", user);

    const data = response.data;
    if (data.isSuccess === false){
      alert("đã xảy ra lỗi")
    }
    dispatch(registerSuccess());
    navigate("/signin");
  } catch (error) {
    dispatch(registerFail);
  }
}