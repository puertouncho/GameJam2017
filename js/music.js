var GGJ = GGJ || {}

GGJ.Music = (function () {
		var Sound = createjs.Sound;

	var sounds = {
		"title": "sounds/Sin_TitleMusic_01.mp3",
		"pickup1": "sounds/PickUP_01.mp3",
		"pickup2": "sounds/PickUP_02.mp3",
		"pickup3": "sounds/PickUP_03.mp3",
		"pickup4": "sounds/PickUP_04.mp3",
		"button1": "sounds/Button_01.wav",
		"button2": "sounds/Button_01.wav",
		"button3": "sounds/Button_01.wav",
		"button4": "sounds/Button_01.wav",
		"button5": "sounds/Button_01.wav",
		"hit": "sounds/Impact_01.mp3",
		"crash": "sounds/Crash_04.mp3",
		"lose": "sounds/Sin_LevelLose_01.mp3",
		"win": "sounds/Sin_LevelWin_01.mp3"
	};

	var playable = {

	};

	var nextPickup = 0;

	main.on('color', function () {
		play('pickup' + (((nextPickup++) % 4) + 1), false);
	});

	main.on('HitPlayer', function () {
		play("hit");
	});

	main.on("Die", function () {
		play("crash");
		setTimeout(function () {
			Sound.stop();
			play("lose");
		}, 2500);
	});

	main.on("TimeUp", function () {
		Sound.stop();
		play("lose");
	});

	var nextButton = 0;

	main.on('space:release', function () {
		play("button" + ((nextButton++ % 4) + 1));    
	});

	var soundModules = [
		{
			file: "Sin_Loop_01.mp3",
			duration: 23529
		},
		{
			file: "Sin_Loop_02.mp3",
			duration: 23040
		},
		{
			file: "Sin_Loop_03.mp3",
			duration: 22153
		},
		{
			file: "Sin_Loop_04.mp3",
			duration: 20571
		},
		{
			file: "Sin_Loop_05.mp3",
			duration: 19862
		},
		{
			file: "Sin_Loop_06.mp3",
			duration: 19200
		}

	];

	_.forEach(sounds, function (path, id) {
		var resolve
		var promise = new Promise(function (resolver) {
			resolve = resolver;
		});
		sounds[id] = {
			promise: promise,
			resolve: resolve
		};
		Sound.registerSound(path, id);
	});


	_.forEach(soundModules, function (module, index) {
		var resolve;
		module.id = "module" + (index+1);
		var promise = new Promise(function (resolver) {
			resolve = resolver;
		});
		sounds["module" + index] = {
			promise: promise,
			resolve: resolve
		};

		Sound.registerSound("sounds/" + module.file, "module" + index);
	});

	
	
	function play(sound, loop, volume) {
		volume = volume || 1;
		try {
		return sounds[sound].promise.then(function () {
			var s = playable[sound] = playable[sound] || Sound.createInstance(sound);
			s.stop();
			s.play({ loop: loop ? -1 : 0, volume: volume });
			return s;
		});
		} catch(e) {
			console.error("Error in ", sound, e)
		}
	}

	Sound.on('fileload', function (file) {
		try {
			sounds[file.id].resolve();
		} catch (e) {
			
		}	
	});
	main.on('TitleScreen', function () {
		Sound.stop();
		play('title', true);
		console.log("Played");
	});

	main.on('LevelReady', function () {
		Sound.stop();
		playMusic();
	});
	var lastModule = null;
	function playMusic() {
		
		var stress = (Math.max(0, 100 - (main.gameTime||0)) / 3) + (1000 - (main.player.energy||0)) / 200;
		stress = Math.max(1, Math.min(stress - 3, 5));
		var id;
		var availableModules = soundModules.filter(function (m) { return m != lastModule });
		var module = availableModules[id = randomInt(Math.max(0, stress - 3), Math.min(availableModules.length, stress))];
		lastModule = module;
		play(module.id, false, 0.8).then(function (sound) {
			lastModule.sound = sound;
		});
		console.log(module.id);
		setTimeout(playMusic, module.duration);
	}

	return {
		play: play
	}

})();