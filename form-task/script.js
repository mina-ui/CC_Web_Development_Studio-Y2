const scaleSlider = document.getElementById('scaleSlider');
const rotateSlider = document.getElementById('rotateSlider');
const colorPicker = document.getElementById('colorPicker');
const shape = document.querySelector('.shape');
const animateBtn = document.getElementById('animateBtn');

scaleSlider.addEventListener('input', updateShape);
rotateSlider.addEventListener('input', updateShape);
colorPicker.addEventListener('input', updateShape);

animateBtn.addEventListener('click', () => {
  shape.classList.toggle('animate');
});

function updateShape() {
  const scaleValue = scaleSlider.value;
  const rotateValue = rotateSlider.value;
  const colorValue = colorPicker.value;

  shape.style.transform = `scale(${scaleValue}) rotate(${rotateValue}deg)`;
  shape.style.backgroundColor = colorValue;
}

// chatgpt helps with painting functions- my attempts didn't work completley so it helped debug, and helped me add an opacity and brush size feature
const paintCanvas = document.getElementById('paintCanvas');
const paintColor = document.getElementById('paintColor');
const brushSize = document.getElementById('brushSize');
const opacitySlider = document.getElementById('opacitySlider');
const clearCanvasBtn = document.getElementById('clearCanvas');

const i = paintCanvas.getContext('2d');
let painting = false;
let lastX = 0;
let lastY = 0;

function startPainting(event) {
  painting = true;
  lastX = event.offsetX;
  lastY = event.offsetY;
}

function stopPainting() {
  painting = false;
  i.beginPath();
}

function draw(event) {
  if (!painting) return;
  i.lineWidth = brushSize.value;
  i.lineCap = 'round';
  i.strokeStyle = paintColor.value;
  i.globalAlpha = opacitySlider.value;
  i.beginPath();
  i.moveTo(lastX, lastY);
  i.lineTo(event.offsetX, event.offsetY)
  i.stroke();
  lastX = event.offsetX;
  lastY = event.offsetY;
}

paintCanvas.addEventListener('mousedown', startPainting);
paintCanvas.addEventListener('mouseup', stopPainting);
paintCanvas.addEventListener('mousemove', draw);

clearCanvasBtn.addEventListener('click', () => {
  i.clearRect(0, 0, paintCanvas.width, paintCanvas.height);
});

