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
            messageBG.name = 'messageBG';
            messageBG.width = messageWidth;
            messageBG.height = messageHeight;
            messageBG.top = gameAreaHeight;
            messageBG.left = (stageWidth - gameAreaWidth) / 2;
            BG.addChild(messageBG);
            this.createMessages();
            this.createButtons();
        };
        BackgroundUI.prototype.createMessages = function () {
            var fontSize = messageHeight * messageTextPre;
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
            score.pos((stageWidth - gameAreaWidth) / 2 + messageHeight * t.text.length * messageTextPre, gameAreaHeight + (messageHeight - fontSize) / 2);
            Laya.stage.addChild(score);
            var nextText = new Text();
            nextText.text = '下一个';
            nextText.fontSize = fontSize;
            nextText.color = "white";
            nextText.bold = true;
            nextText.pos(stageWidth - ((stageWidth - gameAreaWidth) / 2 + messageHeight * nextText.text.length * messageTextPre + messageHeight), gameAreaHeight + (messageHeight - fontSize) / 2);
            Laya.stage.addChild(nextText);
        };
        BackgroundUI.prototype.createButtons = function () {
            var btnCount = 5;
            var btnMargin = btnDefaultWidth / 5;
            var empryAreaWidth = 0;
            var defaultBtnAreaWidth = (btnDefaultWidth * 6 / 5) * btnCount;
            if (btnAreaWidth >= defaultBtnAreaWidth) {
                btnWidth = btnDefaultWidth;
                empryAreaWidth = (btnAreaWidth - defaultBtnAreaWidth) / 2;
            }
            else {
                var width = btnAreaWidth / btnCount;
                btnMargin = width / 6;
                btnWidth = btnMargin * 5;
            }
            var btnLeft = new Button(imgsUrl[9]);
            btnLeft.width = btnWidth;
            btnLeft.height = btnHeight;
            btnLeft.stateNum = 1;
            btnLeft.top = gameAreaHeight + messageHeight + btnMargin;
            btnLeft.left = borderWidth / 2 + empryAreaWidth + btnMargin;
            btnLeft.clickHandler = Handler.create(btnLeft, runtime.btnLeft_Click, [], false);
            this.bindButtonEvent(btnLeft, btnMargin);
            Laya.stage.addChild(btnLeft);
            var btnRight = new Button(imgsUrl[3]);
            btnRight.width = btnWidth;
            btnRight.height = btnHeight;
            btnRight.stateNum = 1;
            btnRight.top = gameAreaHeight + messageHeight + btnMargin;
            btnRight.left = borderWidth / 2 + empryAreaWidth + btnMargin + (btnWidth + btnMargin);
            btnRight.clickHandler = Handler.create(btnRight, runtime.btnRight_Click, [1], false);
            this.bindButtonEvent(btnRight, btnMargin);
            Laya.stage.addChild(btnRight);
            var btnParseAndPlay = new Button(imgsUrl[8]);
            btnParseAndPlay.width = btnWidth;
            btnParseAndPlay.height = btnHeight;
            btnParseAndPlay.stateNum = 1;
            btnParseAndPlay.top = gameAreaHeight + messageHeight + btnMargin;
            btnParseAndPlay.left = borderWidth / 2 + empryAreaWidth + btnMargin + (btnWidth + btnMargin) * 2;
            btnParseAndPlay.clickHandler = Handler.create(btnParseAndPlay, runtime.btnParseAndPlay_Click, [btnParseAndPlay], false);
            this.bindButtonEvent(btnParseAndPlay, btnMargin);
            Laya.stage.addChild(btnParseAndPlay);
            var btnChange = new Button(imgsUrl[4]);
            btnChange.label = '变化';
            btnChange.labelBold = true;
            btnChange.labelColors = '#934927';
            btnChange.width = btnWidth;
            btnChange.height = btnHeight;
            btnChange.stateNum = 1;
            btnChange.top = gameAreaHeight + messageHeight + btnMargin;
            btnChange.left = borderWidth / 2 + empryAreaWidth + btnMargin + (btnWidth + btnMargin) * 3;
            btnChange.clickHandler = Handler.create(btnChange, runtime.btnChange_Click, [], false);
            this.bindButtonEvent(btnChange, btnMargin);
            Laya.stage.addChild(btnChange);
            var btnQuick = new Button(imgsUrl[5]);
            btnQuick.label = '快速';
            btnQuick.labelBold = true;
            btnQuick.labelColors = '#934927';
            btnQuick.width = btnWidth;
            btnQuick.height = btnHeight;
            btnQuick.stateNum = 1;
            btnQuick.top = gameAreaHeight + messageHeight + btnMargin;
            btnQuick.left = borderWidth / 2 + empryAreaWidth + btnMargin + (btnWidth + btnMargin) * 4;
            btnQuick.on(Laya.Event.MOUSE_DOWN, btnQuick, runtime.btnQuick_Down, [[btnQuick, btnParseAndPlay], btnMargin / 2, '#000000']);
            btnQuick.on(Laya.Event.MOUSE_OUT, btnQuick, runtime.btnQuick_Out, [[btnQuick, btnParseAndPlay], btnMargin / -2, '#934927']);
            Laya.stage.addChild(btnQuick);
            // let btnDown: Button = new Button(imgsUrl[10]);
            // btnDown.width = btnWidth;
            // btnDown.height = btnHeight;
            // btnDown.stateNum = 1;
            // btnDown.top = gameAreaHeight + messageHeight + btnMargin;
            // btnDown.left = borderWidth / 2 + empryAreaWidth + btnMargin + (btnWidth + btnMargin) * 5;
            // this.bindButtonEvent(btnDown, btnMargin);
            // Laya.stage.addChild(btnDown);
        };
        BackgroundUI.prototype.bindButtonEvent = function (btn, btnMargin) {
            btn.on(Laya.Event.MOUSE_DOWN, btn, runtime.button_Down, [btn, btnMargin / 2, '#000000']);
            btn.on(Laya.Event.MOUSE_OUT, btn, runtime.button_Out, [btn, btnMargin / -2, '#934927']);
        };
        return BackgroundUI;
    }(laya.ui.View));
    BackgroundUI_1.BackgroundUI = BackgroundUI;
})(BackgroundUI || (BackgroundUI = {}));
//# sourceMappingURL=BackgroundUI.js.map