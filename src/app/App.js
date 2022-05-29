import React, { Fragment, Component } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import Home from "../pages/Home";
import { HomeTemplate } from "../templates/HomeTemplate";
import DetailCourse from "../pages/DetailCourse";
import AccountForm from "../pages/AccountForm";
import Profile from "../pages/Profile";
import ListCoursesRegistered from "../pages/ListCoursesRegistered";
import { ProfileTemplate } from "../templates/ProfileTemplate";
import InfoUser from "../pages/InfoUser";
import { AdminTemplate } from "../templates/AdminTemplate";
import AdminDashBoard from "../components/AdminDashBoard/AdminDashBoard";
import AdminUser from "../pages/AdminUser";
import AdminCourse from "../pages/AdminCourse";
import { Cube } from "styled-loaders-react";
import "./App.css";
import StudentInCourse from "../pages/StudentInCourse";
class App extends Component {
  state = {
    loading: true,
  };
  componentDidMount = () => {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1800);
  };
  render() {
    return (
      <div>
        {this.state.loading ? (
          <div className="loader">
            <Cube color="#ec5252" size="70px" />
          </div>
        ) : (
          <BrowserRouter>
            <Fragment>
              <Switch>
                <HomeTemplate exact path="/" Component={Home} />
                <HomeTemplate
                  exact
                  path="/detail-course/:makhoahoc"
                  Component={DetailCourse}
                />
                <HomeTemplate exact path="/login" Component={AccountForm} />
                <HomeTemplate exact path="/edit-profile" Component={Profile} />
                <ProfileTemplate exact path="/user-info" Component={InfoUser} />
                <ProfileTemplate
                  exact
                  path="/list-courses-registered"
                  Component={ListCoursesRegistered}
                />
                <AdminTemplate exact path="/admin" Component={AdminDashBoard} />
                <AdminTemplate
                  exact
                  path="/user-management"
                  Component={AdminUser}
                />
                <AdminTemplate
                  exact
                  path="/course-management"
                  Component={AdminCourse}
                />
                <AdminTemplate
                  exact
                  path="/student-in-course"
                  Component={StudentInCourse}
                />
              </Switch>
            </Fragment>
          </BrowserRouter>
        )}
      </div>
    );
  }
}

export default App;
