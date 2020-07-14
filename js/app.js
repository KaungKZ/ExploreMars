// variables
import {
  initForFirst,
  initForTemperature,
  initForAPOD,
  initForRovers,
} from "./initFunctions.js";

import { htmlForTemperatures } from "./htmlForTemp.js";
import { facts } from "./funFacts.js";
import { htmlForRovers } from "./htmlForRovers.js";
// global variables

const nasaKey = "rdWxphCszg82O9eZjLornCA6z5FJEFL2CgMd9Cod";
const dates = document.querySelector("#select-for-dates");
const didYouKnow = document.querySelector(".did-you-know");
const divForAPOD = document.querySelector(".main-for-APOD");

const options = document.querySelectorAll(
  "#select-for-temperature [data-active]"
);
const selection = document.querySelector("#select-for-temperature");

// const arr = ["1", "2", "3", "4\r\n5", "6", "7", "8"];
// arr.map((x) => x.replace(/(\r\n|\n|\r)/gm, ""));

// console.log(arr);

// send request to nasa api for weather, generate html and display

function requestToNASAtemperature() {
  initForTemperature();
  const temperatuerUrl = `https://api.nasa.gov/insight_weather/?api_key=${nasaKey}&feedtype=json&ver=1.0`;

  fetch(temperatuerUrl)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      let arrOfTemperatureValues = [];
      let arrOfDates = [];
      let arrOfWindSpeedValues = [];
      let arrOfPressureValues = [];

      for (let i = 0; i < data.sol_keys.length; i++) {
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

        // console.log(dataForweek.First_UTC);
        const date = dataForweek.First_UTC.split("T")[0];

        arrOfDates.push(date);
      }

      arrOfTemperatureValues.reverse();
      arrOfPressureValues.reverse();
      arrOfWindSpeedValues.reverse();
      arrOfDates.reverse();

      arrOfDates.forEach((date) => {
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
      options.forEach((option) => (option.disabled = false));
    })
    .catch((err) => console.log(err));
}

// helper functions for temperatures
function celToFer(value) {
  return parseFloat((value * 9) / 5 + 32).toFixed(1);
}
function msTomph(value) {
  return parseFloat(value * 2.237).toFixed(1);
}
// if a user selects summary,remove and hide previous parts send request to APOD api to get the summary, generate html and display

// console.log(year, month, day);

function requestToAPOD() {
  initForAPOD();
  // const date = new Date();

  // const year = date.getFullYear();
  // const month = date.getMonth() + 1;
  // const day = date.getDay();
  const APODUrl = `https://api.nasa.gov/planetary/apod?&api_key=${nasaKey}`;

  fetch(APODUrl)
    .then((data) => data.json())
    .then((data) => {
      htmlForAPOD(data);
    })
    .then(() => didYouKnow.classList.add("active"))
    .catch((err) => console.log(err));
}

function htmlForAPOD(data) {
  document.body.style.height = "auto";
  const title = data.explanation;

  const showParagraph = title.substr(0, title.split(" ").length);

  const hideParagraph = title.substr(title.split(" ").length, title.length);

  const APODdiv = document.createElement("div");
  APODdiv.className = "container container-for-APOD";

  APODdiv.innerHTML = `
    <p class = "APOD-title">${showParagraph}
    <span class="dots">...</span>
    <span class= "hide">${hideParagraph}</span>
    <button class = "read_more_btn">Read More</button></p>
    ${
      data.media_type === "video"
        ? `<iframe src="${data.url}" class = "APOD-placeholder" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>`
        : `<img src="${data.url}" alt="" class="APOD-placeholder">`
    }
    
    `;

  divForAPOD.appendChild(APODdiv);

  document.querySelector(".read_more_btn").addEventListener("click", (e) => {
    const parentElem = e.target.parentNode;
    parentElem.classList.toggle("show-hide");

    if (parentElem.className.includes("show-hide")) {
      e.target.innerText = "Read less";
    } else {
      e.target.innerText = "Read More";
    }
  });
}

// if a user selects rover, remove and hide previous parts send request to nasa api to get the images, generate html and display

function requestToNASAroverImgs() {
  initForFirst();
  initForRovers();

  const roverUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${nasaKey}`;

  fetch(roverUrl)
    .then((res) => res.json())
    .then((data) => {
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
      options.forEach((option) => (option.disabled = false));
    })
    .catch((err) => console.log(err));
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
  // console.log(selectedValue);
  selectedValue === "Temperatures"
    ? requestToNASAtemperature()
    : selectedValue.toLowerCase() === "astronomy picture of the day"
    ? requestToAPOD()
    : requestToNASAroverImgs();
});

window.addEventListener("load", () => {
  const extraOptions = document.querySelector(
    ".extra-options-for-temperatures"
  );
  extraOptions.style.display = "none";
});
