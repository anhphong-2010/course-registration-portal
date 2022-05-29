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
import "./AdminUserManagement.scss";
import swal from "sweetalert";
import AddUserModal from "../AddUserModal/AddUserModal";
import EditUserModal from "../EditUserModal/EditUserModal";
import CheckCourseModal from "../CheckCourseModal/CheckCourseModal";
import { userLogin } from "../../config/settings";
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
export default function AdminUserManagement(props) {
  let { navigator } = props;
  const info = JSON.parse(localStorage.getItem(userLogin));
  if (!localStorage.getItem(userLogin) || info.maLoaiNguoiDung !== "GV") {
    navigator.history.push("/");
  }
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
  let [user, setUser] = useState([]);
  useEffect(() => {
    usersServices
      .getListUser()
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, [user]);
  const [searchTerm, setSearchTerm] = useState("");
  const [listUser, setListUser] = useState([]);
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const results = user.filter((user) => {
      return user.taiKhoan.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setListUser(results);
  }, [searchTerm, user]);

  const deleteUser = (account) => {
    usersServices
      .deleteUser(account)
      .then((res) => {
        swal({
          title: `Delete ${account} successful`,
          icon: "success",
          button: "OK",
        });
        usersServices
          .getListUser()
          .then((res) => {
            setUser(res.data);
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
  
  const renderUsers = () => {
    return listUser
      ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((item, index) => {
        return (
          <TableRow hover role="checkbox" tabIndex={-1} key={item.taiKhoan}>
            <TableCell>{item.taiKhoan}</TableCell>
            <TableCell>{item.hoTen}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>{item.soDt}</TableCell>
            <TableCell>{item.tenLoaiNguoiDung}</TableCell>
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
                    data-target={`#dc${item.taiKhoan}`}
                  ></i>
                </div>
                <CheckCourseModal currentUser={item.taiKhoan} />
                <div className="register-action">
                  <i
                    style={{
                      cursor: "pointer",
                      color: "#60c5ef",
                    }}
                    className="fa fa-user-edit"
                    data-toggle="modal"
                    data-target={`#d${item.taiKhoan}`}
                  ></i>
                </div>
                <EditUserModal currentUser={item} />
                <div className="delete-action">
                  <i
                    style={{ cursor: "pointer", color: "#fb4226" }}
                    className="fa fa-trash-alt"
                    onClick={() => {
                      swal({
                        title: "Are you sure?",
                        text: `Delete ${item.taiKhoan}`,
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                      }).then((willDelete) => {
                        if (willDelete) {
                          deleteUser(item.taiKhoan);
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
          data-target="#addUserModal"
          style={{ outline: "none" }}
        >
          <i className="fa fa-plus mr-2"></i>
          <span>Add User</span>
        </button>
        <AddUserModal />
        <form className="search-container mb-2">
          <input
            type="text"
            id="search-bar"
            value={searchTerm}
            onChange={handleChange}
            placeholder="Search User..."
          />
        </form>
      </div>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Account</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Phone</StyledTableCell>
              <StyledTableCell>Type User</StyledTableCell>
              <StyledTableCell>Controls</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderUsers()}</TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={user.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
