define(["require", "exports", "../commands/ResourceBuyCommand"], function (require, exports, ResourceBuyCommand_1) {
    var Port = (function () {
        function Port(world, markerId) {
            this.world = world;
            this.id = world.idGenerator.getNext("Port");
            this.markerId = markerId;
        }
        Port.prototype.buyResourcePrices = function () {
            var _this = this;
            var buyCommands = [];
            var shipIdsAtPort = [];
            this.world.ships.forEach(function (ship) {
                if (ship.isAtMarker(_this.markerId))
                    shipIdsAtPort.push(ship.id);
            });
            for (var i = 0; i < shipIdsAtPort.length; i++) {
                var shipIdAtPort = shipIdsAtPort[i];
                for (var resourceId in this.resourceBuyPriceAdjustment) {
                    if (!Object.prototype.hasOwnProperty.call(this.resourceBuyPriceAdjustment, resourceId))
                        continue;
                    var resource = this.world.resources[resourceId];
                    if (!resource)
                        continue;
                    var price = resource.basePrice * this.resourceBuyPriceAdjustment[resourceId];
                    buyCommands.push(new ResourceBuyCommand_1.default(resourceId, shipIdAtPort, this.id, price, 1));
                }
                return buyCommands;
            }
        };
        return Port;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Port;
});
//# sourceMappingURL=Port.js.map