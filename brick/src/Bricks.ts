/**
* Bricks 
*/
module Bricks {
	import Image = Laya.Image;
	import BrickPos = Models.BrickPos;
	import Text = Laya.Text;

	let currPositions: BrickPos[] = new Array();
	let nextPositions: BrickPos[] = new Array();
	let currBricks: Image[] = new Array();
	export class Bricks {
		constructor() {
		}
		//创建新的方块坐标，若创建失败，则游戏结束
		public static createNewBricksPostion(): boolean {
			let b: boolean = true;
			let max: number = 5;
			let min: number = -5;
			let random = parseInt((Math.random() * (max - min + 1) + min).toString(), 10);
			this.createNewBricksPostionByRandom(random);
			// this.createNewBricksPostionByRandom(0);
			for (let i: number = 0; i < currPositions.length; i++) {
				if (brickArr[currPositions[i].x][currPositions[i].y - 1].isLog) {
					b = false;
					break;
				}
			}
			if (b) { this.drawNewBricks() }
			return b;
		}
		//根据坐标画出新方块
		private static drawNewBricks(): void {
			let gameBG: Image = runtime.getGameBGImage();
			for (let i: number = 0; i < currPositions.length; i++) {
				let brick: Image = this.createNewImage();
				brick.left = this.getBrickLeft(currPositions[i].x);
				brick.top = this.getBrickTop(currPositions[i].y);

				gameBG.addChild(brick);
				currBricks.push(brick);
			}
		}
		private static createNewImage(): Image {
			let brick: Image = new Image(imgsUrl[2]);
			brick.height = brickSize;
			brick.width = brickSize;

			return brick;
		}
		//移动
		public static move(flag: string, duration: number): boolean {
			nextPositions = this.CopyArray(currPositions);//将当前位置数据拷贝到下一位置，用于后续处理
			if (flag == 'left') {
				this.moveLeft();
			} else if (flag == 'right') {
				this.moveRight();
			} else if (flag == 'down') {
				this.moveDown();
			} else { nextPositions = []; }

			let b: boolean = this.checkCanMove();
			if (b) {
				this.moveTo(duration);
			}
			return b;
		}
		private static moveLeft(): void {
			for (let i = 0; i < nextPositions.length; i++) {
				nextPositions[i].x--;
			}
		}
		private static moveRight(): void {
			for (let i = 0; i < nextPositions.length; i++) {
				nextPositions[i].x++;
			}
		}
		private static moveDown(): void {
			for (let i = 0; i < nextPositions.length; i++) {
				nextPositions[i].y--;
			}
		}
		//检测下一位置的数据，查看是否可以移动
		private static checkCanMove(): boolean {
			if (nextPositions.length == 0) return false;
			let b: boolean = true;
			for (let i = 0; i < nextPositions.length; i++) {
				//是否越界
				if (nextPositions[i].x < 0 || nextPositions[i].x >= brickXCount || nextPositions[i].y < 0) {
					b = false;
					break;
				}
				//是否存在格子
				if (brickArr[nextPositions[i].x][nextPositions[i].y].isLog) {
					b = false;
					break;
				}
			}
			return b;
		}
		//将下一位置数据拷贝到当前位置，用于后续方块渲染
		private static moveTo(duration: number): void {
			let bricks: Image[] = currBricks;
			for (let i: number = 0; i < nextPositions.length; i++) {
				Laya.Tween.to(
					bricks[i],
					{ x: this.getBrickLeft(nextPositions[i].x), y: this.getBrickTop(nextPositions[i].y) },
					duration
				);
			}
			currPositions = this.CopyArray(nextPositions);
			nextPositions = [];
		}

