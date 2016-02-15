import World from 'engine/World';
import Ship from 'engine/entities/Marker';
import {LatLng} from 'util/Coordinates';
import {Command,SuccessResult} from 'engine/commands/Command';
import Marker from "../../entities/Marker";


export default class MarkerCreateCommand implements Command{

    constructor(public position:LatLng, public id?:string, public neighbourIds?:string[]){

    }

    execute(world:World){
        var marker = new Marker(world, this.position, this.id, this.neighbourIds);
        world.markers.put(marker);

        return new SuccessResult();
    }

    canExecute(world:World){
        return new SuccessResult();
    }
}
