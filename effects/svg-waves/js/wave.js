'use strict';

function Wave(path, settings) {
	let defaultSettings = {
		container: 'body',
		height: 200,
		amplitude: 100,
		speed: 0.15,
		bones: 3,
	};

	settings = typeof settings !== 'object' ? {} : settings;
	settings = Object.assign(defaultSettings, settings);

	let width = 0;
	let height = 0;
	let lastUpdate = 0;
	let totalTime = 0;
	let animationHandle = false;
	let tween = false;

	const getPoints = function (factor) {
		const points = [];

		for (let i = 0; i <= settings.bones; i++) {
			const x = (i / settings.bones) * width;
			const sinSeed = (factor + (i + (i % settings.bones))) * settings.speed * 100;
			const sinHeight = Math.sin(sinSeed / 100) * settings.amplitude;
			const y = Math.sin(sinSeed / 100) * sinHeight + settings.height;
			points.push({ x: x, y: y });
		}

		return points;
	};

	const getPath = function (points) {
		let svg = 'M ' + points[0].x + ' ' + points[0].y;

		const cp0 = {
			x: (points[1].x - points[0].x) / 2,
			y: points[1].y - points[0].y + points[0].y + (points[1].y - points[0].y),
		};

		svg += ' C ' + cp0.x + ' ' + cp0.y + ' ' + cp0.x + ' ' + cp0.y + ' ' + points[1].x + ' ' + points[1].y;

		let prevCp = cp0;
		let inverted = -1;
		for (let i = 1; i < points.length - 1; i++) {
			//let cpLength = Math.sqrt(prevCp.x * prevCp.x + prevCp.y * prevCp.y);
			const cp1 = {
				x: points[i].x - prevCp.x + points[i].x,
				y: points[i].y - prevCp.y + points[i].y,
			};

			svg +=
				' C ' + cp1.x + ' ' + cp1.y + ' ' + cp1.x + ' ' + cp1.y + ' ' + points[i + 1].x + ' ' + points[i + 1].y;

			prevCp = cp1;
			inverted = -inverted;
		}

		svg += ' L ' + width + ' ' + height;
		svg += ' L 0 ' + height + ' Z';

		return svg;
	};

	const render = function (deltaTime) {
		totalTime += deltaTime;

		const factor = totalTime * Math.PI;
		tween = gsap.to(path, {
			attr: { d: getPath(getPoints(factor)) },
			duration: 0,
			ease: Power1.easeInOut,
		});
	};

	const update = function () {
		const now = window.Date.now();

		if (lastUpdate) {
			const deltaTime = (now - lastUpdate) / 1000; // ms
			lastUpdate = now;

			render(deltaTime);
		} else {
			lastUpdate = now;
		}
	};

	const tick = function () {
		update();
		animationHandle = window.requestAnimationFrame(tick);
	};

	const resize = function () {
		const rect = document.querySelector(settings.container).getBoundingClientRect();
		width = rect.width;
		height = rect.height;

		render(0);
	};

	const play = function () {
		if (!animationHandle) {
			const rect = document.querySelector(settings.container).getBoundingClientRect();
			width = rect.width;
			height = rect.height;

			window.addEventListener('resize', resize);
			animationHandle = window.requestAnimationFrame(tick);
		}
	};

	const pause = function () {
		if (animationHandle) {
			window.cancelAnimationFrame(animationHandle);
			animationHandle = false;
			lastUpdate = false;
		}
	};

	const stop = function () {
		pause();

		window.removeEventListener('resize', resize);

		tween.kill();
		tween = gsap.set(path, {
			x: 0,
			y: 0,
			rotation: 0,
			opacity: 0,
			clearProps: 'all',
			attr: { d: 'M0,0' },
		});
	};

	return {
		play,
		pause,
		stop,
	};
}
