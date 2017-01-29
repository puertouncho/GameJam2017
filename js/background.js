/// <reference path="../defs/pixi.js.d.ts" />
var GGJ;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (GGJ) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Background = (function (_super) {
        var bg_tiles = [];
        var speed = 5;
        var TILE_W = 100;
        var len = 15;
        var lenObjects = 4;
        var borderMovie;
        var random_objects = [];
        var tiles = [];
        var buildings = [];
        var lastScroll = 0;
        var lastScrollY = 0;
        var controller = null;
        var initY;

        __extends(Background, _super);
        function Background() {
            var _this = _super.call(this) || this;
            // _this.load();
            controller = _this;
            return _this;
        }
        Background.prototype.tick = function (dt) {
            /*var bgtile;
            var i;
            var sprite;
            for (i = 0; i < len; ++i) {
                bgtile = bg_tiles[i];
                bgtile.x -= speed;
                if (i === (len - 1) && bgtile.x < (resolutionX - TILE_W * 0.5)) {
                    var temp = bg_tiles.shift();
                    temp.x = bg_tiles[len - 2].x + TILE_W;
                    bg_tiles.push(temp)
                }
            }
            for (i = 0; i < lenObjects; ++i) {
                sprite = random_objects[i];
                 sprite.x -= speed;
                if( sprite.x < -sprite.width){
                    sprite.x = resolutionX;
                }
            }*/
            var scrollInc = main.scrollOffset - controller.lastScroll;
            if(!isNaN(scrollInc) && Math.abs(scrollInc) < 500) {
                for(var i = 0; i < tiles.length; ++i){
                    var tile =  tiles[i];
                    tile.x -= scrollInc * 0.3;

                    if(tile.x < -(tile.width*2) ) {
                        var lastTile = tiles[tiles.length-1];
                        tile.x = lastTile.x + tile.width;
                        tiles.splice(tiles.indexOf(tile),1)
                        tiles.push(tile);
                    }
                }

                for(var i = 0; i < buildings.length; ++i){
                    var build =  buildings[i];
                    build.x -= scrollInc * 0.2;

                     if(build.x < -(build.width*2) ) {
                        var lastBuild = buildings[buildings.length-1];
                        build.x = lastBuild.x + build.width;
                        buildings.splice(buildings.indexOf(build),1)
                        buildings.push(build);
                     }
                }
                
            }
            
            controller.lastScroll = main.scrollOffset ;

            //console.log(-((main.master.y / 2) % 100));
            var inc = main.master.y - controller.lastScrollY;
            if(!isNaN(inc)  && Math.abs(inc) < 500) {
                controller.y += inc*0.1;
            }
            
            controller.lastScrollY =main.master.y ;
        }

         Background.prototype.InitialTiles = function() {
            this.alpha = 0.5;

            var initX = 0;

            var container = new PIXI.Container();
            for(var i=0 ; i<35; ++i){
                var initY = 0;
                for(var x = 0; x < 3; ++x){
                    sprite = new PIXI.Sprite(
                        PIXI.loader.resources["bgblue"]["texture"]
                    );
                    sprite.x = initX;
                    sprite.y = initY;
                    sprite.scale.x = 0.5;
                    sprite.scale.y = 0.5;
                    container.addChild(sprite);
                    
                    initY += sprite.height;
                }
                initX += sprite.width;;
            }
            this.addChild(container);

            // Random Buildings

            var initX = 0;
            var b = 0;

            for( var x = 0; x < 10; ++x) {
                var container = new PIXI.Container();
                iniY = 100;
                for(var i =0; i< 3; ++i){
                    sprite = new PIXI.Sprite(
                        PIXI.loader.resources["bgbuild"+b]["texture"]
                    );
                    sprite.x = 0;
                    sprite.y = iniY ;
                    sprite.scale.x = 0.3;
                    sprite.scale.y = 0.3;

                    sprite.alpha = 1;

                    iniY += sprite.height + 50 + Math.random()*300 ;

                    container.addChild(sprite);

                    b++;
                    if(b>3){
                        b=0;
                    }
                }


                container.x = initX;
                initX += sprite.width + 50 + Math.random()*500;
                buildings.push(container);
                this.addChild(container);
            }

            var iniX = 0;
            for(var i=0 ; i<35; ++i){
                var iniY =0;
                var container = new PIXI.Container();
                for(var x = 0; x < 3; ++x){
                     sprite = new PIXI.Sprite(
                        PIXI.loader.resources["grid0"]["texture"]
                    );
                    sprite.x = 0;
                    sprite.y = iniY;
                    sprite.scale.x = 0.5;
                    sprite.scale.y = 0.5;
                
                    container.addChild(sprite);
                   
                    iniY += sprite.height;
                }
                var bgGradient  = new PIXI.Sprite(
                        PIXI.loader.resources["bggradient"]["texture"]
                    );
                container.addChild(bgGradient);
                bgGradient.alpha = 1;
                bgGradient.scale.y = (sprite.height*3) / bgGradient.height;
                bgGradient.scale.x = (sprite.width) / bgGradient.width;


                // wall Top
                var wall = PIXI.extras.AnimatedSprite.fromImages(['bgAnimWall0','bgAnimWall1','bgAnimWall2','bgAnimWall3']);
                wall.gotoAndPlay(0);
                wall.y = 0;
                wall.scale.x = 0.5;
                wall.scale.y = 0.5;
                wall.animationSpeed = 0.1;
                container.addChild(wall);
                // wall Bottom
                var wallb = PIXI.extras.AnimatedSprite.fromImages(['bgAnimWall0','bgAnimWall1','bgAnimWall2','bgAnimWall3']);
                wallb.gotoAndPlay(0);
                wallb.scale.x = 0.5;
                wallb.scale.y = -0.5;
                wallb.y = iniY;
                wallb.animationSpeed = 0.2;
                container.addChild(wallb);
                container.x = iniX;
                iniX += sprite.width;
                tiles.push(container);
                this.addChild(container);
            }


            this.initY = (resolutionY - (sprite.height*3))*0.5;
            this.y =  this.initY;

            main.on('LevelReady', function () {
                this.lastScroll = 0;
                this.lastScrollY = 0;
                this.lastScrollY =main.master.y ;
                this.lastScroll = main.scrollOffset ;
                this.initY = (resolutionY - (sprite.height*3))*0.5;
                this.y =  this.initY;
                var initX = 0;
                 for(var i = 0; i < tiles.length; ++i){
                    var tile =  tiles[i];
                    tile.x = initX;
                    initX += tile.width;
                }
            });
        }

        Background.prototype.drawBG = function () {
            var posX = 0;
            var graphics;
            var sprite;
            var tilecontainer;
            var i;
            for (i = 0; i < len; ++i) {
                tilecontainer = new PIXI.Container();
                //sprite = new PIXI.Sprite(PIXI.loader.resources["bgtile"]["texture"]);
                sprite = new PIXI.Sprite.fromImage("grid0");
                sprite = new PIXI.Sprite(
                    PIXI.loader.resources["grid0"]["texture"]
                );

                tilecontainer.addChild(sprite);
                //sprite = new PIXI.Sprite(PIXI.loader.resources["bgtile"]["texture"]);
                sprite = new PIXI.Sprite.fromImage("grid0");

                sprite.y = resolutionY;
                tilecontainer.addChild(sprite);

                bg_tiles.push(tilecontainer);
                tilecontainer.x = posX;
                tilecontainer.cacheAsBitmap = true;
                this.addChild(tilecontainer);
                posX += TILE_W;
            }

           /*sprite = new PIXI.Sprite.fromImage("bgObj1");
            sprite.cacheAsBitmap = true;
            sprite.x = Math.random() * 300;
            sprite.y = 50 + Math.random() * 450;
            this.addChild(sprite);
            random_objects.push(sprite);
            sprite = new PIXI.Sprite.fromImage("bgObj2");
            sprite.cacheAsBitmap = true;
            sprite.x = 300 + Math.random() * 300;
            sprite.y = 50 + Math.random() * 450;
            this.addChild(sprite);
            random_objects.push(sprite);
            sprite = new PIXI.Sprite.fromImage("bgObj3");
            sprite.cacheAsBitmap = true;
            sprite.x = 600 + Math.random() * 300;
            sprite.y = 50 + Math.random() * 450;
            this.addChild(sprite);
            random_objects.push(sprite);
            sprite = new PIXI.Sprite.fromImage("bgObj4");
            sprite.cacheAsBitmap = true;
            sprite.x = 900 + Math.random() * 300;
            sprite.y = 50 + Math.random() * 450;
            this.addChild(sprite);
            random_objects.push(sprite);*/

        };

        return Background;
    } (PIXI.Container));

    GGJ.Background = Background;
})(GGJ || (GGJ = {}));


