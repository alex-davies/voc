import World from 'engine/World';
import Ship from 'engine/entities/Marker';
import {LatLng} from 'util/Coordinates';
import {Command,SuccessResult} from 'engine/commands/Command';
import Marker from "../../entities/Marker";
import {MarkerIdNotFoundResult} from "../Command";
import Port from "../../entities/Port";
import MarkerCreateCommand from "./MarkerCreateCommand";
import PortCreateCommand from "./PortCreateCommand";
import ResourceCreateCommand from "./ResourceCreateCommand";


export default class WorldPopulateCommand implements Command{

    constructor(){

    }

    execute(world:World){
        var commands = [

            new ResourceCreateCommand("Resource-WoolCloth", "Wool Cloth", 10),
            new ResourceCreateCommand("Resource-Nutmeg", "Nutmeg", 100),
            new ResourceCreateCommand("Resource-Mace", "Mace", 80),
            new ResourceCreateCommand("Resource-Cinnamon", "Mace", 50),

            new MarkerCreateCommand({lat:6.927079, lng:79.861244}, "Marker-Ceylon"),
            new MarkerCreateCommand({lat:-4.583333, lng:129.916667}, "Marker-Banda"),

            new PortCreateCommand("Marker-Ceylon", "Ceylon", {
                "Resource-WoolCloth":0.9
            },{
                "Resource-Cinnamon":1
            }),

            new PortCreateCommand("Marker-Banda", "Banda Islands", {
                "Resource-Cinnamon":1.1,
                "Resource-WoolCloth":0.9
            },{
                "Resource-Nutmeg":1,
                "Resource-NutMace":1
            }),
        ]

        world.IssueCommand.apply(world, commands);
        return new SuccessResult();

    }

    canExecute(world:World){
        return new SuccessResult();
    }
}
