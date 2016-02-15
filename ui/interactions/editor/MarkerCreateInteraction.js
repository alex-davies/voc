define(["require", "exports", "../../../engine/commands/editor/MarkerCreateCommand", "../../../engine/commands/editor/MarkerMoveCommand", "../../../util/Coordinates", "../../../engine/commands/editor/MarkerConnectCommand"], function (require, exports, MarkerCreateCommand_1, MarkerMoveCommand_1, Coordinates_1, MarkerConnectCommand_1) {
    var CreateMarkerInteraction = (function () {
        function CreateMarkerInteraction(worldDisplay, isEnabled) {
            var _this = this;
            if (isEnabled === void 0) { isEnabled = false; }
            this.worldDisplay = worldDisplay;
            this.isEnabled = isEnabled;
            worldDisplay.interactive = true;
            //worldDisplay.on('click', e=>this.click(e));
            worldDisplay.on('mousedown', function (e) { return _this.mouseDown(e); });
            worldDisplay.on('mouseup', function (e) { return _this.mouseUp(e); });
            worldDisplay.on('mousemove', function (e) { return _this.mouseMove(e); });
        }
        CreateMarkerInteraction.prototype.mouseDown = function (e) {
            this.mouseDownPoint = e.data.global.clone();
            this.mouseDownMarker = this.worldDisplay.markerDisplays.findMarkerDisplayAtPoint(e.data.global);
        };
        CreateMarkerInteraction.prototype.mouseUp = function (e) {
            var mouseUpPoint = e.data.global;
            //if we are mouse up on the same mousedown point its a click
            if (Coordinates_1.XYUtil.equals(this.mouseDownPoint, mouseUpPoint)) {
                if (this.mouseDownMarker) {
                    //we are click on an existin marker, lets select it
                    if (this.selectedMarker) {
                        var sourceMarkerId = this.selectedMarker.entity.id;
                        var targetMarkerId = this.mouseDownMarker.entity.id;
                        this.worldDisplay.world.IssueCommand(new MarkerConnectCommand_1.default(sourceMarkerId, targetMarkerId));
                        this.worldDisplay.markerDisplays.reDrawNeighbourArrows();
                    }
                    this.selectedMarker = this.mouseDownMarker;
                }
                else {
                    //we are click on empty space, lets create a new marker
                    var worldPoint = this.worldDisplay.toLocal(e.data.global);
                    var latlng = this.worldDisplay.projection.toLatLng(worldPoint);
                    this.worldDisplay.world.IssueCommand(new MarkerCreateCommand_1.default(latlng));
                }
            }
            this.mouseDownMarker = null;
            this.mouseDownPoint = null;
        };
        CreateMarkerInteraction.prototype.mouseMove = function (e) {
            if (this.mouseDownMarker) {
                e.stopPropagation();
                var mouseMovePoint = e.data.global.clone();
                var worldPoint = this.worldDisplay.toLocal(mouseMovePoint);
                var markerId = this.mouseDownMarker.entity.id;
                var latlng = this.worldDisplay.projection.toLatLng(worldPoint);
                this.worldDisplay.world.IssueCommand(new MarkerMoveCommand_1.default(markerId, latlng));
                this.worldDisplay.markerDisplays.reDrawNeighbourArrows();
            }
        };
        CreateMarkerInteraction.prototype.click = function (e) {
            if (!this.isEnabled)
                return;
            var worldDisplay = this.worldDisplay;
            var worldPoint = worldDisplay.toLocal(e.data.global);
            var latlng = worldDisplay.projection.toLatLng(worldPoint);
            worldDisplay.world.IssueCommand(new MarkerCreateCommand_1.default(latlng));
        };
        return CreateMarkerInteraction;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = CreateMarkerInteraction;
});
//# sourceMappingURL=MarkerCreateInteraction.js.map