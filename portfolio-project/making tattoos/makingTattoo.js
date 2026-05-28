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

const div1 = document.getElementById("div1");
const div2 = document.getElementById("div2");
const div3 = document.getElementById("div3");
const div4 = document.getElementById("div4");

// chatgpt helped me understand in js you have to have them seperate, can't be like css (#div1, #div2...)
dragElement(div1);
dragElement(div2);
dragElement(div3);
dragElement(div4);

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}


