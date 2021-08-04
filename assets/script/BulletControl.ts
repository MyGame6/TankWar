
const { ccclass, property } = cc._decorator;

@ccclass
export default class BulletControl extends cc.Component {

    // onLoad () {}

    start() {
        // 角度转弧度
        let r = cc.misc.degreesToRadians(this.node.rotation);
        // 固定算法，弧度转向量
        let v2 = cc.v2(0, 1).rotate(-r);
        // 按向量进行移动
        // 1、拿到刚体
        let rBody: cc.RigidBody = this.getComponent(cc.RigidBody);
        // 2、让子弹移动
        let speed = 120;
        rBody.linearVelocity = cc.v2(v2.x * speed, v2.y * speed);
    }

    // 在Node启用接触监听(Enable Contact) 后，接触就会走这个方法
    // 子弹碰到物体 就销毁
    onBeginContact() {
        this.node.destroy();
    }

    // update (dt) {}
}
