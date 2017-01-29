var GGJ = GGJ || {};
var NUMBER_TO_COLLECT = 100;

(function () {

	main.on('CreateControllers', function () {
		var score = 0;
		var pickups = [];
		var scores = new PIXI.Container();
		scores.x = 0;
		var pickupScores = [];
		var pickupIndicators = [];


		main.on("LevelReady", function () {
			var shieldAmount = 0;
			scores.removeChildren();
			score = 0;
			var text = new PIXI.Text("00000000", {
				font: '16px "Press Start 2P"',
				fill: 'lightgreen'
			});

			var label = new PIXI.Text("SCORE", {
				font: '16px "Press Start 2P"',
				fill: "green"
			});

			scores.addChild(text);
			text.x = resolutionX * 0.515;
			text.y = innerHeight * 0.01;
			scores.addChild(label);
			label.align = 'right';
			label.y = text.y;
			label.x = text.x - 87;


			var shieldContainer = new PIXI.Container();
			var shieldGraphic = new PIXI.Graphics();
			shieldContainer.rotation = Math.PI / 2;
			shieldContainer.x = label.x + 66;
			shieldContainer.y = main.height - 350;
			shieldContainer.addChild(shieldGraphic);
			var shieldLabel = new PIXI.Text("Shield", {
				font: "25px 'Press Start 2P'",
				color: 'black'
			})
			shieldLabel.x = 28;
			shieldLabel.y = 12;
			shieldContainer.addChild(shieldLabel);
			scores.addChild(shieldContainer);

			var timeLabel = new PIXI.Text("", {
				font: "30px 'Press Start 2P'",
				fill: '#eeeeee'
			});
			timeLabel.x = 210;
			timeLabel.y = 10;
			shieldContainer.addChild(timeLabel);

			var distance = new PIXI.Text("0.0um", {
				font: '10px "Press Start 2P"',
				fill: "green"
			});

			distance.y = main.height * 0.75;
			distance.x = text.x + 10;
			distance.rotation = Math.PI / 2;

			var waves = new PIXI.Text("0", {
				font: '10px "Press Start 2P"',
				fill: "lightgreen"
			});

			waves.x = distance.x;
			waves.y = distance.y - 160;
			waves.rotation = Math.PI / 2;

			pickups = [];
			pickupScores = [];
			pickupIndicators = [];
			for (var i = 0; i < main.pickupColors.length; i++) {
				var scoreLbl = new PIXI.Text("0/" + main.colorCount ? main.colorCount[i] : 0, {
					font: '12px "Press Start 2P"',
					fill: "green"
				});
				var scoreIndicator = new PIXI.Text("█", {
					font: '12px "Press Start 2P"',
					fill: main.pickupColors[i]
				});
				scoreIndicator.alpha = 0.3;
				pickups.push(0);
				scoreLbl.anim = {
					alpha: 0.3
				};
				scoreLbl.x = text.x;
				scoreLbl.alpha = 0.3;
				scoreLbl.y = text.y + 50 + i * 15;
				scoreIndicator.y = scoreLbl.y;
				scoreIndicator.x = scoreLbl.x - 28;
				pickupIndicators.push(scoreIndicator);
				pickupScores.push(scoreLbl);
				scores.addChild(scoreIndicator);
				scores.addChild(scoreLbl);
			}

			var gemLabel = new PIXI.Text("", {
				font: "25px 'Press Start 2P'",
				fill: "#cccccc"
			});

			scores.addChild(gemLabel);
			gemLabel.y = scoreLbl.y + 24;
			gemLabel.x = scoreLbl.x;

			scores.addChild(distance);
			scores.addChild(waves);

			main.ticks.push(function (dt) {
				distance.text = "DISTANCE: " + (main.scrollOffset / 250).toFixed(1) + "um";
				waves.text = "ACT. WAVES: " + (main.waves - 1);
				shieldGraphic.clear();
				var color = main.thePlayer.energy < 250 ? 0xFFAAAA : 0xAAFFAA;
				shieldGraphic.beginFill(color, 0.3);
				shieldGraphic.drawRect(0, 0, 200, 50);
				shieldGraphic.beginFill(color, 0.7);
				shieldAmount = lerp(shieldAmount, main.thePlayer.energy, dt * 2);
				shieldGraphic.drawRect(0, 0, 200 * (shieldAmount / 1000), 50);
				timeLabel.text = main.gameTime.toFixed(0) + "s";
				gemLabel.text = Math.floor(main.remainingGems.toFixed(0));

			});

			main.on('score', function (amount) {
				score = ("00000000" + (+score + amount)).slice(-8);
				text.text = score
				main.score = +score;

			});
			main.on('color', function (color) {
				pickups[color] = Math.min(main.colorCount[color], 1 + pickups[color]);
				pickupScores[color].text = "" + pickups[color] + "/" + main.colorCount[color];
				dynamics.animate(pickupScores[color].anim, {
					alpha: 1
				}, {
					type: dynamics.linear,
					change: function () {
						pickupScores[color].alpha = pickupIndicators[color].alpha = pickupScores[color].anim.alpha
					},
					complete: function () {
						dynamics.animate(pickupScores[color].anim, {
							alpha: pickups[color] == main.colorCount[color] ? 1 : 0.3
						}, {
							change: function () {
								pickupScores[color].alpha = pickupIndicators[color].alpha = pickupScores[color].anim.alpha
							},
							type: dynamics.linear
						});
					}
				});
			});

		});

		main.outer.addChild(scores);

	});



})();