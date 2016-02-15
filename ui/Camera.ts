import * as PIXI from 'pixi.js'
import Graphics = PIXI.Graphics;

export default class Camera extends PIXI.Container{

    public world:PIXI.DisplayObject;
    public root:PIXI.Container;
    public target:PIXI.Point;
    public viewport:PIXI.Rectangle;
    public frustrum:PIXI.Rectangle;
    public bounded:boolean;

    private graphicsMask:Graphics;
    private _zoom:number;

    constructor(world:PIXI.DisplayObject){
        super()
        this.world = world;

        this.root = new PIXI.Container();

        this.target = new PIXI.Point();

        this.graphicsMask = new PIXI.Graphics();
        this.mask = this.graphicsMask;
        this.viewport = new PIXI.Rectangle(0, 0, 300, 300);
        this.frustrum = this.viewport.clone();

        this.bounded = false;

        this._redrawMask();

        this.addChild(this.root);
        this.addChild(this.mask);

        this.root.addChild(this.world);

    }

    update() {

        var x = (this.target.x * this.zoom) - (this.width / 2);
        var y = (this.target.y * this.zoom) - (this.height / 2);

        this.frustrum.x = x / this.zoom;
        this.frustrum.y = y / this.zoom;

        this._constrainFrustrum();

        this.root.position.set(
            -this.frustrum.x * this.zoom,
            -this.frustrum.y * this.zoom
        );
    }

    private _scaleFrustrum() {

        this.frustrum.width = this.viewport.width / this.zoom;
        this.frustrum.height = this.viewport.height / this.zoom;
    };

    /**
     * make sure the frustrum is contained by the bounds (if set)
     * @private
     */
    private _constrainFrustrum() {

        if (!this.bounded) {
            return;
        }

        if (this.frustrum.x < this._bounds.x) {
            this.frustrum.x = this._bounds.x;
        }

        if (this.frustrum.y < this._bounds.y) {
            this.frustrum.y = this._bounds.y;
        }

        if (this.frustrum.x + this.frustrum.width > this._bounds.x + this._bounds.width) {
            this.frustrum.x = this._bounds.x + this._bounds.width - this.frustrum.width;
        }

        if (this.frustrum.y + this.frustrum.height > this._bounds.y + this._bounds.height) {
            this.frustrum.y = this._bounds.y + this._bounds.height - this.frustrum.height;
        }
    };

    /**
     * update the mask if the viewport changes
     * @private
     */
    private _redrawMask() {
        this.graphicsMask.beginFill(0x000000);
        this.graphicsMask.drawRect(0, 0, this.viewport.width, this.viewport.height);
        this.graphicsMask.endFill();
    };


    get width():number {
        return this.viewport.width;
    }

    set  width (value) {
        this.viewport.width = value;
        this._scaleFrustrum();
        this._constrainFrustrum();
        this._redrawMask();
    }


    get height():number {
        return this.viewport.height;
    }

    set height(value:number) {

        this.viewport.height = value;
        this._scaleFrustrum();
        this._constrainFrustrum();
        this._redrawMask();
    }

    get zoom():number {

        return this._zoom;
    }

    set zoom(level:number) {

        this._zoom = level;
        this.root.scale.set(level);
        this._scaleFrustrum();
        this._constrainFrustrum();
    }
}