import World from 'engine/World';
import Ship from 'engine/entities/Marker';
import {LatLng} from 'util/Coordinates';
import {Command, SuccessResult} from 'engine/commands/Command';
import Marker from "../../entities/Marker";

export default class MarkerConnectCommand implements Command{

    constructor(public sourceMarkerId:string, public targetMarkerId:string, public isTwoWay:boolean = true){

    }

    execute(world:World){
        var sourceMarker = world.markers.get(this.sourceMarkerId);
        var targetMarker = world.markers.get(this.targetMarkerId);

        //one of the marks doesnt exist
        if(!sourceMarker || !targetMarker)
            return;

        sourceMarker.neighbourMarkerIds.push(targetMarker.id);
        if(this.isTwoWay)
            targetMarker.neighbourMarkerIds.push(sourceMarker.id);

        return new SuccessResult();
    }

    canExecute(world:World){
        return new SuccessResult();
    }
}
