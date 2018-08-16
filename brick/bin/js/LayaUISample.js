var WebGL = Laya.WebGL;
var Handler = Laya.Handler;
/**自定义的 */
var BrickPos = Models.BrickPos;
var LogBrick = Models.LogBrick;
var BG = BackgroundUI.BackgroundUI;
var BrickControl = Bricks.Bricks;
var runtime = GameRuntime.GameRuntime;
var borderWidth = 20;
//舞台尺寸
var stageWidth = 400;
var stageHeight = 600;
//游戏速度
var loopSpeed = 800;
var moveSpeed = loopSpeed / 5;
//按钮尺寸
var btnDefaultWidth = 50;
var btnDefaultHeight = 50;
var btnWidth = 50;
var btnHeight = 50;
var btnAreaWidth = stageWidth - borderWidth;
var btnAreaHeight = 80;
//游戏信息区域尺寸
var messageWidth = stageWidth - borderWidth;
var messageHeight = 50;
var messageTextPre = 0.4;
var messageBricksPre = 0.8;
//游戏区域尺寸
var gameAreaWidth = stageWidth - borderWidth;
var gameAreaHeight = stageHeight - btnAreaHeight - messageHeight;
//砖块信息数据
var brickXCount = 16; //游戏区域一横行有多少个
var brickSize = gameAreaWidth / brickXCount; //根据屏幕大小计算砖块尺寸（正方形）
var brickYCount = parseInt((gameAreaHeight / brickSize).toString()) - 1; //计算游戏区域一竖行有多少个
//砖块初始位置
var initX = parseInt((brickXCount / 2).toString()) - 1;
var initY = brickYCount - 1;
//初始化游戏区域的占用情况
var brickArr = new Array(brickXCount);
for (var brx = 0; brx < brickArr.length; brx++) {
    brickArr[brx] = new Array(brickYCount + 2);
    for (var bry = 0; bry < brickArr[brx].length; bry++) {
        brickArr[brx][bry] = new LogBrick();
    }
}
var imgsUrl = [
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
];
var Main = /** @class */ (function () {
    function Main() {
        Laya.loader.load(imgsUrl, Handler.create(this, this.init));
    }
    Main.prototype.init = function () {
        var bg = new BG();
        runtime.gameBegin();
    };
    return Main;
}());
//初始化微信小游戏
Laya.MiniAdpter.init();
//程序入口
Laya.init(stageWidth, stageHeight, WebGL);
new Main();
//'portrait'
//window.innerWidth
//window.innerHeight
//# sourceMappingURL=LayaUISample.js.map