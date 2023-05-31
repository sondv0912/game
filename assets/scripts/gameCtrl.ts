// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import Bird from "./bird";
import Ground from "./ground";
import Results from "./results";

const { ccclass, property } = cc._decorator;

@ccclass("GameCtrl")
export default class GameCtrl extends cc.Component {
  @property({ type: Ground, tooltip: "this is ground" })
  public ground: Ground = null;

  @property({ type: Results, tooltip: "this is result" })
  public results: Results = null;

  @property({ type: Bird, tooltip: "this is result" })
  public bird: Bird = null;

  @property(cc.Integer)
  public speed: number = 300;

  @property(cc.Integer)
  public pipeSpeed: number = 200;

  onLoad() {
    this.initListener();
    cc.director.getPhysicsManager().enabled = true;
    this.results.resetScore();

    cc.director.pause();
  }

  initListener() {
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    this.node.on(cc.Node.EventType.TOUCH_START, () => {
      this.bird.fly();
    });
  }

  onKeyDown(event: KeyboardEvent) {
    console.log(event.keyCode);
    switch (event.keyCode) {
      case cc.macro.KEY.a:
        this.gameOver();
        break;
      case cc.macro.KEY.p:
        this.results.addScore();
        break;
      case cc.macro.KEY.q:
        this.resetGame();
        this.bird.resetBird();
        break;

      default:
        break;
    }
  }

  gameOver() {
    this.results.showResults();
    cc.director.pause();
  }

  resetGame() {
    this.results.resetScore();
    this.startGame();
  }

  passPipe() {
    this.results.addScore();
  }

  startGame() {
    this.results.hideResults();
    cc.director.resume();
  }
}
