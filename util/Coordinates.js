define(["require", "exports"], function (require, exports) {
    var LatLngUtil = (function () {
        function LatLngUtil() {
        }
        LatLngUtil.distance = function (latlng1, latlng2) {
            var dlat = latlng2.lat - latlng1.lat;
            var dlng = latlng2.lng - latlng1.lng;
            return Math.sqrt(dlat * dlat + dlng * dlng);
        };
        return LatLngUtil;
    })();
    exports.LatLngUtil = LatLngUtil;
    var XYUtil = (function () {
        function XYUtil() {
        }
        XYUtil.distance = function (xy1, xy2) {
            var dx = xy2.x - xy1.x;
            var dy = xy2.y - xy1.y;
            return Math.sqrt(dx * dx + dy * dy);
        };
        XYUtil.angleOfLine = function (xy1, xy2) {
            var startRadians = Math.atan((xy2.y - xy1.y) / (xy2.x - xy1.x));
            startRadians += ((xy2.x >= xy1.x) ? -90 : 90) * Math.PI / 180;
            return startRadians;
        };
        XYUtil.rotate = function (rad, center, xys) {
            var translated = [];
            xys.forEach(function (xy) {
                var x = xy.x - center.x;
                var y = xy.y - center.y;
                var tx = x * Math.cos(rad) - y * Math.sin(rad);
                var ty = y * Math.cos(rad) + x * Math.sin(rad);
                tx = tx + center.x;
                ty = ty + center.y;
                translated.push({
                    x: tx,
                    y: ty
                });
            });
            return translated;
        };
        XYUtil.equals = function (xy1, xy2) {
            return xy1 && xy2 && xy1.x === xy2.x && xy1.y === xy2.y;
        };
        return XYUtil;
    })();
    exports.XYUtil = XYUtil;
});
//# sourceMappingURL=Coordinates.js.map