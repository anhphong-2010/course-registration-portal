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
import { usersServices } from "../../services/UsersServices";
import { coursesServices } from "../../services/CoursesServices";
import swal from "sweetalert";
const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 600,
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
export default function TableFormFilterCourse(props) {
  let { courseId } = props;
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

  let [userInCourse, setUserInCourse] = useState([]);

  useEffect(() => {
    coursesServices
      .getUserInCourse(courseId)
      .then((res) => {
        setUserInCourse(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, [courseId, userInCourse]);

  const [searchTerm, setSearchTerm] = useState("");
  let [listUser, setListUser] = useState([]);
  const handleChangeSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const results = userInCourse.filter((user) => {
      return user.taiKhoan.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setListUser(results);
  }, [searchTerm, userInCourse]);

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
          .getUserInCourse(courseId)
          .then((res) => {
            setUserInCourse(res.data);
          })
          .catch((err) => {
            console.log(err.response.data);
          });
      })
      .catch((err) => {
        swal({
          title: "Fail",
          icon: "error",
          button: "OK",
        });
      });
  };
  const renderUsers = () => {
    return listUser
      ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((item, index) => {
        return (
          <TableRow hover role="checkbox" tabIndex={-1} key={item.taiKhoan}>
            <TableCell>{item.taiKhoan}</TableCell>
            <TableCell>{item.biDanh}</TableCell>
            <TableCell>{item.hoTen}</TableCell>
            <TableCell>
              <div
                className="remove-action"
                style={{
                  cursor: "pointer",
                  color: "#e81b00",
                }}
                onClick={() => {
                  huyGhiDanh(courseId.maKhoaHoc, item.taiKhoan);
                }}
              >
                <i className="fa fa-times"></i>
              </div>
            </TableCell>
          </TableRow>
        );
      });
  };
  return (
    <Paper className={classes.root}>
      <div className="header-table">
        <form className="search-container my-2">
          <input
            type="text"
            id="search-bar"
            value={searchTerm}
            onChange={handleChangeSearch}
            placeholder="Search User..."
          />
        </form>
      </div>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Account</StyledTableCell>
              <StyledTableCell>Alias</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Control</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderUsers()}</TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={listUser.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
