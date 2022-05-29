import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import "./CheckCourseModal.scss";
import { coursesServices } from "../../services/CoursesServices";
import { usersServices } from "../../services/UsersServices";
import swal from "sweetalert";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
  },
}));
export default function CheckCourseModal(props) {
  let { currentUser } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  let [course, setCourse] = useState([]);
  let [courseAccepted, setCourseAccepted] = useState([]);
  let [currentUserName] = useState({ taiKhoan: currentUser });
  useEffect(() => {
    coursesServices
      .getCourseWaitingAccept(currentUserName)
      .then((res) => {
        setCourse(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, [currentUserName]);

  useEffect(() => {
    coursesServices
      .getCoursesAccepted(currentUserName)
      .then((res) => {
        setCourseAccepted(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, [currentUserName]);

  const ghiDanh = (maKhoaHoc, taiKhoan) => {
    let info = {
      maKhoaHoc: maKhoaHoc,
      taiKhoan: taiKhoan,
    };

    usersServices
      .acceptCourse(info)
      .then((res) => {
        swal({
          title: `Registered User To This Course Successful`,
          icon: "success",
          button: "OK",
        });
        coursesServices
          .getCoursesAccepted(currentUserName)
          .then((res) => {
            setCourseAccepted(res.data);
          })
          .catch((err) => {
            console.log(err.response.data);
          });
        coursesServices
          .getCourseWaitingAccept(currentUserName)
          .then((res) => {
            setCourse(res.data);
          })
          .catch((err) => {
            console.log(err.response.data);
          });
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const huyGhiDanh = (maKhoaHoc, taiKhoan) => {
    let info = {
      maKhoaHoc: maKhoaHoc,
      taiKhoan: taiKhoan,
    };

    usersServices
      .cancelRegisterCourse(info)
      .then((res) => {
        swal({
          title: `Cancel Register Successful`,
          icon: "success",
          button: "OK",
        });
        coursesServices
          .getCoursesAccepted(currentUserName)
          .then((res) => {
            setCourseAccepted(res.data);
          })
          .catch((err) => {
            console.log(err.response.data);
          });
        coursesServices
          .getCourseWaitingAccept(currentUserName)
          .then((res) => {
            setCourse(res.data);
          })
          .catch((err) => {
            console.log(err.response.data);
          });
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  const renderCourseUnAccept = () => {
    if (course) {
      return course.map((item, index) => {
        return (
          <tr key={index}>
            <th scope="row">{index + 1}</th>
            <td>{item.tenKhoaHoc}</td>
            <td>
              <div className="d-flex justify-content-between">
                <div
                  style={{
                    cursor: "pointer",
                    color: "#2cc937",
                  }}
                  onClick={() => {
                    ghiDanh(item.maKhoaHoc, currentUser);
                  }}
                >
                  <i className="fa fa-check"></i>
                </div>
                <div
                  style={{
                    cursor: "pointer",
                    color: "#e81b00",
                  }}
                  onClick={() => {
                    huyGhiDanh(item.maKhoaHoc, currentUser);
                  }}
                >
                  <i className="fa fa-times"></i>
                </div>
              </div>
            </td>
          </tr>
        );
      });
    }
  };
  const renderCourseAccepted = () => {
    if (courseAccepted) {
      return courseAccepted.map((item, index) => {
        return (
          <tr key={index}>
            <th scope="row">{index + 1}</th>
            <td>{item.maKhoaHoc}</td>
            <td>{item.tenKhoaHoc}</td>
            <td>
              <div
                style={{
                  cursor: "pointer",
                  color: "#e81b00",
                }}
                onClick={() => {
                  huyGhiDanh(item.maKhoaHoc, currentUser);
                }}
              >
                <i className="fa fa-times"></i>
              </div>
            </td>
          </tr>
        );
      });
    }
  };
  return (
    <div
      className="modal fade bd-example-modal-lg"
      id={`dc${currentUser}`}
      tabIndex={-1}
      role="dialog"
      aria-labelledby="modelTitleId"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-dialog-scrollable modal-dialog-centered"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-body p-0">
            <div className={classes.root}>
              <AppBar position="static" color="default">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="fullWidth"
                  aria-label="full width tabs example"
                >
                  <Tab label="Register Courses" {...a11yProps(0)} />
                  <Tab label="Accepted Courses" {...a11yProps(1)} />
                </Tabs>
              </AppBar>
              <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={value}
                onChangeIndex={handleChangeIndex}
              >
                <div value={value} index={0} dir={theme.direction}>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Course Name</th>
                        <th scope="col">Controls</th>
                      </tr>
                    </thead>
                    <tbody>{renderCourseUnAccept()}</tbody>
                  </table>
                </div>
                <div value={value} index={1} dir={theme.direction}>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">ID</th>
                        <th scope="col">Course Name</th>
                        <th scope="col">Control</th>
                      </tr>
                    </thead>
                    <tbody>{renderCourseAccepted()}</tbody>
                  </table>
                </div>
              </SwipeableViews>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
