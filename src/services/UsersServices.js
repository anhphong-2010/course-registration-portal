import axios from "axios";
import { domain, token, groupID } from "../config/settings";

export class UsersServices {
  getListUser = () => {
    return axios({
      url: `${domain}/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=${groupID}`,
      method: "GET",
    });
  };
  addUser = (infoUser) => {
    return axios({
      url: `${domain}/QuanLyNguoiDung/ThemNguoiDung`,
      method: "POST",
      data: infoUser,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(token),
      },
    });
  };
  signUp = (infoSignUp) => {
    return axios({
      url: `${domain}/QuanLyNguoiDung/DangKy`,
      method: "POST",
      data: infoSignUp,
    });
  };
  logIn = (infoLogin) => {
    return axios({
      url: `${domain}/QuanLyNguoiDung/DangNhap`,
      method: "POST",
      data: infoLogin,
    });
  };
  getInfoUser = (infoAccount) => {
    return axios({
      url: `${domain}/QuanLyNguoiDung/ThongTinTaiKhoan`,
      method: "POST",
      data: infoAccount,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(token),
      },
    });
  };
  updateInfoUser = (infoAccount) => {
    return axios({
      url: `${domain}/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
      method: "PUT",
      data: infoAccount,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(token),
      },
    });
  };

  deleteUser = (account) => {
    return axios({
      url: `${domain}/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${account}`,
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem(token),
      },
    });
  };
  registerCourse = (infoRegister) => {
    return axios({
      url: `${domain}/QuanLyKhoaHoc/DangKyKhoaHoc`,
      method: "POST",
      data: infoRegister,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(token),
      },
    });
  };
  acceptCourse = (infoAccept) => {
    return axios({
      url: `${domain}/QuanLyKhoaHoc/GhiDanhKhoaHoc`,
      method: "POST",
      data: infoAccept,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(token),
      },
    });
  };
  cancelRegisterCourse = (info) => {
    return axios({
      url: `${domain}/QuanLyKhoaHoc/HuyGhiDanh`,
      method: "POST",
      data: info,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(token),
      },
    });
  };
  
}

export const usersServices = new UsersServices();
