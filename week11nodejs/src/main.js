import confetti from 'canvas-confetti';

function funStuff() {
  const mappedX = event.clientX / window.innerWidth;
  const mappedY = event.clientY / window.innerHeight;
  confetti({
    particleCount: 2000,
    startVelocity: 30,
    spread: 360,
    origin: {
      x: mappedX,
      y: mappedY,
    }
  });
}

window.addEventListener('click', funStuff);