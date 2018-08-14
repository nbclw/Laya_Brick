/**
* GameRuntime
*/
var GameRuntime;
(function (GameRuntime_1) {
    var Dialog = Laya.Dialog;
    var Text = Laya.Text;
    var gamerTimer;
    var GameRuntime = /** @class */ (function () {
        function GameRuntime() {
        }
        GameRuntime.getGameBGImage = function () {
            return Laya.stage.getChildByName('BG').getChildByName('gameBG');
        };
        GameRuntime.getMessageBGImage = function () {
            return Laya.stage.getChildByName('BG').getChildByName('messageBG');
        };
        GameRuntime.btnLeft_Click = function () {
            BrickControl.move('left', moveSpeed);
        };
        GameRuntime.btnRight_Click = function () {
            BrickControl.move('right', moveSpeed);
        };
        GameRuntime.btnChange_Click = function () {
            BrickControl.changeBricks();
        };
        GameRuntime.btnQuick_Click = function () {
        };
        GameRuntime.gameBegin = function () {
            BrickControl.createNewBricksPostion();
            Laya.timer.loop(loopSpeed, gamerTimer, this.gameRuning);
        };
        GameRuntime.gameRuning = function () {
            if (!BrickControl.move('down', moveSpeed)) {
                BrickControl.soildBricks();
                if (!BrickControl.createNewBricksPostion())
                    runtime.GameEnd();
            }
        };
        GameRuntime.GameStop = function () {
            Laya.timer.clear(gamerTimer, this.gameRuning);
        };
        GameRuntime.GameEnd = function () {
            Laya.timer.clear(gamerTimer, this.gameRuning);
            var dialog = new Dialog();
            dialog.width = stageWidth / 3;
            dialog.height = stageHeight / 10;
            dialog.popupCenter = true;
            dialog.isModal = true;
            var txt = new Text();
            txt.text = '游戏结束！';
            txt.fontSize = dialog.width / 10;
            txt.bold = true;
            dialog.addChild(txt);
            dialog.show();
        };
        return GameRuntime;
    }());
    GameRuntime_1.GameRuntime = GameRuntime;
})(GameRuntime || (GameRuntime = {}));
//# sourceMappingURL=GameRuntime.js.map