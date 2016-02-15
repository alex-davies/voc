import World from 'engine/World';
import {LatLng} from 'util/Coordinates';
import {generateObservable} from "../../util/Observable";
import {Observable} from "../../util/Observable";


export default class Ship{
    public world:World;
    public id:string;

    public position:Observable<LatLng>;

    public speed = 0.5;

    public travelTargetMarkerIds:string[] = []
    public travelSourceMarkerId:string;

    public resourcesInCargo : { [id: string] : number }

    constructor(world:World, position:LatLng){
        this.world = world;
        this.position = generateObservable(position);
        this.id = world.idGenerator.getNext("ship");

        this.world.clock.addListener(x=>this.travel())
    }

    public isAtMarker(markerId:string):boolean{
        return this.travelTargetMarkerIds.length === 0 && this.travelSourceMarkerId === markerId;
    }

    private travel(){

        //we have nowhere to travel to
        if(this.travelTargetMarkerIds.length == 0)
            return;


        var currentPosition = this.position();
        var targetMarker = this.world.markers.get(this.travelTargetMarkerIds[0])
        var targetPosition = targetMarker.position();


        var dlat = (targetPosition.lat - currentPosition.lat)
        var dlng = (targetPosition.lng - currentPosition.lng)

        var dlength = Math.sqrt((dlat*dlat) + (dlng*dlng));
        var numberOfTicks = Math.round(dlength / this.speed);


        if(numberOfTicks == 0){
            //if it takes less than a tick to get there we are there already
            this.position(targetPosition);
            this.travelSourceMarkerId = targetMarker.id;
            this.travelTargetMarkerIds.shift();
        }
        else{
            //not there yet move a fraction of the way.
            //if it will take us 8 ticks move 1/8 of the way
            this.position( {
                lat: currentPosition.lat + dlat / numberOfTicks,
                lng: currentPosition.lng + dlng / numberOfTicks,
            });
        }
    }
}