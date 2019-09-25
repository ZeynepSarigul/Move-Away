import React from "react";
import "./slider.css";
class Slider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [
        "https://readcereal.com/wp-content/uploads/2019/05/CEREAL_City-Guides_2-1250x833.jpg",
        "https://images.unsplash.com/photo-1445334387926-6a1bbaff402a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1187&q=80",

        "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/dramantic-pigeon-point-lighthouse-black-and-white-garry-gay.jpg",

        "https://images.unsplash.com/photo-1515080496064-bf1309a108f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        "https://images.unsplash.com/photo-1423853978401-35df4077ff7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80"
      ],
      currentIndex: 0,
      translateValue: 0
    };
  }

  goToPrevSlide = () => {
    if (this.state.currentIndex === 0) return;

    this.setState(prevState => ({
      currentIndex: prevState.currentIndex - 1,
      translateValue: prevState.translateValue + this.slideWidth()
    }));
  };

  goToNextSlide = () => {
    // Exiting the method early if we are at the end of the images array.
    // We also want to reset currentIndex and translateValue, so we return
    // to the first image in the array.
    if (this.state.currentIndex === this.state.images.length - 1) {
      return this.setState({
        currentIndex: 0,
        translateValue: 0
      });
    }

    // This will not run if we met the if condition above
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex + 1,
      translateValue: prevState.translateValue + -this.slideWidth()
    }));
  };

  slideWidth = () => {
    return document.querySelector(".slide").clientWidth;
  };

  render() {
    return (
      <div className="slider">
        <div
          className="slider-wrapper"
          style={{
            transform: `translateX(${this.state.translateValue}px)`,
            transition: "transform ease-out 0.45s"
          }}
        >
          {this.state.images.map((image, i) => (
            <Slide key={i} image={image} />
          ))}
        </div>
        <LeftArrow goToPrevSlide={this.goToPrevSlide} />
        <RightArrow goToNextSlide={this.goToNextSlide} />
      </div>
    );
  }
}

const Slide = ({ image }) => {
  const styles = {
    backgroundImage: `url(${image})`,

    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
  };
  return <div className="slide" style={styles}></div>;
};

const LeftArrow = props => {
  return (
    <div className="backArrow arrow" onClick={props.goToPrevSlide}>
      <i className="fa fa-arrow-left fa-2x" aria-hidden="true"></i>
    </div>
  );
};

const RightArrow = props => {
  return (
    <div className="nextArrow arrow" onClick={props.goToNextSlide}>
      <i className="fa fa-arrow-right fa-2x" aria-hidden="true"></i>
    </div>
  );
};

export default Slider;
