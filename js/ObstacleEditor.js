var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GGJ;
(function (GGJ) {
    var ObstacleEditor = (function (_super) {
        __extends(ObstacleEditor, _super);
        function ObstacleEditor() {
            var _this = _super.call(this) || this;
            _this.movementSpeed = 15;
            _this.editorObjects = [];
            _this.lastSelectedObject = null;
            _this.creatingObjectType = 0;
            var container = _this;
            var background = new PIXI.Graphics();
            background.beginFill(0x000000);
            background.drawRect(-container.x, -container.y, 20000 / container.scale.x, 2000 / container.scale.y);
            background.endFill();
            background.beginFill(0xff0000);
            background.drawRect(-container.x, 0, 20000 / container.scale.x, 100 / container.scale.y);
            background.endFill();
            background.beginFill(0xff0000);
            background.drawRect(-container.x, 1900, 20000 / container.scale.x, 100 / container.scale.y);
            background.endFill();
            background.beginFill(0x053345);
            background.drawRect(-container.x, -container.y + 1000, 20000 / container.scale.x, 10 / container.scale.y);
            background.endFill();
            _this.addChild(background);
            _this.interactive = true;
            _this.hitArea = new PIXI.Rectangle(0, 0, 1363, 768);
            window.addEventListener("keydown", function (e) {
                switch (e.keyCode) {
                    case 82:
                        container.x = 0;
                        container.y = 0;
                        container.scale.x = 1;
                        container.scale.y = 1;
                        break;
                    case 65:
                        container.scale.x += 0.1;
                        container.scale.y += 0.1;
                        break;
                    case 90:
                        container.scale.x -= 0.1;
                        container.scale.y -= 0.1;
                        break;
                    case 13:
                        container.Export();
                        break;
                    case 46:
                        container.DeleteSelected();
                        break;
                    case 40:
                        container.y -= container.movementSpeed * 0.5;
                        break;
                    case 39:
                        container.x -= container.movementSpeed;
                        break;
                    case 38:
                        container.y += container.movementSpeed * 0.5;
                        break;
                    case 37:
                        container.x += container.movementSpeed;
                        break;
                    case 49:
                        console.log("Block 1 Selected");
                        container.creatingObjectType = 0;
                        break;
                    case 50:
                        console.log("Block 2 Selected");
                        container.creatingObjectType = 1;
                        break;
                    case 51:
                        console.log("Block 3 Selected");
                        container.creatingObjectType = 2;
                        break;
                    case 52:
                        console.log("Block 4 Selected");
                        container.creatingObjectType = 3;
                        break;
                    case 53:
                        console.log("Block 5 Selected");
                        container.creatingObjectType = 4;
                        break;
                    case 54:
                        console.log("Block 6 Selected");
                        container.creatingObjectType = 5;
                        break;
                    case 55:
                        console.log("Block 7 Selected");
                        container.creatingObjectType = 6;
                        break;
                    case 80:
                        console.log("Object 1 Selected");
                        container.creatingObjectType = 100;
                        break;
                    default:
                        // code...
                        break;
                }
                container.hitArea = new PIXI.Rectangle(-container.x / container.scale.x, -container.y / container.scale.y, 1363 / container.scale.x, 768 / container.scale.y);
            });
            _this.interactive = true;
            _this.hitArea = new PIXI.Rectangle(0, 0, 1363, 768);
            _this.addListener("mousedown", function (ev) {
                var x = ev.data.originalEvent.clientX;
                var y = ev.data.originalEvent.clientY;
                var scaleX = main.renderer.width / 1363;
                var scaleY = main.renderer.height / 768;
                //x *= scaleX  ;
                //y *= scaleY ;
                x /= container.scale.x;
                y /= container.scale.y;
                switch (container.creatingObjectType) {
                    case 0:
                        container.CreateBlock0(x, y);
                        break;
                    case 1:
                        container.CreateBlock1(x, y);
                        break;
                    case 2:
                        container.CreateBlock1(x, y, true);
                        break;
                    case 3:
                        container.CreateBlock2(x, y);
                        break;
                    case 4:
                        container.CreateBlock2(x, y, true);
                        break;
                    case 5:
                        container.CreateBlock3(x, y);
                        break;
                    case 6:
                        container.CreateBlock3(x, y, true);
                        break;
                    case 100:
                        container.CreateObject(x, y, 100);
                        break;
                    default:
                        // code...
                        break;
                }
            });
            _this.addListener("mouseup", function (ev) {
                if (container.lastSelectedObject) {
                    container.lastSelectedObject["isLocalMouseDown"] = false;
                }
            });
            _this.LoadStoredData();
            return _this;
        }
        ObstacleEditor.prototype.LoadStoredData = function () {
            for (var i = 0; i < obstacleData.length; ++i) {
                var x = obstacleData[i].x;
                var y = obstacleData[i].y;
                switch (obstacleData[i].type) {
                    case 0:
                        this.CreateBlock0(x, y);
                        break;
                    case 1:
                        this.CreateBlock1(x, y);
                        break;
                    case 2:
                        this.CreateBlock1(x, y, true);
                        break;
                    case 3:
                        this.CreateBlock2(x, y);
                        break;
                    case 4:
                        this.CreateBlock2(x, y, true);
                        break;
                    case 5:
                        this.CreateBlock3(x, y);
                        break;
                    case 6:
                        this.CreateBlock3(x, y, true);
                        break;
                    case 100:
                        this.CreateObject(x, y, 100);
                        break;
                }
            }
        };
        ObstacleEditor.prototype.DeleteSelected = function () {
            if (!this.lastSelectedObject) {
                return;
            }
            this.editorObjects.splice(this.editorObjects.indexOf(this.lastSelectedObject), 1);
            this.removeChild(this.lastSelectedObject);
        };
        ObstacleEditor.prototype.sortByDistance = function () {
            var sorted = [];
            for (var i = 0; i < this.editorObjects.length; ++i) {
                var obj = this.editorObjects[i];
                if (sorted.length < 1) {
                    sorted.push(obj);
                    continue;
                }
                var inserted = false;
                var aux = [];
                for (var x = 0; x < sorted.length; ++x) {
                    if (sorted[x].x > obj.x) {
                        if (aux.indexOf(obj) === -1)
                            aux.push(obj);
                        aux.push(sorted[x]);
                        inserted = true;
                        continue;
                    }
                    if (aux.indexOf(sorted[x]) === -1)
                        aux.push(sorted[x]);
                }
                if (!inserted) {
                    if (aux.indexOf(obj) === -1)
                        aux.push(obj);
                }
                sorted = aux;
            }
            return sorted;
        };
        ObstacleEditor.prototype.Export = function () {
            var sorted = this.sortByDistance();
            var exportData = [];
            for (var i = 0; i < sorted.length; ++i) {
                var dataType = sorted[i]["exportType"];
                var dataX = sorted[i].x;
                var dataY = sorted[i].y;
                exportData.push("{ type : " + dataType + ", " +
                    "x : " + dataX + ", y : " + dataY + "  }");
            }
            console.log(exportData.toString());
        };
        ObstacleEditor.prototype.CreateBlock0 = function (x, y) {
            var sprite = new PIXI.Sprite(PIXI.loader.resources["obstacle0"]["texture"]);
            this.editorObjects.push(sprite);
            sprite.x = (-this.x / this.scale.x) + x;
            sprite.y = (-this.y / this.scale.y) + y;
            sprite.pivot.x = sprite.width * 0.5;
            sprite.pivot.y = sprite.height * 0.5;
            sprite["exportType"] = 0;
            this.CreateInteraction(sprite);
            this.addChild(sprite);
        };
        ObstacleEditor.prototype.CreateBlock1 = function (x, y, rot) {
            if (rot === void 0) { rot = false; }
            var sprite = new PIXI.Sprite(PIXI.loader.resources["obstacle0"]["texture"]);
            this.editorObjects.push(sprite);
            var iniX = sprite.width;
            for (var i = 0; i < 2; ++i) {
                var auxSprite = new PIXI.Sprite(PIXI.loader.resources["obstacle0"]["texture"]);
                auxSprite.x = iniX;
                iniX += auxSprite.width;
                auxSprite.alpha = 0.2;
                sprite.addChild(auxSprite);
            }
            sprite.x = (-this.x / this.scale.x) + x;
            sprite.y = (-this.y / this.scale.y) + y;
            sprite.pivot.x = sprite.width * 0.5;
            sprite.pivot.y = sprite.height * 0.5;
            sprite["exportType"] = 1;
            if (rot) {
                sprite.rotation = 90 * Math.PI / 180;
                ;
                sprite["exportType"] = 2;
            }
            this.CreateInteraction(sprite);
            this.addChild(sprite);
        };
        ObstacleEditor.prototype.CreateBlock2 = function (x, y, rot) {
            if (rot === void 0) { rot = false; }
            var sprite = new PIXI.Sprite(PIXI.loader.resources["obstacle0"]["texture"]);
            this.editorObjects.push(sprite);
            var iniX = sprite.width;
            for (var i = 0; i < 3; ++i) {
                var auxSprite = new PIXI.Sprite(PIXI.loader.resources["obstacle0"]["texture"]);
                auxSprite.x = iniX;
                iniX += auxSprite.width;
                auxSprite.alpha = 0.2;
                sprite.addChild(auxSprite);
            }
            sprite.x = (-this.x / this.scale.x) + x;
            sprite.y = (-this.y / this.scale.y) + y;
            sprite.pivot.x = sprite.width * 0.5;
            sprite.pivot.y = sprite.height * 0.5;
            sprite["exportType"] = 3;
            if (rot) {
                sprite.rotation = 90 * Math.PI / 180;
                ;
                sprite["exportType"] = 4;
            }
            this.CreateInteraction(sprite);
            this.addChild(sprite);
        };
        ObstacleEditor.prototype.CreateBlock3 = function (x, y, rot) {
            if (rot === void 0) { rot = false; }
            var sprite = new PIXI.Sprite(PIXI.loader.resources["obstacle0"]["texture"]);
            this.editorObjects.push(sprite);
            // Right
            var auxSprite = new PIXI.Sprite(PIXI.loader.resources["obstacle0"]["texture"]);
            auxSprite.x = sprite.width;
            auxSprite.alpha = 0.2;
            sprite.addChild(auxSprite);
            // Left
            var auxSprite = new PIXI.Sprite(PIXI.loader.resources["obstacle0"]["texture"]);
            auxSprite.x = -sprite.width;
            auxSprite.alpha = 0.2;
            sprite.addChild(auxSprite);
            // Top Left
            var auxSprite = new PIXI.Sprite(PIXI.loader.resources["obstacle0"]["texture"]);
            auxSprite.x = -sprite.width;
            auxSprite.y = -sprite.height;
            auxSprite.alpha = 0.2;
            sprite.addChild(auxSprite);
            // Top Right
            var auxSprite = new PIXI.Sprite(PIXI.loader.resources["obstacle0"]["texture"]);
            auxSprite.x = sprite.width;
            auxSprite.y = sprite.height;
            auxSprite.alpha = 0.2;
            sprite.addChild(auxSprite);
            sprite.x = (-this.x / this.scale.x) + x;
            sprite.y = (-this.y / this.scale.y) + y;
            sprite.pivot.x = sprite.width * 0.5;
            sprite.pivot.y = sprite.height * 0.5;
            sprite["exportType"] = 5;
            if (rot) {
                sprite.rotation = 90 * Math.PI / 180;
                ;
                sprite["exportType"] = 6;
            }
            this.CreateInteraction(sprite);
            this.addChild(sprite);
        };
        ObstacleEditor.prototype.CreateObject = function (x, y, type) {
            var sprite = new PIXI.Sprite(PIXI.loader.resources["item0_0"]["texture"]);
            this.editorObjects.push(sprite);
            sprite.x = (-this.x / this.scale.x) + x;
            sprite.y = (-this.y / this.scale.y) + y;
            sprite.pivot.x = sprite.width * 0.5;
            sprite.pivot.y = sprite.height * 0.5;
            sprite["exportType"] = type;
            this.CreateInteraction(sprite);
            this.addChild(sprite);
        };
        ObstacleEditor.prototype.CreateInteraction = function (sprite) {
            sprite.scale.x = 0.5;
            sprite.scale.y = 0.5;
            sprite.interactive = true;
            var lastX = 0;
            var lastY = 0;
            var controller = this;
            sprite["isLocalMouseDown"] = false;
            sprite.addListener("mousedown", function (ev) {
                sprite["isLocalMouseDown"] = true;
                var x = ev.data.originalEvent.clientX;
                var y = ev.data.originalEvent.clientY;
                var scaleX = main.renderer.width / 1363;
                var scaleY = main.renderer.height / 768;
                //x /= scaleX ;
                //y /= scaleY;
                x /= controller.scale.x;
                y /= controller.scale.y;
                lastX = x;
                lastY = y;
                ev.stopPropagation();
                controller.lastSelectedObject = sprite;
            });
            sprite.addListener("mouseup", function (ev) {
                sprite["isLocalMouseDown"] = false;
            });
            sprite.addListener("mousemove", function (ev) {
                if (sprite["isLocalMouseDown"]) {
                    var x = ev.data.originalEvent.clientX;
                    var y = ev.data.originalEvent.clientY;
                    var scaleX = main.renderer.width / 1363;
                    var scaleY = main.renderer.height / 768;
                    //x /= scaleX;
                    //y /= scaleY;
                    x /= controller.scale.x;
                    y /= controller.scale.y;
                    sprite.x += x - lastX;
                    sprite.y += y - lastY;
                    lastX = x;
                    lastY = y;
                }
            });
            controller.lastSelectedObject = sprite;
        };
        return ObstacleEditor;
    }(PIXI.Container));
    GGJ.ObstacleEditor = ObstacleEditor;
})(GGJ || (GGJ = {}));
