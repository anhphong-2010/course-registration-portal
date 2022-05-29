import React, { Fragment, useEffect, useState } from "react";
import "./InfoCourse.scss";
import { NavLink } from "react-router-dom";
import StudentViewingCarousel from "../StudentViewingCarousel/StudentViewingCarousel";
import { coursesServices } from "../../services/CoursesServices";
import { usersServices } from "../../services/UsersServices";
import { useSelector } from "react-redux";
import Loading from "../Loading/Loading";
import swal from "sweetalert";
import StickyBox from "react-sticky-box";

export default function InfoCourse(props) {
  let { params } = props;
  let [infoCourse, setCourse] = useState([]);
  let [loading, setLoading] = useState(true);
  useEffect(() => {
    coursesServices
      .getInfoCourse(params.match.params.makhoahoc)
      .then((result) => {
        setCourse(result.data);
        setLoading(false);
      });
  }, [params.match.params.makhoahoc]);

  console.log({ infoCourse });
  const taiKhoan = useSelector((state) => state.UserManagementReducer.taiKhoan);
  const registerCourse = () => {
    let info = {
      maKhoaHoc: params.match.params.makhoahoc,
      taiKhoan: taiKhoan,
    };
    swal({
      title: "Are you sure?",
      text: "Registering this course",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        usersServices
          .registerCourse(info)
          .then((res) => {
            swal({
              title: "This course is registered successful!",
              icon: "success",
              button: "OK",
            });
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          })
          .catch((err) => {
            swal({
              title: "You have already registered for this course!",
              icon: "error",
              button: "OK",
            });
          });
      } else {
        swal("Ohh!");
      }
    });
  };
  const renderButton = () => {
    if (taiKhoan) {
      return (
        <button
          className="btn btn-register btn-block"
          onClick={() => {
            registerCourse();
          }}
        >
          Register
        </button>
      );
    } else {
      return (
        <button className="btn btn-register btn-block" disabled>
          Login to register
        </button>
      );
    }
  };
  if (loading) {
    return <Loading />;
  } else {
    return (
      <Fragment>
        <div className="info-course">
          <div className="course-content container py-3">
            <div className="course-left">
              <div className="course-tag mb-2">
                <NavLink className="tag-link" to="/">
                  {infoCourse?.danhMucKhoaHoc?.tenDanhMucKhoaHoc}
                </NavLink>
                <span className="fa fa-angle-right ml-2"></span>
              </div>
              <h2 className="course-title">{infoCourse?.tenKhoaHoc}</h2>
              <div className="course-description">{infoCourse?.moTa}</div>
              <div className="course-star">
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star-half-alt" />
                <span className="rating">
                  <span className="rating__point">4.5</span>
                  <span className="rating__people">
                    ({infoCourse?.luotXem + " ratings"})
                  </span>
                  <span className="rating__student">
                    {infoCourse?.soLuongHocVien + " students"}
                  </span>
                </span>
              </div>
              <div className="course-author">
                Created by{" "}
                <NavLink className="author-link" to="/">
                  {infoCourse?.nguoiTao?.hoTen}
                </NavLink>
              </div>
              <div className="course-date text-light mb-2">
                {infoCourse?.ngayTao}
              </div>
              <div className="course-button">
                <button className="button-item text-light mr-2">
                  Wishlist
                </button>
                <button className="button-item text-light mr-2">Share</button>
              </div>
            </div>
            <div className="course-right">
              <StickyBox>
                <div className="course-right-content">
                  <div className="img-form">
                    <img src={infoCourse?.hinhAnh} alt={infoCourse?.hinhAnh} />
                  </div>
                  <div className="right-content-body p-3">
                    <div className="right-price">$11.99</div>
                    {renderButton()}
                  </div>
                </div>
              </StickyBox>
            </div>
          </div>
        </div>
        <div className="body-content container">
          <StudentViewingCarousel />
        </div>
      </Fragment>
    );
  }
}
