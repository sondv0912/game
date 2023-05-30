// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass("Results")
export default class Results extends cc.Component {
  @property(cc.Label)
  public scoreLabel: cc.Label = null;

  @property(cc.Label)
  public highScore: cc.Label = null;

  @property(cc.Label)
  public resultEnd: cc.Label = null;

  maxScore: number = 0;
  currentScore: number;

  updateScore(num: number) {
    this.currentScore = num;

    this.scoreLabel.string = this.currentScore.toString();
  }

  resetScore() {
    this.updateScore(0);

    this.hideResults();
  }

  addScore() {
    this.updateScore(this.currentScore + 1);
  }

  showResults() {
    this.maxScore = Math.max(this.maxScore, this.currentScore);

    this.highScore.string = `HIgh Score: ${this.maxScore}`;

    this.resultEnd.node.active = true;
    this.highScore.node.active = true;
  }

  hideResults() {
    this.highScore.node.active = false;
    this.resultEnd.node.active = false;
  }
}
