define(["require", "exports", 'engine/commands/Command'], function (require, exports, Command_1) {
    var MarkerMoveCommand = (function () {
        function MarkerMoveCommand(markerId, position) {
            this.markerId = markerId;
            this.position = position;
        }
        MarkerMoveCommand.prototype.execute = function (world) {
            var marker = world.markers.get(this.markerId);
            marker.position(this.position);
            return new Command_1.SuccessResult();
        };
        MarkerMoveCommand.prototype.canExecute = function (world) {
            return new Command_1.SuccessResult();
        };
        return MarkerMoveCommand;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = MarkerMoveCommand;
});
//# sourceMappingURL=MarkerMoveCommand.js.map