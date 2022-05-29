import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import "./AdminCourseManagement.scss";
import { coursesServices } from "../../services/CoursesServices";
import swal from "sweetalert";
import AddCourseModal from "../AddCourseModal/AddCourseModal";
import EditCourseModal from "../EditCourseModal/EditCourseModal";
import UploadImageModal from "../UploadImageModal/UploadImageModal";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    height: "100%",
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#e1f5fe",
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);
export default function AdminCourseManagement() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  let [course, setCourse] = useState([]);
  useEffect(() => {
    coursesServices
      .getCourse()
      .then((res) => {
        setCourse(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, [course]);
  const [searchTerm, setSearchTerm] = useState("");
  const [listCourse, setListCourse] = useState([]);
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const results = course.filter((course) => {
      return course.tenKhoaHoc.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setListCourse(results);
  }, [searchTerm, course]);

  const deleteCourse = (account) => {
    coursesServices
      .deleteCourse(account)
      .then((res) => {
        swal({
          title: `Delete ${account} successful`,
          icon: "success",
          button: "OK",
        });
        coursesServices
          .getCourse()
          .then((res) => {
            setCourse(res.data);
          })
          .catch((err) => {
            console.log(err.response.data);
          });
      })
      .catch((err) => {
        swal({
          title: err.response.data,
          text: "Delete failure!",
          icon: "warning",
          button: "OK",
        });
      });
  };
  const renderCourses = () => {
    return listCourse
      ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((item, index) => {
        return (
          <TableRow hover role="checkbox" tabIndex={-1} key={item.maKhoaHoc}>
            <TableCell>{item.maKhoaHoc}</TableCell>
            <TableCell>
              <img
                src={item.hinhAnh}
                alt="hinhAnh"
                width={70}
                height={50}
                style={{ borderRadius: 5 }}
              />
            </TableCell>
            <TableCell>
              <p className="text__ellipse">{item.tenKhoaHoc}</p>
            </TableCell>
            <TableCell>
              <p className="text__ellipse">{item.biDanh}</p>
            </TableCell>
            <TableCell>
              <p className="text__ellipse">{item.moTa}</p>
            </TableCell>
            <TableCell>{item.ngayTao}</TableCell>
            <TableCell>{item.luotXem}</TableCell>
            <TableCell>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="edit-action">
                  <i
                    style={{
                      cursor: "pointer",
                      color: "#9c9400",
                    }}
                    className="fa fa-edit"
                    data-toggle="modal"
                    data-target={`#dc${item.maKhoaHoc}`}
                  ></i>
                </div>
                <EditCourseModal currentCourse={item} />
                <div className="upload-action">
                  <i
                    style={{
                      cursor: "pointer",
                      color: "#55c934",
                    }}
                    className="fa fa-file-image"
                    data-toggle="modal"
                    data-target={`#du${item.maKhoaHoc}`}
                  ></i>
                </div>
                <UploadImageModal currentCourse={item} />
                <div className="delete-action">
                  <i
                    style={{ cursor: "pointer", color: "#fb4226" }}
                    className="fa fa-trash-alt"
                    onClick={() => {
                      swal({
                        title: "Are you sure?",
                        text: `Delete ${item.maKhoaHoc}`,
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                      }).then((willDelete) => {
                        if (willDelete) {
                          deleteCourse(item.maKhoaHoc);
                        }
                      });
                    }}
                  ></i>
                </div>
              </div>
            </TableCell>
          </TableRow>
        );
      });
  };
  return (
    <Paper className={classes.root}>
      <div className="header-table">
        <button
          className="btnAdd"
          data-toggle="modal"
          data-target="#createCourseModal"
          style={{ outline: "none" }}
        >
          <i className="fa fa-plus mr-1"></i>
          <span>Course</span>
        </button>
        <AddCourseModal />
        <form className="search-container mb-2">
          <input
            type="text"
            id="search-bar"
            value={searchTerm}
            onChange={handleChange}
            placeholder="Search Course..."
          />
        </form>
      </div>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell>Course Name</StyledTableCell>
              <StyledTableCell>Alias</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Created Date</StyledTableCell>
              <StyledTableCell>Views</StyledTableCell>
              <StyledTableCell>Controls</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderCourses()}</TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={course.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
