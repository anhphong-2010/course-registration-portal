import React, { Component } from "react";
import "./CommentCarousel.scss";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const options = {
  margin: 10,
  responsiveClass: true,
  nav: true,
  dots: false,
  autoplay: false,
  smartSpeed: 800,
  responsive: {
    0: {
      items: 1,
      nav: false,
    },
    400: {
      items: 1,
      nav: false,
    },
    600: {
      items: 2,
    },
    700: {
      items: 3,
    },
    1000: {
      items: 3,
    },
  },
};
export default class CommentCarousel extends Component {
  render() {
    return (
      <section className="comments">
        <div className="comments__container">
          <div className="comments__title">What our students have to say</div>
          <div className="comments__carousel">
            <OwlCarousel {...options} className="myCommentsCarousel owl-theme">
              <div className="item">
                <div className="item__info">
                  <div className="item__img">
                    <img src="https://i.ibb.co/PCjW83Y/avt.png" alt="1" />
                  </div>
                  <div className="item__name">Borivoje</div>
                </div>
                <div className="item__comment">
                  APLearning is a life saver. I don't have the time or money for
                  a college education. My goal is to become a freelance web
                  developer, and thanks to Udemy, I'm really close.
                </div>
              </div>
              <div className="item">
                <div className="item__info">
                  <div className="item__img">
                    <img src="https://i.ibb.co/PCjW83Y/avt.png" alt="2" />
                  </div>
                  <div className="item__name">Dipesh</div>
                </div>
                <div className="item__comment">
                  I believe in lifelong learning and APLearning is a great place
                  to learn from experts. I've learned a lot and recommend it to
                  all my friends.
                </div>
              </div>
              <div className="item">
                <div className="item__info">
                  <div className="item__img">
                    <img src="https://i.ibb.co/PCjW83Y/avt.png" alt="3" />
                  </div>
                  <div className="item__name">Zulaika</div>
                </div>
                <div className="item__comment">
                  I work in project management and joined Udemy because I get
                  great courses for less. The instructors are fantastic,
                  interesting, and helpful. I plan to use Udemy for a long time!
                </div>
              </div>
              <div className="item">
                <div className="item__info">
                  <div className="item__img">
                    <img src="https://i.ibb.co/PCjW83Y/avt.png" alt="4" />
                  </div>
                  <div className="item__name">Marco</div>
                </div>
                <div className="item__comment">
                  Thank you Udemy! You've renewed my passion for learning and my
                  dream of becoming a web developer.
                </div>
              </div>
              <div className="item">
                <div className="item__info">
                  <div className="item__img">
                    <div className="non__img">
                      <span className="alphabetName">J</span>
                    </div>
                  </div>
                  <div className="item__name">Justin</div>
                </div>
                <div className="item__comment">
                  The best part about APLearning is the selection. You can find
                  a course for anything you want to learn!
                </div>
              </div>
              <div className="item">
                <div className="item__info">
                  <div className="item__img">
                    <div className="non__img">
                      <span className="alphabetName">K</span>
                    </div>
                  </div>
                  <div className="item__name">Kathy</div>
                </div>
                <div className="item__comment">
                  My children and I LOVE APLearning! The courses are fantastic
                  and the instructors are so fun and knowledgeable. I only wish
                  we found it sooner.
                </div>
              </div>
            </OwlCarousel>
          </div>
        </div>
      </section>
    );
  }
}
