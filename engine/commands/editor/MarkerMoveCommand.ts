import World from 'engine/World';
import Ship from 'engine/entities/Marker';
import {LatLng} from 'util/Coordinates';
import {Command,SuccessResult} from 'engine/commands/Command';
import Marker from "../../entities/Marker";


export default class MarkerMoveCommand implements Command{

    constructor(public markerId:string, public position:LatLng){

    }

    execute(world:World){
        var marker = world.markers.get(this.markerId);
        marker.position(this.position);

        return new SuccessResult()
    }

    canExecute(world:World){
        return new SuccessResult()
    }
}
