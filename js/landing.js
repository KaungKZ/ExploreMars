<<<<<<< HEAD
const goDownBtn = document.querySelector(".go-down");

function smoothScroll(target, duration) {
  const goal = document.querySelector(target);
  const targetPosition = goal.getBoundingClientRect().top;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function Scrollanimation(time) {
    if (startTime === null) {
      startTime = time;
    }
    const timeElapsed = time - startTime;
    const run = calculation(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);

    if (timeElapsed < duration) {
      requestAnimationFrame(Scrollanimation);
    }
  }
  function calculation(t, b, c, d) {
    t /= d;
    return -c * t * (t - 2) + b;
  }
  requestAnimationFrame(Scrollanimation);
}
goDownBtn.addEventListener("click", () => {
  smoothScroll(".description", 1000);
});
=======
const goDownBtn = document.querySelector(".go-down");

function smoothScroll(target, duration) {
  const goal = document.querySelector(target);
  const targetPosition = goal.getBoundingClientRect().top;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function Scrollanimation(time) {
    if (startTime === null) {
      startTime = time;
    }
    const timeElapsed = time - startTime;
    const run = calculation(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);

    if (timeElapsed < duration) {
      requestAnimationFrame(Scrollanimation);
    }
  }
  function calculation(t, b, c, d) {
    t /= d;
    return -c * t * (t - 2) + b;
  }
  requestAnimationFrame(Scrollanimation);
}
goDownBtn.addEventListener("click", () => {
  smoothScroll(".description", 1000);
});
>>>>>>> 82fe7098c5140d78cce346a5af1263c7b9baae0c
