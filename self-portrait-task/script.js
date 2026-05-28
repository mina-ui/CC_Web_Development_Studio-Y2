var element = document.querySelector(".door");
element.addEventListener("click", toggleDoor);

function toggleDoor() {
  element.classList.toggle("doorOpen");
}

document.addEventListener('mousemove', (event) => {
    const hue = (event.clientX + event.clientY) % 360; // Calculate hue based on mouse position
    document.body.style.backgroundColor = `hsl(${hue}, 70%, 70%)`; // Set background color
  });

