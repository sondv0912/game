// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import GameCtrl from "./gameCtrl";

const random = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

const { ccclass, property } = cc._decorator;

@ccclass
export default class Pipes extends cc.Component {
  @property(cc.Node)
  public topPipe: cc.Node = null;

  @property(cc.Node)
  public bottomPipe: cc.Node = null;

  public tempStartLocationUp: cc.Vec3 = new cc.Vec3(0, 0, 0);
  public tempStartLocationDown: cc.Vec3 = new cc.Vec3(0, 0, 0);
  public scene = cc.winSize;

  public game;
  public pipeSpeed: number;
  public tempSpeed: number;
  public isPass: boolean;

  onLoad() {
    this.game = cc.find("gameCtrl").getComponent("GameCtrl");
    this.pipeSpeed = this.game.pipeSpeed;
    this.initPos();
    this.isPass = false;
  }

  initPos() {
    this.tempStartLocationUp.x = this.topPipe.width + this.scene.width;
    this.tempStartLocationDown.x = this.topPipe.width + this.scene.width;

    let gap = random(90, 100);
    let topHeight = random(0, 450);

    this.tempStartLocationUp.y = topHeight;
    this.tempStartLocationDown.y = topHeight - gap * 10;

    this.bottomPipe.setPosition(this.tempStartLocationDown);
    this.topPipe.setPosition(this.tempStartLocationUp);
  }

  update(deltaTime) {
    this.tempSpeed = this.pipeSpeed + deltaTime;

    this.tempStartLocationDown = this.bottomPipe.position;
    this.tempStartLocationUp = this.topPipe.position;

    this.tempStartLocationDown.x -= this.tempSpeed;
    this.tempStartLocationUp.x -= this.tempSpeed;

    this.bottomPipe.setPosition(this.tempStartLocationDown);
    this.topPipe.setPosition(this.tempStartLocationUp);

    if (!this.isPass && this.topPipe.position.x <= 0) {
      this.isPass = true;
      this.game.passPipe();

      this.destroy();
    }
  }
}
