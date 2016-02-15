var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "util/Hashset", "../../util/Coordinates"], function (require, exports, Hashset_1, Coordinates_1) {
    var MarkerSet = (function (_super) {
        __extends(MarkerSet, _super);
        function MarkerSet(world) {
            _super.call(this, function (x) { return x.id; });
            this.world = world;
        }
        MarkerSet.prototype.findPathForShip = function (shipId, targetMarkerId) {
            var ship = this.world.ships.get(shipId);
            var startMarkers = [];
            if (ship.travelSourceMarkerId) {
                startMarkers.push(ship.travelSourceMarkerId);
            }
            if (ship.travelTargetMarkerIds.length > 0) {
                startMarkers.push(ship.travelTargetMarkerIds[0]);
            }
            if (startMarkers.length == 0) {
                var shipPosition = ship.position();
                var closestMarker = null;
                var closestMarkerDistance = Number.MAX_VALUE;
                this.forEach(function (marker) {
                    var currentDistance = Coordinates_1.LatLngUtil.distance(shipPosition, marker.position());
                    if (currentDistance < closestMarkerDistance) {
                        closestMarkerDistance = currentDistance;
                        closestMarker = marker;
                    }
                });
                if (closestMarker) {
                    startMarkers.push(closestMarker.id);
                }
            }
            return this.findPath(startMarkers, targetMarkerId);
        };
        MarkerSet.prototype.findPath = function (sourceMarkerIds, targetMarkerId) {
            var open = sourceMarkerIds;
            var came_from = {};
            var g_score = {};
            for (var i = 0; i < sourceMarkerIds.length; i++) {
                g_score[sourceMarkerIds[i]] = 0;
            }
            var f_score = {};
            for (var i = 0; i < sourceMarkerIds.length; i++) {
                f_score[sourceMarkerIds[i]] = g_score[sourceMarkerIds[i]] + this.distance(sourceMarkerIds[i], targetMarkerId);
            }
            var closedSet = [];
            while (open.length > 0) {
                var lowest_index = 0;
                var lowest_node = open[lowest_index];
                var lowest_f_score = f_score[lowest_node];
                for (var i = 1; i < open.length; i++) {
                    var current_node = open[i];
                    var current_f_score = f_score[current_node];
                    if (lowest_f_score > current_f_score) {
                        lowest_index = i;
                        lowest_f_score = current_f_score;
                        lowest_node = current_node;
                    }
                }
                if (lowest_node == targetMarkerId) {
                    var path = [lowest_node];
                    var source = came_from[lowest_node];
                    while (source) {
                        path.push(source);
                        source = came_from[source];
                    }
                    path.reverse();
                    return path;
                }
                open.splice(lowest_index, 1);
                closedSet.push(lowest_node);
                var neighbours = this.neighbours(lowest_node);
                for (var i = 0; i < neighbours.length; i++) {
                    var neighbour = neighbours[i];
                    //dont touch nodes we have processed before
                    if (closedSet.indexOf(neighbour) != -1)
                        continue;
                    var tentative_g_score = g_score[current_node] + this.distance(lowest_node, neighbour);
                    if (open.indexOf(neighbour) === -1) {
                        open.push(neighbour);
                    }
                    else if (tentative_g_score >= g_score[neighbour]) {
                        continue; //this is not a better path
                    }
                    came_from[neighbour] = lowest_node;
                    g_score[neighbour] = tentative_g_score;
                    f_score[neighbour] = tentative_g_score + this.distance(lowest_node, neighbour);
                }
            }
        };
        MarkerSet.prototype.distance = function (sourceMarkerId, targetMarkerId) {
            var sourceMarker = this.get(sourceMarkerId);
            var targetMarker = this.get(targetMarkerId);
            return Coordinates_1.LatLngUtil.distance(sourceMarker.position(), targetMarker.position());
        };
        MarkerSet.prototype.neighbours = function (sourceMarkerId) {
            var sourceMarker = this.get(sourceMarkerId);
            if (!sourceMarker)
                return [];
            return sourceMarker.neighbourMarkerIds;
        };
        return MarkerSet;
    })(Hashset_1.default);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = MarkerSet;
});
//# sourceMappingURL=MarkerSet.js.map