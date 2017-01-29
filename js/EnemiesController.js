var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GGJ;
(function (GGJ) {
    var EnemiesController = (function (_super) {
        __extends(EnemiesController, _super);
        function EnemiesController() {
            var _this = _super.call(this) || this;
            _this.enemyList = [];
            return _this;
        }
        EnemiesController.prototype.addEnemy = function () {
        };
        return EnemiesController;
    }(PIXI.Container));
    GGJ.EnemiesController = EnemiesController;
})(GGJ || (GGJ = {}));
