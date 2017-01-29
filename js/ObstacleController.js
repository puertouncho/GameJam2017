var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GGJ;
(function (GGJ) {
    var ObstacleController = (function (_super) {
        __extends(ObstacleController, _super);
        function ObstacleController() {
            var _this = _super.call(this) || this;
            _this.obstacleList = [];
            _this.speed = -275;
            _this.spawnTime = 0;
            _this.playerPos = 0;
            _this.distanceToSpawn = 2000;
            _this.playerCollider = {
                x: 0,
                y: 0,
                r: 30
            };
            _this.lastOffset = 0;
            _this.currentGameObstacles = obstacleData.concat();
            _this.playerCollisionDebug = new PIXI.Graphics();
            _this.playerCollisionDebug.beginFill(0xff00ff);
            _this.playerCollisionDebug.drawCircle(0, 0, _this.playerCollider.r);
            _this.playerCollisionDebug.endFill();
            _this.addChild(_this.playerCollisionDebug);
            return _this;
        }
        ObstacleController.prototype.Reset = function () {
            this.playerPos = 0;
            this.currentGameObstacles = obstacleData.concat();
        };
        ObstacleController.prototype.CreateObstacle = function (type, x, y) {
            if (type >= 100) {
            }
            else {
                var obstacle = new GGJ.Obstacle();
                obstacle.CreateObstacle(type);
                obstacle.x = x;
                obstacle.y = y;
                obstacle.pivot.x = obstacle.width * 0.5;
                obstacle.pivot.y = obstacle.height * 0.5;
                this.addChild(obstacle);
                this.obstacleList.push(obstacle);
            }
        };
        ObstacleController.prototype.Loop = function (dt) {
            this.speed = main.scrollOffset - this.lastOffset;
            if (typeof shipObject != "undefined" && shipObject) {
                this.playerCollider.x = 350;
                this.playerCollider.y = (shipObject.y) + Math.abs(main.stage.y / main.stage.scale.y);
                this.playerCollisionDebug.x = 350;
                this.playerCollisionDebug.y = (shipObject.y) + Math.abs(main.stage.y / main.stage.scale.y);
            }
            this.spawnTime += dt;
            this.playerPos += this.speed;
            if (this.currentGameObstacles.length > 0 &&
                (this.currentGameObstacles[0].x - this.playerPos) < this.distanceToSpawn) {
                this.CreateObstacle(this.currentGameObstacles[0].type, this.currentGameObstacles[0].x, this.currentGameObstacles[0].y);
                this.currentGameObstacles.splice(0, 1);
            }
            for (var i = 0; i < this.obstacleList.length; ++i) {
                this.obstacleList[i].x -= this.speed;
                if (this.DetectObstacleCollision(this.playerCollider, this.obstacleList[i])) {
                    console.log("Collision");
                    main.SetShipCollision(true);
                }
                if (this.obstacleList[i].x < -this.obstacleList[i].width) {
                    this.removeChild(this.obstacleList[i]);
                    this.obstacleList.splice(i, 1);
                    i--;
                }
            }
            this.lastOffset = main.scrollOffset;
        };
        ObstacleController.prototype.DetectObstacleCollision = function (circle, rect) {
            if (this.DetectSingleSquareCollision(circle, rect)) {
                return true;
            }
            for (var i = 0; i < rect.components.length; ++i) {
                if (this.DetectSingleSquareCollision(circle, rect.components[i], rect.x, rect.y)) {
                    return true;
                }
            }
            return false;
        };
        ObstacleController.prototype.DetectSingleSquareCollision = function (circle, rect, offsetX, offsetY) {
            if (offsetX === void 0) { offsetX = 0; }
            if (offsetY === void 0) { offsetY = 0; }
            var distX = Math.abs(circle.x - (rect.x + offsetX));
            var distY = Math.abs(circle.y - (rect.y + offsetY));
            if (distX > ((rect.width * rect.scale.x) / 2 + circle.r)) {
                return false;
            }
            if (distY > ((rect.height * rect.scale.y) / 2 + circle.r)) {
                return false;
            }
            if (distX <= ((rect.width * rect.scale.x) / 2)) {
                return true;
            }
            if (distY <= ((rect.height * rect.scale.y) / 2)) {
                return true;
            }
            var dx = distX - (rect.width * rect.scale.x) / 2;
            var dy = distY - (rect.height * rect.scale.y) / 2;
            return (dx * dx + dy * dy <= (circle.r * circle.r));
        };
        return ObstacleController;
    }(PIXI.Container));
    GGJ.ObstacleController = ObstacleController;
})(GGJ || (GGJ = {}));
