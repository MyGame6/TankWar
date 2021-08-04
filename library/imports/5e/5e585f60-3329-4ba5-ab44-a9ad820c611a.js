"use strict";
cc._RF.push(module, '5e5859gMylLpatEqa2CDGEa', 'PlayerControl');
// script/PlayerControl.ts

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
var PlayerControl = /** @class */ (function (_super) {
    __extends(PlayerControl, _super);
    function PlayerControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 子弹预设体
        _this.bullet = null;
        // 子弹发射位置
        _this.firePoint = null;
        // 声音
        _this.moveClip = null;
        _this.shootClip = null;
        // 输入轴
        _this.vertical = 0;
        _this.horizontal = 0;
        // 刚体
        _this.rBody = null;
        return _this;
    }
    PlayerControl.prototype.onLoad = function () {
        // 开户物理特性
        cc.director.getPhysicsManager().enabled = true;
    };
    PlayerControl.prototype.start = function () {
        this.input();
        // 初始化刚体
        this.rBody = this.getComponent(cc.RigidBody);
        // 获得子视图，子弹初始位置的node
        this.firePoint = this.node.getChildByName('firePoint');
    };
    PlayerControl.prototype.update = function (dt) {
        // 移动
        if (this.vertical != 0) {
            // 垂直移动
            this.rBody.linearVelocity = cc.v2(0, 60 * this.vertical);
            // 旋转
            this.node.rotation = this.vertical > 0 ? 0 : 180;
            // 移动声音
            if (cc.audioEngine.isMusicPlaying() == false) {
                cc.audioEngine.playMusic(this.moveClip, true);
            }
        }
        else if (this.horizontal != 0) {
            // 水平移动
            this.rBody.linearVelocity = cc.v2(this.horizontal * 60, 0);
            // 旋转
            this.node.rotation = this.horizontal > 0 ? 90 : 270;
            // 移动声音
            if (cc.audioEngine.isMusicPlaying() == false) {
                cc.audioEngine.playMusic(this.moveClip, true);
            }
        }
        else {
            // 停止移动
            this.rBody.linearVelocity = cc.v2(0, 0);
            // 停止声音
            if (cc.audioEngine.isMusicPlaying() == true) {
                cc.audioEngine.stopMusic();
            }
        }
    };
    // 开火
    PlayerControl.prototype.fire = function () {
        // 声音
        cc.audioEngine.playEffect(this.shootClip, false);
        // 创建子弹
        var blt = cc.instantiate(this.bullet);
        // 子弹发射方向和tank 朝向一致
        blt.rotation = this.node.rotation;
        // 子弹加到当前场景上
        blt.setParent(cc.director.getScene());
        // 子弹的位置
        // 将　firePoint　相对父视图的坐标 转化成 相对 map坐标
        var pos = this.firePoint.convertToWorldSpaceAR(cc.v2(0, 0));
        blt.x = pos.x;
        blt.y = pos.y;
    };
    PlayerControl.prototype.input = function () {
        var _this = this;
        // 按键
        // 按下
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, function (event) {
            if (event.keyCode == cc.macro.KEY.w) {
                console.log('----------- w -----------');
                _this.vertical = 1;
            }
            if (event.keyCode == cc.macro.KEY.s) {
                console.log('----------- s -----------');
                _this.vertical = -1;
            }
            if (event.keyCode == cc.macro.KEY.a) {
                console.log('----------- a -----------');
                _this.horizontal = -1;
            }
            if (event.keyCode == cc.macro.KEY.d) {
                console.log('----------- d -----------');
                _this.horizontal = 1;
            }
            // 按下u键开火
            if (event.keyCode == cc.macro.KEY.u) {
                console.log('----------- u -----------');
                _this.fire();
            }
        });
        // 抬起
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, function (event) {
            if (event.keyCode == cc.macro.KEY.w && _this.vertical == 1) {
                console.log('up----------- w -----------');
                _this.vertical = 0;
            }
            if (event.keyCode == cc.macro.KEY.s && _this.vertical == -1) {
                console.log('up----------- s -----------');
                _this.vertical = 0;
            }
            if (event.keyCode == cc.macro.KEY.a && _this.horizontal == -1) {
                console.log('up----------- a -----------');
                _this.horizontal = 0;
            }
            if (event.keyCode == cc.macro.KEY.d && _this.horizontal == 1) {
                console.log('up----------- d -----------');
                _this.horizontal = 0;
            }
        });
    };
    __decorate([
        property(cc.Prefab)
    ], PlayerControl.prototype, "bullet", void 0);
    __decorate([
        property(cc.AudioClip)
    ], PlayerControl.prototype, "moveClip", void 0);
    __decorate([
        property(cc.AudioClip)
    ], PlayerControl.prototype, "shootClip", void 0);
    PlayerControl = __decorate([
        ccclass
    ], PlayerControl);
    return PlayerControl;
}(cc.Component));
exports.default = PlayerControl;

cc._RF.pop();