		public static soildBricks(): void {
			//记录数据：数组相应位置变为1，画上对应图片
			this.logBircks();
			//计算满行得分，满行重新绘制
			this.mathScore();
			//清空：bricks，当前坐标，下一坐标
			this.clearCurr();
		}
		private static logBircks(): void {
			let gameBG: Image = runtime.getGameBGImage();
			for (let i: number = 0; i < currPositions.length; i++) {
				let brick: Image = this.createNewImage();
				brick.left = this.getBrickLeft(currPositions[i].x);
				brick.top = this.getBrickTop(currPositions[i].y);

				gameBG.addChild(brick);

				brickArr[currPositions[i].x][currPositions[i].y].isLog = true;
				brickArr[currPositions[i].x][currPositions[i].y].Brick = brick;
			}
		}
		private static mathScore(): void {
			let destoryLines: number[] = this.getDestoryLines();
			let destoryCount: number = 0;
			if (destoryLines.length > 0) {
				destoryCount = this.destoryLines(destoryLines);
				let score: Text = <Text>Laya.stage.getChildByName('score');
				let value: number = parseInt(score.text);
				value += Math.pow(2, destoryCount) * brickXCount;

				score.text = value.toString();
			}
		}
		private static getDestoryLines(): number[] {
			let destoryLines: number[] = [];
			for (let j: number = 0; j < brickArr[0].length; j++) {
				let b: boolean = true;
				for (let i: number = 0; i < brickArr.length; i++) {
					if (!brickArr[i][j].isLog) {
						b = false;
						break;
					}
				}
				if (b) destoryLines.push(j);
			}

			return destoryLines;
		}
		private static destoryLines(destoryLines: number[]): number {
			let destoryCount: number = 0;
			for (let j: number = 0; j < brickArr[0].length; j++) {
				if (destoryLines.indexOf(j) > -1) {
					for (let i: number = 0; i < brickArr.length; i++) {
						brickArr[i][j].Brick.destroy();
						brickArr[i][j].Brick = null;
						brickArr[i][j].isLog = false;
					}
					destoryCount++;
				} else {
					if (j == 0) continue;
					for (let i: number = 0; i < brickArr.length; i++) {
						if (brickArr[i][j].isLog) {
							Laya.Tween.to(
								brickArr[i][j].Brick,
								{ x: this.getBrickLeft(i), y: this.getBrickTop(j - destoryCount) },
								100
							);
						}
					}
				}
			}
			return destoryCount;
		}
		private static clearCurr(): void {
			if (currBricks.length > 0) {
				for (let i: number = 0; i < currBricks.length; i++) {
					currBricks[i].destroy();
				}
			}
			currBricks = [];
			currPositions = [];
			nextPositions = [];
		}

		private static CopyArray(sourceArr): BrickPos[] {
			let targetArr: BrickPos[] = [];
			for (let i: number = 0; i < sourceArr.length; i++) {
				let pos: BrickPos = new BrickPos(sourceArr[i].x, sourceArr[i].y)
				targetArr.push(pos);
			}
			return targetArr;
		}



		private static getBrickLeft(x): number {
			return x * brickSize;
		}
		private static getBrickTop(y): number {
			return gameAreaHeight - (y + 1) * brickSize
		}

		private static createNewBricksPostionByRandom(random: number): void {
			currPositions.push(new BrickPos(initX, initY));
			switch (random) {
				case 0:
					currPositions.push(new BrickPos(initX, initY + 1));
					currPositions.push(new BrickPos(initX + 1, initY + 1));
					currPositions.push(new BrickPos(initX + 1, initY));
					break;
				case 1:
					currPositions.push(new BrickPos(initX, initY + 1));
					currPositions.push(new BrickPos(initX, initY + 2));
					currPositions.push(new BrickPos(initX, initY - 1));
					break;
				case -1:
					currPositions.push(new BrickPos(initX - 1, initY));
					currPositions.push(new BrickPos(initX + 1, initY));
					currPositions.push(new BrickPos(initX + 2, initY));
					break;
				case 2:
					currPositions.push(new BrickPos(initX, initY + 1));
					currPositions.push(new BrickPos(initX, initY - 1));
					currPositions.push(new BrickPos(initX - 1, initY + 1));
					break;
				case -2:
					currPositions.push(new BrickPos(initX, initY + 1));
					currPositions.push(new BrickPos(initX, initY - 1));
					currPositions.push(new BrickPos(initX + 1, initY + 1));
					break;
				case 3:
					currPositions.push(new BrickPos(initX, initY + 1));
					currPositions.push(new BrickPos(initX, initY - 1));
					currPositions.push(new BrickPos(initX - 1, initY - 1));
					break;
				case -3:
					currPositions.push(new BrickPos(initX, initY + 1));
					currPositions.push(new BrickPos(initX, initY - 1));
					currPositions.push(new BrickPos(initX + 1, initY - 1));
					break;
				case 4:
					currPositions.push(new BrickPos(initX - 1, initY));
					currPositions.push(new BrickPos(initX + 1, initY));
					currPositions.push(new BrickPos(initX, initY + 1));
					break;
				case -4:
					currPositions.push(new BrickPos(initX - 1, initY));
					currPositions.push(new BrickPos(initX + 1, initY));
					currPositions.push(new BrickPos(initX, initY - 1));
					break;
				case 5:
					currPositions.push(new BrickPos(initX, initY - 1));
					currPositions.push(new BrickPos(initX, initY + 1));
					currPositions.push(new BrickPos(initX - 1, initY));
					break;
				case -5:
					currPositions.push(new BrickPos(initX, initY - 1));
					currPositions.push(new BrickPos(initX, initY + 1));
					currPositions.push(new BrickPos(initX + 1, initY));
					break;
				default:
					currPositions.push(new BrickPos(initX, initY + 1));
					currPositions.push(new BrickPos(initX + 1, initY + 1));
					currPositions.push(new BrickPos(initX + 1, initY));
					break;
			}
		}

	}
}