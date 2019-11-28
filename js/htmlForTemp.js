export { htmlForTemperatures };

const dates = document.querySelector("#select-for-dates");
const divForTemperature = document.querySelector(".main-for-temperature");
// function for generating html and displaying temperature

function htmlForTemperatures(
  finalArrayOfTemperatureValues,
  finalArrayOfWindSpeedValues,
  finalArrayOfPressureValues
) {
  const arr = [];
  for (let i = 0; i < 7; i++) {
    arr.push(
      finalArrayOfTemperatureValues.splice(0, 3),
      finalArrayOfWindSpeedValues.splice(0, 3),
      finalArrayOfPressureValues.splice(0, 3)
    );
  }

  const [seventh, sixth, fifth, fourth, third, second, first] = [
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
      
        
          <div class="box box-for-temperature">
            <div class="air-temperature">
              <div class="title">
                <p>Air Temperature (°F)</p>
              </div>
              <div class="info">
                <div class="min">
                  <div class="header">Min</div>
                  <div class="value"><span class = 'min-value'>${seventh[0][2]}</span>° F</div>
                </div>
  
                <div class="avg">
                  <div class="header">Avg</div>
                  <div class="value"><span class = 'avg-value'>${seventh[0][1]}</span>° F</div>
                </div>
                <div class="max">
                  <div class="header">Max</div>
                  <div class="value"><span class = 'max-value'>${seventh[0][0]}</span>° F</div>
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
                  <div class="value"><span class = 'min-value'>${seventh[1][2]}</span></div>
                </div>
  
                <div class="avg">
                  <div class="header">Avg</div>
                  <div class="value"><span class = 'avg-value'>${seventh[1][1]}</span></div>
                </div>
                <div class="max">
                  <div class="header">Max</div>
                  <div class="value"><span class = 'max-value'>${seventh[1][0]}</span></div>
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
                  <div class="value"><span class = 'min-value'>${seventh[2][2]}</span></div>
                </div>
  
                <div class="avg">
                  <div class="header">Avg</div>
                  <div class="value"><span class = 'avg-value'>${seventh[2][1]}</span></div>
                </div>
                <div class="max">
                  <div class="header">Max</div>
                  <div class="value"><span class = 'max-value'>${seventh[2][0]}</span></div>
                </div>
              </div>
            </div>
          </div>
        
    `;
  divForTemperature.appendChild(div);

  let mnT = document.querySelector(".box .air-temperature .min-value");
  //console.log(minValueForTemp);
  let avT = document.querySelector(".box .air-temperature .avg-value");
  let mxT = document.querySelector(".box .air-temperature .max-value");
  let mnWS = document.querySelector(".box .wind-speed .min-value");
  let avWS = document.querySelector(".box .wind-speed .avg-value");
  let mxWS = document.querySelector(".box .wind-speed .max-value");
  let mnP = document.querySelector(".box .pressure .min-value");

  let avP = document.querySelector(".box .pressure .avg-value");

  let mxP = document.querySelector(".box .pressure .max-value");

  dates.addEventListener("change", () => {
    let selectedDateIndex = dates.options[dates.selectedIndex].index;

    // if selectedDateIndex is 0 to 6 which is from newest day to farest (7th to 1st)

    if (selectedDateIndex === 0) {
      [mnT.innerHTML, avT.innerHTML, mxT.innerHTML] = [
        seventh[0][2],
        seventh[0][1],
        seventh[0][0]
      ];

      [mnWS.innerHTML, avWS.innerHTML, mxWS.innerHTML] = [
        seventh[1][2],
        seventh[1][1],
        seventh[1][0]
      ];

      [mnP.innerHTML, avP.innerHTML, mxP.innerHTML] = [
        seventh[2][2],
        seventh[2][1],
        seventh[2][0]
      ];
    } else if (selectedDateIndex === 1) {
      [mnT.innerHTML, avT.innerHTML, mxT.innerHTML] = [
        sixth[0][2],
        sixth[0][1],
        sixth[0][0]
      ];

      [mnWS.innerHTML, avWS.innerHTML, mxWS.innerHTML] = [
        sixth[1][2],
        sixth[1][1],
        sixth[1][0]
      ];

      [mnP.innerHTML, avP.innerHTML, mxP.innerHTML] = [
        sixth[2][2],
        sixth[2][1],
        sixth[2][0]
      ];
    } else if (selectedDateIndex === 2) {
      [mnT.innerHTML, avT.innerHTML, mxT.innerHTML] = [
        fifth[0][2],
        fifth[0][1],
        fifth[0][0]
      ];

      [mnWS.innerHTML, avWS.innerHTML, mxWS.innerHTML] = [
        fifth[1][2],
        fifth[1][1],
        fifth[1][0]
      ];

      [mnP.innerHTML, avP.innerHTML, mxP.innerHTML] = [
        fifth[2][2],
        fifth[2][1],
        fifth[2][0]
      ];
    } else if (selectedDateIndex === 3) {
      [mnT.innerHTML, avT.innerHTML, mxT.innerHTML] = [
        fourth[0][2],
        fourth[0][1],
        fourth[0][0]
      ];

      [mnWS.innerHTML, avWS.innerHTML, mxWS.innerHTML] = [
        fourth[1][2],
        fourth[1][1],
        fourth[1][0]
      ];

      [mnP.innerHTML, avP.innerHTML, mxP.innerHTML] = [
        fourth[2][2],
        fourth[2][1],
        fourth[2][0]
      ];
    } else if (selectedDateIndex === 4) {
      [mnT.innerHTML, avT.innerHTML, mxT.innerHTML] = [
        third[0][2],
        third[0][1],
        third[0][0]
      ];

      [mnWS.innerHTML, avWS.innerHTML, mxWS.innerHTML] = [
        third[1][2],
        third[1][1],
        third[1][0]
      ];

      [mnP.innerHTML, avP.innerHTML, mxP.innerHTML] = [
        third[2][2],
        third[2][1],
        third[2][0]
      ];
    } else if (selectedDateIndex === 5) {
      [mnT.innerHTML, avT.innerHTML, mxT.innerHTML] = [
        second[0][2],
        second[0][1],
        second[0][0]
      ];

      [mnWS.innerHTML, avWS.innerHTML, mxWS.innerHTML] = [
        second[1][2],
        second[1][1],
        second[1][0]
      ];

      [mnP.innerHTML, avP.innerHTML, mxP.innerHTML] = [
        second[2][2],
        second[2][1],
        second[2][0]
      ];
    } else {
      [mnT.innerHTML, avT.innerHTML, mxT.innerHTML] = [
        first[0][2],
        first[0][1],
        first[0][0]
      ];

      [mnWS.innerHTML, avWS.innerHTML, mxWS.innerHTML] = [
        first[1][2],
        first[1][1],
        first[1][0]
      ];

      [mnP.innerHTML, avP.innerHTML, mxP.innerHTML] = [
        first[2][2],
        first[2][1],
        first[2][0]
      ];
    }
  });
}
