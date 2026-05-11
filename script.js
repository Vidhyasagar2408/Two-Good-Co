gsap.registerPlugin(ScrollTrigger);

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("main"),
  smooth: true,
});

locoScroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy("main", {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  },

  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },

  pinType: document.querySelector("main").style.transform
    ? "transform"
    : "fixed",
});

ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

let mouseX = 0;
let mouseY = 0;

function imageAnimate() {
  let image = document.querySelector(".image");
  let play = document.querySelector(".play");

  gsap.set(play, {
    opacity: 0,
    scale: 0,
  });

  image.addEventListener("mouseenter", function () {
    gsap.to(play, {
      opacity: 1,
      scale: 1,
    });
  });

  image.addEventListener("mouseleave", function () {
    gsap.to(play, {
      opacity: 0,
      scale: 0,
    });
  });

  image.addEventListener("mousemove", function (dets) {
    let rect = image.getBoundingClientRect();
    gsap.to(play, {
      opacity: 1,
      scale: 1,
      x: dets.clientX - rect.left - play.offsetWidth / 2,
      y: dets.clientY - rect.top - play.offsetHeight / 2,
      duration: 0.5,
      ease: "power3.out",
      overwrite: true,
    });
  });
}

imageAnimate();

function loadingAnimation() {
  let tl = gsap.timeline();
  tl.from(".page1 h1", {
    y: 40,
    duration: 1,
    opacity: 0,
    ease: "back.in",
    stagger: 0.2,
  });

  tl.from(".page1 .image", {
    duration: 0.5,
    opacity: 0,
    ease: "back.in",
  });
}

loadingAnimation();

gsap.to(".image img", {
  y: 200,
  ease: "none",
  scrollTrigger: {
    trigger: ".image",
    scroller: "main",
    start: "top bottom",
    end: "bottom top",
    scrub: 2,
  },
});

ScrollTrigger.refresh();

document.addEventListener("mousemove", function (dets) {
  gsap.to(".cursor", {
    left: dets.x,
    top: dets.y,
  });
});

document.querySelectorAll(".child").forEach(function (elem) {
  elem.addEventListener("mouseenter", function () {
    gsap.to(".cursor", {
      transform: "translate(-50%,-50%)",
      scale: 1,
    });
  });

  elem.addEventListener("mouseleave", function () {
    gsap.to(".cursor", {
      duration: 0.3,
      transform: "translate(-50%,-50%)",
      scale: 0,
    });
  });
});
