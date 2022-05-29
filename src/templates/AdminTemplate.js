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
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import AspectRatioIcon from "@material-ui/icons/AspectRatio";
import ListAltIcon from '@material-ui/icons/ListAlt';
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

const AdminLayout = (props) => {
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
      <h3 className="text-center">{hoTen}</h3>
      <Divider />
      <List>
        <NavLink to="/admin" style={{ textDecoration: "none", color: "black" }}>
          <ListItem button key="Dashboard">
            <AspectRatioIcon style={{ marginRight: 32 }} />
            <ListItemText primary="Dashboard" />
          </ListItem>
        </NavLink>
        <NavLink
          to="/user-management"
          style={{ textDecoration: "none", color: "black" }}
        >
          <ListItem button key="User Management">
            <PeopleAltIcon style={{ marginRight: 32 }} />
            <ListItemText primary="User Management" />
          </ListItem>
        </NavLink>
        <NavLink
          to="/course-management"
          style={{ textDecoration: "none", color: "black" }}
        >
          <ListItem button key="Courses Management">
            <SchoolIcon style={{ marginRight: 32 }} />
            <ListItemText primary="Courses Management" />
          </ListItem>
        </NavLink>
        <NavLink
          to="/student-in-course"
          style={{ textDecoration: "none", color: "black" }}
        >
          <ListItem button key="Student In Course">
            <ListAltIcon style={{ marginRight: 32 }} />
            <ListItemText primary="Student In Course" />
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
        style={{ background: "#yc2322", zIndex: 500 }}
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
            Admin Dashboard
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
        <div>{props.children}</div>
      </main>
    </div>
  );
};

AdminLayout.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};
export const AdminTemplate = (props) => {
  return (
    <Route
      path={props.path}
      {...props.exact}
      render={(propsComponent) => {
        return (
          <AdminLayout>
            <props.Component {...propsComponent} />
          </AdminLayout>
        );
      }}
    />
  );
};
