async function initMirror() {
    try {
        const video = document.getElementById('camera-feed');
        const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
                facingMode: 'user'
            }
        });
        video.srcObject = stream;
    } catch (err) {
        console.error('Error accessing camera:', err);
    }
}

window.addEventListener('load', initMirror);