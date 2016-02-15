var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'pixi.js'], function (require, exports, PIXI) {
    var ToggleButton = (function (_super) {
        __extends(ToggleButton, _super);
        function ToggleButton() {
            var _this = this;
            _super.call(this);
            this.pressed = false;
            var textSample = new PIXI.Text('button', { align: 'center' });
            textSample.anchor.x = 0.5;
            textSample.anchor.y = 0.5;
            //textSample.width = 100;
            //textSample.height = 50;
            //textSample.x = -50;
            this.graphics = new PIXI.Graphics();
            this.graphics.lineStyle(4, 0x000000, 1);
            this.graphics.beginFill(0xFFFFFF);
            this.graphics.drawRect(-50, -20, 100, 40);
            this.graphics.endFill();
            this.update();
            this.addChild(this.graphics);
            this.addChild(textSample);
            this.interactive = true;
            this.on('click', function (e) {
                _this.pressed = !_this.pressed;
                _this.update();
            });
        }
        ToggleButton.prototype.clickDown = function (e) {
            this.clickDownPoint = e.data.global.clone();
        };
        ToggleButton.prototype.clickUp = function (e) {
            var clickDown = this.clickDownPoint;
            var clickUp = e.data.global;
            if (clickDown && clickDown.x === clickUp.x && clickDown.y === clickUp.y) {
                this.emit('click', e);
            }
            this.clickDown = null;
        };
        ToggleButton.prototype.update = function () {
            this.graphics.tint = this.pressed ? 0x00FF00 : 0xFFFFFF;
        };
        return ToggleButton;
    })(PIXI.Container);
    exports.ToggleButton = ToggleButton;
});
//# sourceMappingURL=ToggleButton.js.map