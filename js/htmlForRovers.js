const divForRovers = document.querySelector(".main-for-rovers");

export function htmlForRovers(randomImgs) {
  const imgsDiv = document.createElement("div");
  imgsDiv.className = "container container-for-rovers";
  imgsDiv.innerHTML = `
    <div class="text">
          <p>
            Following images are the random images of mars taken by NASA rovers.
            Hover the image or click the link to get to know more about NASA
            rovers.
          </p>
        </div>
        <div class = 'images'>
    <div class="img img1">
    <img src="${randomImgs[0].img_src}" alt="">
    <div class = 'info'>
    <p>Rover name</p>
    <p>${randomImgs[0].rover.name}</p>
    <p>Photo ID</p>
    <p>${randomImgs[0].id}</p>
    <a href = 'https://mars.nasa.gov/msl/home/'>Read More</a>
    </div>
  </div>
  <div class="img img2">
    <img src="${randomImgs[1].img_src}" alt="">
    <div class = 'info'>
    <p>Rover name</p>
    <p>${randomImgs[1].rover.name}</p>
    <p>Photo ID</p>
    <p>${randomImgs[1].id}</p>
    <a href = 'https://mars.nasa.gov/msl/home/'>Read More</a>
    </div>
  </div>
  <div class="img img3">
    <img src="${randomImgs[2].img_src}" alt="">
    <div class = 'info'>
    <p>Rover name</p>
    <p>${randomImgs[2].rover.name}</p>
    <p>Photo ID</p>
    <p>${randomImgs[2].id}</p>
    <a href = 'https://mars.nasa.gov/msl/home/'>Read More</a>
    </div>
  </div>
  <div class="img img4">
    <img src="${randomImgs[3].img_src}" alt="">
    <div class = 'info'>
    <p>Rover name</p>
    <p>${randomImgs[3].rover.name}</p>
    <p>Photo ID</p>
    <p>${randomImgs[3].id}</p>
    <a href = 'https://mars.nasa.gov/msl/home/'>Read More</a>
    </div>
  </div>
  </div>`;

  divForRovers.appendChild(imgsDiv);
}
