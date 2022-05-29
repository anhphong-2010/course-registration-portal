import { SIGN_IN } from "../types/UserManagementType";
import { SIGN_OUT } from "../types/UserManagementType";
import { UPDATE_INFO } from "../types/UserManagementType";
export const signInAction = (taiKhoan, matKhau) => {
  return { type: SIGN_IN, taiKhoan, matKhau };
};

export const signOutAction = () => {
  return { type: SIGN_OUT };
};

export const updateInfoAction = (taiKhoan, matKhau, hoTen, soDT, email) => {
  return { type: UPDATE_INFO, taiKhoan, matKhau, hoTen, soDT, email };
};
