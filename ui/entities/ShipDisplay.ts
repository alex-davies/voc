import * as PIXI from 'pixi.js'
import Ship from 'engine/entities/Ship';
import WorldDisplay from 'ui/WorldDisplay';
import {EntityDisplay} from "./EntityDisplay";
import {Entity} from "../../engine/entities/Entity";
import ShipTravelCommand from "../../engine/commands/ShipTravelCommand";
import ShipTravelInteraction from "../interactions/ShipTravelInteraction";

export default class ShipDisplay extends PIXI.Container implements EntityDisplay {
    public worldDisplay:WorldDisplay;
    public entity:Ship;

    constructor(worldDisplay: WorldDisplay, ship: Ship) {
        super();

        this.worldDisplay = worldDisplay;
        this.entity = ship;

        // create a texture from an image path
        var texture = PIXI.Texture.fromImage("/ui/assets/sprites/ship-right.png");
        // create a new Sprite using the texture
        var shipSprite = new PIXI.Sprite(texture);

        // center the sprites anchor point
        shipSprite.anchor.x = 0.5;
        shipSprite.anchor.y = 0.5;

        // move the sprite t the center of the screen
        this.entity.position.observe(change=>{
            var pos = this.worldDisplay.projection.toXY(change.newValue);
            shipSprite.position.x = pos.x;
            shipSprite.position.y = pos.y;
        });

        this.addChild(shipSprite);


        new ShipTravelInteraction(this);
    }





}