/**
* GameRuntime 
*/
module GameRuntime {
	import Image = Laya.Image;
	import Button = Laya.Button;
	import Dialog = Laya.Dialog;
	import Text = Laya.Text;
	import Tween = Laya.Tween;

	let gamerTimer;
	let isRuning: boolean = true;
	export class GameRuntime {
		constructor() {

		}

		public static getGameBGImage(): Image {
			return <Image>Laya.stage.getChildByName('BG').getChildByName('gameBG');
		}

		//移动
		public static getMessageBGImage(): Image {
			return <Image>Laya.stage.getChildByName('BG').getChildByName('messageBG');
		}
		public static btnLeft_Click(): void {
			BrickControl.move('left', moveSpeed);
		}
		public static btnRight_Click(): void {
			BrickControl.move('right', moveSpeed);
		}
		//暂停/继续
		public static btnParseAndPlay_Click(btn: Button): void {
			btn.skin = isRuning ? imgsUrl[7] : imgsUrl[8];
			isRuning = !isRuning;
			if (isRuning)
				runtime.GamePlay();
			else
				runtime.GameParse();
		}
		//变化
		public static btnChange_Click(): void {
			BrickControl.changeBricks();
		}
		//加速/减速
		public static btnQuick_Down(btn: Button, value: number, color?: string): void {
			runtime.setButtonSize(btn, value, color);
			runtime.GameParse();
			loopSpeed /= 4;
			runtime.GamePlay();
		}
		public static btnQuick_Up(btn: Button, value: number, color?: string): void {
			runtime.setButtonSize(btn, value, color);
			runtime.GameParse();
			loopSpeed *= 4;
			runtime.GamePlay();
		}
		//按钮按下与弹起
		public static button_Down(btn: Button, value: number, color?: string): void {
			runtime.setButtonSize(btn, value, color);
		}
		public static button_Up(btn: Button, value: number, color?: string): void {
			runtime.setButtonSize(btn, value, color);
		}
		private static setButtonSize(btn: Button, value: number, color?: string): void {
			if (color == null || color == undefined || color.length == 0) color = '#000000';
			btn.width += value;
			btn.height += value;
			btn.top -= value / 2;
			btn.left -= value / 2;
			btn.labelColors = color;
		}


		public static gameBegin(): void {
			BrickControl.createNewBricksPostion();
			Laya.timer.loop(loopSpeed, gamerTimer, this.gameRuning);
		}

		private static gameRuning(): void {
			if (!BrickControl.move('down', moveSpeed)) {
				BrickControl.soildBricks();
				if (!BrickControl.createNewBricksPostion())
					runtime.GameEnd();
			}
		}

		public static GamePlay(): void {
			Laya.timer.loop(loopSpeed, gamerTimer, this.gameRuning);
		}

		public static GameParse(): void {
			Laya.timer.clear(gamerTimer, this.gameRuning);
		}

		public static GameEnd(): void {
			runtime.GameParse();
			var dialog: Dialog = new Dialog();
			dialog.width = stageWidth;
			dialog.height = stageHeight;
			dialog.popupCenter = true;
			dialog.alpha = 0.9;

			let image: Image = new Image(imgsUrl[10]);
			image.width = dialog.width - borderWidth;
			image.height = image.width / 6;
			image.left = borderWidth / 2;
			image.top = dialog.height * 1 / 4;

			let txt: Text = new Text();
			txt.text = '游戏结束！';
			txt.fontSize = 15;
			txt.color = "white";
			txt.bold = true;
			txt.x = image.width * 3 / 8;
			txt.y = image.height * 2 / 5;
			image.addChild(txt);

			dialog.addChild(image);
			dialog.popup();
		}
	}
}