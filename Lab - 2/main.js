const slider = document.querySelector(".slider");
const slidesAmount = slider.querySelectorAll(".slide").length;
const slides = document.querySelectorAll(".slide");

const slidesIndicators = document.querySelectorAll(".indicator");
const sliderButtons = document.querySelectorAll(".slider-btn");

const startBtn = document.querySelector("#start");
const stopBtn = document.querySelector("#stop");
const leftBtn = document.querySelector("#left");
const rightBtn = document.querySelector("#right");
const fadeBtn = document.querySelector("#fade");
const slideBtn = document.querySelector("#slide");

const lightBox = document.querySelector("#lightbox");

let counter = 0;
let directionLeft = false;
let isRunning = true;
let isFade = false;
let interval = startInterval();

console.log(slidesAmount);
function slide() {
  calcNextSlide();
  if (isFade) {
    calculateFade();
  } else {
    slider.style.transform = `translateX(-${counter * 100}%)`;
  }
  lightUpIndicator();
}

function lightUpIndicator() {
  slidesIndicators.forEach((indicator) => {
    indicator.classList.remove("active");
  });
  slidesIndicators[counter].classList.add("active");
}

slidesIndicators.forEach((indicator, index) => {
  indicator.addEventListener("click", () => {
    counter = index;
    slide();
  });
});

sliderButtons[0].addEventListener("click", () => {
  if (isRunning) {
    resetInterval();
  }
  counter--;
  slide();
});

sliderButtons[1].addEventListener("click", () => {
  if (isRunning) {
    resetInterval();
  }
  counter++;
  slide();
});

function calcNextSlide() {
  if (counter >= slidesAmount) {
    counter = 0;
  } else if (counter < 0) {
    counter = slidesAmount - 1;
  }
}

function resetInterval() {
  stopInterval();
  interval = startInterval();
}

function stopInterval() {
  isRunning = false;
  clearInterval(interval);
}

function startInterval() {
  isRunning = true;
  return setInterval(() => {
    slide();
    directionLeft ? counter-- : counter++;
  }, 5000);
}

startBtn.addEventListener("click", () => {
  resetInterval();
});

stopBtn.addEventListener("click", () => {
  stopInterval();
});

leftBtn.addEventListener("click", () => {
  resetInterval();
  directionLeft = true;
});

rightBtn.addEventListener("click", () => {
  resetInterval();
  directionLeft = false;
});

slides.forEach((slide) => {
  slide.addEventListener("click", () => {
    lightBox.classList.add("active");
    lightBox.querySelector("img").src = slide.querySelector("img").src;
    stopInterval();
  });
});

lightBox.addEventListener("click", () => {
  lightBox.classList.remove("active");
  resetInterval();
});

fadeBtn.addEventListener("click", () => {
  isFade = true;
  slides.forEach((slide) => {
    slide.classList.add("fade");
  });
  calculateFade();
  slider.classList.add("fade");
  slider.style.transform = null;
});

function calculateFade() {
  slides.forEach((slide, index) => {
    if (index == counter) {
      slide.style.zIndex = 999;
      slide.style.opacity = 1;
    } else {
      slide.style.opacity = 0;
      slide.style.zIndex = index;
    }
  });
}

slideBtn.addEventListener("click", () => {
  isFade = false;
  slides.forEach((slide) => {
    slide.classList.remove("fade");
    slide.style.opacity = null;
    slide.style.zIndex = null;
  });
  slider.classList.remove("fade");
  slide();
});
