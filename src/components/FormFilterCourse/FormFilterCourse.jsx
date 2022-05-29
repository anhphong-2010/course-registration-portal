import React, { useState, useEffect, Fragment } from "react";
import "./FormFilterCourse.scss";
import { coursesServices } from "../../services/CoursesServices";
import TableFormFilterCourse from "../TableFormFilterCourse/TableFormFilterCourse";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TableFormStudentUnaccepted from "../TableFormStudentUnaccepted/TableFormStudentUnaccepted";
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
export default function FormFilterCourse() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  let [courseCategories, setCourseCategories] = useState([]);
  let [course, setCourse] = useState([]);
  let [getCategoryId, setCategoryId] = useState();
  let [getCourseId, setCourseId] = useState({
    maKhoaHoc: "",
  });

  const handleInput = (event) => {
    let categoryId = event.target.value;
    setCategoryId(categoryId);
  };
  const handleInputCourseId = (event) => {
    let courseId = event.target.value;
    setCourseId({ maKhoaHoc: courseId });
  };
  useEffect(() => {
    coursesServices
      .getCourseCategories()
      .then((res) => {
        setCourseCategories(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  useEffect(() => {
    coursesServices
      .getCourse()
      .then((res) => {
        setCourse(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);
  const renderCourseCategories = () => {
    return courseCategories.map((item, index) => {
      return (
        <option value={item.maDanhMuc} key={index}>
          {item.tenDanhMuc}
        </option>
      );
    });
  };
  const renderCourse = () => {
    return course.map((item, index) => {
      if (item.danhMucKhoaHoc.maDanhMucKhoahoc === getCategoryId) {
        return (
          <option value={item.maKhoaHoc} key={index}>
            {item.tenKhoaHoc}
          </option>
        );
      } else {
        return null;
      }
    });
  };

  const renderTable = () => {
    if (getCourseId.maKhoaHoc) {
      return (
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
              <Tab label="List Student Accepted" {...a11yProps(0)} />
              <Tab label="List Student Unaccepted" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <div value={value} index={0} dir={theme.direction}>
              <TableFormFilterCourse courseId={getCourseId} />
            </div>
            <div value={value} index={1} dir={theme.direction}>
              <TableFormStudentUnaccepted courseId={getCourseId} />
            </div>
          </SwipeableViews>
        </div>
      );
    }
  };
  return (
    <Fragment>
      <div className="picking-course-content">
        <form className="picking-form">
          <div className="row">
            <div className="col-6">
              <div className="form-group-item">
                <label>Course Categories:</label>
                <select
                  style={{ width: "300px" }}
                  id="course-categories"
                  onChange={handleInput}
                >
                  <option value="#">--Select Course Categories--</option>
                  {renderCourseCategories()}
                </select>
              </div>
            </div>
            <div className="col-6">
              <div className="form-group-item">
                <label>Courses:</label>
                <select
                  style={{ width: "300px" }}
                  id="course"
                  onChange={handleInputCourseId}
                >
                  <option value="#">--Select Course--</option>
                  {renderCourse()}
                </select>
              </div>
            </div>
          </div>
        </form>
      </div>
      {renderTable()}
    </Fragment>
  );
}
