import World from 'engine/World';
import {LatLng} from '../../util/Coordinates';
import {Command, SuccessResult} from 'engine/commands/Command';

export default class ShipTravelCommand implements Command{


    constructor(public shipId:string, public targetMarkerId:string){

    }

    execute(world:World){
        var ship = world.ships.get(this.shipId);
        ship.travelTargetMarkerIds = this.calculatePath(world);
        return new SuccessResult();
    }

    calculatePath(world:World){
        return world.markers.findPathForShip(this.shipId, this.targetMarkerId)
    }

    canExecute(world:World){
        return new SuccessResult();
    }


}
