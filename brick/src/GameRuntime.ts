/**
* GameRuntime 
*/
module GameRuntime {
	import Image = Laya.Image;
	import Button = Laya.Button;
	import Dialog = Laya.Dialog;
	import Text = Laya.Text;

	let gamerTimer;
	let loopSpeed: number = 1000;
	let moveSpeed: number = loopSpeed / 5;
	export class GameRuntime {
		constructor() {

		}

		public static getGameBGImage(): Image {
			return <Image>Laya.stage.getChildByName('BG').getChildByName('gameBG');
		}


		public static getCurrBricks(): Image[] {
			let arr: Image[] = [];
			for (var i = 0; i < Laya.stage.getChildByName('BG').getChildByName('gameBG').numChildren; i++) {
				arr.push(<Image>Laya.stage.getChildByName('BG').getChildByName('gameBG').getChildAt(i));
			}

			return arr;
		}

		public static btnLeft_Click(): void {
			BrickControl.move('left', moveSpeed);
		}

		public static btnRight_Click(): void {
			BrickControl.move('right', moveSpeed);
		}

		public static btnChange_Click(): void {
			
		}

		public static btnQuick_Click(): void {
			
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

		public static GameStop(): void {
			Laya.timer.clear(gamerTimer, this.gameRuning);
		}

		public static GameEnd(): void {
			Laya.timer.clear(gamerTimer, this.gameRuning);
			var dialog: Dialog = new Dialog();
			dialog.width = stageWidth / 3;
			dialog.height = stageHeight / 10;
			dialog.popupCenter = true;
			dialog.isModal = true;

			let txt: Text = new Text();
			txt.text = '游戏结束！';
			txt.fontSize = dialog.width / 10;
			txt.bold = true;
			dialog.addChild(txt);
			dialog.show();
		}
	}
}