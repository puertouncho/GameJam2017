var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GGJ;
(function (GGJ) {
    var CollectObject = (function (_super) {
        __extends(CollectObject, _super);
        function CollectObject() {
            return _super.call(this) || this;
        }
        CollectObject.prototype.CreateObject = function (type) {
            this.sprite = PIXI.extras.AnimatedSprite.fromImages(['item0_0', 'item0_1', 'item0_2', 'item0_3']);
            this.sprite.gotoAndPlay(0);
            this.sprite.animationSpeed = 0.2;
            //this.sprite.tint = 0x36ff00;
            this.addChild(this.sprite);
        };
        return CollectObject;
    }(PIXI.Container));
    GGJ.CollectObject = CollectObject;
})(GGJ || (GGJ = {}));
