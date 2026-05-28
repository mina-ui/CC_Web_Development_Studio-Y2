const cvModal = document.getElementById('cvModal');
const helloModal = document.getElementById('helloModal');
const cvLink = document.getElementById('cvLink');
const helloLink = document.getElementById('helloLink');
const cvClose = document.getElementById('cvClose');
const helloClose = document.getElementById('helloClose');
const overlay = document.getElementById('overlay');

cvLink.onclick = function () {
  cvModal.style.display = "block";
  overlay.style.display = "block";
}

helloLink.onclick = function () {
  helloModal.style.display = "block";
  overlay.style.display = "block";
}

cvClose.onclick = function () {
  cvModal.style.display = "none";
  overlay.style.display = "none";
}

helloClose.onclick = function () {
  helloModal.style.display = "none";
  overlay.style.display = "none";
}

// When the user clicks anywhere outside the modal content, close the modal
// window.onclick = function(event) {
//     if (event.target.classList.contains('modal')) {
//         cvModal.style.display = "none";
//         helloModal.style.display = "none";
//         overlay.style.display = "none";
//     }
// }

//dropdown chatgpt helped for this javascript section
const filterItems = document.querySelectorAll('.dropdown-item');
const imageContainers = document.querySelectorAll('.starContainer');

filterItems.forEach(item => {
  item.addEventListener('click', function (e) {
    e.preventDefault();

    const filter = e.target.getAttribute('data-filter');

    imageContainers.forEach(container => {
      const category = container.classList.contains('category-' + filter);

      if (filter === 'all') {
        container.style.display = 'block';
      } else if (category) {
        container.style.display = 'block';
      } else {
        container.style.display = 'none';
      }
    });
  });
});

const videoContainer = document.getElementById('videoContainer');
const dreamingImage = document.getElementById('dreaming');

dreamingImage.onclick = function (event) {
  event.stopPropagation();
  if (videoContainer.style.display === "block") {
    videoContainer.style.display = "none";
  } else {
    videoContainer.style.display = "block";
  }
};

// Close the video if the user clicks anywhere outside the video container
// window.onclick = function(event) {
//   // Check if the click happened outside the video container and not on the dreaming image
//   if (!videoContainer.contains(event.target) && event.target !== dreamingImage) {
//     videoContainer.style.display = "none"; // Hide the video
//   }
// };

window.onclick = function (event) {
  if (event.target.classList.contains('modal')) {
    cvModal.style.display = "none";
    helloModal.style.display = "none";
    overlay.style.display = "none";
  }

  if (!videoContainer.contains(event.target) && event.target !== dreamingImage) {
    videoContainer.style.display = "none";
  }
}

// chatgpt helped me on getting the modals to close when you click anywhere outside not just the x button



