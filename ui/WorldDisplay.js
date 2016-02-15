var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'pixi.js', 'ui/entities/ShipDisplay', 'util/MercatorProjection', "./entities/EntityDisplayContainer", "./entities/MarkerDisplaySet"], function (require, exports, PIXI, ShipDisplay_1, MercatorProjection_1, EntityDisplayContainer_1, MarkerDisplaySet_1) {
    var WorldDisplay = (function (_super) {
        __extends(WorldDisplay, _super);
        function WorldDisplay(world) {
            var _this = this;
            _super.call(this);
            this.world = world;
            var latlngWindow = {
                topLeft: { lat: -85, lng: -180 },
                bottomRight: { lat: 85, lng: 180 },
            };
            var xyWindow = {
                topLeft: { x: 0, y: 0 },
                bottomRight: { x: 1136, y: 640 }
            };
            this.projection = new MercatorProjection_1.default(latlngWindow, xyWindow);
            this.addWorldMap();
            this.markerDisplays = new MarkerDisplaySet_1.default(this);
            this.addChild(this.markerDisplays);
            this.shipDisplays = new EntityDisplayContainer_1.default(this, this.world.ships, function (ship) { return new ShipDisplay_1.default(_this, ship); });
            this.addChild(this.shipDisplays);
        }
        WorldDisplay.prototype.addWorldMap = function () {
            // create a texture from an image path
            var texture = PIXI.Texture.fromImage("/ui/assets/map.svg");
            // create a new Sprite using the texture
            var mapSprite = new PIXI.Sprite(texture);
            // center the sprites anchor point
            //mapSprite.anchor.x = 0;
            //mapSprite.anchor.y = 0;
            //
            //mapSprite.x = 0;
            //mapSprite.y = 0;
            //
            //mapSprite.width = this.width;
            //mapSprite.height = this.height
            this.addChild(mapSprite);
        };
        WorldDisplay.prototype.tick = function () {
        };
        return WorldDisplay;
    })(PIXI.Container);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = WorldDisplay;
});
//# sourceMappingURL=WorldDisplay.js.map