import World from 'engine/World';
import Ship from 'engine/entities/Ship';
import {LatLng} from 'util/Coordinates';
import {Command, SuccessResult, ShipIdNotFoundResult, ResourceIdNotFoundResult, PortIdNotFoundResult} from 'engine/commands/Command';
import {BalanceTooLowResult} from "./Command";

export default class ResourceBuyCommand implements Command{

    constructor(public resourceId:string, public shipId:string, public portId:string, public totalPrice:number, public quantity:number = 1){

    }

    execute(world:World){
        var canExecute = this.canExecute(world)
        if(!canExecute.isSuccessful)
            return canExecute;


        var ship = world.ships.get(this.shipId);
        var port = world.ports.get(this.portId);

        port.balanceInLocalCurrency -= this.totalPrice;
        ship.resourcesInCargo[this.resourceId] = (ship.resourcesInCargo[this.resourceId] || 0) + this.quantity;


        world.ships.put(ship);

        return new SuccessResult();
    }

    canExecute(world:World){
        var resource = world.ports.get(this.resourceId);
        if(!resource) {
            new ResourceIdNotFoundResult(this.resourceId)
        }

        var ship = world.ships.get(this.shipId);
        if(!ship) {
            return new ShipIdNotFoundResult(this.shipId)
        }

        var port = world.ports.get(this.portId);
        if(!port) {
            new PortIdNotFoundResult(this.portId)
        }

        if(port.balanceInLocalCurrency < this.totalPrice){
            return new BalanceTooLowResult();
        }

        return new SuccessResult();
    }
}
