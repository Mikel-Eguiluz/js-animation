const dur = 1.5;

//gsap.to(".banner", { duration: dur, y: 200 });

function penta() {
  const pentagram = gsap.timeline();
  pentagram.to(".penta", {
    duration: dur,
    strokeDashoffset: 0,
    ease: "bounce.out",
    stagger: { each: dur / 12, from: "random" },
  });
  pentagram.to(
    ".outer-circle",
    {
      duration: dur * 0.5,
      attr: {
        rx: 110,
        ry: 0.001,
      },
      strokeWidth: 2,
      stroke: "#000",
      ease: "bounce.out",
    },
    0,
  );
  return pentagram;
}
function notes() {
  const notes = gsap.timeline();
  notes.to(
    ".mid-motive",
    {
      duration: dur,
      attr: {
        d:
          "M6,-100 L11,-100 C11,-82 57,-74 22,-23 C42,-72 14,-82 11,-81 L10,15 L6,15 Z",
        r: 15,
      },
      fill: "#000",
      stroke: "#000",
    },
    0,
  );
  notes.to(
    "circle.mid-motive",
    {
      duration: dur,
      attr: {
        cx: -5,
        cy: 15,
      },
      ease: "bounce.out",
    },
    dur / 10,
  );
  notes.to(
    ".right-motive",
    {
      duration: dur,
      attr: {
        d: "M50,-65 L46,-70 L46,45 L50,45 Z",
        r: 15,
      },
      fill: "#000",
      stroke: "#000",
      x: 15,
    },
    0,
  );
  notes.to(
    "circle.right-motive",
    {
      duration: dur,
      attr: {
        cx: 35,
        cy: 45,
      },
      ease: "bounce.out",
    },
    dur / 8,
  );
  notes.to(
    ".left-motive",
    {
      duration: dur,
      attr: {
        d: "M-34,-40 L-30,-35 L-30,60 L-34,60 Z",
        r: 15,
      },
      fill: "#000",
      stroke: "#000",
      x: -15,
    },
    dur / 10,
  );
  notes.to(
    "circle.left-motive",
    {
      duration: dur,
      attr: {
        cx: -45,
        cy: 60,
      },
      ease: "bounce.out",
    },
    dur / 10,
  );
  return notes;
}
const master = gsap
  .timeline()
  .add(penta(), { ease: "bounce.out" })
  .add(notes(), 0.5)
  .add(gsap.to(".banner", { duration: dur, y: 200 }), 0)
  .pause();
document.getElementById("hover-target").addEventListener("mouseenter", (e) => {
  master.play();
});
document.getElementById("hover-target").addEventListener("mouseout", (e) => {
  master.reverse();
});
