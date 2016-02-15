import World from 'engine/World';
import Ship from 'engine/entities/Ship';
import {LatLng} from 'util/Coordinates';
import {Command, SuccessResult} from 'engine/commands/Command';

export default class ShipBuildCommand implements Command{

    constructor(public position:LatLng){

    }

    execute(world:World){
        var ship = new Ship(world, this.position);
        world.ships.put(ship);
        return new SuccessResult();
    }

    canExecute(world:World){
        return new SuccessResult();
    }
}
