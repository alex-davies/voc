var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./Camera", "./interactions/CameraTranslateInteraction", "./components/ToggleButton", 'pixi.js', "./interactions/editor/MarkerCreateInteraction"], function (require, exports, Camera_1, CameraTranslateInteraction_1, ToggleButton_1, PIXI, MarkerCreateInteraction_1) {
    var Hud = (function (_super) {
        __extends(Hud, _super);
        function Hud(worldDisplay) {
            _super.call(this);
            this.worldDisplay = worldDisplay;
            var container = new PIXI.Container();
            this.camera = new Camera_1.default(worldDisplay);
            this.camera.width = 1136;
            this.camera.height = 640;
            this.camera.zoom = 1;
            this.camera.target = new PIXI.Point(500, 300);
            this.camera.update();
            container.addChild(this.camera);
            new CameraTranslateInteraction_1.default(this.camera);
            this.addChild(container);
            var createMarkerInteraction = new MarkerCreateInteraction_1.default(worldDisplay, false);
            var toggle = new ToggleButton_1.ToggleButton();
            toggle.x = 100;
            toggle.y = 600;
            toggle.on('click', function (e) {
                createMarkerInteraction.isEnabled = toggle.pressed;
            });
            this.addChild(toggle);
        }
        return Hud;
    })(PIXI.Container);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Hud;
});
//# sourceMappingURL=Hud.js.map