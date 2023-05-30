// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import GameCtrl from "./gameCtrl";

const { ccclass, property } = cc._decorator;

@ccclass("Ground")
export default class Ground extends cc.Component {
  @property(cc.Node)
  public ground1: cc.Node = null;

  @property(cc.Node)
  public ground2: cc.Node = null;

  @property(cc.Node)
  public ground3: cc.Node = null;

  public groundWidth1: number = 0;
  public groundWidth2: number = 0;
  public groundWidth3: number = 0;

  public tempStartLocation1 = new cc.Vec3();
  public tempStartLocation2 = new cc.Vec3();
  public tempStartLocation3 = new cc.Vec3();

  public gameSpeed: number = 0;
  public gameCtrlSpeed = new GameCtrl();

  onLoad() {
    this.startUp();
  }

  startUp() {
    this.groundWidth1 = this.ground1.width;
    this.groundWidth2 = this.ground2.width;
    this.groundWidth3 = this.ground3.width;

    this.tempStartLocation1.x = 0;
    this.tempStartLocation2.x = this.groundWidth1;
    this.tempStartLocation3.x = this.groundWidth1 + this.groundWidth2;

    this.ground1.setPosition(this.tempStartLocation1);
    this.ground2.setPosition(this.tempStartLocation2);
    this.ground3.setPosition(this.tempStartLocation3);
  }

  update(deltaTime: number) {
    this.gameSpeed = this.gameCtrlSpeed.speed;

    this.tempStartLocation1 = this.ground1.position;
    this.tempStartLocation2 = this.ground2.position;
    this.tempStartLocation3 = this.ground3.position;

    this.tempStartLocation1.x -= this.gameSpeed * deltaTime;
    this.tempStartLocation2.x -= this.gameSpeed * deltaTime;
    this.tempStartLocation3.x -= this.gameSpeed * deltaTime;

    const scene = cc.director.getScene();
    const canvas = scene.getComponentInChildren(cc.Canvas);
    if (this.tempStartLocation1.x < 0 - this.groundWidth1) {
      this.tempStartLocation1.x = canvas.node.width;
    }
    if (this.tempStartLocation2.x < 0 - this.groundWidth2) {
      this.tempStartLocation2.x = canvas.node.width;
    }
    if (this.tempStartLocation3.x < 0 - this.groundWidth3) {
      this.tempStartLocation3.x = canvas.node.width;
    }
    this.ground1.setPosition(this.tempStartLocation1);
    this.ground2.setPosition(this.tempStartLocation2);
    this.ground3.setPosition(this.tempStartLocation3);
  }
}
