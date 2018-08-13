/**
* BackgroundUI 
*/
module BackgroundUI {
	import Image = Laya.Image;
	import Button = Laya.Button;
	import Text = Laya.Text;
	export class BackgroundUI extends laya.ui.View {
		constructor() {
			super();
			this.init();
		}


		private init(): void {
			this.createBackground();
		}

		private createBackground(): void {
			let BG: Image = new Image(imgsUrl[6]);
			BG.name = 'BG';
			BG.width = stageWidth;
			BG.height = stageHeight;
			Laya.stage.addChild(BG);

			let gameBG: Image = new Image(imgsUrl[0]);
			gameBG.name = 'gameBG';
			gameBG.width = gameAreaWidth;
			gameBG.height = gameAreaHeight;
			gameBG.left = (stageWidth - gameAreaWidth) / 2;
			BG.addChild(gameBG);
			
			let messageBG: Image = new Image(imgsUrl[1]);
			messageBG.width = messageWidth;
			messageBG.height = messageHeight;
			messageBG.top = gameAreaHeight;
			messageBG.left = (stageWidth - gameAreaWidth) / 2;
			BG.addChild(messageBG);

			this.createMessages();
			this.createButtons();
		}

		private createMessages(): void {
			let pre: number = 2 / 5;
			let fontSize: number = messageHeight * pre;
			let t: Text = new Text();
			t.text = '得分：';
			t.fontSize = fontSize;
			t.color = "white";
			t.bold = true;
			t.pos((stageWidth - gameAreaWidth) / 2, gameAreaHeight + (messageHeight - fontSize) / 2);
			Laya.stage.addChild(t);
			
			let score: Text = new Text();
			score.name='score';
			score.text = '0';
			score.fontSize = fontSize;
			score.color = "white";
			score.bold = true;
			score.pos((stageWidth - gameAreaWidth) / 2 + messageHeight * t.text.length * pre, gameAreaHeight + (messageHeight - fontSize) / 2);
			Laya.stage.addChild(score);

			let nextText: Text = new Text();
			nextText.text = '下一个';
			nextText.fontSize = fontSize;
			nextText.color = "white";
			nextText.bold = true;
			nextText.pos(stageWidth - ((stageWidth - gameAreaWidth) / 2 + messageHeight * nextText.text.length * pre + messageHeight), gameAreaHeight + (messageHeight - fontSize) / 2);
			Laya.stage.addChild(nextText);
		}

		private createButtons(): void {
			let btnLeft: Button = new Button(imgsUrl[3]);
			btnLeft.width = btnWidth;
			btnLeft.height = btnHeight;
			btnLeft.stateNum = 1;
			btnLeft.scaleX = -1;
			btnLeft.top = gameAreaHeight + messageHeight;
			btnLeft.left = (stageWidth - gameAreaWidth) / 2 + btnWidth;
			btnLeft.clickHandler = Handler.create(btnLeft, runtime.btnLeft_Click, [], false);
			Laya.stage.addChild(btnLeft);

			let btnRight: Button = new Button(imgsUrl[3]);
			btnRight.width = btnWidth;
			btnRight.height = btnHeight;
			btnRight.stateNum = 1;
			btnRight.top = gameAreaHeight + messageHeight;
			btnRight.left = (stageWidth - gameAreaWidth) / 2 + btnWidth;
			btnRight.clickHandler = Handler.create(btnRight, runtime.btnRight_Click, [1], false);
			Laya.stage.addChild(btnRight);

			let btnChange: Button = new Button(imgsUrl[4]);
			btnChange.width = btnWidth;
			btnChange.height = btnHeight;
			btnChange.stateNum = 1;
			btnChange.top = gameAreaHeight + messageHeight;
			btnChange.right = (stageWidth - gameAreaWidth) / 2 + btnWidth;
			btnChange.clickHandler = Handler.create(btnChange, runtime.btnChange_Click, [], false);
			Laya.stage.addChild(btnChange);

			let btnQuick: Button = new Button(imgsUrl[5]);
			btnQuick.width = btnWidth;
			btnQuick.height = btnHeight;
			btnQuick.stateNum = 1;
			btnQuick.top = gameAreaHeight + messageHeight;
			btnQuick.right = (stageWidth - gameAreaWidth) / 2;
			btnQuick.clickHandler = Handler.create(btnQuick, runtime.btnQuick_Click, [], false);
			Laya.stage.addChild(btnQuick);
		}
	}
}