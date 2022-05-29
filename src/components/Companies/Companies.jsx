import React, { Component } from "react";
import "./Companies.scss";
class Companies extends Component {
  render() {
    return (
      <section className="companies">
        <div className="companies__container">
          <div className="companies__title pt-3">
            Trusted by companies of all sizes
          </div>
          <a className="companies__link" href="/#">
            <div className="companies__partner">
              <div className="partner__item">
                <img
                  src="https://i.udemycdn.com/partner-logos/booking-logo.svg"
                  alt="ssd"
                />
              </div>
              <div className="partner__item">
                <img
                  src="https://i.udemycdn.com/partner-logos/volkswagen-logo.svg"
                  alt="ssd"
                />
              </div>
              <div className="partner__item">
                <img
                  src="https://i.udemycdn.com/partner-logos/mercedes-logo.svg"
                  alt="ssd"
                />
              </div>
              <div className="partner__item">
                <img
                  src="https://i.udemycdn.com/partner-logos/pinterest-logo.svg"
                  alt="ssd"
                />
              </div>
              <div className="partner__item">
                <img
                  src="https://i.udemycdn.com/partner-logos/adidas-logo.svg"
                  alt="ssd"
                />
              </div>
              <div className="partner__item">
                <img
                  src="https://i.udemycdn.com/partner-logos/eventbrite-logo.svg"
                  alt="ssd"
                />
              </div>
            </div>
          </a>
          <div className="companies__getUdemy">
            <div className="forEverybody">
              <a className="forEverybody__title" href="/#">
                Become an instructor
              </a>
              <div className="forEverybody__description">
                Top instructors from around the world teach millions of students
                on Udemy. We provide the tools and skills to teach what you
                love.
              </div>
              <button className="forEverybody__btn">
                Start teaching today
              </button>
            </div>
            <div className="forBusiness">
              <a className="forBusiness__title" href="/#">
                For Business
              </a>
              <div className="forBusiness__description">
                Get unlimited access to 4,000+ of Udemy’s top courses for your
                team.
              </div>
              <button className="forBusiness__btn">Get For Business</button>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Companies;
