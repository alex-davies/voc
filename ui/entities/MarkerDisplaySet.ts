import WorldDisplay from "../WorldDisplay";
import Marker from "../../engine/entities/Marker";
import {EntityDisplay} from "./EntityDisplay";
import EntityDisplayContainer from "./EntityDisplayContainer";
import MarkerDisplay from "./MarkerDisplay";
import {XY, XYUtil} from "../../util/Coordinates";
import Graphics = PIXI.Graphics;
export default class MarkerDisplaySet extends EntityDisplayContainer<Marker, MarkerDisplay>{

    public worldDisplay:WorldDisplay;
    public graphics:Graphics;

    constructor(worldDisplay:WorldDisplay){
        super(worldDisplay,
            worldDisplay.world.markers,
            m=>new MarkerDisplay(worldDisplay, m));


        this.worldDisplay = worldDisplay;

        worldDisplay.world.markers.observe(change=>this.reDrawNeighbourArrows(), true);



        this.reDrawNeighbourArrows();
    }

    public reDrawNeighbourArrows(){

        if(!this.graphics){
            this.graphics = new PIXI.Graphics();
            this.addChild(this.graphics);
        }
        var graphics = this.graphics;
        graphics.clear();

        graphics.beginFill(0xFF0000);
        graphics.lineStyle(3, 0xFF0000);
        this.childLookup.forEach(source=>{
            source.entity.neighbourMarkerIds.forEach(destId=>{
                var dest = this.childLookup.get(destId);
                if(dest) {
                    graphics.moveTo(source.x, source.y);
                    graphics.lineTo(dest.x, dest.y);

                    var angle = XYUtil.angleOfLine(source, dest);
                    var arrowHead = XYUtil.rotate(angle, {x:0,y:0}, [
                        {x:-4, y:-6},
                        {x:4, y:-6},
                        {x:0,y:0}
                    ])

                    arrowHead.forEach(xy=>{
                       graphics.lineTo(xy.x+dest.x, xy.y+dest.y);
                    });
                }
            })
        });
    }

    public findClosestMarkerDisplay(xy:XY):MarkerDisplay{

        var markerDisplays = this.childLookup.entries();

        var closestMarkerDisplay;
        var closestDistance = Number.MAX_VALUE;
        for(var i=0;i<markerDisplays.length;i++){
            var marker = markerDisplays[i];
            var distance =    XYUtil.distance(marker, xy);
            if(distance < closestDistance){
                closestDistance = distance;
                closestMarkerDisplay = marker;
            }

        }

        return closestMarkerDisplay;
    }

    public findMarkerDisplayAtPoint(xy:XY):MarkerDisplay{
        var markerDisplays = this.childLookup.entries();
        for(var i=0;i<markerDisplays.length;i++) {
            if(markerDisplays[i].containsPoint(xy))
                return markerDisplays[i];
        }
    }
}