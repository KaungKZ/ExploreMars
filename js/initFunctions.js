export { initForFirst, initForTemperature, initForAPOD, initForRovers };
let isFirstTime = true;

const dates = document.querySelector("#select-for-dates");
const didYouKnow = document.querySelector(".did-you-know");
const divForTemperature = document.querySelector(".main-for-temperature");
const divForAPOD = document.querySelector(".main-for-APOD");
const divForRovers = document.querySelector(".main-for-rovers");
const options = document.querySelectorAll(
  "#select-for-temperature [data-active]"
);
// const selection = document.querySelector("#select-for-temperature");

// initial functions
function initForFirst() {
  const newDiv = document.createElement("div");
  newDiv.className = "queue";
  newDiv.innerHTML =
    "<p>Please wait a few seconds</p><p> Our rocket is coming from Mars with <span class = 'color'>186,282</span> miles per second by carrying your data !</p>";
  didYouKnow.appendChild(newDiv);
}

// for temperature
function initForTemperature() {
  if (isFirstTime == true) {
    initForFirst();
    isFirstTime = false;
  }

  while (divForAPOD.firstChild) {
    divForAPOD.removeChild(divForAPOD.firstChild);
  }
  while (divForRovers.firstChild) {
    divForRovers.removeChild(divForRovers.firstChild);
  }
  document.body.height = "100vh";
  document.body.style.backgroundImage = "url(../images/temperatures-bg.jpg)";
  document.body.style.backgroundPosition = "center center";
  didYouKnow.classList.remove("active");
  const extraOptions = document.querySelector(
    ".extra-options-for-temperatures"
  );
  extraOptions.style.display = "block";
  extraOptions.style.pointerEvents = "all";
  options.forEach((option) => (option.disabled = true));
}

// for rovers option
function initForRovers() {
  didYouKnow.classList.remove("active");
  const extraOptions = document.querySelector(
    ".extra-options-for-temperatures"
  );
  extraOptions.style.display = "none";
  extraOptions.style.pointerEvents = "none";
  while (dates.firstChild) {
    dates.removeChild(dates.firstChild);
  }
  while (divForTemperature.firstChild) {
    divForTemperature.removeChild(divForTemperature.firstChild);
  }
  while (divForAPOD.firstChild) {
    divForAPOD.removeChild(divForAPOD.firstChild);
  }
  document.body.height = "100vh";
  document.body.style.backgroundImage = "url(../images/rovers-bg.jpg)";
  document.body.style.backgroundPosition = "center center";
  options.forEach((option) => (option.disabled = true));
}

// for APOD
function initForAPOD() {
  didYouKnow.classList.remove("active");
  const extraOptions = document.querySelector(
    ".extra-options-for-temperatures"
  );
  extraOptions.style.display = "none";
  extraOptions.style.pointerEvents = "none";
  while (dates.firstChild) {
    dates.removeChild(dates.firstChild);
  }
  while (divForTemperature.firstChild) {
    divForTemperature.removeChild(divForTemperature.firstChild);
  }
  while (divForRovers.firstChild) {
    divForRovers.removeChild(divForRovers.firstChild);
  }

  document.body.style.backgroundImage = "url(../images/summary-bg.jpg)";
  document.body.style.backgroundPosition = "center center";
}
