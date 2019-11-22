// const imgFileName = `https://en.wikipedia.org/w/api.php?action=query&titles=${userInput}&format=json&prop=images`;

// const imgURL = `https://en.wikipedia.org/w/api.php?action=query&titles=Image:${imgFileName}&prop=imageinfo&iiprop=url`;

// fetch(proxy + url)
//   .then(res => res.json())
//   .then(data => {
//     const pagesObj = data.query.pages;
//     const newTitle = Object.values(pagesObj)[0].images[0].title.split(":")[1];

//     console.log(newTitle);
//   });

// const proxy = "https://cors-anywhere.herokuapp.com/";

// function requestToUnsplash(e) {
//   e.preventDefault();
//   const urlForRover = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${nasaKey}`;
//   let selectedValue = selection.options[selection.selectedIndex].value;
//   if (selectedValue === "Mercury") selectedValue += " planet";
//   //console.log(selectedValue);
//   // const newValue = `${selectedValue}%20planet`;
//   const newValue = selectedValue.replace(/\s/, "_");
//   //console.log(newValue);
//   // const wikiSearchUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${newValue}`;
//   //const wikiSearchUrl = `https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=Mars_(Planet)`;
//   const detailAPI =
//     "https://private-anon-ea6a26798f-starhub.apiary-mock.com/api/planets/mars";
//   //const unsplash = `https://source.unsplash.com/1600x900/${newValue}`;
//   //console.log(newValue);
//   async function insideRequest() {
//     const res = await fetch(urlForRover);
//     //const data = await res;
//     console.log(res.url);
//   }

//   insideRequest();
// }
// const selection = document.querySelector("#input");

// selection.addEventListener("change", requestToUnsplash);

//   requestToUnsplash();

// const url = `https://api.nasa.gov/insight_weather/?api_key=${nasaKey}&feedtype=json&ver=1.0`;
// const roverAPI = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${nasaKey}`;

// fetch(proxy + wikiSearchUrl)
//   .then(res => res.json())
//   .then(data => console.log(data.originalimage.source));
// ============= steps =================

// send request to nasa for weather and display

// display did you know facts every 2seconds

// send request to wiki api with searched input and display the content

//
