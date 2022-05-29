import { SIGN_IN } from "../types/UserManagementType";
import { SIGN_OUT } from "../types/UserManagementType";
import { UPDATE_INFO } from "../types/UserManagementType";

let taiKhoan = "";
let matKhau = "";
let hoTen = "";
let soDT = "";
let email = "";

if (localStorage.getItem("userLogin")) {
  taiKhoan = JSON.parse(localStorage.getItem("userLogin")).taiKhoan;
  hoTen = JSON.parse(localStorage.getItem("userLogin")).hoTen;
  soDT = JSON.parse(localStorage.getItem("userLogin")).soDT;
  email = JSON.parse(localStorage.getItem("userLogin")).email;
}

const initialState = {
  taiKhoan: taiKhoan,
  matKhau: matKhau,
  hoTen: hoTen,
  soDT: soDT,
  email: email,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN: {
      state.taiKhoan = action.taiKhoan;
      state.matKhau = action.matKhau;
      state.hoTen = action.hoTen;
      state.soDT = action.soDT;
      state.email = action.email;
      return { ...state };
    }
    case SIGN_OUT: {
      localStorage.removeItem("userLogin");
      state.taiKhoan = "";
      window.location.reload();
      return { ...state };
    }
    case UPDATE_INFO: {
      state.taiKhoan = action.taiKhoan;
      state.matKhau = action.matKhau;
      state.hoTen = action.hoTen;
      state.soDT = action.soDT;
      state.email = action.email;
      return { ...state };
    }
    default:
  }
  return { ...state };
};
