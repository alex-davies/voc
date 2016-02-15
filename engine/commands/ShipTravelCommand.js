define(["require", "exports", 'engine/commands/Command'], function (require, exports, Command_1) {
    var ShipTravelCommand = (function () {
        function ShipTravelCommand(shipId, targetMarkerId) {
            this.shipId = shipId;
            this.targetMarkerId = targetMarkerId;
        }
        ShipTravelCommand.prototype.execute = function (world) {
            var ship = world.ships.get(this.shipId);
            ship.travelTargetMarkerIds = this.calculatePath(world);
            return new Command_1.SuccessResult();
        };
        ShipTravelCommand.prototype.calculatePath = function (world) {
            return world.markers.findPathForShip(this.shipId, this.targetMarkerId);
        };
        ShipTravelCommand.prototype.canExecute = function (world) {
            return new Command_1.SuccessResult();
        };
        return ShipTravelCommand;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = ShipTravelCommand;
});
//# sourceMappingURL=ShipTravelCommand.js.map