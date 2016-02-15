var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "../../util/Hashset"], function (require, exports, Hashset_1) {
    var EntityDisplayContainer = (function (_super) {
        __extends(EntityDisplayContainer, _super);
        function EntityDisplayContainer(worldDisplay, entitySet, create) {
            var _this = this;
            _super.call(this);
            this.childLookup = new Hashset_1.default(function (x) { return x.entity.id; });
            this.worldDisplay = worldDisplay;
            this.entitySet = entitySet;
            this.createFunction = create;
            this.entitySet.observe(function (change) {
                //we are adding a ship
                if (change.newValue && !_this.childLookup.containsHash(change.newValue.id)) {
                    var entityDisplayToAdd = create(change.newValue);
                    _this.addChild(entityDisplayToAdd);
                    _this.childLookup.put(entityDisplayToAdd);
                }
                else if (!change.newValue && _this.childLookup.containsHash(change.oldValue.id)) {
                    var entityDisplayToRemove = _this.childLookup.get(change.oldValue.id);
                    _this.removeChild(entityDisplayToRemove);
                }
            });
        }
        return EntityDisplayContainer;
    })(PIXI.Container);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = EntityDisplayContainer;
});
//# sourceMappingURL=EntityDisplayContainer.js.map