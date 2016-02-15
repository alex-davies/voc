define(["require", "exports", 'engine/entities/Ship', 'engine/commands/Command'], function (require, exports, Ship_1, Command_1) {
    var ShipBuildCommand = (function () {
        function ShipBuildCommand(position) {
            this.position = position;
        }
        ShipBuildCommand.prototype.execute = function (world) {
            var ship = new Ship_1.default(world, this.position);
            world.ships.put(ship);
            return new Command_1.SuccessResult();
        };
        ShipBuildCommand.prototype.canExecute = function (world) {
            return new Command_1.SuccessResult();
        };
        return ShipBuildCommand;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = ShipBuildCommand;
});
//# sourceMappingURL=ShipBuildCommand.js.map