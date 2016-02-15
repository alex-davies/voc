define(["require", "exports", 'engine/commands/Command', "./Command"], function (require, exports, Command_1, Command_2) {
    var ResourceBuyCommand = (function () {
        function ResourceBuyCommand(resourceId, shipId, portId, totalPrice, quantity) {
            if (quantity === void 0) { quantity = 1; }
            this.resourceId = resourceId;
            this.shipId = shipId;
            this.portId = portId;
            this.totalPrice = totalPrice;
            this.quantity = quantity;
        }
        ResourceBuyCommand.prototype.execute = function (world) {
            var canExecute = this.canExecute(world);
            if (!canExecute.isSuccessful)
                return canExecute;
            var ship = world.ships.get(this.shipId);
            var port = world.ports.get(this.portId);
            port.balanceInLocalCurrency -= this.totalPrice;
            ship.resourcesInCargo[this.resourceId] = (ship.resourcesInCargo[this.resourceId] || 0) + this.quantity;
            world.ships.put(ship);
            return new Command_1.SuccessResult();
        };
        ResourceBuyCommand.prototype.canExecute = function (world) {
            var resource = world.ports.get(this.resourceId);
            if (!resource) {
                new Command_1.ResourceIdNotFoundResult(this.resourceId);
            }
            var ship = world.ships.get(this.shipId);
            if (!ship) {
                return new Command_1.ShipIdNotFoundResult(this.shipId);
            }
            var port = world.ports.get(this.portId);
            if (!port) {
                new Command_1.PortIdNotFoundResult(this.portId);
            }
            if (port.balanceInLocalCurrency < this.totalPrice) {
                return new Command_2.BalanceTooLowResult();
            }
            return new Command_1.SuccessResult();
        };
        return ResourceBuyCommand;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = ResourceBuyCommand;
});
//# sourceMappingURL=ResourceBuyCommand.js.map