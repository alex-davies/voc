import {LatLng} from "util/Coordinates";
import World from "World";
import {Observable,generateObservable} from "../../util/Observable";

export default class Marker{
    public id:string;
    public world:World;
    public position:Observable<LatLng>;

    public neighbourMarkerIds:string[] = []

    constructor(world:World, position:LatLng, id?:string, neighbourIds?:string[]){
        this.world = world;
        this.position = generateObservable(position);
        this.id = id || world.idGenerator.getNext("marker");
        this.neighbourMarkerIds = neighbourIds || [];
    }
}