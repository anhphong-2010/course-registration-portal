import React, { Component } from "react";
import "./Banner.scss";
import ScrollAnimation from "react-animate-on-scroll";
export default class Banner extends Component {
  render() {
    return (
      <ScrollAnimation animateIn="bounceInDown" duration="1.2">
        <section className="banner">
          <div className="container">
            <div className="banner__grid row">
              <div className="grid__item col-4 grid__item--1">
                <i className="fa fa-podcast"></i>
                <div className="grid__text">
                  <b>100,000 online courses</b>
                  <p>Explore a variety of fresh topics</p>
                </div>
              </div>
              <div className="grid__item col-4 grid__item--2">
                <i className="fa fa-check-double"></i>
                <div className="grid__text">
                  <b>Expert instruction</b>
                  <p>Find the right instructor for you</p>
                </div>
              </div>
              <div className="grid__item col-4 grid__item--3">
                <i className="fa fa-history" />
                <div className="grid__text">
                  <b>Lifetime access</b>
                  <p>Learn on your schedule</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimation>
    );
  }
}
