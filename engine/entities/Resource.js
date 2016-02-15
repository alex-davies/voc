define(["require", "exports"], function (require, exports) {
    var Resource = (function () {
        function Resource(id, name, basePrice) {
            this.id = id;
            this.name = name;
            this.basePrice = basePrice;
        }
        return Resource;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Resource;
});
//# sourceMappingURL=Resource.js.map