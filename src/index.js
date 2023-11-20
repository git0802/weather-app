import css from "./style.css";
import { assignSearchBtnEvent } from "./apps/getLocation";
import { setInitial } from "./apps/userSettings";


// Add initial on load event listeners
assignSearchBtnEvent(); // adds event listener to search button

setInitial();
console.log(localStorage.weatherAppSettings);