var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports"], function (require, exports) {
    var MarkerDisplay = (function (_super) {
        __extends(MarkerDisplay, _super);
        function MarkerDisplay(worldDisplay, marker) {
            var _this = this;
            _super.call(this);
            this.worldDisplay = worldDisplay;
            this.entity = marker;
            this.graphics = new PIXI.Graphics();
            this.graphics.lineStyle(2, 0x0000FF, 1);
            this.graphics.drawCircle(0, 0, 7);
            this.graphics.lineStyle(0, 0x0000FF, 1);
            this.graphics.beginFill(0x0000FF);
            this.graphics.drawCircle(0, 0, 5);
            this.graphics.endFill();
            marker.position.observe(function (change) {
                var xy = worldDisplay.projection.toXY(change.newValue);
                _this.x = xy.x;
                _this.y = xy.y;
            });
            this.addChild(this.graphics);
        }
        MarkerDisplay.prototype.containsPoint = function (point) {
            return this.graphics.containsPoint(new PIXI.Point(point.x, point.y));
        };
        return MarkerDisplay;
    })(PIXI.Container);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = MarkerDisplay;
});
//# sourceMappingURL=MarkerDisplay.js.map