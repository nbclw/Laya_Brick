/**
* GameRuntime
*/
var GameRuntime;
(function (GameRuntime_1) {
    var Image = Laya.Image;
    var Dialog = Laya.Dialog;
    var Text = Laya.Text;
    var gamerTimer;
    var isRuning = true;
    var GameRuntime = /** @class */ (function () {
        function GameRuntime() {
        }
        GameRuntime.getGameBGImage = function () {
            return Laya.stage.getChildByName('BG').getChildByName('gameBG');
        };
        //移动
        GameRuntime.getMessageBGImage = function () {
            return Laya.stage.getChildByName('BG').getChildByName('messageBG');
        };
        GameRuntime.btnLeft_Click = function () {
            BrickControl.move('left', moveSpeed);
        };
        GameRuntime.btnRight_Click = function () {
            BrickControl.move('right', moveSpeed);
        };
        //暂停/继续
        GameRuntime.btnParseAndPlay_Click = function (btn) {
            btn.skin = isRuning ? imgsUrl[7] : imgsUrl[8];
            isRuning = !isRuning;
            if (isRuning)
                runtime.GamePlay();
            else
                runtime.GameParse();
        };
        //变化
        GameRuntime.btnChange_Click = function () {
            BrickControl.changeBricks();
        };
        //加速/减速
        GameRuntime.btnQuick_Down = function (btn, value, color) {
            runtime.setButtonSize(btn, value, color);
            runtime.GameParse();
            loopSpeed /= 4;
            runtime.GamePlay();
        };
        GameRuntime.btnQuick_Up = function (btn, value, color) {
            runtime.setButtonSize(btn, value, color);
            runtime.GameParse();
            loopSpeed *= 4;
            runtime.GamePlay();
        };
        //按钮按下与弹起
        GameRuntime.button_Down = function (btn, value, color) {
            runtime.setButtonSize(btn, value, color);
        };
        GameRuntime.button_Up = function (btn, value, color) {
            runtime.setButtonSize(btn, value, color);
        };
        GameRuntime.setButtonSize = function (btn, value, color) {
            if (color == null || color == undefined || color.length == 0)
                color = '#000000';
            btn.width += value;
            btn.height += value;
            btn.top -= value / 2;
            btn.left -= value / 2;
            btn.labelColors = color;
        };
        GameRuntime.gameBegin = function () {
            BrickControl.createNewBricksPostion();
            //Laya.timer.loop(loopSpeed, gamerTimer, this.gameRuning);
            runtime.GameEnd();
        };
        GameRuntime.gameRuning = function () {
            if (!BrickControl.move('down', moveSpeed)) {
                BrickControl.soildBricks();
                if (!BrickControl.createNewBricksPostion())
                    runtime.GameEnd();
            }
        };
        GameRuntime.GamePlay = function () {
            Laya.timer.loop(loopSpeed, gamerTimer, this.gameRuning);
        };
        GameRuntime.GameParse = function () {
            Laya.timer.clear(gamerTimer, this.gameRuning);
        };
        GameRuntime.GameEnd = function () {
            runtime.GameParse();
            var dialog = new Dialog();
            dialog.width = stageWidth;
            dialog.height = stageHeight;
            dialog.popupCenter = true;
            dialog.alpha = 0.9;
            var image = new Image(imgsUrl[10]);
            image.width = dialog.width - borderWidth;
            image.height = image.width / 6;
            image.left = borderWidth / 2;
            image.top = dialog.height * 1 / 4;
            var txt = new Text();
            txt.text = '游戏结束！';
            txt.fontSize = 15;
            txt.color = "white";
            txt.bold = true;
            txt.x = image.width * 3 / 8;
            txt.y = image.height * 2 / 5;
            image.addChild(txt);
            dialog.addChild(image);
            dialog.popup();
        };
        return GameRuntime;
    }());
    GameRuntime_1.GameRuntime = GameRuntime;
})(GameRuntime || (GameRuntime = {}));
//# sourceMappingURL=GameRuntime.js.map