window.addEventListener('load', main);

function main() {
	const root = document.querySelector(':root');
	const style = window.getComputedStyle(root);

	const rotationInput = document.querySelector('#rotationInput');
	rotationInput.addEventListener('change', (event) => {
		const value = event.target.value;
		root.style.setProperty('--x-rotation', value);
	});

	const animateInput = document.querySelector('#animateInput');
	animateInput.addEventListener('change', () => {
		const carousel = document.querySelector('.carousel');
		if (animateInput.checked) {
			carousel.classList.add('carousel-animation');
		} else {
			carousel.classList.remove('carousel-animation');
		}
	});

	const items = document.querySelectorAll('.item');
	const count = items.length;
	root.style.setProperty('--count', count);
	for (let i = 0; i < count; i++) {
		const item = items[i];
		item.addEventListener('click', () => {
			const currentRotation = -style.getPropertyValue('--y-rotation');
			const rotation = i * (360 / count);
			const newRotation = rotate(currentRotation, rotation);
			root.style.setProperty('--y-rotation', -newRotation);
		});
	}
}

function rotate(currentRotation, rotation) {
	let newRotation = currentRotation;
	let apparentRotation = currentRotation % 360;
	if (apparentRotation < 0) {
		apparentRotation += 360;
	}

	// The original rotation is less than 180 and the new one is greater than 180.
	if (apparentRotation < 180 && rotation > apparentRotation + 180) {
		// Rotate backward.
		newRotation -= 360;
	}

	// The original rotation is over 180 and the new one is less than 180.
	if (apparentRotation >= 180 && rotation <= apparentRotation - 180) {
		// Rotate forward.
		newRotation += 360;
	}

	newRotation += rotation - apparentRotation;

	return newRotation;
}
