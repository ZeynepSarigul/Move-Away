import React from "react";
import WelcomeComponent from "./WelcomeComponent";
import CurrentCostOfLivingComponent from "./CurrentCostOfLivingComponent";
import CityChoiceComponent from "./CityChoiceComponent";
import NewCostOfLivingComponent from "./NewCostOfLivingComponent";

class App extends React.Component {
  state = {
    step: 1,
    currentCostOfLiving: "",
    newCostOfLiving: 0,
    exactNewCostOfLiving: 0,
    currencyType: "USD",
    currentCity: "",
    newCity: "",
    newCitySlug: "",
    rentPercentChange: 0,
    groceriesPercentChange: 0,
    restaurantPercentChange: 0,
    purchasingPowerPercentChange: 0,
    resfreshCity: false
  };

  handleRefreshCity = e => {
    this.setState(
      {
        newCity: e,
        refreshCity: true
      },
      function() {
        this.calculateNewCostOfLivingAndNextStep();

        this.setState({
          refreshComponent: !this.state.refreshComponent
        });
      }
    );
  };

  nextStep = () => {
    this.setState({
      step: this.state.step + 1
    });
  };

  previousStep = () => {
    this.setState({
      step: this.state.step > 2 ? this.state.step - 1 : 1
    });
  };
  // find the currency type being used in the city that the user enters. You will use registered data to find that information
  handleCurrentCity = e => {
    let currencyType;

    let dataSet = require("../data/cost_of_living_indices.json");
    if (e !== undefined) {
      currencyType = dataSet[e].currency_type;
    }
    //update the current city and currency type
    this.setState({
      currentCity: e,
      currencyType: currencyType
    });
  };
  // resetting to first step by setting state types to initial values.
  resetToFirstStep = () => {
    this.setState({
      step: 1,
      currentCostOfLiving: "",
      newCostOfLiving: 0,
      exactNewCostOfLiving: 0,
      currencyType: "USD",
      currentCity: "",
      newCity: "",
      newCitySlug: "",
      rentPercentChange: 0,
      groceriesPercentChange: 0,
      restaurantPercentChange: 0,
      purchasingPowerPercentChange: 0,
      resfreshCity: false
    });
  };
  // this is what your salary is in your current city
  handleCurrentCostOfLiving = e => {
    this.setState({
      currentCostOfLiving: e.target.value
    });
  };

  //change the currency type depending on the country entered
  handleCurrencyType = e => {
    this.setState({
      currencyType: e.target.value
    });
  };
  handleNewCity = e => {
    this.setState({
      newCity: e
    });
  };

  // calculate the cost of living change by comparing cost of living in both cities based on the index properties of dataset object
  //and calculate the new cost of living and percentage change in basic needs
  calculateNewCostOfLivingAndNextStep = () => {
    const currentCostOfLiving = Number(this.state.currentCostOfLiving);
    const currentCity = this.state.currentCity;
    const newCity = this.state.newCity;

    let newCostOfLiving;
    let rentPercentChange;
    let groceriesPercentChange;
    let restaurantPercentChange;
    let purchasingPowerPercentChange;

    const dataSet = require("../data/cost_of_living_indices.json");

    if (dataSet[newCity].index !== dataSet[currentCity].index) {
      let fractionalChange =
        (dataSet[newCity].index - dataSet[currentCity].index) /
        dataSet[currentCity].index;
      newCostOfLiving =
        currentCostOfLiving + currentCostOfLiving * fractionalChange;
    } else {
      newCostOfLiving = currentCostOfLiving;
    }

    rentPercentChange = Math.round(
      ((dataSet[newCity].rent_index - dataSet[currentCity].rent_index) /
        dataSet[currentCity].rent_index) *
        100
    );
    groceriesPercentChange = Math.round(
      ((dataSet[newCity].groceries_index -
        dataSet[currentCity].groceries_index) /
        dataSet[currentCity].groceries_index) *
        100
    );
    restaurantPercentChange = Math.round(
      ((dataSet[newCity].restaurant_index -
        dataSet[currentCity].restaurant_index) /
        dataSet[currentCity].restaurant_index) *
        100
    );
    purchasingPowerPercentChange = Math.round(
      ((dataSet[newCity].purchasing_index -
        dataSet[currentCity].purchasing_index) /
        dataSet[currentCity].purchasing_index) *
        100
    );
    // update the state with new set of information, format new cost with separating thousands with a comma
    this.setState({
      newCitySlug: dataSet[newCity].slug,
      exactNewCostOfLiving: newCostOfLiving,
      newCostOfLiving: (Math.round(newCostOfLiving / 100) * 100)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      rentPercentChange: rentPercentChange,
      groceriesPercentChange: groceriesPercentChange,
      restaurantPercentChange: restaurantPercentChange,
      purchasingPowerPercentChange: purchasingPowerPercentChange
    });
    //come back here

    if (!this.state.refreshCity) {
      this.nextStep();
    }
  };

  changeCurrencyTypeAndValue = (exactValue, value, newCurrencyType) => {
    this.setState({
      exactNewCostOfLiving: exactValue,
      newCostOfLiving: value,
      currencyType: newCurrencyType
    });
  };

  render() {
    switch (this.state.step) {
      case 1:
        return <WelcomeComponent nextStep={this.nextStep} />;
      case 2:
        return (
          <CityChoiceComponent
            id="cityChoice"
            value={this.state.currentCity}
            currencyType={this.state.currencyType}
            onChange={this.handleCurrentCity}
            nextStep={this.nextStep}
            previousStep={this.previousStep}
            stepNumber={this.state.step}
            resetToFirstStep={this.resetToFirstStep}
          />
        );
      case 3:
        return (
          <CurrentCostOfLivingComponent
            value={this.state.currentCostOfLiving}
            currencyValue={this.state.currencyType}
            onChange={this.handleCurrentCostOfLiving}
            onChangeOfCurrencyType={this.handleCurrencyType}
            nextStep={this.nextStep}
            previousStep={this.previousStep}
            resetToFirstStep={this.resetToFirstStep}
          />
        );
      case 4:
        return (
          <CityChoiceComponent
            id="cityChoice"
            value={this.state.newCity}
            onChange={this.handleNewCity}
            //enteresan
            nextStep={this.calculateNewCostOfLivingAndNextStep}
            previousStep={this.previousStep}
            stepNumber={this.state.step}
            resetToFirstStep={this.resetToFirstStep}
          />
        );
      case 5:
        return (
          <NewCostOfLivingComponent
            key={this.state.refreshComponent}
            value={this.state.newCostOfLiving}
            exactNewCostOfLiving={this.state.exactNewCostOfLiving}
            currentCostOfLiving={this.state.currentCostOfLiving}
            newCity={this.state.newCity}
            currentCity={this.state.currentCity}
            newCitySlug={this.state.newCitySlug}
            currencyType={this.state.currencyType}
            rentPercentChange={this.state.rentPercentChange}
            restaurantPercentChange={this.state.restaurantPercentChange}
            groceriesPercentChange={this.state.groceriesPercentChange}
            purchasingPowerPercentChange={
              this.state.purchasingPowerPercentChange
            }
            resetToFirstStep={this.resetToFirstStep}
            changeCurrencyTypeAndValue={this.changeCurrencyTypeAndValue}
            handleNewCityFunction={this.handleNewCity}
            handleRefreshCityFunction={this.handleRefreshCity}
          />
        );
      default:
        return null;
    }
  }
}

export default App;
