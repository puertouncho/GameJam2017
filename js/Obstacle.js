var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GGJ;
(function (GGJ) {
    var Obstacle = (function (_super) {
        __extends(Obstacle, _super);
        function Obstacle() {
            var _this = _super.call(this) || this;
            _this.components = [];
            return _this;
        }
        Obstacle.prototype.CreateObstacle = function (type) {
            switch (type) {
                case 0:
                    {
                        this.CreateTypeBlock();
                    }
                    break;
                case 1:
                    {
                        this.CreateTypeLargeBlock(0, 3);
                    }
                    break;
                case 2:
                    {
                        this.CreateTypeLargeBlock(90, 3);
                    }
                    break;
                case 3:
                    {
                        this.CreateTypeLargeBlock(0, 4);
                    }
                    break;
                case 4:
                    {
                        this.CreateTypeLargeBlock(90, 4);
                    }
                    break;
                case 5:
                    {
                        this.CreateTypeZBlock(0);
                    }
                    break;
                case 6:
                    {
                        this.CreateTypeZBlock(90);
                    }
                    break;
                default:
                    {
                        this.CreateTypeBlock();
                    }
                    break;
            }
            this.sprite.scale.x = 0.5;
            this.sprite.scale.y = 0.5;
        };
        Obstacle.prototype.CreateTypeBlock = function () {
            this.sprite = new PIXI.Sprite(PIXI.loader.resources["obstacle0"]["texture"]);
            this.components.push(this.sprite);
            this.addChild(this.sprite);
        };
        Obstacle.prototype.CreateTypeLargeBlock = function (angle, nBlocks) {
            this.sprite = new PIXI.Sprite(PIXI.loader.resources["obstacle0"]["texture"]);
            var x = this.sprite.width;
            for (var i = 0; i < nBlocks - 1; ++i) {
                var auxSprite = new PIXI.Sprite(PIXI.loader.resources["obstacle0"]["texture"]);
                auxSprite.x = x;
                x += auxSprite.width;
                this.sprite.addChild(auxSprite);
            }
            this.sprite.rotation = angle * Math.PI / 180;
            ;
            this.components.push(this.sprite);
            this.addChild(this.sprite);
        };
        Obstacle.prototype.CreateTypeZBlock = function (angle) {
            this.sprite = new PIXI.Sprite(PIXI.loader.resources["obstacle0"]["texture"]);
            // Right
            var auxSprite = new PIXI.Sprite(PIXI.loader.resources["obstacle0"]["texture"]);
            auxSprite.x = this.sprite.width;
            this.sprite.addChild(auxSprite);
            this.components.push(auxSprite);
            // Left
            var auxSprite = new PIXI.Sprite(PIXI.loader.resources["obstacle0"]["texture"]);
            auxSprite.x = -this.sprite.width;
            this.sprite.addChild(auxSprite);
            this.components.push(auxSprite);
            // Top Left
            var auxSprite = new PIXI.Sprite(PIXI.loader.resources["obstacle0"]["texture"]);
            auxSprite.x = -this.sprite.width;
            auxSprite.y = -this.sprite.height;
            this.sprite.addChild(auxSprite);
            this.components.push(auxSprite);
            // Top Right
            var auxSprite = new PIXI.Sprite(PIXI.loader.resources["obstacle0"]["texture"]);
            auxSprite.x = this.sprite.width;
            auxSprite.y = this.sprite.height;
            this.sprite.addChild(auxSprite);
            this.components.push(auxSprite);
            this.sprite.rotation = angle * Math.PI / 180;
            ;
            this.components.push(this.sprite);
            this.addChild(this.sprite);
        };
        return Obstacle;
    }(PIXI.Container));
    GGJ.Obstacle = Obstacle;
})(GGJ || (GGJ = {}));
