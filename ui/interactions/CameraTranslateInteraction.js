define(["require", "exports"], function (require, exports) {
    var CameraTranslateInteraction = (function () {
        function CameraTranslateInteraction(camera) {
            var _this = this;
            this.camera = camera;
            this.isDragging = false;
            //for some reason the camera doesnt play nice with events
            //so we will attach the event to the world itself
            camera.root.interactive = true;
            camera.root.on('mousedown', function (e) { return _this.startDrag(e); });
            camera.root.on('touchstart', function (e) { return _this.startDrag(e); });
            camera.root.on('mouseup', function (e) { return _this.stopDrag(e); });
            camera.root.on('touchend', function (e) { return _this.stopDrag(e); });
            camera.root.on('mouseupoutside', function (e) { return _this.stopDrag(e); });
            camera.root.on('touchendoutside', function (e) { return _this.stopDrag(e); });
            camera.root.on('mousemove', function (e) { return _this.doDrag(e); });
            camera.root.on('touchmove', function (e) { return _this.doDrag(e); });
        }
        CameraTranslateInteraction.prototype.startDrag = function (e) {
            this.isDragging = true;
            this.startDragPoint = e.data.global.clone();
        };
        CameraTranslateInteraction.prototype.stopDrag = function (e) {
            this.isDragging = false;
            this.startDragPoint = null;
        };
        CameraTranslateInteraction.prototype.doDrag = function (e) {
            if (this.startDragPoint) {
                var newPoint = e.data.global.clone();
                var pointDiffX = (newPoint.x - this.startDragPoint.x) / this.camera.zoom;
                var pointDiffY = (newPoint.y - this.startDragPoint.y) / this.camera.zoom;
                var currentTarget = this.camera.target;
                this.camera.target = new PIXI.Point(currentTarget.x - pointDiffX, currentTarget.y - pointDiffY);
                this.camera.update();
                this.startDragPoint = newPoint.clone();
            }
        };
        return CameraTranslateInteraction;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = CameraTranslateInteraction;
});
//# sourceMappingURL=CameraTranslateInteraction.js.map