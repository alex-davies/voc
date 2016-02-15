define(["require", "exports", 'engine/commands/Command', "../Command", "../../entities/Port", "../Command", "lodash"], function (require, exports, Command_1, Command_2, Port_1, Command_3, _) {
    var PortCreateCommand = (function () {
        function PortCreateCommand(markerId, name, resourceBuyPriceAdjustments, resourceSellPriceAdjustments) {
            this.markerId = markerId;
            this.name = name;
            this.resourceBuyPriceAdjustments = resourceBuyPriceAdjustments;
            this.resourceSellPriceAdjustments = resourceSellPriceAdjustments;
        }
        PortCreateCommand.prototype.execute = function (world) {
            var canExecute = this.canExecute(world);
            if (!canExecute.isSuccessful)
                return canExecute;
            var port = new Port_1.default(world, this.markerId);
            port.name = this.name;
            world.ports.put(port);
            return new Command_1.SuccessResult();
        };
        PortCreateCommand.prototype.canExecute = function (world) {
            var marker = world.markers.get(this.markerId);
            if (!marker) {
                new Command_2.MarkerIdNotFoundResult(this.markerId);
            }
            var result = null;
            _.forOwn(this.resourceBuyPriceAdjustments, function (value, key) {
                if (!world.resources.containsHash(key)) {
                    result = new Command_3.ResourceIdNotFoundResult(key);
                    return false;
                }
            });
            if (result)
                return result;
            return new Command_1.SuccessResult();
        };
        return PortCreateCommand;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = PortCreateCommand;
});
//# sourceMappingURL=PortCreateCommand.js.map