import World from 'engine/World';
import {LatLng} from 'util/Coordinates';
import {generateObservable} from "../../util/Observable";
import {Observable} from "../../util/Observable";
import ResourceBuyCommand from "../commands/ResourceBuyCommand";


export default class Port{
    public world:World;
    public id:string;

   public markerId:string;

    public name:string;

    public resourceBuyPriceAdjustment:{ [id: string] : number };

    public balanceInLocalCurrency:number

    constructor(world:World, markerId:string){
        this.world = world;
        this.id = world.idGenerator.getNext("Port");
        this.markerId = markerId;
    }

    public buyResourcePrices(): ResourceBuyCommand[] {
        var buyCommands = [];

        var shipIdsAtPort = [];
        this.world.ships.forEach(ship=> {
            if (ship.isAtMarker(this.markerId))
                shipIdsAtPort.push(ship.id);
        })

        for (var i = 0; i < shipIdsAtPort.length; i++) {
            var shipIdAtPort = shipIdsAtPort[i];

            for (var resourceId in this.resourceBuyPriceAdjustment) {
                if (!Object.prototype.hasOwnProperty.call(this.resourceBuyPriceAdjustment, resourceId))
                    continue;

                var resource = this.world.resources[resourceId];
                if (!resource)
                    continue;

                var price = resource.basePrice * this.resourceBuyPriceAdjustment[resourceId];
                buyCommands.push(new ResourceBuyCommand(resourceId, shipIdAtPort, this.id, price, 1))

            }

            return buyCommands;
        }
    }


}