import * as PIXI from 'pixi.js'
import World from 'engine/World';
import Hashset from "util/Hashset";
import ShipDisplay from 'ui/entities/ShipDisplay';
import MercatorProjection from 'util/MercatorProjection';
import DisplayObject = PIXI.DisplayObject;
import {Change} from "../util/Change";
import {Entity} from "../engine/entities/Entity";
import {EntityDisplay} from "./entities/EntityDisplay";
import MarkerSetDisplay from "./entities/EntityDisplayContainer";
import MarkerDisplay from "./entities/MarkerDisplay";
import EntityDisplayContainer from "./entities/EntityDisplayContainer";
import Marker from "../engine/entities/Marker";
import Ship from "../engine/entities/Ship";
import MarkerDisplaySet from "./entities/MarkerDisplaySet";

export default class WorldDisplay extends PIXI.Container {

    public projection: MercatorProjection;

    public shipDisplays:EntityDisplayContainer<Ship, ShipDisplay>;
    public markerDisplays:MarkerDisplaySet;

    constructor(public world: World) {
        super();

        var latlngWindow = {
            topLeft: {lat:-85, lng: -180},
            bottomRight: {lat:85, lng: 180},
        }
        var xyWindow = {
            topLeft: {x:0,y:0},
            bottomRight: {x:1136, y:640}
        }
        this.projection = new MercatorProjection(latlngWindow, xyWindow);

        this.addWorldMap();

        this.markerDisplays = new MarkerDisplaySet(this);
        this.addChild(this.markerDisplays);

        this.shipDisplays = new EntityDisplayContainer<Ship, ShipDisplay>(
            this,
            this.world.ships,
            ship=>new ShipDisplay(this, ship));
        this.addChild(this.shipDisplays);


    }

    private addWorldMap(){
        // create a texture from an image path
        var texture = PIXI.Texture.fromImage("/ui/assets/map.svg");
        // create a new Sprite using the texture
        var mapSprite = new PIXI.Sprite(texture);

        // center the sprites anchor point
        //mapSprite.anchor.x = 0;
        //mapSprite.anchor.y = 0;
        //
        //mapSprite.x = 0;
        //mapSprite.y = 0;
        //
        //mapSprite.width = this.width;
        //mapSprite.height = this.height

        this.addChild(mapSprite);
    }

    public tick(){

    }



}