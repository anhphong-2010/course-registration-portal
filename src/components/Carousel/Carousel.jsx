import React, { Component } from "react";
import "./Carousel.scss";
import PickingCourse from "../PickingCourse/PickingCourse";
export default class Carousel extends Component {
  render() {
    return (
      <section className="udemyCarousel">
        <div className="udemyCarousel__content">
          <div className="udemyCarousel__text">
            <h1>Learn on your schedule</h1>
            <p>Learn from experts around the globe. Courses start at $12.99</p>
            <form className="formSearch">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="What do you want to learn?"
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
        <div className="picking-course">
          <PickingCourse />
        </div>
      </section>
    );
  }
}
