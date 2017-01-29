var GGJ;
(function (GGJ) {

	PIXI.loader
		.add('ship_00', 'images/player/ship_00.png')
		.add('ship_01', 'images/player/ship_01.png')
		.add('ship_02', 'images/player/ship_02.png')
		.add('ship_03', 'images/player/ship_03.png')
		.add('ship_04', 'images/player/ship_04.png')
		.add('ship_05', 'images/player/ship_05.png')
		.add('ship_06', 'images/player/ship_06.png')
		.add('ship_07', 'images/player/ship_07.png')
		.add('ship_08', 'images/player/ship_08.png')
		.add('engine_00', 'images/player/engine_00.png')
		.add('engine_01', 'images/player/engine_01.png')
		.add('engine_02', 'images/player/engine_02.png')
		.add('engine_03', 'images/player/engine_03.png')
		.add('death_00', 'images/player/ship_DEATH_00.png')
		.add('death_01', 'images/player/ship_DEATH_01.png')
		.add('death_02', 'images/player/ship_DEATH_02.png')
		.add('death_03', 'images/player/ship_DEATH_03.png')
		.add('death_04', 'images/player/ship_DEATH_04.png')
		.add('death_05', 'images/player/ship_DEATH_05.png')
		.add('death_06', 'images/player/ship_DEATH_06.png')
		.add('death_07', 'images/player/ship_DEATH_07.png')
		.add('death_08', 'images/player/ship_DEATH_08.png')
		.add('death_09', 'images/player/ship_DEATH_09.png')
		.add('death_10', 'images/player/ship_DEATH_10.png')
		.add('death_11', 'images/player/ship_DEATH_11.png')
		.add('death_12', 'images/player/ship_DEATH_12.png')
		.add('death_13', 'images/player/ship_DEATH_13.png')
		.add('death_14', 'images/player/ship_DEATH_14.png')
		.add('death_15', 'images/player/ship_DEATH_15.png')
		.add('death_16', 'images/player/ship_DEATH_16.png')
		.add('death_17', 'images/player/ship_DEATH_17.png')
		.add('death_18', 'images/player/ship_DEATH_18.png')
		.add('death_19', 'images/player/ship_DEATH_19.png')
		.add('death_20', 'images/player/ship_DEATH_20.png')
		.add('death_21', 'images/player/ship_DEATH_21.png')
		.add('death_22', 'images/player/ship_DEATH_22.png')
		.add('death_23', 'images/player/ship_DEATH_23.png')
		.add('death_24', 'images/player/ship_DEATH_24.png')
		.add('death_25', 'images/player/ship_DEATH_25.png')
		.add('death_26', 'images/player/ship_DEATH_26.png')
		.add('death_27', 'images/player/ship_DEATH_27.png')
		.add('death_28', 'images/player/ship_DEATH_28.png')
		.add('death_29', 'images/player/ship_DEATH_29.png')
		.add('death_30', 'images/player/ship_DEATH_30.png')
		.add('death_31', 'images/player/ship_DEATH_31.png')
		.add('death_32', 'images/player/ship_DEATH_32.png')
		.add('death_33', 'images/player/ship_DEATH_33.png')
		.add('death_34', 'images/player/ship_DEATH_34.png')
		.add('death_35', 'images/player/ship_DEATH_35.png')
		.add('death_36', 'images/player/ship_DEATH_36.png')
		.add('death_37', 'images/player/ship_DEATH_37.png')
		.add('circle', 'images/misc/circle.png');

	var ship;
	var playerContainer;
	var engine;


	main.on('CreateControllers', function () {
		ship = new PIXI.extras.AnimatedSprite.fromImages(['ship_06', 'ship_05', 'ship_04', 'ship_01', 'ship_02']);
		engine = new PIXI.extras.AnimatedSprite.fromImages(['engine_00', 'engine_01', 'engine_02', 'engine_03']);
		explode = new PIXI.extras.AnimatedSprite.fromImages([
			'death_00',
			'death_01',
			'death_02',
			'death_03',
			'death_04',
			'death_05',
			'death_06',
			'death_07',
			'death_08',
			'death_09',
			'death_10',
			'death_11',
			'death_12',
			'death_13',
			'death_14',
			'death_15',
			'death_16',
			'death_17',
			'death_18',
			'death_19',
			'death_20',
			'death_21',
			'death_22',
			'death_23',
			'death_24',
			'death_25',
			'death_26',
			'death_27',
			'death_28',
			'death_29',
			'death_30',
			'death_31',
			'death_32',
			'death_33',
			'death_34',
			'death_35',
			'death_36',
			'death_37'
		]);
		engine.animationSpeed = 0.2;
		explode.animationSpeed = 0.17;
		explode.loop = false;
		playerContainer = new PIXI.Container();
		playerContainer.addChild(ship);
		playerContainer.addChild(explode);

		explode.gotoAndStop(0);
		explode.alpha = 0;
		ship.gotoAndStop(0);
		playerContainer.addChild(engine);
		engine.play();
		main.scrollingContainer.addChild(playerContainer);
		playerContainer.scale.x = 0.3;
		playerContainer.scale.y = 0.3;
		playerContainer.pivot.x = 128;
		playerContainer.pivot.y = 128;
		main.player = playerContainer;
		var score = 0;
		main.on('StartGame', function () {
			score = 0;
		});

		var Playing = {
			enter: function () {
				ship.alpha = 1;
				engine.alpha = 1;
				this.energy = getParameterByName('test') ? 10 : 1000;
			},
			update: function gameLoop(dt) {
				tickCount++;
				this.energy = Math.min(1000, this.energy + dt * 7);
				drawOptions.time += dt;
				main.updateScrollPosition(drawOptions.time / drawOptions.duration * drawOptions.width);
				guideBox.clear()
				if (guideBoxActive) {
					guideBoxSize += dt;
					guideBox.lineStyle(10, 0x88FFFF, 0.9);
					guideBox.beginFill(0x447777);
					guideBox.alpha = 0.1;
					guideBox.drawRect(-(guideBoxSize * 2 * drawOptions.width / drawOptions.duration), 0, (guideBoxSize * 2 * drawOptions.width / drawOptions.duration) * 2, main.height);
				}
				playerContainer.y = (Wave.line.solve(drawOptions.time + drawOptions.duration / 4) * resolutionY / 4) + resolutionY / 2;
				var ox = resolutionX * 0.28 + main.scrollOffset;
				var oy = (Wave.line.solve(drawOptions.time + drawOptions.duration * 0.28) * resolutionY / 4) + resolutionY / 2;

				var angle = Math.atan2(this.dy = oy - playerContainer.y, this.dx = ox - playerContainer.x);
				playerContainer.rotation = angle;

				//create the stream of particles

				ship.gotoAndStop(Math.round(Math.max(0, Math.min(4, 2 + angle * 2))));
				playerContainer.x = resolutionX * 0.25 + main.scrollOffset;

				Wave.line.draw(drawOptions);
				Wave.line.drawAllLines(drawOptions);
				Wave.line.tick(dt);
				Wave.line.window(drawOptions.time);
			},
			exit: function () {
				ship.alpha = 0;
				engine.alpha = 0;
			},
			hit: function (amount) {
				amount = amount || 100;
				this.energy -= amount;
				if (this.energy < 0) {
					this.energy = 0;
					this.state = 'dying';
				}
			}
		};
		Playing.press = function () {
			guideBoxActive = true;
			guideBoxSize = 0;
			startPress = Date.now();
		};
		Playing.release = function () {
			guideBoxActive = false;
			var pressDuration = ((Date.now() - startPress) / 1000);
			newWave.duration = Math.max(0.3, (1 + pressDuration * 10));
			newWave.t = (drawOptions.time + drawOptions.duration * 0.60 - newWave.duration / 4);
			newWave.amplitude = Math.min(1, 0.6 + pressDuration / 5);
			var wave = new Wave.line.Wave(newWave);
		};

		main.on("LevelReady", function () {
			player.state = "playing";
		});
		main.on('LevelComplete', function () {
			player.state = "waiting";
		});
		main.on('TimeUp', function () {
			player.state = "waiting";
		});
		main.on('HitPlayer', function (amount) {
			player.hit(amount);
		});
		var slowDown = 1;
		var Dying = {
			enter: function () {
				slowDown = 1;
				main.emitEvent("Die");
				drawOptions.graphic.clear();
				explode.alpha = 1;
				this.dy = Math.min(26, this.dy);
				this.dx = Math.min(26, this.dx);
				setTimeout(function () {
					explode.gotoAndPlay(0);
				}, 400);
			},
			update: function gameLoop(dt) {
				tickCount++;
				drawOptions.time += dt * slowDown;
				slowDown = Math.max(0, slowDown - dt / 2);
				main.updateScrollPosition(drawOptions.time / drawOptions.duration * drawOptions.width);
				playerContainer.y += this.dy * dt * slowDown * 6;
				playerContainer.x += this.dx * dt * slowDown * 6;
				Wave.line.drawAllLines(drawOptions);
				Wave.line.tick(dt);
				Wave.line.window(drawOptions.time);
				if (this.timeInState > 5000) {
					this.state = "waiting";
				}
			},
			exit: function () {
				explode.gotoAndStop(0);
				explode.alpha = 0;
				main.emitEvent('GameOver');
			}

		};

		var Waiting = {

		};

		function Player() {
			StateMachine.create(this, {
				playing: Playing,
				dying: Dying,
				waiting: Waiting
			}, "update hit press release", true);
			this.state = 'waiting';
		}

		main.on('space:press', function () {
			player.press();
		});
		main.on('space:release', function () {
			player.release();
		});

		var player = main.thePlayer = new Player();

		var playerControls = new PIXI.Container();
		main.unscaledStage.addChild(playerControls);
		var Wave = GGJ.Wave;
		var guideBoxSize = 0;
		var guide = new PIXI.Container();
		var guideLine = new PIXI.Graphics();
		var guideBox = new PIXI.Graphics();
		guide.addChild(guideBox);
		guide.addChild(guideLine);

		guideLine.moveTo(0, 0);
		guideLine.lineStyle(1, 0x00FFFF, 0.2)
		guideLine.lineTo(0, main.height);
		guide.x = resolutionX * 0.51;
		main.unscaledStage.addChild(guide);


		function setupGame() {
			line = new PIXI.Graphics();
			line.y = main.height / 2;
			playerControls.addChild(Wave.line.lines);
			Wave.line.lines.y = main.height / 2;
			playerControls.addChild(line);
		}


		setupGame();

		main.on('LevelReady', function () {
			var initialWave = new Wave.line.Wave({
				decay: 0,
				amplitude: 0.0000000001
			});

		});

		var drawOptions = {
			width: resolutionX,
			height: resolutionY / 4,
			graphic: line,
			duration: 5,
			time: 0
		};

		main.on('LevelReady', function () {
			drawOptions = {
				width: resolutionX,
				height: resolutionY / 4,
				graphic: line,
				duration: 5,
				time: 0
			};
		});

		var newWave = {
			t: 0,
			duration: 2,
			amplitude: 0.1
		};

		var startPress;
		var guideBoxActive;

		var lastTime;
		var tickCount = 0;
		main.ticks.push(function gameLoop(dt) {
			player.update(dt);
		});

	});



})(GGJ = (GGJ || {}));