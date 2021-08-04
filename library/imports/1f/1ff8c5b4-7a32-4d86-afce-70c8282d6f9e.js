"use strict";
cc._RF.push(module, '1ff8cW0ejJNhq/OcMgoLW+e', 'BulletControl');
// script/BulletControl.ts

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
var BulletControl = /** @class */ (function (_super) {
    __extends(BulletControl, _super);
    function BulletControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // onLoad () {}
    BulletControl.prototype.start = function () {
        // 角度转弧度
        var r = cc.misc.degreesToRadians(this.node.rotation);
        // 固定算法，弧度转向量
        var v2 = cc.v2(0, 1).rotate(-r);
        // 按向量进行移动
        // 1、拿到刚体
        var rBody = this.getComponent(cc.RigidBody);
        // 2、让子弹移动
        var speed = 120;
        rBody.linearVelocity = cc.v2(v2.x * speed, v2.y * speed);
    };
    // 在Node启用接触监听(Enable Contact) 后，接触就会走这个方法
    // 子弹碰到物体 就销毁
    BulletControl.prototype.onBeginContact = function () {
        this.node.destroy();
    };
    BulletControl = __decorate([
        ccclass
    ], BulletControl);
    return BulletControl;
}(cc.Component));
exports.default = BulletControl;

cc._RF.pop();