var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./EntityDisplayContainer", "./MarkerDisplay", "../../util/Coordinates"], function (require, exports, EntityDisplayContainer_1, MarkerDisplay_1, Coordinates_1) {
    var MarkerDisplaySet = (function (_super) {
        __extends(MarkerDisplaySet, _super);
        function MarkerDisplaySet(worldDisplay) {
            var _this = this;
            _super.call(this, worldDisplay, worldDisplay.world.markers, function (m) { return new MarkerDisplay_1.default(worldDisplay, m); });
            this.worldDisplay = worldDisplay;
            worldDisplay.world.markers.observe(function (change) { return _this.reDrawNeighbourArrows(); }, true);
            this.reDrawNeighbourArrows();
        }
        MarkerDisplaySet.prototype.reDrawNeighbourArrows = function () {
            var _this = this;
            if (!this.graphics) {
                this.graphics = new PIXI.Graphics();
                this.addChild(this.graphics);
            }
            var graphics = this.graphics;
            graphics.clear();
            graphics.beginFill(0xFF0000);
            graphics.lineStyle(3, 0xFF0000);
            this.childLookup.forEach(function (source) {
                source.entity.neighbourMarkerIds.forEach(function (destId) {
                    var dest = _this.childLookup.get(destId);
                    if (dest) {
                        graphics.moveTo(source.x, source.y);
                        graphics.lineTo(dest.x, dest.y);
                        var angle = Coordinates_1.XYUtil.angleOfLine(source, dest);
                        var arrowHead = Coordinates_1.XYUtil.rotate(angle, { x: 0, y: 0 }, [
                            { x: -4, y: -6 },
                            { x: 4, y: -6 },
                            { x: 0, y: 0 }
                        ]);
                        arrowHead.forEach(function (xy) {
                            graphics.lineTo(xy.x + dest.x, xy.y + dest.y);
                        });
                    }
                });
            });
        };
        MarkerDisplaySet.prototype.findClosestMarkerDisplay = function (xy) {
            var markerDisplays = this.childLookup.entries();
            var closestMarkerDisplay;
            var closestDistance = Number.MAX_VALUE;
            for (var i = 0; i < markerDisplays.length; i++) {
                var marker = markerDisplays[i];
                var distance = Coordinates_1.XYUtil.distance(marker, xy);
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestMarkerDisplay = marker;
                }
            }
            return closestMarkerDisplay;
        };
        MarkerDisplaySet.prototype.findMarkerDisplayAtPoint = function (xy) {
            var markerDisplays = this.childLookup.entries();
            for (var i = 0; i < markerDisplays.length; i++) {
                if (markerDisplays[i].containsPoint(xy))
                    return markerDisplays[i];
            }
        };
        return MarkerDisplaySet;
    })(EntityDisplayContainer_1.default);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = MarkerDisplaySet;
});
//# sourceMappingURL=MarkerDisplaySet.js.map