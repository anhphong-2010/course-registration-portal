import React, { Component } from "react";
import "./RankMentor.scss";
class RankMentor extends Component {
  render() {
    return (
      <div className="infographic">
        <h1 className="infographic__title">Mentor of the month</h1>
        <div className="infographic__grid">
          <div className="infographic__grid__item">
            <img
              src="https://www.desertfinancial.com/-/media/desert-financial/lc-test/infographics/infographic__benefitsofvolunteering_1.ashx?la=en&hash=C1249414ECBA01627CC52D44918BDA0ADDE56204"
              alt="h1"
              className="infographic__grid__item__img"
            />
            <h2 className="infographic__grid__item__title title-dkblue">76%</h2>
            <p className="infographic__grid__item__p">Greenwood</p>
          </div>
          {/**/}
          <div className="infographic__grid__item">
            <img
              src="https://www.desertfinancial.com/-/media/desert-financial/lc-test/infographics/infographic__benefitsofvolunteering_2.ashx?la=en&hash=4DDF33EF7D6DD3FFD5A90440A810EED04D06D55F"
              alt="h2"
              className="infographic__grid__item__img"
            />
            <h2 className="infographic__grid__item__title title-orange">94%</h2>
            <p className="infographic__grid__item__p">Martial</p>
          </div>
          {/**/}
          <div className="infographic__grid__item">
            <img
              src="https://www.desertfinancial.com/-/media/desert-financial/lc-test/infographics/infographic__benefitsofvolunteering_3.ashx?la=en&hash=C7857E1920E916D93748F255CFD8D4BCFFA170B7"
              alt="h3"
              className="infographic__grid__item__img"
            />
            <h2 className="infographic__grid__item__title title-ltblue">78%</h2>
            <p className="infographic__grid__item__p">Rashford</p>
          </div>
        </div>
      </div>
    );
  }
}

export default RankMentor;
