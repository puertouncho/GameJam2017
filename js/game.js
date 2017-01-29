/// <reference path="../defs/pixi.js.d.ts" />
var resolutionX = 1363;
var resolutionY = 768;
var dust = new Dust(PIXI);
var isShipCollision = false;
var shipObject = null;

var GGJ;
(function (GGJ) {


    var Main = (function () {

        window.addEventListener('load', function () {
            PIXI.loader.load(main.CreateControllers.bind(main));
            var spaceKey = keyboard(32);
            spaceKey.press = function () {
                main.emitEvent('space:press');
            }
            spaceKey.release = function () {
                main.emitEvent('space:release');
            }


        });

        var canTick = false;

        var lastTime;

        function Main() {
            StateMachine.create(this, {
                playing: Playing,
                waiting: Waiting
            }, "render", true);
            this.speed = 1;
            this.ticks = [];
            this.outer = new PIXI.Container();
            //This will scroll vertically
            this.master = new PIXI.Container();
            this.outer.addChild(this.master);
            this.unscaledStage = new PIXI.Container();
            this.stage = new PIXI.Container();
            this.backStage = new PIXI.Container();
            this.stage.addChild(this.backStage);
            this.playerStage = new PIXI.Container();
            this.master.addChild(this.stage);
            this.master.addChild(this.unscaledStage);
            this.master.addChild(this.playerStage);

            this.RenderLoop = this.RenderLoop.bind(this);
        }


        var Playing = {
            render: function (time) {
                //Make a simple tick duration that isn't too precise!
                var dt = Math.floor(10000 * Math.min(this.speed * (lastTime ? time - lastTime : 0) / 1000, 0.1)) / 10000;
                lastTime = time;
                if (canTick) {
                    this.ticks.forEach(function (tick) {
                        try {
                            tick(dt);
                        } catch (e) {
                            console.error("Error in tick", tick, e.stack);
                        }
                    });
                };
                dust.update();
                this.renderer.render(this.outer);
            }
        };

        var Waiting = {
            enter: function () {
                var ui = document.querySelector('#ui');
                ui.style.display = "block";
            },
            exit: function () {
                var ui = document.querySelector('#ui');
                ui.style.display = "none";
            }
        };

        heir.inherit(Main, EventEmitter);
        Main.prototype.Start = function () {
            this.CreateRenderer();
            this.Loader();
            if (!getParameterByName('other')) {

            }
        };
        Main.prototype.CreateControllers = function () {
            if (!getParameterByName('other')) {
                //var obstacleController = new GGJ.ObstacleController();
                //this.stage.addChild(obstacleController);

                //this.ticks.push(function loop(dt) {
                //  obstacleController.Loop(dt);
                //});

                var bgController = new GGJ.Background();
                this.ticks.push(bgController.tick);
                this.stage.addChild(bgController);
                bgController.InitialTiles();
            }
            this.emitEvent('CreateControllers', this);
            canTick = true;
        };

        Main.prototype.StartEditor = function () {
            var obstacleEditor = new GGJ.ObstacleEditor();
            this.master.addChild(obstacleEditor);
        }

        Main.prototype.SetShipCollision = function (bool) {
            isShipCollision = bool;
        }

        Main.prototype.CreateRenderer = function () {
            this.renderer = PIXI.autoDetectRenderer(resolutionX, resolutionY, false, true);
            document.body.appendChild(this.renderer.view);
            //To change the background color
            this.renderer.backgroundColor = 0x000000;
            //Tell the renderer to render the stage
            this.renderer.render(this.master);
            window.onresize = this.resize.bind(this);
            this.resize();
            requestAnimationFrame(this.RenderLoop.bind(this));
        };
        Main.prototype.RenderLoop = function (time) {
            this.render(time);
            requestAnimationFrame(this.RenderLoop);
        };
        Main.prototype.Loader = function () {
            this.emitEvent('add:loader');
            PIXI.loader
                .add("obstacle0", "./images/obstacles/block.png")
                .add("grid0", "./images/background/bg_grid_tile.png")
                .add("bgObj1", "./images/background/bg_obj_1.png")
                .add("bgObj2", "./images/background/bg_obj_2.png")
                .add("bgObj3", "./images/background/bg_obj_3.png")
                .add("bgObj4", "./images/background/bg_obj_4.png")
                .add("bgAnimWall0", "./images/background/border_3.png")
                .add("bgAnimWall1", "./images/background/border_2.png")
                .add("bgAnimWall2", "./images/background/border_1.png")
                .add("bgAnimWall3", "./images/background/border_0.png")
                .add("bgbuild0", "./images/background/bg_obj_1.png")
                .add("bgbuild1", "./images/background/bg_obj_2.png")
                .add("bgbuild2", "./images/background/bg_obj_3.png")
                .add("bgbuild3", "./images/background/bg_obj_4.png")
                .add("bggradient", "./images/background/bg_gradient_1.png")
                .add("bgblue", "./images/background/bg_blueback.png")
        };
        Main.prototype.resize = function () {
            var width = window.innerWidth;
            var height = window.innerWidth;
            if (height > width) {
                var aux = width;
                width = height;
                height = aux;
            }
            var ratio = resolutionY / resolutionX;
            this.renderer.resize(this.width = innerWidth, this.height = innerHeight);
            // this.playerStage.scale.x = this.stage.scale.x = this.renderer.width / resolutionX;
            // this.playerStage.scale.y = this.stage.scale.y = this.renderer.height / resolutionY;
            //this.stage.y = -(1000*this.playerStage.scale.y) +( this.renderer.height*0.5);
            this.playerStage.y = this.stage.y = (innerHeight - resolutionY) / 2
        };
        return Main;
    }());
    GGJ.Main = Main;

})(GGJ || (GGJ = {}));
var main = new GGJ.Main();
main.on('LevelReady', function () {
    main.state = "playing";
});
main.on('GameOver', function () {
    main.state = "waiting";
});
main.on('LevelComplete', function () {
    main.state = "waiting";
});
main.on('TimeUp', function () {
    main.state = "waiting";
});
main.on('StartGame', function () {
    main.emitEvent('HideUI');
});
main.Start();