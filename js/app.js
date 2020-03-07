// variables
import {
  initForFirst,
  initForTemperature,
  initForWiki,
  initForRovers
} from "./initFunctions.js";

import { htmlForTemperatures } from "./htmlForTemp.js";
import { facts } from "./funFacts.js";
import { htmlForRovers } from "./htmlForRovers.js";
// global variables

const nasaKey = "rdWxphCszg82O9eZjLornCA6z5FJEFL2CgMd9Cod";
const dates = document.querySelector("#select-for-dates");
const didYouKnow = document.querySelector(".did-you-know");
const divForWiki = document.querySelector(".main-for-wiki");

const options = document.querySelectorAll(
  "#select-for-temperature [data-active]"
);
const selection = document.querySelector("#select-for-temperature");

// send request to nasa api for weather, generate html and display

function requestToNASAtemperature() {
  initForTemperature();
  const temperatuerUrl = `https://api.nasa.gov/insight_weather/?api_key=${nasaKey}&feedtype=json&ver=1.0`;

  fetch(temperatuerUrl)
    .then(res => res.json())
    .then(data => {
      let arrOfTemperatureValues = [];
      let arrOfDates = [];
      let arrOfWindSpeedValues = [];
      let arrOfPressureValues = [];

      for (let i = 0; i < 7; i++) {
        const dataForweek = Object.values(data)[i];
        // air temperature
        if (dataForweek.hasOwnProperty("AT")) {
          const airTemperatureMin = celToFer(dataForweek.AT.mn);
          const airTemperatureAvg = celToFer(dataForweek.AT.av);
          const airTemperatureMax = celToFer(dataForweek.AT.mx);

          arrOfTemperatureValues.push(
            airTemperatureMin,
            airTemperatureAvg,
            airTemperatureMax
          );
        } else {
          arrOfTemperatureValues.push("-", "-", "-");
        }

        // wind speed

        if (dataForweek.hasOwnProperty("HWS")) {
          const windSpeedMin = msTomph(dataForweek.HWS.mn);
          const windSpeedAvg = msTomph(dataForweek.HWS.av);
          const windSpeedMax = msTomph(dataForweek.HWS.mx);

          arrOfWindSpeedValues.push(windSpeedMin, windSpeedAvg, windSpeedMax);
        } else {
          arrOfWindSpeedValues.push("-", "-", "-");
        }

        // pressure

        if (dataForweek.hasOwnProperty("PRE")) {
          const PressureMin = parseFloat(dataForweek.PRE.mn).toFixed(1);
          const PressureAvg = parseFloat(dataForweek.PRE.av).toFixed(1);
          const PressureMax = parseFloat(dataForweek.PRE.mx).toFixed(1);
          arrOfPressureValues.push(PressureMin, PressureAvg, PressureMax);
        } else {
          arrOfPressureValues.push("-", "-", "-");
        }

        const date = dataForweek.First_UTC.split("T")[0];

        arrOfDates.push(date);
      }

      arrOfTemperatureValues.reverse();
      arrOfPressureValues.reverse();
      arrOfWindSpeedValues.reverse();
      arrOfDates.reverse();

      arrOfDates.forEach(date => {
        const dateOption = document.createElement("option");
        dateOption.innerHTML = date;
        dateOption.value = date;
        dates.appendChild(dateOption);
      });

      htmlForTemperatures(
        arrOfTemperatureValues,
        arrOfWindSpeedValues,
        arrOfPressureValues
      );
    })
    .then(() => {
      const queueDiv = document.querySelector(".queue");
      if (queueDiv) queueDiv.remove();
      didYouKnow.classList.add("active");
      options.forEach(option => (option.disabled = false));
    })
    .catch(err => console.log(err));
}

// helper functions for temperatures
function celToFer(value) {
  return parseFloat((value * 9) / 5 + 32).toFixed(1);
}
function msTomph(value) {
  return parseFloat(value * 2.237).toFixed(1);
}
// if a user selects summary,remove and hide previous parts send request to wiki api to get the summary, generate html and display

function requestToWikiSummary() {
  initForWiki();

  const wikiSearchUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/mars`;

  fetch(wikiSearchUrl)
    .then(res => res.json())
    .then(data => {
      const summary = data.extract;
      htmlForWikiSearch(summary);
    })

    .then(() => didYouKnow.classList.add("active"))
    .catch(err => console.log(err));
}

// function for generating html and displaying summary

function htmlForWikiSearch(summary) {
  const wikiDiv = document.createElement("div");
  wikiDiv.className = "container container-for-wiki";

  wikiDiv.innerHTML = `
  <div class="content"> 
        <p>${summary}</p>
      </div>
  `;
  divForWiki.appendChild(wikiDiv);
}

// if a user selects rover, remove and hide previous parts send request to nasa api to get the images, generate html and display

function requestToNASAroverImgs() {
  initForFirst();
  initForRovers();

  const roverUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${nasaKey}`;

  fetch(roverUrl)
    .then(res => res.json())
    .then(data => {
      let arrForImgs = Object.values(data)[0];
      let randomImgs = [];
      for (let i = 0; i < 4; i++) {
        let randomForRoverImgs = Math.floor(Math.random() * arrForImgs.length);
        const imgs = arrForImgs[randomForRoverImgs];
        randomImgs.push(imgs);
      }

      htmlForRovers(randomImgs);
    })
    .then(() => {
      didYouKnow.classList.add("active");
      const queueDiv = document.querySelector(".queue");
      if (queueDiv) queueDiv.remove();
      options.forEach(option => (option.disabled = false));
    })
    .catch(err => console.log(err));
}

// did you know facts function
let prevFact = null;
function didYouKnowFacts() {
  const marsFacts = facts;
  const toDisplay = didYouKnow.querySelector(".box .p-fact");
  let randomForFacts = Math.floor(Math.random() * marsFacts.length);

  if (randomForFacts === prevFact) {
    randomForFacts = Math.floor(Math.random() * marsFacts.length);
  }
  prevFact = randomForFacts;
  toDisplay.innerHTML = marsFacts[randomForFacts];
}
setInterval(didYouKnowFacts, 8000);

// event listeners

selection.addEventListener("change", () => {
  let selectedValue = selection.options[selection.selectedIndex].value;
  selectedValue === "Temperatures"
    ? requestToNASAtemperature()
    : selectedValue === "About Mars"
    ? requestToWikiSummary()
    : requestToNASAroverImgs();
});

window.addEventListener("load", () => {
  const extraOptions = document.querySelector(
    ".extra-options-for-temperatures"
  );
  extraOptions.style.display = "none";
});
