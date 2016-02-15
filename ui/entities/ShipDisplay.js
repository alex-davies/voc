var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'pixi.js', "../interactions/ShipTravelInteraction"], function (require, exports, PIXI, ShipTravelInteraction_1) {
    var ShipDisplay = (function (_super) {
        __extends(ShipDisplay, _super);
        function ShipDisplay(worldDisplay, ship) {
            var _this = this;
            _super.call(this);
            this.worldDisplay = worldDisplay;
            this.entity = ship;
            // create a texture from an image path
            var texture = PIXI.Texture.fromImage("/ui/assets/sprites/ship-right.png");
            // create a new Sprite using the texture
            var shipSprite = new PIXI.Sprite(texture);
            // center the sprites anchor point
            shipSprite.anchor.x = 0.5;
            shipSprite.anchor.y = 0.5;
            // move the sprite t the center of the screen
            this.entity.position.observe(function (change) {
                var pos = _this.worldDisplay.projection.toXY(change.newValue);
                shipSprite.position.x = pos.x;
                shipSprite.position.y = pos.y;
            });
            this.addChild(shipSprite);
            new ShipTravelInteraction_1.default(this);
        }
        return ShipDisplay;
    })(PIXI.Container);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = ShipDisplay;
});
//# sourceMappingURL=ShipDisplay.js.map