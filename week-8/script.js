// const btn = document.querySelector("#box"); REWRITE CODE FOR OTHER TASK YOU JUST DELETED YOU IDIOT
const play = document.querySelector("#play");
const pause = document.querySelector("#pause");
const restart = document.querySelector("#restart");
let tl = gsap.timeline();
tl.pause();

tl.to("#box", {x: "+=200", ease:"power1.out"})
    .to("#box", {scale: 1.5, duration: 1})
    .to("#box", {y: "+=200", ease: "none"})
    .to("#box", {rotation: 720, duration: 1})
    .to("#box", {x: 50, y: 50, ease: "none"})

play.addEventListener("click", function() {
    tl.play();
})

pause.addEventListener("click", function() {
    tl.pause();
})

restart.addEventListener("click", function() {
    tl.restart();
})





