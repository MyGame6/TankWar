
const { ccclass, property } = cc._decorator;

@ccclass
export default class EnemyControl extends cc.Component {

    @property(cc.AudioClip)
    bompClip: cc.AudioClip = null;

    // onLoad () {}

    start() {

    }

    // update (dt) {}

    onBeginContact() {
        cc.audioEngine.playEffect(this.bompClip, false);
        this.node.destroy();
    }
}
