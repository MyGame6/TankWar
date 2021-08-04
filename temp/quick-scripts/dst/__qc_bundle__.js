
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__qc_index__.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}
require('./assets/script/BulletControl');
require('./assets/script/EnemyControl');
require('./assets/script/PlayerControl');

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
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/PlayerControl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxQbGF5ZXJDb250cm9sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNNLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTJDLGlDQUFZO0lBQXZEO1FBQUEscUVBNkhDO1FBM0hHLFFBQVE7UUFFUixZQUFNLEdBQWEsSUFBSSxDQUFDO1FBQ3hCLFNBQVM7UUFDVCxlQUFTLEdBQVcsSUFBSSxDQUFDO1FBQ3pCLEtBQUs7UUFFTCxjQUFRLEdBQWdCLElBQUksQ0FBQztRQUU3QixlQUFTLEdBQWdCLElBQUksQ0FBQztRQUU5QixNQUFNO1FBQ04sY0FBUSxHQUFXLENBQUMsQ0FBQztRQUNyQixnQkFBVSxHQUFXLENBQUMsQ0FBQztRQUN2QixLQUFLO1FBQ0wsV0FBSyxHQUFpQixJQUFJLENBQUM7O0lBNEcvQixDQUFDO0lBMUdHLDhCQUFNLEdBQU47UUFDSSxTQUFTO1FBQ1QsRUFBRSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFDbkQsQ0FBQztJQUVELDZCQUFLLEdBQUw7UUFDSSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDYixRQUFRO1FBQ1IsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM3QyxvQkFBb0I7UUFDcEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUQsOEJBQU0sR0FBTixVQUFPLEVBQUU7UUFDTCxLQUFLO1FBQ0wsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsRUFBRTtZQUNwQixPQUFPO1lBQ1AsSUFBSSxDQUFDLEtBQUss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UyxHQTZIdEQ7a0JBN0hvQixhQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXJDb250cm9sIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICAvLyDlrZDlvLnpooTorr7kvZNcclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBidWxsZXQ6Y2MuUHJlZmFiID0gbnVsbDtcclxuICAgIC8vIOWtkOW8ueWPkeWwhOS9jee9rlxyXG4gICAgZmlyZVBvaW50OmNjLk5vZGUgPSBudWxsO1xyXG4gICAgLy8g5aOw6Z+zXHJcbiAgICBAcHJvcGVydHkoY2MuQXVkaW9DbGlwKVxyXG4gICAgbW92ZUNsaXA6Y2MuQXVkaW9DbGlwID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5BdWRpb0NsaXApXHJcbiAgICBzaG9vdENsaXA6Y2MuQXVkaW9DbGlwID0gbnVsbDtcclxuXHJcbiAgICAvLyDovpPlhaXovbRcclxuICAgIHZlcnRpY2FsOiBudW1iZXIgPSAwO1xyXG4gICAgaG9yaXpvbnRhbDogbnVtYmVyID0gMDtcclxuICAgIC8vIOWImuS9k1xyXG4gICAgckJvZHk6IGNjLlJpZ2lkQm9keSA9IG51bGw7XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIC8vIOW8gOaIt+eJqeeQhueJueaAp1xyXG4gICAgICAgIGNjLmRpcmVjdG9yLmdldFBoeXNpY3NNYW5hZ2VyKCkuZW5hYmxlZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy5pbnB1dCgpO1xyXG4gICAgICAgIC8vIOWIneWni+WMluWImuS9k1xyXG4gICAgICAgIHRoaXMuckJvZHkgPSB0aGlzLmdldENvbXBvbmVudChjYy5SaWdpZEJvZHkpO1xyXG4gICAgICAgIC8vIOiOt+W+l+WtkOinhuWbvu+8jOWtkOW8ueWIneWni+S9jee9rueahG5vZGVcclxuICAgICAgICB0aGlzLmZpcmVQb2ludCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnZmlyZVBvaW50Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKGR0KSB7XHJcbiAgICAgICAgLy8g56e75YqoXHJcbiAgICAgICAgaWYgKHRoaXMudmVydGljYWwgIT0gMCkge1xyXG4gICAgICAgICAgICAvLyDlnoLnm7Tnp7vliqhcclxuICAgICAgICAgICAgdGhpcy5yQm9keS5saW5lYXJWZWxvY2l0eSA9IGNjLnYyKDAsIDYwICogdGhpcy52ZXJ0aWNhbCk7XHJcbiAgICAgICAgICAgIC8vIOaXi+i9rFxyXG4gICAgICAgICAgICB0aGlzLm5vZGUucm90YXRpb24gPSB0aGlzLnZlcnRpY2FsID4gMCA/IDAgOiAxODA7XHJcbiAgICAgICAgICAgIC8vIOenu+WKqOWjsOmfs1xyXG4gICAgICAgICAgICBpZihjYy5hdWRpb0VuZ2luZS5pc011c2ljUGxheWluZygpID09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlNdXNpYyh0aGlzLm1vdmVDbGlwLHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmhvcml6b250YWwgIT0gMCkge1xyXG4gICAgICAgICAgICAvLyDmsLTlubPnp7vliqhcclxuICAgICAgICAgICAgdGhpcy5yQm9keS5saW5lYXJWZWxvY2l0eSA9IGNjLnYyKHRoaXMuaG9yaXpvbnRhbCAqIDYwLCAwKTtcclxuICAgICAgICAgICAgLy8g5peL6L2sXHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5yb3RhdGlvbiA9IHRoaXMuaG9yaXpvbnRhbCA+IDAgPyA5MCA6IDI3MDtcclxuICAgICAgICAgICAgLy8g56e75Yqo5aOw6Z+zXHJcbiAgICAgICAgICAgIGlmIChjYy5hdWRpb0VuZ2luZS5pc011c2ljUGxheWluZygpID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5TXVzaWModGhpcy5tb3ZlQ2xpcCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyDlgZzmraLnp7vliqhcclxuICAgICAgICAgICAgdGhpcy5yQm9keS5saW5lYXJWZWxvY2l0eSA9IGNjLnYyKDAsIDApO1xyXG4gICAgICAgICAgICAvLyDlgZzmraLlo7Dpn7NcclxuICAgICAgICAgICAgaWYgKGNjLmF1ZGlvRW5naW5lLmlzTXVzaWNQbGF5aW5nKCkgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUuc3RvcE11c2ljKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5byA54GrXHJcbiAgICBmaXJlKCkge1xyXG4gICAgICAgIC8vIOWjsOmfs1xyXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy5zaG9vdENsaXAsZmFsc2UpO1xyXG4gICAgICAgIC8vIOWIm+W7uuWtkOW8uVxyXG4gICAgICAgIGxldCBibHQgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmJ1bGxldCk7XHJcbiAgICAgICAgLy8g5a2Q5by55Y+R5bCE5pa55ZCR5ZKMdGFuayDmnJ3lkJHkuIDoh7RcclxuICAgICAgICBibHQucm90YXRpb24gPSB0aGlzLm5vZGUucm90YXRpb247XHJcbiAgICAgICAgLy8g5a2Q5by55Yqg5Yiw5b2T5YmN5Zy65pmv5LiKXHJcbiAgICAgICAgYmx0LnNldFBhcmVudChjYy5kaXJlY3Rvci5nZXRTY2VuZSgpKTtcclxuICAgICAgICAvLyDlrZDlvLnnmoTkvY3nva5cclxuICAgICAgICAvLyDlsIbjgIBmaXJlUG9pbnTjgIDnm7jlr7nniLbop4blm77nmoTlnZDmoIcg6L2s5YyW5oiQIOebuOWvuSBtYXDlnZDmoIdcclxuICAgICAgICBsZXQgcG9zID0gdGhpcy5maXJlUG9pbnQuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLnYyKDAsMCkpO1xyXG4gICAgICAgIGJsdC54ID0gcG9zLng7XHJcbiAgICAgICAgYmx0LnkgPSBwb3MueTtcclxuICAgIH1cclxuXHJcbiAgICBpbnB1dCgpIHtcclxuICAgICAgICAvLyDmjInplK5cclxuICAgICAgICAvLyDmjInkuItcclxuICAgICAgICBjYy5zeXN0ZW1FdmVudC5vbihjYy5TeXN0ZW1FdmVudC5FdmVudFR5cGUuS0VZX0RPV04sIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PSBjYy5tYWNyby5LRVkudykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJy0tLS0tLS0tLS0tIHcgLS0tLS0tLS0tLS0nKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudmVydGljYWwgPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChldmVudC5rZXlDb2RlID09IGNjLm1hY3JvLktFWS5zKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnLS0tLS0tLS0tLS0gcyAtLS0tLS0tLS0tLScpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy52ZXJ0aWNhbCA9IC0xO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChldmVudC5rZXlDb2RlID09IGNjLm1hY3JvLktFWS5hKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnLS0tLS0tLS0tLS0gYSAtLS0tLS0tLS0tLScpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ob3Jpem9udGFsID0gLTE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT0gY2MubWFjcm8uS0VZLmQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCctLS0tLS0tLS0tLSBkIC0tLS0tLS0tLS0tJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhvcml6b250YWwgPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIOaMieS4i3XplK7lvIDngatcclxuICAgICAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT0gY2MubWFjcm8uS0VZLnUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCctLS0tLS0tLS0tLSB1IC0tLS0tLS0tLS0tJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpcmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy8g5oqs6LW3XHJcbiAgICAgICAgY2Muc3lzdGVtRXZlbnQub24oY2MuU3lzdGVtRXZlbnQuRXZlbnRUeXBlLktFWV9VUCwgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChldmVudC5rZXlDb2RlID09IGNjLm1hY3JvLktFWS53ICYmIHRoaXMudmVydGljYWwgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3VwLS0tLS0tLS0tLS0gdyAtLS0tLS0tLS0tLScpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy52ZXJ0aWNhbCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT0gY2MubWFjcm8uS0VZLnMgJiYgdGhpcy52ZXJ0aWNhbCA9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3VwLS0tLS0tLS0tLS0gcyAtLS0tLS0tLS0tLScpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy52ZXJ0aWNhbCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT0gY2MubWFjcm8uS0VZLmEgJiYgdGhpcy5ob3Jpem9udGFsID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndXAtLS0tLS0tLS0tLSBhIC0tLS0tLS0tLS0tJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhvcml6b250YWwgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChldmVudC5rZXlDb2RlID09IGNjLm1hY3JvLktFWS5kICYmIHRoaXMuaG9yaXpvbnRhbCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndXAtLS0tLS0tLS0tLSBkIC0tLS0tLS0tLS0tJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhvcml6b250YWwgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG4iXX0=
//------QC-SOURCE-SPLIT------

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
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/EnemyControl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxFbmVteUNvbnRyb2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ00sSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBMEMsZ0NBQVk7SUFBdEQ7UUFBQSxxRUFpQkM7UUFkRyxjQUFRLEdBQWlCLElBQUksQ0FBQzs7SUFjbEMsQ0FBQztJQVpHLGVBQWU7SUFFZiw0QkFBSyxHQUFMO0lBRUEsQ0FBQztJQUVELGlCQUFpQjtJQUVqQixxQ0FBYyxHQUFkO1FBQ0ksRUFBRSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFiRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDO2tEQUNPO0lBSGIsWUFBWTtRQURoQyxPQUFPO09BQ2EsWUFBWSxDQWlCaEM7SUFBRCxtQkFBQztDQWpCRCxBQWlCQyxDQWpCeUMsRUFBRSxDQUFDLFNBQVMsR0FpQnJEO2tCQWpCb0IsWUFBWSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW5lbXlDb250cm9sIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuQXVkaW9DbGlwKVxyXG4gICAgYm9tcENsaXA6IGNjLkF1ZGlvQ2xpcCA9IG51bGw7XHJcblxyXG4gICAgLy8gb25Mb2FkICgpIHt9XHJcblxyXG4gICAgc3RhcnQoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XHJcblxyXG4gICAgb25CZWdpbkNvbnRhY3QoKSB7XHJcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdCh0aGlzLmJvbXBDbGlwLCBmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcclxuICAgIH1cclxufVxyXG4iXX0=
//------QC-SOURCE-SPLIT------
