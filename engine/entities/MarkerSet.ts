import Hashset from "util/Hashset";
import Marker from "./Marker";
import {LatLngUtil} from "../../util/Coordinates";
import World from "../World";

export default class MarkerSet extends Hashset<Marker>{
    constructor(public world:World){
        super(x=>x.id);
    }

    findPathForShip(shipId:string, targetMarkerId:string):string[]{
        var ship = this.world.ships.get(shipId);

        var startMarkers = [];

        if(ship.travelSourceMarkerId) {
            startMarkers.push(ship.travelSourceMarkerId);
        }

        if(ship.travelTargetMarkerIds.length > 0) {
            startMarkers.push(ship.travelTargetMarkerIds[0]);
        }

        if(startMarkers.length == 0){
            var shipPosition = ship.position();
            var closestMarker = null;
            var closestMarkerDistance = Number.MAX_VALUE;
            this.forEach(marker=>{
                var currentDistance = LatLngUtil.distance(shipPosition, marker.position());
                if(currentDistance < closestMarkerDistance){
                    closestMarkerDistance = currentDistance;
                    closestMarker = marker;
                }
            });
            if(closestMarker) {
                startMarkers.push(closestMarker.id);
            }
        }

        return this.findPath(startMarkers, targetMarkerId);
    }

    findPath(sourceMarkerIds:string[], targetMarkerId:string):string[]{

        var open = sourceMarkerIds;

        var came_from = {};

        var g_score = {};
        for(var i=0;i<sourceMarkerIds.length;i++){
            g_score[sourceMarkerIds[i]] = 0;
        }

        var f_score = {};
        for(var i=0;i<sourceMarkerIds.length;i++) {
            f_score[sourceMarkerIds[i]]= g_score[sourceMarkerIds[i]] + this.distance(sourceMarkerIds[i], targetMarkerId);
        }


        var closedSet = [];

        while(open.length > 0){

            var lowest_index = 0;
            var lowest_node = open[lowest_index];
            var lowest_f_score = f_score[lowest_node];

            for(var i=1;i<open.length;i++) {
                var current_node = open[i];
                var current_f_score = f_score[current_node];
                if(lowest_f_score > current_f_score){
                    lowest_index = i;
                    lowest_f_score = current_f_score;
                    lowest_node = current_node;
                }
            }

            if(lowest_node == targetMarkerId){
                var path = [lowest_node];
                var source = came_from[lowest_node];
                while(source){
                    path.push(source);
                    source = came_from[source];
                }
                path.reverse();
                return path;
            }

            open.splice(lowest_index, 1);
            closedSet.push(lowest_node);

            var neighbours = this.neighbours(lowest_node)
            for(var i=0;i<neighbours.length;i++){
                var neighbour = neighbours[i];

                //dont touch nodes we have processed before
                if(closedSet.indexOf(neighbour) != -1)
                    continue;

                var tentative_g_score = g_score[current_node] + this.distance(lowest_node, neighbour);

                if(open.indexOf(neighbour) === -1){
                    open.push(neighbour)
                }
                else if(tentative_g_score >= g_score[neighbour]){
                    continue; //this is not a better path
                }

                came_from[neighbour] = lowest_node;
                g_score[neighbour] = tentative_g_score;
                f_score[neighbour] = tentative_g_score + this.distance(lowest_node, neighbour);
            }
        }
    }

    distance(sourceMarkerId:string, targetMarkerId:string){
        var sourceMarker = this.get(sourceMarkerId);
        var targetMarker = this.get(targetMarkerId);

        return LatLngUtil.distance(sourceMarker.position(), targetMarker.position());
    }

    neighbours(sourceMarkerId:string){
        var sourceMarker = this.get(sourceMarkerId);
        if(!sourceMarker)
            return [];
        return sourceMarker.neighbourMarkerIds;
    }
}