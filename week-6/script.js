const planetOne = document.querySelector(".planetOne");
const planetTwo = document.querySelector(".planetTwo");
const planetThree = document.querySelector(".planetThree");

let angleOne = 0;
let angleTwo = 0;
let angleThree = 0;

const speedOne = 0.5;
const speedTwo = 0.75;
const speedThree = 1;

function animatePlanets() {
    angleOne += speedOne;
    angleTwo += speedTwo;
    angleThree += speedThree;

    planetOne.style.transform = `rotate(${angleOne}deg) translate(200px) rotate(-${angleOne}deg)`;
    planetTwo.style.transform = `rotate(${angleTwo}deg) translate(300px) rotate(-${angleTwo}deg)`;
    planetThree.style.transform = `rotate(${angleThree}deg) translate(400px) rotate(-${angleThree}deg)`;

    requestAnimationFrame(animatePlanets);
}

animatePlanets();