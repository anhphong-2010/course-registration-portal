import axios from "axios";
import { domain, groupID, token } from "../config/settings";

export class CoursesServices {
  getCourseCategories = () => {
    return axios({
      url: `${domain}/QuanLyKhoaHoc/LayDanhMucKhoaHoc`,
      method: "GET",
    });
  };
  getCourse = () => {
    return axios({
      url: `${domain}/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=${groupID}`,
      method: "GET",
    });
  };
  getInfoCourse = (courseId) => {
    return axios({
      url: `${domain}/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${courseId}`,
      method: "GET",
    });
  };
  getCoursesAccepted = (account) => {
    return axios({
      url: `${domain}/QuanLyNguoiDung/LayDanhSachKhoaHocDaXetDuyet`,
      method: "POST",
      data: account,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(token),
      },
    });
  };
  getCourseWaitingAccept = (account) => {
    return axios({
      url: `${domain}/QuanLyNguoiDung/LayDanhSachKhoaHocChoXetDuyet`,
      method: "POST",
      data: account,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(token),
      },
    });
  };
  getCoursesUnregistered = (account) => {
    return axios({
      url: `${domain}/QuanLyNguoiDung/LayDanhSachKhoaHocChuaGhiDanh?TaiKhoan=${account}`,
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem(token),
      },
    });
  };
  getUserInCourse = (courseId) => {
    return axios({
      url: `${domain}/QuanLyNguoiDung/LayDanhSachHocVienKhoaHoc`,
      method: "POST",
      data: courseId,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(token),
      },
    });
  };
  getUserInCourseUnaccepted = (courseId) => {
    return axios({
      url: `${domain}/QuanLyNguoiDung/LayDanhSachHocVienChoXetDuyet`,
      method: "POST",
      data: courseId,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(token),
      },
    });
  };
  deleteCourse = (courseId) => {
    return axios({
      url: `${domain}/QuanLyKhoaHoc/XoaKhoaHoc?MaKhoaHoc=${courseId}`,
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem(token),
      },
    });
  };
  createCourse = (infoCourse) => {
    return axios({
      url: `${domain}/QuanLyKhoaHoc/ThemKhoaHoc`,
      method: "POST",
      data: infoCourse,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(token),
      },
    });
  };

  updateCourse = (infoUpdateCourse) => {
    return axios({
      url: `${domain}/QuanLyKhoaHoc/CapNhatKhoaHoc`,
      method: "PUT",
      data: infoUpdateCourse,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(token),
      },
    });
  };

  upLoadImageCourse = (image) => {
    return axios({
      url: `${domain}/QuanLyKhoaHoc/UploadHinhAnhKhoaHoc`,
      method: "POST",
      data: image,
    });
  };
}

export const coursesServices = new CoursesServices();
