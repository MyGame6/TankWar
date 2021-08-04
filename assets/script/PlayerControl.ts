
const { ccclass, property } = cc._decorator;

@ccclass
export default class PlayerControl extends cc.Component {

    // 子弹预设体
    @property(cc.Prefab)
    bullet:cc.Prefab = null;
    // 子弹发射位置
    firePoint:cc.Node = null;
    // 声音
    @property(cc.AudioClip)
    moveClip:cc.AudioClip = null;
    @property(cc.AudioClip)
    shootClip:cc.AudioClip = null;

    // 输入轴
    vertical: number = 0;
    horizontal: number = 0;
    // 刚体
    rBody: cc.RigidBody = null;

    onLoad() {
        // 开户物理特性
        cc.director.getPhysicsManager().enabled = true;
    }

    start() {
        this.input();
        // 初始化刚体
        this.rBody = this.getComponent(cc.RigidBody);
        // 获得子视图，子弹初始位置的node
        this.firePoint = this.node.getChildByName('firePoint');
    }

    update(dt) {
        // 移动
        if (this.vertical != 0) {
            // 垂直移动
            this.rBody.linearVelocity = cc.v2(0, 60 * this.vertical);
            // 旋转
            this.node.rotation = this.vertical > 0 ? 0 : 180;
            // 移动声音
            if(cc.audioEngine.isMusicPlaying() == false){
                cc.audioEngine.playMusic(this.moveClip,true);
            }
        } else if (this.horizontal != 0) {
            // 水平移动
            this.rBody.linearVelocity = cc.v2(this.horizontal * 60, 0);
            // 旋转
            this.node.rotation = this.horizontal > 0 ? 90 : 270;
            // 移动声音
            if (cc.audioEngine.isMusicPlaying() == false) {
                cc.audioEngine.playMusic(this.moveClip, true);
            }
        } else {
            // 停止移动
            this.rBody.linearVelocity = cc.v2(0, 0);
            // 停止声音
            if (cc.audioEngine.isMusicPlaying() == true) {
                cc.audioEngine.stopMusic();
            }
        }
    }

    // 开火
    fire() {
        // 声音
        cc.audioEngine.playEffect(this.shootClip,false);
        // 创建子弹
        let blt = cc.instantiate(this.bullet);
        // 子弹发射方向和tank 朝向一致
        blt.rotation = this.node.rotation;
        // 子弹加到当前场景上
        blt.setParent(cc.director.getScene());
        // 子弹的位置
        // 将　firePoint　相对父视图的坐标 转化成 相对 map坐标
        let pos = this.firePoint.convertToWorldSpaceAR(cc.v2(0,0));
        blt.x = pos.x;
        blt.y = pos.y;
    }

    input() {
        // 按键
        // 按下
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, (event) => {
            if (event.keyCode == cc.macro.KEY.w) {
                console.log('----------- w -----------');
                this.vertical = 1;
            }
            if (event.keyCode == cc.macro.KEY.s) {
                console.log('----------- s -----------');
                this.vertical = -1;
            }
            if (event.keyCode == cc.macro.KEY.a) {
                console.log('----------- a -----------');
                this.horizontal = -1;
            }
            if (event.keyCode == cc.macro.KEY.d) {
                console.log('----------- d -----------');
                this.horizontal = 1;
            }
            // 按下u键开火
            if (event.keyCode == cc.macro.KEY.u) {
                console.log('----------- u -----------');
                this.fire();
            }
        })
        // 抬起
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, (event) => {
            if (event.keyCode == cc.macro.KEY.w && this.vertical == 1) {
                console.log('up----------- w -----------');
                this.vertical = 0;
            }
            if (event.keyCode == cc.macro.KEY.s && this.vertical == -1) {
                console.log('up----------- s -----------');
                this.vertical = 0;
            }
            if (event.keyCode == cc.macro.KEY.a && this.horizontal == -1) {
                console.log('up----------- a -----------');
                this.horizontal = 0;
            }
            if (event.keyCode == cc.macro.KEY.d && this.horizontal == 1) {
                console.log('up----------- d -----------');
                this.horizontal = 0;
            }
        })
    }
}
