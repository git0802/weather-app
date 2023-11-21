import css from "./style.css";
import { assignSearchBtnEvent, onLoadLocationWeather } from "./apps/getLocation";
import { setInitial } from "./apps/userSettings";


// Add initial on load event listeners
assignSearchBtnEvent(); // adds event listener to search button

// Sets initial user settings
// Note: this function has a conditional. If user preference already exists in the local storage,
//  it does not create another values
setInitial();

// Loads initial data on DOM using preferences saved on the local storage
onLoadLocationWeather();
