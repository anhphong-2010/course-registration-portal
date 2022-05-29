import React, { Fragment } from "react";
import FormFilterCourse from "../components/FormFilterCourse/FormFilterCourse";
import { userLogin } from "../config/settings";
export default function StudentInCourse(props) {
  const info = JSON.parse(localStorage.getItem(userLogin));
  if (!localStorage.getItem(userLogin) || info.maLoaiNguoiDung !== "GV") {
    props.history.push("/");
  }
  return (
    <Fragment>
      <FormFilterCourse />
    </Fragment>
  );
}
