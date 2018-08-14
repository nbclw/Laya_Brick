/**
* Bricks 
*/
module Bricks {
	import Image = Laya.Image;
	import BrickPos = Models.BrickPos;
	import Text = Laya.Text;

	let currPositions: BrickPos[] = new Array();
	let nextPositions: BrickPos[] = new Array();
	let changePositions: BrickPos[] = new Array();
	let currBricks: Image[] = new Array();
	let nextBricks: Image[] = new Array();
	let currRandom: number = null;
	let nextRandom: number = null;
	export class Bricks {
		constructor() {
		}
		//创建新的方块坐标，若创建失败，则游戏结束
		public static createNewBricksPostion(): boolean {
			let b: boolean = true;
			let max: number = 7;
			let min: number = -7;
			if (currRandom == null)
				currRandom = parseInt((Math.random() * (max - min + 1) + min).toString(), 10);
			else
				currRandom = nextRandom;
			nextRandom = parseInt((Math.random() * (max - min + 1) + min).toString(), 10);

			let postions = this.getPostionByRandom(currRandom);//获取相对坐标
			for (let i = 0; i < postions.length; i++)
				currPositions.push(new BrickPos(initX + postions[i].x, initY + postions[i].y));//修正坐标

			//当前坐标内是否有个格子
			for (let i: number = 0; i < currPositions.length; i++) {
				if (brickArr[currPositions[i].x][currPositions[i].y - 1].isLog) {
					b = false;
					break;
				}
			}
			if (b) {
				this.drawCurrBricks();
				this.drawNextBricks();
			}
			return b;
		}
		//根据坐标画出当前方块
		private static drawCurrBricks(): void {
			let gameBG: Image = runtime.getGameBGImage();
			for (let i: number = 0; i < currPositions.length; i++) {
				let brick: Image = this.createNewImage(brickSize);
				brick.left = this.getBrickLeft(currPositions[i].x);
				brick.top = this.getBrickTop(currPositions[i].y);

				gameBG.addChild(brick);
				currBricks.push(brick);
			}
		}
		private static createNewImage(size: number): Image {
			let brick: Image = new Image(imgsUrl[2]);
			brick.height = size;
			brick.width = size;

			return brick;
		}
		//画出下一个方块
		private static drawNextBricks(): void {
			let postions = this.getPostionByRandom(nextRandom);//获取相对坐标
			let messageBG: Image = runtime.getMessageBGImage();
			let bricksAreaCount: number = 3;
			let size: number = messageHeight * messageBricksPre / bricksAreaCount;
			if (nextBricks.length == 0) {
				for (let i = 0; i < postions.length; i++) {
					let brick: Image = this.createNewImage(size);
					messageBG.addChild(brick);
					nextBricks.push(brick);
				}
			}
			for (let i = 0; i < nextBricks.length; i++) {
				nextBricks[i].right = (bricksAreaCount - postions[i].x - 2) * size + messageHeight * (1 - messageBricksPre) / 2;
				nextBricks[i].top = (bricksAreaCount - postions[i].y - 2) * size + messageHeight * (1 - messageBricksPre) / 2;
			}
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

			let b: boolean = this.checkCanMove(nextPositions);
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
		private static checkCanMove(pos: BrickPos[]): boolean {
			if (pos.length == 0) return false;
			let b: boolean = true;
			for (let i = 0; i < pos.length; i++) {
				//是否越界
				if (pos[i].x < 0 || pos[i].x >= brickXCount || pos[i].y < 0) {
					b = false;
					break;
				}
				//是否存在格子
				if (brickArr[pos[i].x][pos[i].y].isLog) {
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
		//格子变换
		public static changeBricks(): void {
			if (currRandom == null || currRandom == 0) return;
			changePositions = this.CopyArray(currPositions);//将当前位置数据拷贝到下一位置，用于后续处理
			this.preChange();
			let b: boolean = this.checkCanMove(changePositions);
			if (b) {
				this.change();
			}
		}

		private static preChange(): void {
			let x: number = changePositions[0].x;
			let y: number = changePositions[0].y;
			for (let i = 1; i < changePositions.length; i++) {
				let currX: number = changePositions[i].x;
				let currY: number = changePositions[i].y;
				if (currX == x || currY == y) {
					if (currX == x) {
						changePositions[i].x -= (y - currY);
						changePositions[i].y += (y - currY);
					} else if (currY == y) {
						changePositions[i].x += (x - currX);
						changePositions[i].y += (x - currX);
					}
				} else {
					if (currX > x && currY > y) {
						changePositions[i].y -= 2;
					} else if (currX > x && currY < y) {
						changePositions[i].x -= 2;
					} else if (currX < x && currY > y) {
						changePositions[i].x += 2;
					} else if (currX < x && currY < y) {
						changePositions[i].y += 2;
					}
				}
			}
		}

		private static change(): void {
			let bricks: Image[] = currBricks;
			for (let i: number = 0; i < changePositions.length; i++) {
				bricks[i].pos(this.getBrickLeft(changePositions[i].x), this.getBrickTop(changePositions[i].y));
			}
			currPositions = this.CopyArray(changePositions);
			changePositions = [];
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
				let brick: Image = this.createNewImage(brickSize);
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
							let nextJ: number = j;
							nextJ -= destoryCount;
							Laya.Tween.to(
								brickArr[i][j].Brick,
								{ x: this.getBrickLeft(i), y: this.getBrickTop(nextJ) },
								100
							);
							brickArr[i][nextJ].Brick = brickArr[i][j].Brick;
							brickArr[i][nextJ].isLog = true;
							brickArr[i][j].Brick = null;
							brickArr[i][j].isLog = false;
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

		private static getPostionByRandom(random: number): any {
			let postions = [];
			postions.push({ x: 0, y: 0 });
			switch (random) {
				case 0:
					postions.push({ x: 0, y: 1 });
					postions.push({ x: 1, y: 1 });
					postions.push({ x: 1, y: 0 });
					break;
				case 1:
					postions.push({ x: 0, y: 1 });
					postions.push({ x: 0, y: 2 });
					postions.push({ x: 0, y: -1 });
					break;
				case -1:
					postions.push({ x: -1, y: 0 });
					postions.push({ x: 1, y: 0 });
					postions.push({ x: 2, y: 0 });
					break;
				case 2:
					postions.push({ x: 0, y: 1 });
					postions.push({ x: 0, y: -1 });
					postions.push({ x: -1, y: 1 });
					break;
				case -2:
					postions.push({ x: 0, y: 1 });
					postions.push({ x: 0, y: -1 });
					postions.push({ x: 1, y: 1 });
					break;
				case 3:
					postions.push({ x: 0, y: 1 });
					postions.push({ x: 0, y: -1 });
					postions.push({ x: -1, y: -1 });
					break;
				case -3:
					postions.push({ x: 0, y: 1 });
					postions.push({ x: 0, y: -1 });
					postions.push({ x: 1, y: -1 });
					break;
				case 4:
					postions.push({ x: -1, y: 0 });
					postions.push({ x: 1, y: 0 });
					postions.push({ x: 0, y: 1 });
					break;
				case -4:
					postions.push({ x: -1, y: 0 });
					postions.push({ x: 1, y: 0 });
					postions.push({ x: 0, y: -1 });
					break;
				case 5:
					postions.push({ x: 0, y: -1 });
					postions.push({ x: 0, y: 1 });
					postions.push({ x: -1, y: 0 });
					break;
				case -5:
					postions.push({ x: 0, y: -1 });
					postions.push({ x: 0, y: 1 });
					postions.push({ x: 1, y: 0 });
					break;
				case 6:
					postions.push({ x: 0, y: 1 });
					postions.push({ x: -1, y: 0 });
					postions.push({ x: -1, y: -1 });
					break;
				case -6:
					postions.push({ x: 0, y: 1 });
					postions.push({ x: 1, y: 0 });
					postions.push({ x: 1, y: -1 });
					break;
				case 7:
					postions.push({ x: 1, y: 0 });
					postions.push({ x: 0, y: 1 });
					postions.push({ x: -1, y: 1 });
					break;
				case -7:
					postions.push({ x: -1, y: 0 });
					postions.push({ x: 0, y: 1 });
					postions.push({ x: 1, y: 1 });
					break;
				default:
					postions.push({ x: 0, y: -1 });
					postions.push({ x: 0, y: 1 });
					postions.push({ x: 1, y: 1 });
					break;
			}
			return postions;
		}

	}
}