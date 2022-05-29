import React, { Component } from "react";
import "./Footer.scss";
class Footer extends Component {
  render() {
    return (
      <footer className="container-fluid">
        <hr style={{ margin: 0 }} />
        <div className="footerTop__container">
          <div className="row">
            <div className="footerTop__link col-md-9 col-sm-12">
              <ul>
                <li>
                  <a href="/#">About us</a>
                </li>
                <li>
                  <a href="/#">Careers</a>
                </li>
                <li>
                  <a href="/#">Blog</a>
                </li>
                <li>
                  <a href="/#">Help and Support</a>
                </li>
                <li>
                  <a href="/#">Affiliate</a>
                </li>
                <li>
                  <a href="/#">Sitemap</a>
                </li>
                <li>
                  <a href="/#">Featured courses</a>
                </li>
              </ul>
            </div>
            <div className="footerTop__languages col-md-3 col-sm-12">
              <div className="footerTop__btn">
                <div className="btn-group dropup">
                  <button
                    type="button"
                    className="btn--locale"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="fa fa-globe-asia btn--icon1" />
                    <span className="btn--text">English</span>
                    <i className="fa fa-chevron-up btn--icon2" />
                  </button>
                  <div className="dropdown-menu">
                    <a className="dropdown-item" href="/#">
                      English
                    </a>
                    <a className="dropdown-item" href="/#">
                      Deutsch
                    </a>
                    <a className="dropdown-item" href="/#">
                      Español
                    </a>
                    <a className="dropdown-item" href="/#">
                      Français
                    </a>
                    <a className="dropdown-item" href="/#">
                      Italiano
                    </a>
                    <a className="dropdown-item" href="/#">
                      日本語
                    </a>
                    <a className="dropdown-item" href="/#">
                      한국어
                    </a>
                    <a className="dropdown-item" href="/#">
                      Nederlands
                    </a>
                    <a className="dropdown-item" href="/#">
                      Polski
                    </a>
                    <a className="dropdown-item" href="/#">
                      Português
                    </a>
                    <a className="dropdown-item" href="/#">
                      Română
                    </a>
                    <a className="dropdown-item" href="/#">
                      Русский
                    </a>
                    <a className="dropdown-item" href="/#">
                      ภาษาไทย
                    </a>
                    <a className="dropdown-item" href="/#">
                      Türkçe
                    </a>
                    <a className="dropdown-item" href="/#">
                      中文(简体)
                    </a>
                    <a className="dropdown-item" href="/#">
                      中文(繁體)
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="footerBottom__container">
          <div className="row">
            <div className="footerBottom__left col-md-6 col-sm-12">
              <div className="left__logo">
                <a className="navbar-brand" href="/#">
                  <img
                    src="https://vignette.wikia.nocookie.net/leagueoflegends/images/9/95/Ornn_Render.png/revision/latest/top-crop/width/360/height/450?cb=20190112192613"
                    alt="sadas"
                  />
                  <span className="text-danger">APTE</span>
                </a>
              </div>
              <p className="left__text">Project © 2020 APLearning, Inc.</p>
            </div>
            <div className="footerBottom__right col-md-6 col-sm-12">
              <a className="right__item" href="/#">
                Terms
              </a>
              <a className="right__item" href="/#">
                Privacy Policy and Cookie Policy
              </a>
            </div>
          </div>
        </div>
        <div className="footer__line" />
      </footer>
    );
  }
}

export default Footer;
