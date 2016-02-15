import ShipDisplay from "../entities/ShipDisplay";
import ShipTravelCommand from "../../engine/commands/ShipTravelCommand";
import Camera from "../Camera";
import {XY} from "../../util/Coordinates";
import {XYUtil} from "../../util/Coordinates";
export default class CameraTranslateInteraction{
    private isDragging = false;

    private startDragPoint:XY

    constructor(public camera:Camera){

        //for some reason the camera doesnt play nice with events
        //so we will attach the event to the world itself
        camera.root.interactive = true;

        camera.root.on('mousedown', e=>this.startDrag(e));
        camera.root.on('touchstart', e=>this.startDrag(e));


        camera.root.on('mouseup', e=>this.stopDrag(e));
        camera.root.on('touchend', e=>this.stopDrag(e));
        camera.root.on('mouseupoutside', e=>this.stopDrag(e));
        camera.root.on('touchendoutside', e=>this.stopDrag(e));

        camera.root.on('mousemove', e=>this.doDrag(e));
        camera.root.on('touchmove', e=>this.doDrag(e));
    }

    private startDrag(e){
        this.isDragging = true;
        this.startDragPoint = e.data.global.clone()
    }

    private stopDrag(e){
        this.isDragging = false;
        this.startDragPoint = null;
    }

    private doDrag(e){
        if(this.startDragPoint){

            var newPoint = e.data.global.clone();
            var pointDiffX = (newPoint.x - this.startDragPoint.x) / this.camera.zoom;
            var pointDiffY = (newPoint.y - this.startDragPoint.y) / this.camera.zoom;

            var currentTarget = this.camera.target
            this.camera.target = new PIXI.Point(currentTarget.x - pointDiffX, currentTarget.y - pointDiffY);
            this.camera.update();
            this.startDragPoint = newPoint.clone();
        }
    }


}