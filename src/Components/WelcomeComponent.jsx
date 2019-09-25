import React from "react";
import WelcomeDetailsComponent from "./SubComponents/WelcomeDetailsComponent.jsx";
import Slider from "./Slider";
import globe from "../logo-wht.png";
import hero from "../hero-slide1.jpg";
import downarrow from "../downarrow.png";
<link
  href="https://fonts.googleapis.com/css?family=Playfair+Display&display=swap"
  rel="stylesheet"
></link>;

let inherit_height = {
  height: "inherit",
  backgroundColor: "#EAEAEA",
  marginTop: "25px"
};

let buttons_container = {
  width: "100%",
  textAlign: "center"
};

let primary_color = {
  color: "rgb(234, 76, 136)"
};
let belowSlider = {
  fontFamily: "Nunito, sans-serif",
  fontSize: "25px",
  lineHeight: "1.65",
  textAlign: "center",
  marginTop: "50px",
  marginBottom: "25px"
};
let moveAway = {
  fontFamily: "Playfair Display, serif",
  fontStyle: "italic",
  fontSize: "40px",
  lineHeight: "1.65",
  marginBottom: "25px",
  top: "35px"
};
let heroLogo = {
  height: "70%",
  width: "80%",
  left: "10%",
  position: "absolute"
};

let details_button = {
  height: "38px",
  padding: "0 15px",
  textAlign: "center",
  fontSize: "11px",
  fontWeight: "600",
  lineHeight: "38px",
  letterSpacing: ".1rem",
  textTransform: "uppercase",
  textDecoration: "none",
  whiteSpace: "nowrap",
  borderRadius: "4px",
  border: "1px solid #bbb",
  cursor: "pointer",
  boxSizing: "border-box",
  display: "inline-block",
  color: "#3b3b3b",
  backgroundColor: "#FFF",
  borderColor: "#FFF",
  margin: "0 10px"
};

let start = {
  height: "38px",
  padding: "0 15px",
  textAlign: "center",
  fontSize: "11px",
  fontWeight: "600",
  lineHeight: "38px",
  letterSpacing: "0.1rem",
  textTransform: "uppercase",
  textDecoration: "none",
  whiteSpace: "nowrap",
  borderRadius: "4px",
  border: "1px solid #bbb",
  cursor: "pointer",
  boxSizing: "border-box",
  display: "inline-block",
  margin: "0px auto",
  color: "#3b3b3b",
  backgroundColor: "#FFF",
  borderColor: "#FFF",
  margin: "0 10px",

  transition: "0.5s"
};

class WelcomeComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      openDetails: false
    };
  }

  openDetail = () => {
    this.setState({
      openDetails: true
    });
  };

  closeDetail = () => {
    this.setState({
      openDetails: false
    });
  };

  render() {
    return (
      <div style={inherit_height}>
        <div style={moveAway}> &nbsp; &nbsp; M o v e A w a y</div>
        {<Slider />}
        <div style={belowSlider}>
          {" "}
          <br />
          This website is designed to estimate the salary you need in another
          city to maintain your current standard of living.
          <br /> <br />
          Scroll down and start <br /> <br />
          <img src={downarrow} alt="logo" />
          <br />
        </div>

        {!this.state.openDetails && (
          <div className="aligner2">
            <div>
              <div className="welcome-block">
                <img src={globe} className="welcome-logo" alt="logo" />
                <h3 className="welcome-intro">
                  ~ MoveAway ~ <span style={primary_color}></span>
                </h3>
                <p className="welcome-description">
                  {" "}
                  This website will help you calculate how much you need to make
                  in a different city to maintain the same standard of living.
                  Press next to choose your current city and enter your salary!
                </p>
                <div style={buttons_container}>
                  <button style={details_button} onClick={this.openDetail}>
                    Details
                  </button>
                  <button style={start} onClick={this.props.nextStep}>
                    Start
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {this.state.openDetails && (
          <WelcomeDetailsComponent closeDetails={this.closeDetail} />
        )}
      </div>
    );
  }
}

export default WelcomeComponent;
