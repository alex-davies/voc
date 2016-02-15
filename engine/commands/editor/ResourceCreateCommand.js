define(["require", "exports", 'engine/commands/Command', "../../entities/Resource"], function (require, exports, Command_1, Resource_1) {
    var ResourceCreateCommand = (function () {
        function ResourceCreateCommand(id, name, basePrice) {
            this.id = id;
            this.name = name;
            this.basePrice = basePrice;
        }
        ResourceCreateCommand.prototype.execute = function (world) {
            var canExecute = this.canExecute(world);
            if (!canExecute.isSuccessful)
                return canExecute;
            var resource = new Resource_1.default(this.id, this.name, this.basePrice);
            world.resources.put(resource);
            return new Command_1.SuccessResult();
        };
        ResourceCreateCommand.prototype.canExecute = function (world) {
            return new Command_1.SuccessResult();
        };
        return ResourceCreateCommand;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = ResourceCreateCommand;
});
//# sourceMappingURL=ResourceCreateCommand.js.map