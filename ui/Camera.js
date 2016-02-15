var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'pixi.js'], function (require, exports, PIXI) {
    var Camera = (function (_super) {
        __extends(Camera, _super);
        function Camera(world) {
            _super.call(this);
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
        Camera.prototype.update = function () {
            var x = (this.target.x * this.zoom) - (this.width / 2);
            var y = (this.target.y * this.zoom) - (this.height / 2);
            this.frustrum.x = x / this.zoom;
            this.frustrum.y = y / this.zoom;
            this._constrainFrustrum();
            this.root.position.set(-this.frustrum.x * this.zoom, -this.frustrum.y * this.zoom);
        };
        Camera.prototype._scaleFrustrum = function () {
            this.frustrum.width = this.viewport.width / this.zoom;
            this.frustrum.height = this.viewport.height / this.zoom;
        };
        ;
        /**
         * make sure the frustrum is contained by the bounds (if set)
         * @private
         */
        Camera.prototype._constrainFrustrum = function () {
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
        ;
        /**
         * update the mask if the viewport changes
         * @private
         */
        Camera.prototype._redrawMask = function () {
            this.graphicsMask.beginFill(0x000000);
            this.graphicsMask.drawRect(0, 0, this.viewport.width, this.viewport.height);
            this.graphicsMask.endFill();
        };
        ;
        Object.defineProperty(Camera.prototype, "width", {
            get: function () {
                return this.viewport.width;
            },
            set: function (value) {
                this.viewport.width = value;
                this._scaleFrustrum();
                this._constrainFrustrum();
                this._redrawMask();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Camera.prototype, "height", {
            get: function () {
                return this.viewport.height;
            },
            set: function (value) {
                this.viewport.height = value;
                this._scaleFrustrum();
                this._constrainFrustrum();
                this._redrawMask();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Camera.prototype, "zoom", {
            get: function () {
                return this._zoom;
            },
            set: function (level) {
                this._zoom = level;
                this.root.scale.set(level);
                this._scaleFrustrum();
                this._constrainFrustrum();
            },
            enumerable: true,
            configurable: true
        });
        return Camera;
    })(PIXI.Container);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Camera;
});
//# sourceMappingURL=Camera.js.map