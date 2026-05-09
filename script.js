// Initialize Lenis
const lenis = new Lenis({
  autoRaf: true,
});

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
    gsap.to(play, {
      opacity: 1,
      scale: 1,
      left: dets.clientX,
      top: dets.clientY,
      duration: 0.5,
      ease: "power3.out",
      overwrite: "auto",
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

gsap.registerPlugin(ScrollTrigger);

