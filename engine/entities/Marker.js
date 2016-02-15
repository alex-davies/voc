define(["require", "exports", "../../util/Observable"], function (require, exports, Observable_1) {
    var Marker = (function () {
        function Marker(world, position, id, neighbourIds) {
            this.neighbourMarkerIds = [];
            this.world = world;
            this.position = Observable_1.generateObservable(position);
            this.id = id || world.idGenerator.getNext("marker");
            this.neighbourMarkerIds = neighbourIds || [];
        }
        return Marker;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Marker;
});
//# sourceMappingURL=Marker.js.map