import World from "../engine/World";
import WorldDisplay from "./WorldDisplay";
import Camera from "./Camera";
import CameraTranslateInteraction from "./interactions/CameraTranslateInteraction";
import {ToggleButton} from "./components/ToggleButton";
import * as PIXI from 'pixi.js'
import CreateMarkerInteraction from "./interactions/editor/MarkerCreateInteraction";

export default class Hud extends PIXI.Container{

    public camera:Camera;

    constructor(public worldDisplay:WorldDisplay){
        super();


        var container = new PIXI.Container();
        this.camera = new Camera(worldDisplay);
        this.camera.width = 1136;
        this.camera.height = 640;
        this.camera.zoom =1;
        this.camera.target = new PIXI.Point(500,300);
        this.camera.update();
        container.addChild(this.camera);
        new CameraTranslateInteraction(this.camera);
        this.addChild(container)


        var createMarkerInteraction = new CreateMarkerInteraction(worldDisplay, false);
        var toggle = new ToggleButton();
        toggle.x = 100;
        toggle.y = 600;
        toggle.on('click', e=>{
            createMarkerInteraction.isEnabled = toggle.pressed;
        })
        this.addChild(toggle);

    }
}