const cvModal = document.getElementById('cvModal');
const cvLink = document.getElementById('cvLink');
const cvClose = document.getElementById('cvClose');
const overlay = document.getElementById('overlay');

cvLink.onclick = function () {
  cvModal.style.display = "block";
  overlay.style.display = "block";
}

cvClose.onclick = function () {
  cvModal.style.display = "none";
  overlay.style.display = "none";
}

window.onclick = function (event) {
  if (event.target.classList.contains('modal')) {
    cvModal.style.display = "none";
    overlay.style.display = "none";
  }
}

