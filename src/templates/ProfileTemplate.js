import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import SchoolIcon from "@material-ui/icons/School";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import InfoIcon from "@material-ui/icons/Info";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { NavLink, Route } from "react-router-dom";
import { useSelector } from "react-redux";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const ProfileLayout = (props) => {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const hoTen = useSelector((state) => state.UserManagementReducer.hoTen);
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <div className="user-avt d-flex justify-content-center">
          <img
            src="https://i.ibb.co/PCjW83Y/avt.png"
            style={{ borderRadius: "50%" }}
            alt="avt"
          />
        </div>
        <h3 className="text-center">{hoTen}</h3>
        <NavLink
          to="/user-info"
          style={{ textDecoration: "none", color: "black" }}
        >
          <ListItem button key="Information">
            <InfoIcon style={{ marginRight: 32 }} />
            <ListItemText primary="Information" />
          </ListItem>
        </NavLink>
        <NavLink
          to="/list-courses-registered"
          style={{ textDecoration: "none", color: "black" }}
        >
          <ListItem button key="My Courses">
            <SchoolIcon style={{ marginRight: 32 }} />
            <ListItemText primary="My Courses" />
          </ListItem>
        </NavLink>
        <Divider />
        <NavLink to="/" style={{ textDecoration: "none", color: "black" }}>
          <ListItem button key="Back To Home">
            <ArrowBackIcon style={{ marginRight: 32 }} />
            <ListItemText primary="Back To Home" />
          </ListItem>
        </NavLink>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={classes.appBar}
        style={{ background: "#ec5252" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Profile Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div style={{ marginBottom: 50 }}></div>
        <Typography paragraph>{props.children}</Typography>
      </main>
    </div>
  );
};

ProfileLayout.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};
export const ProfileTemplate = (props) => {
  return (
    <Route
      path={props.path}
      {...props.exact}
      render={(propsComponent) => {
        return (
          <ProfileLayout>
            <props.Component {...propsComponent} />
          </ProfileLayout>
        );
      }}
    />
  );
};
