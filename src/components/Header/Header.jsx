import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import "./Header.scss";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { signOutAction } from "../../redux/actions/UserManagementAction";
import { useSelector, useDispatch } from "react-redux";
export default function Header() {
  const taiKhoan = useSelector((state) => state.UserManagementReducer.taiKhoan);

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(signOutAction());
  };

  const renderUserControl = () => {
    let userLogin = JSON.parse(localStorage.getItem("userLogin"));
    if (userLogin.maLoaiNguoiDung === "GV") {
      return (
        <MenuList
          autoFocusItem={open}
          id="menu-list-grow"
          onKeyDown={handleListKeyDown}
        >
          <MenuItem onClick={handleClose}>
            <NavLink
              to="/edit-profile"
              style={{ textDecoration: "none", color: "#333" }}
            >
              <i className="fa fa-user mr-1"></i>
              Edit Profile
            </NavLink>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <NavLink
              to="/user-info"
              style={{ textDecoration: "none", color: "#333" }}
            >
              <i className="fa fa-poll-h mr-1"></i>
              Dashboard
            </NavLink>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <NavLink
              to="/admin"
              style={{ textDecoration: "none", color: "#333" }}
            >
              <i class="fa fa-cog mr-1"></i>
              Admin Page
            </NavLink>
          </MenuItem>
          <MenuItem onClick={signOut}>
            <i className="fa fa-sign-out-alt mr-1"></i>Logout
          </MenuItem>
        </MenuList>
      );
    } else {
      return (
        <MenuList
          autoFocusItem={open}
          id="menu-list-grow"
          onKeyDown={handleListKeyDown}
        >
          <MenuItem onClick={handleClose}>
            <NavLink
              to="/edit-profile"
              style={{ textDecoration: "none", color: "#333" }}
            >
              <i className="fa fa-user mr-1"></i>
              Edit Profile
            </NavLink>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <NavLink
              to="/user-info"
              style={{ textDecoration: "none", color: "#333" }}
            >
              <i className="fa fa-poll-h mr-1"></i>
              Dashboard
            </NavLink>
          </MenuItem>
          <MenuItem onClick={signOut}>
            <i className="fa fa-sign-out-alt mr-1"></i>Logout
          </MenuItem>
        </MenuList>
      );
    }
  };
  const renderAccount = () => {
    if (taiKhoan) {
      return (
        <Fragment>
          <div
            className="login__link"
            ref={anchorRef}
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            style={{
              cursor: "pointer",
            }}
          >
            <img
              src="https://i.ibb.co/PCjW83Y/avt.png"
              width={30}
              height={30}
              style={{ borderRadius: "50%" }}
              alt="user"
            />
            <span
              className="login__text ml-2"
              style={{
                fontSize: 14,
              }}
            >
              {taiKhoan}
              <i className="fa fa-caret-down ml-2"></i>
            </span>
          </div>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            style={{ zIndex: 500 }}
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    {renderUserControl()}
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </Fragment>
      );
    }
    return (
      <button className="btn btn-block btn--login">
        <NavLink className="item-link" to="/login">
          Log In | Sign Up
        </NavLink>
      </button>
    );
  };
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="row w-100 m-0">
            <div className="nav-left col-md-9 col-sm-6 col__left">
              <div className="header__left">
                <NavLink className="navbar-brand d-flex align-items-center" to="/">
                  <img
                    src="https://vignette.wikia.nocookie.net/leagueoflegends/images/9/95/Ornn_Render.png/revision/latest/top-crop/width/360/height/450?cb=20190112192613"
                    alt="sadas"
                  />
                  <span className="text-danger ml-2">APTE</span>
                </NavLink>
                <a className="header__link" href="/#">
                  <span className="header__categories">
                    <i className="fa fa-th header__icon" />
                    Categories
                  </span>
                </a>
                <form className="formSearch">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search for anything"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                    />
                    <div className="input-group-append">
                      <span className="input-group-text" id="basic-addon2">
                        <i className="fa fa-search" />
                      </span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div
              className="nav-right col-md-3 col-sm-6 col__right"
              style={{ padding: 0 }}
            >
              <div className="header__right">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item nav-item--1">
                    <a className="nav-link nav-link--1" href="/#">
                      For Business
                    </a>
                    <div className="form-after-hover">
                      <p className="form__content">
                        Get your team access to 4,000+ top Udemy courses
                        anytime, anywhere
                      </p>
                      <a className="form__link" href="/#">
                        Try APLearning for Business
                      </a>
                    </div>
                  </li>
                  <li className="nav-item nav-item--2">
                    <a className="nav-link nav-link--2" href="/#">
                      Tech on APLearning
                    </a>
                    <div className="form-after-hover">
                      <p className="form__content">
                        Turn what you know into an opportunity and reach
                        millions around the world.
                      </p>
                      <a className="form__link" href="/#">
                        Learn more
                      </a>
                    </div>
                  </li>
                  <li className="nav-item nav-link--bord">
                    <div className="bord" />
                  </li>
                  <li className="nav-item nav-item--3">
                    <a className="nav-link nav--icon" href="/#">
                      <i className="fa fa-shopping-cart" />
                    </a>
                    <div className="form-after-hover">
                      <p className="form__content">Your cart is empty.</p>
                      <a className="form__link" href="/#">
                        Keep shopping
                      </a>
                    </div>
                  </li>
                  <li
                    className="nav-item"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {renderAccount()}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mobile__layout d-none">
          <div className="layout__content d-flex justify-content-between">
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <a className="search__btn" href="/#">
              <i className="fa fa-search search--icon" />
            </a>
            <NavLink className="navbar-brand" to="/">
              <img
                src="https://vignette.wikia.nocookie.net/leagueoflegends/images/9/95/Ornn_Render.png/revision/latest/top-crop/width/360/height/450?cb=20190112192613"
                alt="sadas"
              />
              <span className="text-danger">APLearning</span>
            </NavLink>
            <div className="cart__btn">
              <i className="fa fa-shopping-cart cart--icon" />
              <div className="form-after-hover">
                <p className="form__content">Your cart is empty.</p>
                <a className="form__link" href="/#">
                  Keep shopping
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
