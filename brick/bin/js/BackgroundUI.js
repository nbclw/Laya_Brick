var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
* BackgroundUI
*/
var BackgroundUI;
(function (BackgroundUI_1) {
    var Image = Laya.Image;
    var Button = Laya.Button;
    var Text = Laya.Text;
    var BackgroundUI = /** @class */ (function (_super) {
        __extends(BackgroundUI, _super);
        function BackgroundUI() {
            var _this = _super.call(this) || this;
            _this.init();
            return _this;
        }
        BackgroundUI.prototype.init = function () {
            this.createBackground();
        };
        BackgroundUI.prototype.createBackground = function () {
            var BG = new Image(imgsUrl[6]);
            BG.name = 'BG';
            BG.width = stageWidth;
            BG.height = stageHeight;
            Laya.stage.addChild(BG);
            var gameBG = new Image(imgsUrl[0]);
            gameBG.name = 'gameBG';
            gameBG.width = gameAreaWidth;
            gameBG.height = gameAreaHeight;
            gameBG.left = (stageWidth - gameAreaWidth) / 2;
            BG.addChild(gameBG);
            var messageBG = new Image(imgsUrl[1]);
            messageBG.width = messageWidth;
            messageBG.height = messageHeight;
            messageBG.top = gameAreaHeight;
            messageBG.left = (stageWidth - gameAreaWidth) / 2;
            BG.addChild(messageBG);
            this.createMessages();
            this.createButtons();
        };
        BackgroundUI.prototype.createMessages = function () {
            var pre = 2 / 5;
            var fontSize = messageHeight * pre;
            var t = new Text();
            t.text = '得分：';
            t.fontSize = fontSize;
            t.color = "white";
            t.bold = true;
            t.pos((stageWidth - gameAreaWidth) / 2, gameAreaHeight + (messageHeight - fontSize) / 2);
            Laya.stage.addChild(t);
            var score = new Text();
            score.name = 'score';
            score.text = '0';
            score.fontSize = fontSize;
            score.color = "white";
            score.bold = true;
            score.pos((stageWidth - gameAreaWidth) / 2 + messageHeight * t.text.length * pre, gameAreaHeight + (messageHeight - fontSize) / 2);
            Laya.stage.addChild(score);
            var nextText = new Text();
            nextText.text = '下一个';
            nextText.fontSize = fontSize;
            nextText.color = "white";
            nextText.bold = true;
            nextText.pos(stageWidth - ((stageWidth - gameAreaWidth) / 2 + messageHeight * nextText.text.length * pre + messageHeight), gameAreaHeight + (messageHeight - fontSize) / 2);
            Laya.stage.addChild(nextText);
        };
        BackgroundUI.prototype.createButtons = function () {
            var btnLeft = new Button(imgsUrl[3]);
            btnLeft.width = btnWidth;
            btnLeft.height = btnHeight;
            btnLeft.stateNum = 1;
            btnLeft.scaleX = -1;
            btnLeft.top = gameAreaHeight + messageHeight;
            btnLeft.left = (stageWidth - gameAreaWidth) / 2 + btnWidth;
            btnLeft.clickHandler = Handler.create(btnLeft, runtime.btnLeft_Click, [], false);
            Laya.stage.addChild(btnLeft);
            var btnRight = new Button(imgsUrl[3]);
            btnRight.width = btnWidth;
            btnRight.height = btnHeight;
            btnRight.stateNum = 1;
            btnRight.top = gameAreaHeight + messageHeight;
            btnRight.left = (stageWidth - gameAreaWidth) / 2 + btnWidth;
            btnRight.clickHandler = Handler.create(btnRight, runtime.btnRight_Click, [1], false);
            Laya.stage.addChild(btnRight);
            var btnChange = new Button(imgsUrl[4]);
            btnChange.width = btnWidth;
            btnChange.height = btnHeight;
            btnChange.stateNum = 1;
            btnChange.top = gameAreaHeight + messageHeight;
            btnChange.right = (stageWidth - gameAreaWidth) / 2 + btnWidth;
            btnChange.clickHandler = Handler.create(btnChange, runtime.btnChange_Click, [], false);
            Laya.stage.addChild(btnChange);
            var btnQuick = new Button(imgsUrl[5]);
            btnQuick.width = btnWidth;
            btnQuick.height = btnHeight;
            btnQuick.stateNum = 1;
            btnQuick.top = gameAreaHeight + messageHeight;
            btnQuick.right = (stageWidth - gameAreaWidth) / 2;
            btnQuick.clickHandler = Handler.create(btnQuick, runtime.btnQuick_Click, [], false);
            Laya.stage.addChild(btnQuick);
        };
        return BackgroundUI;
    }(laya.ui.View));
    BackgroundUI_1.BackgroundUI = BackgroundUI;
})(BackgroundUI || (BackgroundUI = {}));
//# sourceMappingURL=BackgroundUI.js.map