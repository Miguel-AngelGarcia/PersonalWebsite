const slider = document.getElementById("picture-group-slider");
const sliderContainer = document.getElementById("slider-container");

const slideWidth = slider.clientWidth;
const leftMax = -(slideWidth / 2);
const rightMax = slideWidth / 2;

console.log("width", slideWidth);
let scroll = 0;
let scrolly = Math.max(Math.min(rightMax, scroll), leftMax);
let timer = null;
window.onmousedown = (e) => {
  slider.dataset.mouseDownAt = e.clientX;
};

sliderContainer.addEventListener("wheel", function (e) {
  if (scroll > rightMax) {
    console.log("MAX");
    return;
  }
  if (scroll < leftMax) {
    console.log("MIN");
    return;
  }

  slider.dataset.mouseScrollAt = e.clientX;

  let rangedScroll = scrolly;

  const maxDe = window.innerWidth / 2;
  scroll += e.deltaX;
  rangedScroll = Math.max(scroll, leftMax);

  const percen = (rangedScroll / maxDe) * 10;
  console.log(rangedScroll, "/", maxDe);

  nextPercenRaw = parseFloat(slider.dataset.prevPercentage) + percen;

  const nextPercenRefined = Math.max(Math.min(nextPercenRaw, 0), -100);
  scroll = 0;

  slider.dataset.percentage = nextPercenRefined;
  slider.style.transform = `translate(${nextPercenRefined}%, -50%)`;

  for (const image of slider.getElementsByClassName("image")) {
    image.style.objectPosition = `${nextPercenRefined + 100}% 50%`;
  }

  slider.dataset.prevPercentage = nextPercenRefined;

  //e.preventDefault();

  //wheelStopListener(timer);
});

//wheel stop listener
function wheelStopListener(timer) {
  if (timer != null) {
    clearTimeout(timer);
  }
  timer = setTimeout(console.log("scroll stopped"), 200);
}

sliderContainer.addEventListener(
  "wheel",
  function () {
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      scroll = 0;
      slider.dataset.mouseScrollAt = 0;
    }, 100);
  },
  false
);

/* clicking and dragging across screen need to move our pictures on 
 the track/slider
*/
window.onmousemove = (e) => {
  /*do nothing unless click down occurs*/
  if (slider.dataset.mouseDownAt === "0") return;

  const mouseDelta = parseFloat(slider.dataset.mouseDownAt) - e.clientX;

  const maxDelta = window.innerWidth / 2; // why? we start at 50%

  const percentage = (mouseDelta / maxDelta) * -100;
  const nextPercentageRaw =
    parseFloat(slider.dataset.prevPercentage) + percentage;

  const nextPercentageRefined = Math.max(Math.min(nextPercentageRaw, 0), -100);
  //need to keep track of where x% is, bc it restarts at 0 if else
  slider.dataset.percentage = nextPercentageRefined;
  slider.style.transform = `translate(${nextPercentageRefined}%, -50%)`;

  for (const image of slider.getElementsByClassName("image")) {
    image.style.objectPosition = `${nextPercentageRefined + 100}% 50%`;
  }
};

window.onmouseup = () => {
  slider.dataset.mouseDownAt = 0;
  slider.dataset.prevPercentage = slider.dataset.percentage;
};

function detectTrackPad(e) {
  const isTrackpad = false;

  console.log(isTrackpad);
}

/*
sliderContainer.addEventListener("wheel", function (e) {
  slider.dataset.mouseScrollAt = e.clientX;

  scroll += e.deltaX;
  //if (slider.dataset.mouseScrollAt === "0") return;

  console.log("start", slider.dataset.mouseScrollAt);
  console.log("scroll", scroll);

  const perk = parseFloat(sliderContainer.dataset.mouseScrollAt) - scroll;
  const maxDe = window.innerWidth / 2;

  const percen = (perk / maxDe) * 100;
  console.log("perk", perk);
  console.log("maxDe", maxDe);

  slider.style.transform = `translate(${percen}%, -50%)`;
  sliderContainer.dataset.prevPercentage = slider.dataset.percentage;
  //e.preventDefault();
});
*/
