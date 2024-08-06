const videoElement = document.getElementById('webcam');

async function setupCamera() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { width: window.innerWidth, height: window.innerHeight }
  });
  videoElement.srcObject = stream;
}

setupCamera();


const videoElement = document.getElementById('webcam');

async function setupCamera() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { width: window.innerWidth, height: window.innerHeight }
  });
  videoElement.srcObject = stream;
}

setupCamera();

const hands = new Hands({
  locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
});

hands.setOptions({
  maxNumHands: 1,
  minDetectionConfidence: 0.7,
  minTrackingConfidence: 0.5
});

hands.onResults((results) => {
  // Process hand gesture results here
  console.log(results);
});

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({ image: videoElement });
  },
  width: window.innerWidth,
  height: window.innerHeight
});

camera.start();


// Add to the onResults function
hands.onResults((results) => {
    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
      const landmarks = results.multiHandLandmarks[0];
      
      const indexFingerTip = landmarks[8];
      const button1 = document.getElementById('button1');
      const button2 = document.getElementById('button2');
      
      const cursorX = indexFingerTip.x * window.innerWidth;
      const cursorY = indexFingerTip.y * window.innerHeight;
  
      if (isInsideElement(cursorX, cursorY, button1)) {
        button1.style.backgroundColor = 'green';
      } else {
        button1.style.backgroundColor = 'red';
      }
  
      if (isInsideElement(cursorX, cursorY, button2)) {
        button2.style.backgroundColor = 'green';
      } else {
        button2.style.backgroundColor = 'red';
      }
    }
  });
  
  function isInsideElement(x, y, element) {
    const rect = element.getBoundingClientRect();
    return (
      x >= rect.left && x <= rect.right &&
      y >= rect.top && y <= rect.bottom
    );
  }

  
