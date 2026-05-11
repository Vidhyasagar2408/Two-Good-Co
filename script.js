function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
locomotiveAnimation();

function navbarAnimation() {
  ScrollTrigger.create({
    trigger: ".page1",
    scroller: "main",
    start: "top top",
    end: "bottom top",

    onUpdate: (self) => {
      if (self.scroll() > 50) {
        gsap.to("nav .nav-part1 svg", {
          y: "-100%",
          duration: 0.5,
        });

        gsap.to("nav .nav-part2 .link", {
          y: "-100%",
          opacity: 0,
          duration: 0.3,
        });
      } else {
        gsap.to("nav .nav-part1 svg", {
          y: "0%",
          duration: 0.5,
        });

        gsap.to("nav .nav-part2 .link", {
          y: "0%",
          opacity: 1,
          duration: 0.3,
        });
      }
    },
  });
}

navbarAnimation();

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

function cursorAnimation() {
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
}

cursorAnimation();

document.querySelectorAll(".page2 .elem .dets").forEach(function (elem) {
  elem.addEventListener("mouseenter", function () {
    gsap.to(elem, {
      height: 'auto',
      duration: 0.3,
      ease: "power2.out",
    });
  });

  elem.addEventListener("mouseleave", function () {
    gsap.to(elem, {
      height: 60,
      duration: 0.3,
      ease: "power2.out",
    });
  });
});
