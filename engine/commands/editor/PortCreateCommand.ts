import World from 'engine/World';
import Ship from 'engine/entities/Marker';
import {LatLng} from 'util/Coordinates';
import {Command,SuccessResult} from 'engine/commands/Command';
import Marker from "../../entities/Marker";
import {MarkerIdNotFoundResult} from "../Command";
import Port from "../../entities/Port";
import {ResourceIdNotFoundResult} from "../Command";
import * as _ from "lodash";


export default class PortCreateCommand implements Command{

    constructor(public markerId:string,
                public name:string,
                public resourceBuyPriceAdjustments:{[resourceId:string]:number},
                public resourceSellPriceAdjustments:{[resourceId:string]:number}){

    }

    execute(world:World){
        var canExecute = this.canExecute(world)
        if(!canExecute.isSuccessful)
            return canExecute;

        var port = new Port(world, this.markerId);
        port.name = this.name;

        world.ports.put(port);

        return new SuccessResult()
    }

    canExecute(world:World){
        var marker = world.markers.get(this.markerId);
        if(!marker) {
            new MarkerIdNotFoundResult(this.markerId)
        }

        var result:ResourceIdNotFoundResult = null;
        _.forOwn(this.resourceBuyPriceAdjustments, (value, key)=>{
            if(!world.resources.containsHash(key)){
                result = new ResourceIdNotFoundResult(key)
                return false;
            }
        });
        if(result)
            return result;

        return new SuccessResult();
    }
}
