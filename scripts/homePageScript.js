"use strict";
const cursorCircle = document.querySelector(".cursorCircle");
const cursor = document.querySelector(".cursor");
const cursorClick = document.querySelector(".cursorClick");

// Custom Cursor
// document.addEventListener("mousemove", (e) => {
//   cursorCircle.setAttribute("style", `top: ${e.pageY}px; left: ${e.pageX}px`);
//   cursorClick.setAttribute("style", `top: ${e.pageY}px; left: ${e.pageX}px`);

//   cursor.setAttribute(
//     "style",
//     `top: ${e.pageY + 8.8}px; left: ${e.pageX + 8.8}px`
//   );
// });

// document.addEventListener("click", () => {
//   cursorClick.classList.add("expand");

//   setTimeout(() => {
//     cursorClick.classList.remove("expand");
//   }, 500);

//   cursorCircle.classList.add("shrink");

//   setTimeout(() => {
//     cursorCircle.classList.remove("shrink");
//   }, 500);
// });

// Smooth Scroll
gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

lenis.stop();
// GSAP Scroll Trigger integration

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// Background Color Change

// GSAP animations
let timeLine0 = gsap.timeline({ delay: 0.8 });

timeLine0.to(
  ".splashScreen",
  {
    clipPath: "circle(0% at 50% 50%)",
  },
  "+=0.5"
);

setInterval(() => {
  lenis.start();
}, 1800);

let timeline1 = gsap.timeline({ delay: 1.5 });

timeline1.from(".heroTitle", 1, {
  opacity: 0,
  yPercent: 130,
  stagger: 0.06,
  ease: "expoScale(0.5,7,none)",
});
timeline1.from(
  ".btnContainer",
  {
    opacity: 0,
  },
  "-=0.5"
);

timeline1.from(
  ".heroImage",
  {
    x: 800,
    opacity: 0,
    duration: 1,
  },
  "-0.05"
);
timeline1.from(".sneakPeek", {
  x: 500,
  opacity: 0,

  scrollTrigger: {
    trigger: ".sneakPeek",
    // markers: true,
    start: "top 60%",
    end: "70% bottom",
    scrub: true,
  },
});

timeline1.from(".collaborateSection", {
  x: -500,
  opacity: 0,
  scrollTrigger: {
    trigger: ".collaborateSection",
    // markers: true,
    start: "top 50%",
    end: "bottom 90%",
    scrub: true,
  },
});

ScrollTrigger.create({
  trigger: ".whyChooseSec",
  pin: ".right",
  start: "top top",
  end: "bottom bottom",
  scrub: true,
  //   markers: true,
});

timeline1.to(".whyImageContainerOne", {
  clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
  scrollTrigger: {
    trigger: ".detailsTwo",
    // markers: true,
    start: "top 40%",
    end: "bottom 98%",
    scrub: true,
  },
});
timeline1.to(
  ".whyImage",
  {
    y: 20,
    scrollTrigger: {
      trigger: ".detailsTwo",
      start: "top 70%",
      end: "bottom 30%",
      scrub: true,
    },
  },
  "-=0.5"
);
timeline1.to(".whyImageContainerTwo", {
  clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
  scrollTrigger: {
    trigger: ".detailsThree",
    // markers: true,
    start: "top 40%",
    end: "bottom 98%",
    scrub: true,
  },
});
gsap
  .timeline({
    scrollTrigger: {
      trigger: ".detailsOne",
      //   markers: true,
      start: "top 70%",
      end: "bottom 98%",
      scrub: true,
    },
  })
  .fromTo(
    ".whyChooseSec",
    {
      backgroundColor: "#000",
    },
    { backgroundColor: "#f0e0cd" }
  );

gsap
  .timeline({
    scrollTrigger: {
      trigger: ".detailsTwo",
      //   markers: true,
      start: "top 40%",
      end: "bottom 98%",
      scrub: true,
    },
  })
  .fromTo(
    ".whyChooseSec",
    {
      backgroundColor: "#f0e0cd",
    },
    { backgroundColor: "#dee1ff" }
  );

gsap
  .timeline({
    scrollTrigger: {
      trigger: ".detailsThree",
      //   markers: true,
      start: "top 40%",
      end: "bottom 98%",
      scrub: true,
    },
  })
  .fromTo(
    ".whyChooseSec",
    {
      backgroundColor: "#dee1ff",
    },
    { backgroundColor: "#fcb" }
  );
