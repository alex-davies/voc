define(["require", "exports", 'engine/commands/Command', "./MarkerCreateCommand", "./PortCreateCommand", "./ResourceCreateCommand"], function (require, exports, Command_1, MarkerCreateCommand_1, PortCreateCommand_1, ResourceCreateCommand_1) {
    var WorldPopulateCommand = (function () {
        function WorldPopulateCommand() {
        }
        WorldPopulateCommand.prototype.execute = function (world) {
            var commands = [
                new ResourceCreateCommand_1.default("Resource-WoolCloth", "Wool Cloth", 10),
                new ResourceCreateCommand_1.default("Resource-Nutmeg", "Nutmeg", 100),
                new ResourceCreateCommand_1.default("Resource-Mace", "Mace", 80),
                new ResourceCreateCommand_1.default("Resource-Cinnamon", "Mace", 50),
                new MarkerCreateCommand_1.default({ lat: 6.927079, lng: 79.861244 }, "Marker-Ceylon"),
                new MarkerCreateCommand_1.default({ lat: -4.583333, lng: 129.916667 }, "Marker-Banda"),
                new PortCreateCommand_1.default("Marker-Ceylon", "Ceylon", {
                    "Resource-WoolCloth": 0.9
                }, {
                    "Resource-Cinnamon": 1
                }),
                new PortCreateCommand_1.default("Marker-Banda", "Banda Islands", {
                    "Resource-Cinnamon": 1.1,
                    "Resource-WoolCloth": 0.9
                }, {
                    "Resource-Nutmeg": 1,
                    "Resource-NutMace": 1
                }),
            ];
            world.IssueCommand.apply(world, commands);
            return new Command_1.SuccessResult();
        };
        WorldPopulateCommand.prototype.canExecute = function (world) {
            return new Command_1.SuccessResult();
        };
        return WorldPopulateCommand;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = WorldPopulateCommand;
});
//# sourceMappingURL=WorldPopulateCommand.js.map