import ShipDisplay from "../entities/ShipDisplay";
import ShipTravelCommand from "../../engine/commands/ShipTravelCommand";
import WorldDisplay from "../../WorldDisplay";
import MarkerCreateCommand from "../../../engine/commands/editor/MarkerCreateCommand";
import MarkerDisplay from "../../entities/MarkerDisplay";
import {XY} from "../../../util/Coordinates";
import MarkerMoveCommand from "../../../engine/commands/editor/MarkerMoveCommand";
import {XYUtil} from "../../../util/Coordinates";
import MarkerConnectCommand from "../../../engine/commands/editor/MarkerConnectCommand";
export default class CreateMarkerInteraction{

    private mouseDownPoint:XY;
    private mouseDownMarker:MarkerDisplay;
    private selectedMarker:MarkerDisplay;

    constructor(public worldDisplay:WorldDisplay, public isEnabled = false){
        worldDisplay.interactive = true;
        //worldDisplay.on('click', e=>this.click(e));


        worldDisplay.on('mousedown', e=>this.mouseDown(e));
        worldDisplay.on('mouseup', e=>this.mouseUp(e));
        worldDisplay.on('mousemove', e=>this.mouseMove(e));

    }

    private mouseDown(e){

        this.mouseDownPoint = e.data.global.clone();
        this.mouseDownMarker = this.worldDisplay.markerDisplays.findMarkerDisplayAtPoint(e.data.global);
    }

    private mouseUp(e:PIXI.interaction.InteractionEvent){
        var mouseUpPoint = e.data.global;

        //if we are mouse up on the same mousedown point its a click
        if(XYUtil.equals(this.mouseDownPoint, mouseUpPoint)){
            if(this.mouseDownMarker){
                //we are click on an existin marker, lets select it
                if(this.selectedMarker){
                    var sourceMarkerId = this.selectedMarker.entity.id;
                    var targetMarkerId = this.mouseDownMarker.entity.id;
                    this.worldDisplay.world.IssueCommand(new MarkerConnectCommand(sourceMarkerId, targetMarkerId))
                    this.worldDisplay.markerDisplays.reDrawNeighbourArrows();
                }
                this.selectedMarker = this.mouseDownMarker
            }
            else{
                //we are click on empty space, lets create a new marker
                var worldPoint = this.worldDisplay.toLocal(e.data.global);
                var latlng = this.worldDisplay.projection.toLatLng(worldPoint);

                this.worldDisplay.world.IssueCommand(new MarkerCreateCommand(latlng));
            }
        }


        this.mouseDownMarker = null;
        this.mouseDownPoint = null;

    }

    private mouseMove(e){
        if(this.mouseDownMarker){
            e.stopPropagation();

            var mouseMovePoint = e.data.global.clone();
            var worldPoint = this.worldDisplay.toLocal(mouseMovePoint);

            var markerId = this.mouseDownMarker.entity.id;
            var latlng = this.worldDisplay.projection.toLatLng(worldPoint);

            this.worldDisplay.world.IssueCommand(new MarkerMoveCommand(markerId, latlng));
            this.worldDisplay.markerDisplays.reDrawNeighbourArrows();
        }
    }

    private click(e){
        if(!this.isEnabled)
            return;
        var worldDisplay = this.worldDisplay;

        var worldPoint = worldDisplay.toLocal(e.data.global);
        var latlng = worldDisplay.projection.toLatLng(worldPoint);

        worldDisplay.world.IssueCommand(new MarkerCreateCommand(latlng));
    }
}