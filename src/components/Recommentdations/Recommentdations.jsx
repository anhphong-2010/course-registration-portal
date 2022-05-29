import React, { Component } from "react";
import "./Recommentdations.scss";
import ScrollAnimation from "react-animate-on-scroll";
export default class Recommentdations extends Component {
  render() {
    return (
      <section className="recommendations">
        <div className="recommendations__bannerTop" />
        <div className="recommendations__bannerMiddle">
          <div className="middle__part1">
            <ScrollAnimation animateIn="bounce">
              <div className="part1__content">
                <i className="fab fa-html5"></i>
                <i className="fab fa-css3"></i>
                <i className="fab fa-sass"></i>
                <i className="fab fa-less"></i>
                <i className="fab fa-js-square"></i>
              </div>
            </ScrollAnimation>
          </div>
          <div className="middle__part2">
            <div className="part2__content">
              <ScrollAnimation animateIn="bounce">
                <div className="part2__icon">
                  <i className="fab fa-react"></i>
                </div>
              </ScrollAnimation>
              <div className="part2__text">
                <div className="part2__title">
                  Get personalized recommendations
                </div>
                <div className="part2__description">
                  Answer a few questions for your top picks
                </div>
                <div className="part2__button">
                  <button>Get started</button>
                </div>
              </div>
              <ScrollAnimation animateIn="bounce">
                <div className="part2__icon">
                  <i className="fab fa-angular"></i>
                </div>
              </ScrollAnimation>
            </div>
          </div>
          <div className="middle__part3">
            <ScrollAnimation animateIn="bounce">
              <div className="part3__content">
                <i className="fab fa-node"></i>
                <i className="fab fa-java"></i>
                <i className="fab fa-python"></i>
                <i className="fab fa-php"></i>
                <i className="fa fa-database" />
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>
    );
  }
}
