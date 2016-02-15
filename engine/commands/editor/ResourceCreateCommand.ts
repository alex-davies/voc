import World from 'engine/World';
import Ship from 'engine/entities/Marker';
import {LatLng} from 'util/Coordinates';
import {Command,SuccessResult} from 'engine/commands/Command';
import Marker from "../../entities/Marker";
import {MarkerIdNotFoundResult} from "../Command";
import Port from "../../entities/Port";
import Resource from "../../entities/Resource";
import * as _ from "lodash";


export default class ResourceCreateCommand implements Command{

    constructor(public id:string ,public name:string, public basePrice:number){

    }

    execute(world:World){
        var canExecute = this.canExecute(world)
        if(!canExecute.isSuccessful)
            return canExecute;

        var resource = new Resource(this.id, this.name, this.basePrice);
        world.resources.put(resource);

        return new SuccessResult()
    }

    canExecute(world:World){
        return new SuccessResult();
    }
}
