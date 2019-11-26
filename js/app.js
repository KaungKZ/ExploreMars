// ============= steps =================

// variables
const proxy = "https://cors-anywhere.herokuapp.com/";
const nasaKey = "rdWxphCszg82O9eZjLornCA6z5FJEFL2CgMd9Cod";
const dates = document.querySelector("#select-for-dates");

const didYouKnow = document.querySelector(".did-you-know");
let isFirstTime = true;

// send request to nasa api for weather and generate html inside function 1 and display (default function)

function requestToNASAtemperature() {
  if (isFirstTime == true) {
    initForFirst();
    isFirstTime = false;
  }

  document.body.style.backgroundImage = "url(../images/temperatures-bg.jpg)";
  didYouKnow.classList.remove("active");
  const extraOptions = document.querySelector(
    ".extra-options-for-temperatures"
  );
  extraOptions.style.display = "block";

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

        const airTemperatureMin = ((dataForweek.AT.mn * 9) / 5 + 32).toFixed(1);
        const airTemperatureAvg = ((dataForweek.AT.av * 9) / 5 + 32).toFixed(1);
        const airTemperatureMax = ((dataForweek.AT.mx * 9) / 5 + 32).toFixed(1);

        const windSpeedMin = (dataForweek.HWS.mn * 2.237).toFixed(1);
        const windSpeedAvg = (dataForweek.HWS.av * 2.237).toFixed(1);
        const windSpeedMax = (dataForweek.HWS.mx * 2.237).toFixed(1);

        const PressureMin = dataForweek.PRE.mn.toFixed(1);
        const PressureAvg = dataForweek.PRE.av.toFixed(1);
        const PressureMax = dataForweek.PRE.mx.toFixed(1);

        const date = dataForweek.First_UTC.split("T")[0];

        arrOfPressureValues.push(PressureMin, PressureAvg, PressureMax);
        arrOfWindSpeedValues.push(windSpeedMin, windSpeedAvg, windSpeedMax);
        arrOfDates.push(date);
        arrOfTemperatureValues.push(
          airTemperatureMin,
          airTemperatureAvg,
          airTemperatureMax
        );
      }

      const [
        finalArrayOfTemperatureValues,
        finalArrayOfPressureValues,
        finalArrayOfWindSpeedValues
      ] = [
        arrOfTemperatureValues.reverse(),
        arrOfPressureValues.reverse(),
        arrOfWindSpeedValues.reverse()
      ];

      const finalArrayOfDates = arrOfDates.reverse();

      finalArrayOfDates.forEach(date => {
        const dateOption = document.createElement("option");
        dateOption.innerHTML = date;
        dateOption.value = date;
        dates.appendChild(dateOption);
      });

      htmlForTemperatures(
        finalArrayOfTemperatureValues,
        finalArrayOfWindSpeedValues,
        finalArrayOfPressureValues
      );
    })
    .then(() => {
      const queueDiv = document.querySelector(".queue");
      if (queueDiv) queueDiv.remove();
      didYouKnow.classList.add("active");
    })
    .catch(err => console.log(err));
}

// function for generating html and displaying temperature

