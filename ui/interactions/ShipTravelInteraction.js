define(["require", "exports", "../../engine/commands/ShipTravelCommand"], function (require, exports, ShipTravelCommand_1) {
    var ShipTravelInteraction = (function () {
        function ShipTravelInteraction(shipDisplay) {
            var _this = this;
            this.shipDisplay = shipDisplay;
            this.isDragging = false;
            shipDisplay.interactive = true;
            shipDisplay.on('mousedown', function (e) { return _this.startDrag(e); });
            shipDisplay.on('touchstart', function (e) { return _this.startDrag(e); });
            shipDisplay.on('mouseup', function (e) { return _this.stopDrag(e); });
            shipDisplay.on('touchend', function (e) { return _this.stopDrag(e); });
            shipDisplay.on('mouseupoutside', function (e) { return _this.stopDrag(e); });
            shipDisplay.on('touchendoutside', function (e) { return _this.stopDrag(e); });
            shipDisplay.on('mousemove', function (e) { return _this.doDrag(e); });
            shipDisplay.on('touchmove', function (e) { return _this.doDrag(e); });
        }
        ShipTravelInteraction.prototype.startDrag = function (e) {
            e.stopPropagation();
            this.isDragging = true;
        };
        ShipTravelInteraction.prototype.stopDrag = function (e) {
            e.stopPropagation();
            this.isDragging = false;
        };
        ShipTravelInteraction.prototype.doDrag = function (e) {
            if (this.isDragging) {
                e.stopPropagation();
                var worldDisplay = this.shipDisplay.worldDisplay;
                var shipDisplay = this.shipDisplay;
                var worldPoint = worldDisplay.toLocal(e.data.global);
                var closestMarkerDisplay = worldDisplay.markerDisplays.findClosestMarkerDisplay(worldPoint);
                if (closestMarkerDisplay) {
                    var command = new ShipTravelCommand_1.default(shipDisplay.entity.id, closestMarkerDisplay.entity.id);
                    worldDisplay.world.IssueCommand(command);
                }
            }
        };
        return ShipTravelInteraction;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = ShipTravelInteraction;
});
//# sourceMappingURL=ShipTravelInteraction.js.map