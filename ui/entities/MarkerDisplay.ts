import WorldDisplay from "../WorldDisplay";
import Marker from "../../engine/entities/Marker";
import {EntityDisplay} from "./EntityDisplay";
import {XY} from "../../util/Coordinates";
export default class MarkerDisplay extends PIXI.Container implements EntityDisplay{

    public worldDisplay:WorldDisplay;
    public entity:Marker;

    private graphics:PIXI.Graphics;

    constructor(worldDisplay:WorldDisplay, marker:Marker){
        super();
        this.worldDisplay = worldDisplay;
        this.entity = marker;



        this.graphics = new PIXI.Graphics();
        this.graphics.lineStyle(2, 0x0000FF, 1);
        this.graphics.drawCircle(0, 0, 7);

        this.graphics.lineStyle(0, 0x0000FF, 1);
        this.graphics.beginFill(0x0000FF);
        this.graphics.drawCircle(0,0, 5);
        this.graphics.endFill();


        marker.position.observe(change=>{
            var xy = worldDisplay.projection.toXY(change.newValue);
            this.x = xy.x;
            this.y = xy.y;

        });

        this.addChild(this.graphics);
    }

    public containsPoint(point:XY){
        return this.graphics.containsPoint(new PIXI.Point(point.x, point.y));
    }
}