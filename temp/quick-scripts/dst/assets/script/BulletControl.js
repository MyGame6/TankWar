
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/BulletControl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxCdWxsZXRDb250cm9sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNNLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTJDLGlDQUFZO0lBQXZEOztJQXdCQSxDQUFDO0lBdEJHLGVBQWU7SUFFZiw2QkFBSyxHQUFMO1FBQ0ksUUFBUTtRQUNSLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyRCxhQUFhO1FBQ2IsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEMsVUFBVTtRQUNWLFNBQVM7UUFDVCxJQUFJLEtBQUssR0FBaUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDMUQsVUFBVTtRQUNWLElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQztRQUNoQixLQUFLLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQsMENBQTBDO0lBQzFDLGFBQWE7SUFDYixzQ0FBYyxHQUFkO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBckJnQixhQUFhO1FBRGpDLE9BQU87T0FDYSxhQUFhLENBd0JqQztJQUFELG9CQUFDO0NBeEJELEFBd0JDLENBeEIwQyxFQUFFLENBQUMsU0FBUyxHQXdCdEQ7a0JBeEJvQixhQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdWxsZXRDb250cm9sIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICAvLyBvbkxvYWQgKCkge31cclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICAvLyDop5LluqbovazlvKfluqZcclxuICAgICAgICBsZXQgciA9IGNjLm1pc2MuZGVncmVlc1RvUmFkaWFucyh0aGlzLm5vZGUucm90YXRpb24pO1xyXG4gICAgICAgIC8vIOWbuuWumueul+azle+8jOW8p+W6pui9rOWQkemHj1xyXG4gICAgICAgIGxldCB2MiA9IGNjLnYyKDAsIDEpLnJvdGF0ZSgtcik7XHJcbiAgICAgICAgLy8g5oyJ5ZCR6YeP6L+b6KGM56e75YqoXHJcbiAgICAgICAgLy8gMeOAgeaLv+WIsOWImuS9k1xyXG4gICAgICAgIGxldCByQm9keTogY2MuUmlnaWRCb2R5ID0gdGhpcy5nZXRDb21wb25lbnQoY2MuUmlnaWRCb2R5KTtcclxuICAgICAgICAvLyAy44CB6K6p5a2Q5by556e75YqoXHJcbiAgICAgICAgbGV0IHNwZWVkID0gMTIwO1xyXG4gICAgICAgIHJCb2R5LmxpbmVhclZlbG9jaXR5ID0gY2MudjIodjIueCAqIHNwZWVkLCB2Mi55ICogc3BlZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOWcqE5vZGXlkK/nlKjmjqXop6bnm5HlkKwoRW5hYmxlIENvbnRhY3QpIOWQju+8jOaOpeinpuWwseS8mui1sOi/meS4quaWueazlVxyXG4gICAgLy8g5a2Q5by556Kw5Yiw54mp5L2TIOWwsemUgOavgVxyXG4gICAgb25CZWdpbkNvbnRhY3QoKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxyXG59XHJcbiJdfQ==