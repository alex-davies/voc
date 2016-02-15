define(["require", "exports", "../../util/Observable"], function (require, exports, Observable_1) {
    var Ship = (function () {
        function Ship(world, position) {
            var _this = this;
            this.speed = 0.5;
            this.travelTargetMarkerIds = [];
            this.world = world;
            this.position = Observable_1.generateObservable(position);
            this.id = world.idGenerator.getNext("ship");
            this.world.clock.addListener(function (x) { return _this.travel(); });
        }
        Ship.prototype.isAtMarker = function (markerId) {
            return this.travelTargetMarkerIds.length === 0 && this.travelSourceMarkerId === markerId;
        };
        Ship.prototype.travel = function () {
            //we have nowhere to travel to
            if (this.travelTargetMarkerIds.length == 0)
                return;
            var currentPosition = this.position();
            var targetMarker = this.world.markers.get(this.travelTargetMarkerIds[0]);
            var targetPosition = targetMarker.position();
            var dlat = (targetPosition.lat - currentPosition.lat);
            var dlng = (targetPosition.lng - currentPosition.lng);
            var dlength = Math.sqrt((dlat * dlat) + (dlng * dlng));
            var numberOfTicks = Math.round(dlength / this.speed);
            if (numberOfTicks == 0) {
                //if it takes less than a tick to get there we are there already
                this.position(targetPosition);
                this.travelSourceMarkerId = targetMarker.id;
                this.travelTargetMarkerIds.shift();
            }
            else {
                //not there yet move a fraction of the way.
                //if it will take us 8 ticks move 1/8 of the way
                this.position({
                    lat: currentPosition.lat + dlat / numberOfTicks,
                    lng: currentPosition.lng + dlng / numberOfTicks,
                });
            }
        };
        return Ship;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Ship;
});
//# sourceMappingURL=Ship.js.map