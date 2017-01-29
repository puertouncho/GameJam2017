var GGJ = GGJ || {}

GGJ.CameraController = (function () {
	
	main.ticks.push(function (dt) {
		var target = 0;
		var difference = resolutionY / 2 - main.player.y;
		target = difference;
		main.master.y = lerp(main.master.y, target, dt * 2.2);


	});

})();