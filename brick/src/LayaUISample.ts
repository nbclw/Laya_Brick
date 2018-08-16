import WebGL = Laya.WebGL;
import Handler = Laya.Handler;

/**自定义的 */
import BrickPos = Models.BrickPos;
import LogBrick = Models.LogBrick;
import BG = BackgroundUI.BackgroundUI;
import BrickControl = Bricks.Bricks;
import runtime = GameRuntime.GameRuntime;

const borderWidth = 20;
//舞台尺寸
const stageWidth: number = 400;
const stageHeight: number = 600;
//游戏速度
let loopSpeed: number = 800;
let moveSpeed: number = loopSpeed / 5;
//按钮尺寸
const btnDefaultWidth: number = 50;
const btnDefaultHeight: number = 50;
let btnWidth: number = 50;
let btnHeight: number = 50;
const btnAreaWidth: number = stageWidth - borderWidth;
const btnAreaHeight: number = 80;
//游戏信息区域尺寸
const messageWidth: number = stageWidth - borderWidth;
const messageHeight: number = 50;
const messageTextPre = 0.4;
const messageBricksPre = 0.8;
//游戏区域尺寸
const gameAreaWidth: number = stageWidth - borderWidth;
const gameAreaHeight: number = stageHeight - btnAreaHeight - messageHeight;
//砖块信息数据
const brickXCount: number = 16;//游戏区域一横行有多少个
const brickSize: number = gameAreaWidth / brickXCount;//根据屏幕大小计算砖块尺寸（正方形）
const brickYCount: number = parseInt((gameAreaHeight / brickSize).toString()) - 1;//计算游戏区域一竖行有多少个
//砖块初始位置
const initX: number = parseInt((brickXCount / 2).toString()) - 1;
const initY: number = brickYCount - 1;
//初始化游戏区域的占用情况
let brickArr: Array<Array<LogBrick>> = new Array(brickXCount);
for (let brx = 0; brx < brickArr.length; brx++) {
    brickArr[brx] = new Array(brickYCount + 2);
    for (let bry = 0; bry < brickArr[brx].length; bry++) {
        brickArr[brx][bry] = new LogBrick();
    }
}
const imgsUrl: string[] = [
    '../laya/assets/bg.png',
    '../laya/assets/bluebg.png',
    '../laya/assets/brick.png',
    '../laya/assets/right.png',
    '../laya/assets/change.png',
    '../laya/assets/quick.png',
    '../laya/assets/whitebg.png',
    '../laya/assets/parse.png',
    '../laya/assets/play.png',
    '../laya/assets/left.png',
    '../laya/assets/gameover.png'
]



class Main {
    constructor() {
        Laya.loader.load(imgsUrl, Handler.create(this, this.init));
    }
    private init(): void {
        let bg: BG = new BG();
        runtime.gameBegin();
    }
}

//初始化微信小游戏
Laya.MiniAdpter.init();
//程序入口
Laya.init(stageWidth, stageHeight, WebGL);

new Main();


//'portrait'
//window.innerWidth
//window.innerHeight