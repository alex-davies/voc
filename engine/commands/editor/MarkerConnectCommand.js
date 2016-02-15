define(["require", "exports", 'engine/commands/Command'], function (require, exports, Command_1) {
    var MarkerConnectCommand = (function () {
        function MarkerConnectCommand(sourceMarkerId, targetMarkerId, isTwoWay) {
            if (isTwoWay === void 0) { isTwoWay = true; }
            this.sourceMarkerId = sourceMarkerId;
            this.targetMarkerId = targetMarkerId;
            this.isTwoWay = isTwoWay;
        }
        MarkerConnectCommand.prototype.execute = function (world) {
            var sourceMarker = world.markers.get(this.sourceMarkerId);
            var targetMarker = world.markers.get(this.targetMarkerId);
            //one of the marks doesnt exist
            if (!sourceMarker || !targetMarker)
                return;
            sourceMarker.neighbourMarkerIds.push(targetMarker.id);
            if (this.isTwoWay)
                targetMarker.neighbourMarkerIds.push(sourceMarker.id);
            return new Command_1.SuccessResult();
        };
        MarkerConnectCommand.prototype.canExecute = function (world) {
            return new Command_1.SuccessResult();
        };
        return MarkerConnectCommand;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = MarkerConnectCommand;
});
//# sourceMappingURL=MarkerConnectCommand.js.map