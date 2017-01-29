var GGJ;
var SECTION_REPEAT = 20
var WIDTH_OF_COLUMN = 60;
var COLLISION_RADIUS_SQ = 64 * 64;
var EXPLODE_RADIUS_SQ = 60 * 60;
var DEFAULT_WIN_PERCENT = 0.50;

(function (GGJ) {

	function distanceSq(pt1, pt2) {
		var dx = (pt1.x - pt2.x);
		var dy = (pt1.y - pt2.y);
		return dx * dx + dy * dy;
	}

	function monkeypatch(f1, f2) {
		return function () {
			var output1, output2
			if (typeof f1 == "function") output1 = f1.apply(this, arguments)
			if (typeof f2 == "function") output2 = f2.apply(this, arguments)

			//make compatible w/ event handler `return false` behavior
			return output1 === false || output2 === false ? false : undefined
		}
	}

	PIXI.loader
		.add('pickup_0', 'images/pickup/pick_up_0.png')
		.add('pickup_1', 'images/pickup/pick_up_1.png')
		.add('pickup_2', 'images/pickup/pick_up_2.png')
		.add('pickup_3', 'images/pickup/pick_up_3.png')
		.add('block', 'images/obstacles/block.png');

	var lookup = {
		"*": Pickup,
		"B": Block
	};

	var pickupColors = [
		0xFFFFFF, 0xFF6666, 0x66FF55, 0x5555FF, 0x5588FF, 0x88FF55
	];


	var levelContainer = new PIXI.Container();
	main.scrollingContainer.addChild(levelContainer);


	main.pickupColors = pickupColors;

	var maxAllocated = 0;	
	var activeSources = [];
	var gems = 0;
	var colors = [];

	main.on('StartGame', function (difficulty) {
		main.emitEvent('CreateLevel', [difficulty || 1]);
		
	});

	var level = [];
	var nextSource = 0;
	var collected = 0;
	main.gameTime = 0;
	var winPercent = DEFAULT_WIN_PERCENT;

	main.on('CreateLevel', function (difficulty) {
		difficulty = Math.max(1, difficulty || 1);
		try {
			localStorage.setItem('level', +difficulty);
			main.difficulty = +difficulty;
		} catch (e) {
			
		}
		maxAllocated = 0;
		collected = 0;
		activeSources = [];
		gems = 0;
		colors = [];
		for (var i = 0; i < pickupColors.length; i++) {
			colors.push(0);
		}
		main.colorCount = colors;
		levelContainer.removeChildren();
		level = [];
		nextSource = 0;
		var numberOfSections = Math.max(2, Math.min(4, 1 + difficulty));
		var sections = GGJ.Sections.filter(function (section) {
			return (section.difficulty || 1) <= difficulty
		});
		maxAllocated = 0;
		main.gameTime = numberOfSections * 30;
		for (var i = 0; i < numberOfSections; i++) {
			var section = sections[randomInt(0, sections.length)];
			var source = section.source[section.next++ % section.source.length];
			if(i > 0) {
				source.label.text = "SECTION " + (i+1);
			}
			level.push({ width: section.width, source: source });
			source.deactivated();
			source.activated();
			source.x = maxAllocated;
			maxAllocated += section.width;
			levelContainer.addChild(source);

		}
		main.remainingGems = Math.min(+main.difficulty * 40 + 50, Math.floor(gems * winPercent));
		main.emitEvent('LevelReady');
	});

	main.on('color', function () {
		collected++;
		main.remainingGems =Math.min(+main.difficulty * 40 + 50, Math.floor(gems * winPercent)) - collected;
		if (collected >= Math.min(+main.difficulty * 40 + 50, Math.floor(gems * winPercent))) {
			main.emitEvent('LevelComplete');
		}
	});	

	main.ticks.push(function (dt) {
		if (!level.length) return;
		main.gameTime = Math.max(0, main.gameTime - dt);
		if (main.gameTime == 0) {
			main.emitEvent('TimeUp');
		}
		//Ever tick see if we need to get another set of collectables
		var windowEnd = main.scrollOffset + innerWidth;
		while (windowEnd + 100 > maxAllocated) {
			var next = level[nextSource++ % level.length];
			next.source.x = maxAllocated;
			maxAllocated += next.width;
		}
		level.forEach(function(section) {
			section.source.tick(dt);
		})
	});	


	var working = new PIXI.Point();
	var working2 = new PIXI.Point();

	function Pickup(container, column, row) {
		var sprite = new PIXI.extras.AnimatedSprite.fromImages(['pickup_0', 'pickup_1', 'pickup_2', 'pickup_3'])
		container.pickups = container.pickups || {};
		var pickupType = randomInt(0, pickupColors.length);
		container.pickups[pickupType] = (container.pickups[pickupType] || 0) + 1;
		sprite.tint = pickupColors[pickupType];
		sprite.animationSpeed = 0.3;
		sprite.pivot.x = 64;
		sprite.pivot.y = 64;
		sprite.scale.x = 0.5;
		sprite.scale.y = 0.5;
		sprite.y = -resolutionY/2 + row * resolutionY*2 / 25;
		sprite.x = column * WIDTH_OF_COLUMN;
		var rate = Math.random() / 2 + 0.7;

		container.activated = monkeypatch(container.activated, function () {
			sprite.play();
			sprite.alpha = 1;
			gems++;
			colors[pickupType] = (colors[pickupType] || 0) + 1;
		});
		container.deactivated = monkeypatch(container.deactivated, function () {
			sprite.stop();
		});
		container.tick = monkeypatch(container.tick, function (dt) {
			sprite.rotation += dt * Math.PI * rate;
			working.x = sprite.x + container.x;
			working.y = sprite.y + container.y;
			if (sprite.alpha && distanceSq(working, main.player) < COLLISION_RADIUS_SQ) {
				sprite.alpha = 0;
				main.emitEvent('score', [100]);
				main.emitEvent('color', [pickupType]);
				dust.create(working.x, working.y, function () {
					var particle = new PIXI.Sprite.fromImage('pickup_0');
					particle.tint = sprite.tint;
					return particle;
				}, main.scrollingContainer, 35, 0.05, true, 0, 6.28, 13, 30, 1, 5, 0.001, 0.002, 0.005, 0.008);
			}
		});

		container.addChild(sprite);
	}

	function Block(container, column, row) {
		var sprite = new PIXI.Sprite.fromImage('block');
		sprite.y = -resolutionY/2 + row * resolutionY*2 / 25;
		sprite.x = column * WIDTH_OF_COLUMN;
		sprite.scale.x = 0.5;
		sprite.pivot.x = 50;
		sprite.pivot.y = 50;
		sprite.scale.y = 0.5;
		
		container.tick = monkeypatch(container.tick, function (dt) {
			working.x = sprite.x + container.x;
			working.y = sprite.y + container.y;
			if (!sprite.wasHit && distanceSq(working, main.player) < EXPLODE_RADIUS_SQ) {
				sprite.wasHit = true;
				setTimeout(function () { sprite.wasHit = false }, 500);
				main.emitEvent('HitPlayer', [100]);
				dust.create(working.x, working.y, function () {
					var particle = new PIXI.Sprite.fromImage('circle');
					return particle;
				}, main.scrollingContainer, 50, 0.05, true, 0, 6.28, 33, 60, 1, 5, 0.001, 0.002, 0.005, 0.008)
			}
		});

		container.addChild(sprite);
	}


	main.on('CreateControllers', function () {
		GGJ.Sections.forEach(function (section) {
			var source = section.source = []
			section.next = 0
			for (var i = 0; i < SECTION_REPEAT; i++) {
				(function (i) {
					
					var holder = new PIXI.Container();
					var sectionStart = new PIXI.Container();
					var bar = new PIXI.Graphics();
					bar.beginFill(0xFFFFFF, 0.2);
					bar.drawRect(-40,-resolutionY/2,80,resolutionY*2);
					var label = holder.label = new PIXI.Text("START", {
						font: '26px "Press Start 2P"',
						fill: "#ccc"
					});
					label.rotation = Math.PI/2;
					label.alpha = 0.7;
					label.y = resolutionY /2 - 320;
					label.x = 15;
					sectionStart.addChild(bar);
					sectionStart.addChild(label);
					holder.addChild(sectionStart);
					holder.$index = i;
					holder.activated = function () {
						// console.log("Section was activated", holder.$index, holder, section);
					};
					holder.deactivated = function () {
						// console.log("Section was deactivated", holder.$index, holder, section);
					};
					holder.tick = function (dt) {
						
					}
					section.height = section.length;
					section.definition.forEach(function (row, y) {
						section.width = row.length * WIDTH_OF_COLUMN;
						for (var x = 0; x < row.length; x++) {
							var fn = lookup[row.charAt(x)];
							if (fn) {
								fn(holder, x, y);
							}
						}
					});
					source.push(holder);
				})(i);
					
			}
		})
	})

	GGJ.Sections = [

		{
			difficulty: 1,
			name: "Gentle",
			definition: [
				"                                                               ",
				"                                                               ",
				"                                                               ",
				"                                                               ",
				"                      **               **             **       ",
				"                      **               **             **       ",
				"                      **       **      **      **     **       ",
				"                      **       **      **      **     **       ",
				"                      **       **      **      **     **       ",
				"                      **               **             **       ",
				"                      **               **             **       ",
				"                                                               ",//middle line
				"                                                               ",
				"              **               **             **               ",
				"              **               **             **               ",
				"              **       **      **      **     **               ",
				"              **       **      **      **     **               ",
				"              **       **      **      **     **               ",
				"              **               **             **               ",
				"              **               **             **               ",
				"              **               **             **               ",
				"                                                               ",
				"                                                               ",
				"                                                               ",
				"                                                               "


			]
		},

		{
			difficulty: 1,
			name: "Spikey",
			definition: [
				"                                                               ",
				"                                                               ",
				"               *                    *                          ",
				"              ***                  ***                         ",
				"             ** **                ** **                        ",
				"            ** * **              ** * **                       ",
				"           ** * * **            ** * * **                      ",
				"          **       **          **       **                     ",
				"         **         **        **         **                    ",
				"        **           **      **           **                   ",
				"                                                               ",
				"                                                               ",//middle line
				"                                                               ",
				"                **           **      **           **           ",
				"                 **         **        **         **            ",
				"                  **       **          **       **             ",
				"                   ** * * **            ** * * **              ",
				"                    ** * **              ** * **               ",
				"                     ** **                ** **                ",
				"                      ***                  ***                 ",
				"                       *                    *                  ",
				"                                                               ",
				"                                                               ",
				"                                                               ",
				"                                                               "

			]
		},


		{
			difficulty: 1,
			name: "GGJ17",
			definition: [
 
				"                                                               ",
				"                                                               ",
				"                                                               ",
				"                                                               ",
				"                                        *                      ",
				"            *******   *******  *******  *    ***   *******     ",
				"            *     *   *     *        *      *  *         *     ",
				"            *         *              *     *   *       *       ",
				"            *   ***   *   ***  *     *         *      *        ",
				"            *     *   *     *  *     *         *     *         ",
				"            ***** *   *******    *****         *    *          ",
				"                                                               ",//middle line
				"                                                               ",
				"            *     *  *******  *        *        *******   *    ",
				"            *     *  *        *        *        *     *   *    ",
				"            *     *  *        *        *        *     *   *    ",
				"            *******  *****    *        *        *     *   *    ",
				"            *     *  *        *        *        *     *   *    ",
				"            *     *  *        *        *        *     *        ",
				"            *     *  *******  *******  *******  *******   *    ",
				"                                                               ",
				"                                                               ",
				"                                                               ",
				"                                                               ",
				"                                                               "


			]
		},


		{
			difficulty: 1,
			name: "Transit",
			definition: [

				"                                                               ",
				"                                                               ",
				"                      *********                                ",
				"                     ***********                               ",
				"                    *************                              ",
				"     *****         **           **                             ",
				"     *****        **             **             *****          ",
				"     *****       **               **            *****          ",
				"     *****      **                 **           *****          ",
				"               **                   **          *****          ",
				"              **                     **                        ",
				"             **                       **                       ",
				"          *****                       ****                     ",//middle line
				"              **                     **                        ",
				"     *****     **                   **          *****          ",
				"     *****      **                 **           *****          ",
				"     *****       **               **            *****          ",
				"     *****        **             **             *****          ",
				"                   **           **                             ",
				"                    *************                              ",
				"                     ***********                               ",
				"                      *********                                ",
				"                                                               ",
				"                                                               ",
				"                                                               "


			]
		},

		{
			difficulty: 1,
			name: "Smile",
			definition: [

				"                                                               ",
				"                                                               ",
				"                                                               ",
				"                        ****************                       ",
				"                       *******************                     ",
				"                     **                   **                   ",
				"                    **                     **                  ",
				"                   **                       **                 ",
				"                  **      ***       ***      **                ",
				"                  **      ***       ***      **                ",
				"                  **      ***       ***      **                ",
				"                  **                         **                ",//middle line
				"                  **                         **                ",
				"                  **    *               *    **                ",
				"                  **    ***           ***    **                ",
				"                  **     ***************     **                ",
				"                   **     *************     **                 ",
				"                    **                     **                  ",
				"                     ***********************                   ",
				"                      ********************                     ",
				"                                                               ",
				"                                                               ",
				"                                                               ",
				"                                                               ",
				"                                                               "


			]
		},

		{
			difficulty: 1,
			name: "Gem Pile",
			definition: [
				"                                                               ",
				"                                                               ",
				"                                                               ",
				"                                                               ",
				"          *************                                        ",
				"          *************                                        ",
				"          *************                                        ",
				"          *************                                        ",
				"          *************                                        ",
				"          *************                                        ",
				"                                                               ",//middle line
				"                                                               ",
				"                                                               ",
				"                                   *************               ",
				"                                   *************               ",
				"                                   *************               ",
				"                                   *************               ",
				"                                   *************               ",
				"                                   *************               ",
				"                                                               ",
				"                                                               ",
				"                                                               ",
				"                                                               ",
				"                                                               ",
				"                                                               "


			]
		},

		{
			difficulty: 2,
			name: "Curve",
			definition: [

				"                                                               ",
				"             ****                                              ",
				"            *******                                            ",
				"           **     **                                           ",
				"          **   B   **                     B                    ",
				"         **    B    **                    B                    ",
				"        **           **                   B                    ",
				"       **             **                                       ",
				"      **               **                                      ",
				"     **                 **                                     ",
				"    **                   **                                    ",
				"   **                     **                         **        ",//middle line
				"                           ****                     **         ",
				"                            *****                  **          ",
				"                               ****               **           ",
				"                                  **             **            ",
				"               B                   **           **             ",
				"               B                    **    B    **              ",
				"               B                     **   B   **               ",
				"                                      **     **                ",
				"                                       *******                 ",
				"                                        *****                  ",
				"                                                               ",
				"                                                               ",
				"                                                               "


			]
		},


		{
			difficulty: 2,
			name: "Gaps",
			definition: [

				"                                                               ",
				"                                                               ",
				"                                                               ",
				"                             ***                               ",
				"                             ***                               ",
				"                                                               ",
				"                                                               ",
				"                                                               ",
				"                                                               ",
				"                             ****                              ",
				"             ****            ****            ****              ",
				"       B     ****      B     ****      B     ****      B       ",//middle line
				"             ****            ****            ****              ",
				"                             ****                              ",
				"                                                               ",
				"                                                               ",
				"                                                               ",
				"                             ***                               ",
				"                             ***                               ",
				"                                                               ",
				"                                                               ",
				"                                                               ",
				"                                                               ",
				"                                                               ",
				"                                                               "


			]
		},

		{
			difficulty: 2,
			name: "Walls",
			definition: [

				"                                                 B             ",
				"                                                 B             ",
				"                                                 B             ",
				"                           B                     B             ",
				"                           *                   *****           ",
				"                          ***                  *****           ",
				"                         *****                   B             ",
				"                        *******                  B             ",
				"                       **********                B             ",
				"                                                 B             ",
				"                                                               ",
				"                                                               ",//middle line
				"                                                               ",
				"                            B                                  ",
				"                            B               ***********        ",
				"                            B                *********         ",
				"                            B                 *******          ",
				"                            B                  *****           ",
				"                          *****                 ***            ",
				"                          *****                  *             ",
				"                            B                    B             ",
				"                            B                                  ",
				"                            B                                  ",
				"                            B                                  ",
				"                                                               "


			]
		},

		{
			difficulty: 2,
			name: "Corridor",
			definition: [

				"                                                               ",
				"        BBB                BBB           BBB                   ",
				"        BBB                BBB           BBB                   ",
				"        BBB                BBB           BBB                   ",
				"        BBB                BBB           BBB      *****        ",
				"        *B*                *B*           *B*      *****        ",
				"        ***                ***           ***      *****        ",
				"        ***                ***           ***      *****        ",
				"        ***                ***           ***                   ",
				"        ***                ***           ***                   ",
				"        ***                ***           ***                   ",
				"        ***                ***           ***                   ",//middle line
				"        ***                ***           ***                   ",
				"        ***                ***           ***                   ",
				"        ***                ***           ***      *****        ",
				"        ***                ***           ***      *****        ",
				"        *B*                *B*           *B*      *****        ",
				"        BBB                BBB           BBB      *****        ",
				"        BBB                BBB           BBB                   ",
				"        BBB                BBB           BBB                   ",
				"        BBB                BBB           BBB                   ",
				"                                                               ",
				"                                                               ",
				"                                                               ",
				"                                                               "


			]
		},


		{
			difficulty: 2,
			name: "Rich",
			definition: [

				"                                                               ",
				"                                                               ",
				"                                                               ",
				"                                                               ",
				"                                                               ",
				"           ***************************************             ",
				"                                                               ",
				"         ***       *********       ********       **           ",
				"        **** BBBBB ********* BBBBB ******** BBBBB ***          ",
				"        **** BBBBB ********* BBBBB ******** BBBBB ***          ",
				"        ****       *********       ********       ***          ",
				"                                                               ",//middle line
				"                                                               ",
				"        ************       *********       **********          ",
				"        ************ BBBBB ********* BBBBB **********          ",
				"        ************ BBBBB ********* BBBBB **********          ",
				"         ***********       *********       *********           ",
				"                                                               ",
				"           ***************************************             ",
				"                                                               ",
				"                                                               ",
				"                                                               ",
				"                                                               ",
				"                                                               ",
				"                                                               "


			]
		},

		{
			difficulty: 3,
			name: "Centre",
			definition: [

				"                                                               ",
				"                                                               ",
				"                                                               ",
				"                                                               ",
				"                    ****************                           ",
				"             BBB                         BBB                   ",
				"             BBB  ********************   BBB                   ",
				"             BBB **********************  BBB                   ",
				"                ************************                       ",
				"                                                               ",
				"              ********     BBB    ********                     ",
				"             *********     BBB    *********                    ",//middle line
				"                                                               ",
				"               **************************                      ",
				"             BBB *********************** BBB                   ",
				"             BBB                      *  BBB                   ",
				"                   *******************                         ",
				"                                                               ",
				"                                                               ",
				"                                                               ",
				"                                                               ",
				"                                                               ",
				"                                                               ",
				"                                                               "


			]
		},


		{
			difficulty: 3,
			name: "Tunnel Vision",
			definition: [

				"   BBBB                                      B                 ",
				"      BBBB                                   B                 ",
				"         BBBBB                               B                 ",
				"             BBBB                            B                 ",
				"                BBBB                         B                 ",
				"                   BBBB                      B   *             ",
				"                      BBBB                   B   **            ",
				"                         BBBB                B   ***           ",
				"                            BBBBBBBBBBBBBBBBBB   ****          ",
				"                                                 *****         ",
				"    ***************************************************        ",
				"    ****************************************************       ",//middle line
				"    ***************************************************        ",
				"                                                 *****         ",
				"                            BBBBBBBBBBBBBBBBBB   ****          ",
				"                         BBBB                B   ***           ",
				"                      BBBB                   B   **            ",
				"                   BBBB                      B   *             ",
				"                BBBB                         B                 ",
				"             BBBB                            B                 ",
				"          BBBB                               B                 ",
				"       BBBB                                  B                 ",
				"    BBBB                                     B                 ",
				"  BBB                                        B                 ",
				"                                                               "


			]
		},


		{
			difficulty: 3,
			name: "V's",
			definition: [

				"         BBBBBBBBBBBBBBBB     **      BBBBBBBBBBBBBBB          ",
				"          BBBBBBBBBBBBBB     ****      BBBBBBBBBBBBB           ",
				"           BBBBBBBBBBB      ******      BBBBBBBBBBB            ",
				"            BBBBBBBBB      ********      BBBBBBBBB             ",
				"             BBBBBBB      **********      BBBBBBB              ",
				"              BBBBB      ************      BBBBB               ",
				"               BBB      **************      BBB                ",
				"                B      ****************      B                 ",
				"                                                               ",
				"                                                               ",
				"                                                               ",
				"                                                               ",//middle line
				"                                                               ",
				"                                                               ",
				"                                                               ",
				"                                                               ",
				"       *********************    B    ********************      ",
				"        *******************    BBB    *****************        ",
				"         *****************    BBBBB    ***************         ",
				"          ***************    BBBBBBB    *************          ",
				"           *************    BBBBBBBBB    ***********           ",
				"            ***********    BBBBBBBBBBB    *********            ",
				"             *********    BBBBBBBBBBBBB    *******             ",
				"              *******    BBBBBBBBBBBBBBB    *****              ",
				"               *****    BBBBBBBBBBBBBBBBB    ***               "


			]
		},
    
		{
			difficulty: 3,
			name: "Blocka Nova",
			definition: [

				"   ***              ****       BB                ******        ",
				"   ***     BB       ****       BB                ******        ",
				"   ***     BB       ****                         ******        ",
				"                                *****     BBBBB                ",
				"                                *****     BBBBB                ",
				"        *******                 *****     BBBBB   ******       ",
				"        *******            BBB            BBBBB   ****** BBB   ",
				"        *******            BBB                    ****** BBB   ",
				"                           BBB                                 ",
				"                                       ******                  ",
				"                                       *****                   ",
				"                                       *****                   ",//middle line
				"                                                               ",
				"                          ********              BB             ",
				"            BBBBB         ********              BB             ",
				"            BBBBB         ********                             ",
				"  BB        BBBBB                                              ",
				"  BB        BBBBB       BBB                                    ",
				"            BBBBB       BBB                        ******      ",
				"      ***********       BBB                        *******     ",
				"      ***********             ******   BBBB        ******      ",
				"      ***********             ******   BBBB        *****       ",
				"                 BB           ******   BBBB                    ",
				"                 BB                    BBBB                    ",
				"                                                               "


			]
		},

		{
			difficulty: 3,
			name: "Good Luck!",
			definition: [

				"                                                               ",
				"                         B             B                       ",
				"                         B             B                       ",
				"                         B             B                       ",
				"                         B             B                       ",
				"                         B             B                       ",
				"                         B             B                       ",
				"                                                               ",
				"                       ********     ********                   ",
				"                   B    ******   B   ******   B                ",
				"                  BBB    ****   BBB   ****   BBB               ",
				"                 BBBBB    **   BBBBB   **   BBBBB             ",//middle line
				"                  BBB    ****   BBB   ****   BBB               ",
				"                   B    ******   B   ******   B                ",
				"                       ********     *******                    ",
				"                                                               ",
				"                                                               ",
				"                         B             B                       ",
				"                         B             B                       ",
				"                         B             B                       ",
				"                         B             B                       ",
				"                         B             B                       ",
				"                         B             B                       ",
				"                                                               ",
				"                                                               "


			]
		}



	];



})(GGJ = GGJ || (GGJ = {}));