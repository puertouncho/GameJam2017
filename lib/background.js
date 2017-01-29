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
        var speed = 2;
        var TILE_W = 100;
        var len = 15;

        __extends(Background, _super);
        function Background() {
            var _this = _super.call(this) || this;
            _this.drawBG();
            return _this;
        }
        Background.prototype.tick = function (dt) {
            var bgtile;
            for (var i = 0; i < len; ++i) {
                bgtile = bg_tiles[i];
                bgtile.x -= speed;
                if(i===(len - 1) && bgtile.x < (resolutionX -TILE_W*0.5)){
                    var temp = bg_tiles.shift();
                    temp.x = bg_tiles[len-2].x + TILE_W;
                    bg_tiles.push(temp)
                }
            }

        }

        Background.prototype.drawBG = function () {
            var posX = 0;
            var bgtile;
            var graphics;
            var sprite;
            for (var i = 0; i < len; ++i) {
                bgtile = new PIXI.Container();
                graphics = _createGraphics(0x001219, 0, 0, TILE_W, 1000);
                bgtile.addChild(graphics);
                sprite = new PIXI.Sprite.fromImage("assets/bg_grid_tile.png")
                bgtile.addChild(sprite);
                bg_tiles.push(bgtile);
                bgtile.x = posX;
                bgtile.cacheAsBitmap = true;
                this.addChild(bgtile);
                posX += TILE_W;
            }
        };

        function _createGraphics(color, x, y, w, h) {
            var graphics = new PIXI.Graphics();
            graphics.beginFill(color);
            graphics.drawRect(x, y, w, h);
            return graphics;
        }
        return Background;
    } (PIXI.Container));

    GGJ.Background = Background;
})(GGJ || (GGJ = {}));


