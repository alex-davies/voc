define(["require", "exports", 'engine/commands/Command', "../../entities/Marker"], function (require, exports, Command_1, Marker_1) {
    var MarkerCreateCommand = (function () {
        function MarkerCreateCommand(position, id, neighbourIds) {
            this.position = position;
            this.id = id;
            this.neighbourIds = neighbourIds;
        }
        MarkerCreateCommand.prototype.execute = function (world) {
            var marker = new Marker_1.default(world, this.position, this.id, this.neighbourIds);
            world.markers.put(marker);
            return new Command_1.SuccessResult();
        };
        MarkerCreateCommand.prototype.canExecute = function (world) {
            return new Command_1.SuccessResult();
        };
        return MarkerCreateCommand;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = MarkerCreateCommand;
});
//# sourceMappingURL=MarkerCreateCommand.js.map