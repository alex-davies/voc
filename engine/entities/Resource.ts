import World from 'engine/World';
import {LatLng} from 'util/Coordinates';
import {generateObservable} from "../../util/Observable";
import {Observable} from "../../util/Observable";


export default class Resource{
    public id:string;
    public name:string;
    public basePrice:number;

    constructor(id:string, name:string, basePrice:number){
        this.id = id
        this.name = name;
        this.basePrice = basePrice
    }
}