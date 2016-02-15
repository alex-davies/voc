import * as PIXI from 'pixi.js'
import {XY} from "../../util/Coordinates";
import EventUtil from "../EventUtil";

export class ToggleButton extends PIXI.Container{
    public graphics:PIXI.Graphics;
    public pressed:boolean = false;

    private clickDownPoint:XY;

    constructor(){
        super();

        var textSample = new PIXI.Text('button', { align: 'center' });
        textSample.anchor.x = 0.5;
        textSample.anchor.y = 0.5;
        //textSample.width = 100;
        //textSample.height = 50;
        //textSample.x = -50;

        this.graphics = new PIXI.Graphics();
        this.graphics.lineStyle(4, 0x000000, 1);
        this.graphics.beginFill(0xFFFFFF);
        this.graphics.drawRect(-50,-20,100,40);
        this.graphics.endFill();
        this.update();

        this.addChild(this.graphics);
        this.addChild(textSample);

        this.interactive = true;
        this.on('click', e=>{
            this.pressed = !this.pressed
            this.update();
        })

    }

    private clickDown(e){
        this.clickDownPoint = e.data.global.clone();
    }

    private clickUp(e){
        var clickDown = this.clickDownPoint;
        var clickUp = e.data.global;
        if(clickDown && clickDown.x === clickUp.x && clickDown.y === clickUp.y){
            this.emit('click', e)
        }
        this.clickDown = null;
    }

    private update(){
        this.graphics.tint = this.pressed ? 0x00FF00 : 0xFFFFFF;
    }




}