//import { gsap } from "../node_modules/gsap/all.js";
//import { CustomEase } from "../node_modules/gsap/all.js";
//this should be... IDK why it does not work
// import { gsap } from "gsap";
// import { CustomEase } from "CustomEase";

/* global gsap CustomEase*/
gsap.registerPlugin(CustomEase);

const randomBall = gsap.utils.random(
  [
    "../assets/images/basket.svg",
    "../assets/images/basket.svg",
    "../assets/images/tennis.svg",
    "../assets/images/beachBall.svg",
  ],
  true,
);
const randomHeight = gsap.utils.random(0, window.innerHeight * -0.8, true);

const svgArea = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svgArea.setAttribute(
  //TODO update this when window resizes
  "viewBox",
  `0 0 ${window.innerWidth} ${window.innerHeight}`,
);
document.getElementById("svgAreaContainer").appendChild(svgArea);

svgArea.addEventListener("click", (e) => {
  const point = {
    x:
      svgArea.viewBox.animVal.height *
      (e.offsetX / svgArea.height.animVal.value),
    y:
      svgArea.viewBox.animVal.width * (e.offsetY / svgArea.width.animVal.value),
  };
  console.log("DOM clicked at", { x: e.offsetX, y: e.offsetY });
  console.log("SVG clicked at", point);
  const ball = document.createElementNS("http://www.w3.org/2000/svg", "image");
  const diametre = gsap.utils.random(5, svgArea.viewBox.animVal.width / 10);
  ball.setAttribute("href", randomBall());
  ball.setAttribute("x", point.x - diametre / 2);
  ball.setAttribute("y", point.y - diametre / 2);
  ball.setAttribute("width", diametre);
  ball.setAttribute("height", diametre);

  ball.classList = `ball`;
  svgArea.appendChild(ball);
});
let hArr = [];
let hInd = 0;
CustomEase.create(
  "drop",
  "M0,0 C0.14,0 0.242,0.438 0.272,0.561 0.313,0.728 0.354,0.963 0.362,1 0.37,0.985 0.441,0.414 0.516,0.414 0.59,0.414 0.684,0.998 0.684,0.998 0.684,0.998 0.734,0.692 0.794,0.692 0.856,0.692 0.897,0.985 0.911,0.998 0.922,0.994 0.922,0.93 0.954,0.93 0.988,0.93 1,1 1,1 ",
);
function dropBalls() {
  let tl = gsap.timeline({
    onStart: () => {
      for (const ball of document.querySelectorAll(".ball")) {
        ball.classList.remove("ball");
        ball.classList.add("floor-ball");
      }
    },
  });
  //this is weirdly convoluted, but couldnt find a better way to do it

  tl.to(".ball", {
    duration: 2,
    attr: {
      y: function () {
        hInd++;
        return svgArea.viewBox.animVal.height - hArr[hInd - 1];
      },
    },
    //this is the only place I could find that has access to bothe the target array an the index
    stagger: (index, target) => {
      hArr.push(target.height.animVal.value);
      return index * 0.05;
    },
    ease: "drop",
  });

  tl.to(
    ".ball",
    {
      duration: 2,
      x: () => {
        return gsap.utils.random(
          svgArea.viewBox.animVal.width / 2,
          -svgArea.viewBox.animVal.width / 2,
        );
      },
      repeatRefresh: true,
      stagger: 0.05,
      // I think that using attr messes with gsap translates..
      // rotation: 360,
      // transformOrigin: "50% 50%",
    },
    "<",
  );
}

CustomEase.create(
  "boing",
  "M0,0 C0,0.496 0.102,1 0.2,1 0.314,1 0.4,0.498 0.4,0 0.4,0.312 0.448,0.6 0.5,0.6 0.562,0.6 0.6,0.138 0.6,0 0.6,0.102 0.65,0.2 0.7,0.2 0.75,0.2 0.8,0.096 0.8,0 0.8,0.042 0.829,0.064 0.852,0.064 0.88,0.064 0.9,0 0.9,0 0.9,0 0.915,0.023 0.942,0.026 0.965,0.028 1,0.023 1,0",
);
function bounceBalls() {
  let tl = gsap.timeline({
    onStart: () => {
      document.getElementById("bounce-button").disabled = true;
    },
    onComplete: () => {
      document.getElementById("bounce-button").removeAttribute("disabled");
    },
  });
  tl.to(".floor-ball", {
    duration: 2,
    y: () => {
      return randomHeight();
    },
    ease: "boing",
  });
  tl.to(
    ".floor-ball",
    {
      duration: 2,
      x: () => {
        return gsap.utils.random(
          svgArea.viewBox.animVal.width / 2,
          -svgArea.viewBox.animVal.width / 2,
        );
      },
    },
    "<",
  );
}
//TODO If you cllick the button fast, they loose track of where the floor is
document.getElementById("bounce-button").addEventListener("click", () => {
  bounceBalls();
  dropBalls();
});
document.getElementById("drop-button").addEventListener("click", () => {
  dropBalls();
});
document.getElementById("clear-button").addEventListener("click", () => {
  gsap.to(".ball, .floor-ball", {
    duration: 1,
    opacity: 0,
    onComplete: () => {
      svgArea.innerHTML = "";
    },
  });
});