function htmlForTemperatures(
  finalArrayOfTemperatureValues,
  finalArrayOfWindSpeedValues,
  finalArrayOfPressureValues
) {
  const divForTemperature = document.querySelector(".main-for-temperature");
  const arr = [];
  for (let i = 0; i < 7; i++) {
    arr.push(
      finalArrayOfTemperatureValues.splice(0, 3),
      finalArrayOfWindSpeedValues.splice(0, 3),
      finalArrayOfPressureValues.splice(0, 3)
    );
  }

  const [
    seventhDay,
    sixthDay,
    fifthDay,
    fourthDay,
    thirdDay,
    secondDay,
    firstDay
  ] = [
    [arr[0], arr[1], arr[2]],
    [arr[3], arr[4], arr[5]],
    [arr[6], arr[7], arr[8]],
    [arr[9], arr[10], arr[11]],
    [arr[12], arr[13], arr[14]],
    [arr[15], arr[16], arr[17]],
    [arr[18], arr[19], arr[20]]
  ];

  const div = document.createElement("div");
  div.className = "container container-for-temperature";

  div.innerHTML = `   
    
      <div class="content">
        <div class="box box-for-temperature">
          <div class="air-temperature">
            <div class="title">
              <p>Air Temperature (°F)</p>
            </div>
            <div class="info">
              <div class="min">
                <div class="header">Min</div>
                <div class="value"><span class = 'min-value'>${seventhDay[0][2]}</span>° F</div>
              </div>

              <div class="avg">
                <div class="header">Avg</div>
                <div class="value"><span class = 'avg-value'>${seventhDay[0][1]}</span>° F</div>
              </div>
              <div class="max">
                <div class="header">Max</div>
                <div class="value"><span class = 'max-value'>${seventhDay[0][0]}</span>° F</div>
              </div>
            </div>
          </div>
          <div class="wind-speed">
            <div class="title">
              <p>Wind Speed (mph | m/s)</p>
            </div>
            <div class="info">
              <div class="min">
                <div class="header">Min</div>
                <div class="value"><span class = 'min-value'>${seventhDay[1][2]}</span></div>
              </div>

              <div class="avg">
                <div class="header">Avg</div>
                <div class="value"><span class = 'avg-value'>${seventhDay[1][1]}</span></div>
              </div>
              <div class="max">
                <div class="header">Max</div>
                <div class="value"><span class = 'max-value'>${seventhDay[1][0]}</span></div>
              </div>
            </div>
          </div>
          <div class="pressure">
            <div class="title">
              <p>Pressure (Pa)</p>
            </div>
            <div class="info">
              <div class="min">
                <div class="header">Min</div>
                <div class="value"><span class = 'min-value'>${seventhDay[2][2]}</span></div>
              </div>

              <div class="avg">
                <div class="header">Avg</div>
                <div class="value"><span class = 'avg-value'>${seventhDay[2][1]}</span></div>
              </div>
              <div class="max">
                <div class="header">Max</div>
                <div class="value"><span class = 'max-value'>${seventhDay[2][0]}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
  `;
  divForTemperature.appendChild(div);

  let minValueForTemp = document.querySelector(
    ".content .box .air-temperature .min-value"
  );
  let avgValueForTemp = document.querySelector(
    ".content .box .air-temperature .avg-value"
  );
  let maxValueForTemp = document.querySelector(
    ".content .box .air-temperature .max-value"
  );
  let minValueForWindSpeed = document.querySelector(
    ".content .box .wind-speed .min-value"
  );
  let avgValueForWindSpeed = document.querySelector(
    ".content .box .wind-speed .avg-value"
  );
  let maxValueForWindSpeed = document.querySelector(
    ".content .box .wind-speed .max-value"
  );
  let minValueForPressure = document.querySelector(
    ".content .box .pressure .min-value"
  );
  let avgValueForPressure = document.querySelector(
    ".content .box .pressure .avg-value"
  );
  let maxValueForPressure = document.querySelector(
    ".content .box .pressure .max-value"
  );
  dates.addEventListener("change", () => {
    let selectedDateIndex = dates.options[dates.selectedIndex].index;

    // if selectedDateIndex is 0 to 6 which is from newest day to farest (7th to 1st)

    if (selectedDateIndex === 0) {
      [
        minValueForTemp.innerHTML,
        avgValueForTemp.innerHTML,
        maxValueForTemp.innerHTML
      ] = [seventhDay[0][2], seventhDay[0][1], seventhDay[0][0]];

      [
        minValueForWindSpeed.innerHTML,
        avgValueForWindSpeed.innerHTML,
        maxValueForWindSpeed.innerHTML
      ] = [seventhDay[1][2], seventhDay[1][1], seventhDay[1][0]];

      [
        minValueForPressure.innerHTML,
        avgValueForPressure.innerHTML,
        maxValueForPressure.innerHTML
      ] = [seventhDay[2][2], seventhDay[2][1], seventhDay[2][0]];
    } else if (selectedDateIndex === 1) {
      [
        minValueForTemp.innerHTML,
        avgValueForTemp.innerHTML,
        maxValueForTemp.innerHTML
      ] = [sixthDay[0][2], sixthDay[0][1], sixthDay[0][0]];

      [
        minValueForWindSpeed.innerHTML,
        avgValueForWindSpeed.innerHTML,
        maxValueForWindSpeed.innerHTML
      ] = [sixthDay[1][2], sixthDay[1][1], sixthDay[1][0]];

      [
        minValueForPressure.innerHTML,
        avgValueForPressure.innerHTML,
        maxValueForPressure.innerHTML
      ] = [sixthDay[2][2], sixthDay[2][1], sixthDay[2][0]];
    } else if (selectedDateIndex === 2) {
      [
        minValueForTemp.innerHTML,
        avgValueForTemp.innerHTML,
        maxValueForTemp.innerHTML
      ] = [fifthDay[0][2], fifthDay[0][1], fifthDay[0][0]];

      [
        minValueForWindSpeed.innerHTML,
        avgValueForWindSpeed.innerHTML,
        maxValueForWindSpeed.innerHTML
      ] = [fifthDay[1][2], fifthDay[1][1], fifthDay[1][0]];

      [
        minValueForPressure.innerHTML,
        avgValueForPressure.innerHTML,
        maxValueForPressure.innerHTML
      ] = [fifthDay[2][2], fifthDay[2][1], fifthDay[2][0]];
    } else if (selectedDateIndex === 3) {
      [
        minValueForTemp.innerHTML,
        avgValueForTemp.innerHTML,
        maxValueForTemp.innerHTML
      ] = [fourthDay[0][2], fourthDay[0][1], fourthDay[0][0]];

      [
        minValueForWindSpeed.innerHTML,
        avgValueForWindSpeed.innerHTML,
        maxValueForWindSpeed.innerHTML
      ] = [fourthDay[1][2], fourthDay[1][1], fourthDay[1][0]];

      [
        minValueForPressure.innerHTML,
        avgValueForPressure.innerHTML,
        maxValueForPressure.innerHTML
      ] = [fourthDay[2][2], fourthDay[2][1], fourthDay[2][0]];
    } else if (selectedDateIndex === 4) {
      [
        minValueForTemp.innerHTML,
        avgValueForTemp.innerHTML,
        maxValueForTemp.innerHTML
      ] = [thirdDay[0][2], thirdDay[0][1], thirdDay[0][0]];

      [
        minValueForWindSpeed.innerHTML,
        avgValueForWindSpeed.innerHTML,
        maxValueForWindSpeed.innerHTML
      ] = [thirdDay[1][2], thirdDay[1][1], thirdDay[1][0]];

      [
        minValueForPressure.innerHTML,
        avgValueForPressure.innerHTML,
        maxValueForPressure.innerHTML
      ] = [thirdDay[2][2], thirdDay[2][1], thirdDay[2][0]];
    } else if (selectedDateIndex === 5) {
      [
        minValueForTemp.innerHTML,
        avgValueForTemp.innerHTML,
        maxValueForTemp.innerHTML
      ] = [secondDay[0][2], secondDay[0][1], secondDay[0][0]];

      [
        minValueForWindSpeed.innerHTML,
        avgValueForWindSpeed.innerHTML,
        maxValueForWindSpeed.innerHTML
      ] = [secondDay[1][2], secondDay[1][1], secondDay[1][0]];

      [
        minValueForPressure.innerHTML,
        avgValueForPressure.innerHTML,
        maxValueForPressure.innerHTML
      ] = [secondDay[2][2], secondDay[2][1], secondDay[2][0]];
    } else {
      [
        minValueForTemp.innerHTML,
        avgValueForTemp.innerHTML,
        maxValueForTemp.innerHTML
      ] = [firstDay[0][2], firstDay[0][1], firstDay[0][0]];

      [
        minValueForWindSpeed.innerHTML,
        avgValueForWindSpeed.innerHTML,
        maxValueForWindSpeed.innerHTML
      ] = [firstDay[1][2], firstDay[1][1], firstDay[1][0]];

      [
        minValueForPressure.innerHTML,
        avgValueForPressure.innerHTML,
        maxValueForPressure.innerHTML
      ] = [firstDay[2][2], firstDay[2][1], firstDay[2][0]];
    }
  });
}

