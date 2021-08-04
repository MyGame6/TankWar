"use strict";
cc._RF.push(module, 'e5945ioSOlDNKrF+nwP7nV4', 'EnemyControl');
// script/EnemyControl.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var EnemyControl = /** @class */ (function (_super) {
    __extends(EnemyControl, _super);
    function EnemyControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bompClip = null;
        return _this;
    }
    // onLoad () {}
    EnemyControl.prototype.start = function () {
    };
    // update (dt) {}
    EnemyControl.prototype.onBeginContact = function () {
        cc.audioEngine.playEffect(this.bompClip, false);
        this.node.destroy();
    };
    __decorate([
        property(cc.AudioClip)
    ], EnemyControl.prototype, "bompClip", void 0);
    EnemyControl = __decorate([
        ccclass
    ], EnemyControl);
    return EnemyControl;
}(cc.Component));
exports.default = EnemyControl;

cc._RF.pop();