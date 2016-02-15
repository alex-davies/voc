define(["require", "exports", "util/Hashset", "util/Event", "../util/IdGenerator", "./entities/MarkerSet"], function (require, exports, Hashset_1, Event_1, IdGenerator_1, MarkerSet_1) {
    var World = (function () {
        function World() {
            this.tickNumber = 0;
            this.clock = new Event_1.default();
            this.idGenerator = new IdGenerator_1.default();
            this.ships = new Hashset_1.default(function (s) { return s.id; });
            this.ports = new Hashset_1.default(function (s) { return s.id; });
            this.resources = new Hashset_1.default(function (s) { return s.id; });
            this.markers = new MarkerSet_1.default(this);
            this.commandIssuingDepth = 0;
        }
        World.prototype.IssueCommand = function () {
            var commands = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                commands[_i - 0] = arguments[_i];
            }
            for (var i = 0; i < commands.length; i++) {
                var command = commands[i];
                console.debug(Array(this.commandIssuingDepth).join(">") + 'executing command', command);
                this.commandIssuingDepth++;
                var result = command.execute(this);
                this.commandIssuingDepth--;
                if (!result.isSuccessful)
                    console.debug(Array(this.commandIssuingDepth).join(">") + 'unable to execute command', command, result);
            }
        };
        World.prototype.tick = function () {
            this.clock.trigger(this.tickNumber++);
        };
        return World;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = World;
});
//# sourceMappingURL=World.js.map