// if a user selects summary,remove and hide previous parts send request to wiki api to get the summary and generate html inside function and display

// function to clear the previous contents

function initForWikiAndRover() {
  didYouKnow.classList.remove("active");
  const extraOptions = document.querySelector(
    ".extra-options-for-temperatures"
  );
  const mainForTemperature = document.querySelector(".main-for-temperature");

  extraOptions.style.display = "none";
  while (dates.firstChild) {
    dates.removeChild(dates.firstChild);
  }
  while (mainForTemperature.firstChild) {
    mainForTemperature.removeChild(mainForTemperature.firstChild);
  }
}

function requestToWikiSummary() {
  initForWikiAndRover();
  document.body.style.backgroundImage = "url(../images/summary-bg.jpg)";
  document.body.style.backgroundPosition = "0% 0%";

  // const wikiSearchUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${newValue}`;
  // const wikiSearchUrl = `https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=Mars_(Planet)`;
}

// if a user selects rover, remove and hide previous parts send request to nasa api to get the images and generate html inside function and display

function requestToNASAroverImgs() {
  initForWikiAndRover();
  document.body.style.backgroundImage = "url(../images/rovers-bg.jpg)";

  // const urlForRover = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${nasaKey}`;
  // const roverAPI = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${nasaKey}`;
}
// did you know facts function
function didYouKnowFacts() {
  const facts = [];
}
// function to display wait message

function initForFirst() {
  const newDiv = document.createElement("div");
  newDiv.className = "queue";
  newDiv.innerHTML =
    "<p>Please wait a few seconds</p><p> Our rocket is coming from Mars with 186,282 miles per second by carrying your data !</p>";
  didYouKnow.appendChild(newDiv);
}
// event listeners
const selection = document.querySelector("#select-for-temperature");

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
