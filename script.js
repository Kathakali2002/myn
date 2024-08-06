// Get the canvas element
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Request webcam access
navigator.mediaDevices.getUserMedia({ video: true })
	.then(stream => {
		// Create a video element and set the stream as its source
		const video = document.createElement('video');
		video.srcObject = stream;
		video.play();
		video.style.display = 'block';
		canvas.width = video.videoWidth;
		canvas.height = video.videoHeight;

		// Set up hand tracking
		const handTracker = new Handtrack({
			// Use the video element as the input
			input: video,
			// Set the canvas as the output
			output: canvas,
			// Configure hand tracking settings
			settings: {
				detectionConfidence: 0.5,
				trackingConfidence: 0.5,
			},
		});

		// Handle hand tracking results
		handTracker.on('handTrackingResults', (results) => {
			// Draw a circle at the tip of the index finger
			if (results.handInViewConfidence > 0.5) {
				const fingerTip = results.fingerTips[0];
				ctx.beginPath();
				ctx.arc(fingerTip.x, fingerTip.y, 10, 0, 2 * Math.PI);
				ctx.fillStyle = 'red';
				ctx.fill();
			}
		});
	})
	.catch(error => console.error('Error accessing webcam:', error));
