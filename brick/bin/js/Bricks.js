/**
* Bricks
*/
var Bricks;
(function (Bricks_1) {
    var Image = Laya.Image;
    var BrickPos = Models.BrickPos;
    var currPositions = new Array();
    var nextPositions = new Array();
    var changePositions = new Array();
    var currBricks = new Array();
    var nextBricks = new Array();
    var currRandom = null;
    var nextRandom = null;
    var Bricks = /** @class */ (function () {
        function Bricks() {
        }
        //创建新的方块坐标，若创建失败，则游戏结束
        Bricks.createNewBricksPostion = function () {
            var b = true;
            var max = 7;
            var min = -7;
            if (currRandom == null)
                currRandom = parseInt((Math.random() * (max - min + 1) + min).toString(), 10);
            else
                currRandom = nextRandom;
            nextRandom = parseInt((Math.random() * (max - min + 1) + min).toString(), 10);
            var postions = this.getPostionByRandom(currRandom); //获取相对坐标
            for (var i = 0; i < postions.length; i++)
                currPositions.push(new BrickPos(initX + postions[i].x, initY + postions[i].y)); //修正坐标
            //当前坐标内是否有个格子
            for (var i = 0; i < currPositions.length; i++) {
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
        };
        //根据坐标画出当前方块
        Bricks.drawCurrBricks = function () {
            var gameBG = runtime.getGameBGImage();
            for (var i = 0; i < currPositions.length; i++) {
                var brick = this.createNewImage(brickSize);
                brick.left = this.getBrickLeft(currPositions[i].x);
                brick.top = this.getBrickTop(currPositions[i].y);
                gameBG.addChild(brick);
                currBricks.push(brick);
            }
        };
        Bricks.createNewImage = function (size) {
            var brick = new Image(imgsUrl[2]);
            brick.height = size;
            brick.width = size;
            return brick;
        };
        //画出下一个方块
        Bricks.drawNextBricks = function () {
            var postions = this.getPostionByRandom(nextRandom); //获取相对坐标
            var messageBG = runtime.getMessageBGImage();
            var bricksAreaCount = 3;
            var size = messageHeight * messageBricksPre / bricksAreaCount;
            if (nextBricks.length == 0) {
                for (var i = 0; i < postions.length; i++) {
                    var brick = this.createNewImage(size);
                    messageBG.addChild(brick);
                    nextBricks.push(brick);
                }
            }
            for (var i = 0; i < nextBricks.length; i++) {
                nextBricks[i].right = (bricksAreaCount - postions[i].x - 2) * size + messageHeight * (1 - messageBricksPre) / 2;
                nextBricks[i].top = (bricksAreaCount - postions[i].y - 2) * size + messageHeight * (1 - messageBricksPre) / 2;
            }
        };
        //移动
        Bricks.move = function (flag, duration) {
            nextPositions = this.CopyArray(currPositions); //将当前位置数据拷贝到下一位置，用于后续处理
            if (flag == 'left') {
                this.moveLeft();
            }
            else if (flag == 'right') {
                this.moveRight();
            }
            else if (flag == 'down') {
                this.moveDown();
            }
            else {
                nextPositions = [];
            }
            var b = this.checkCanMove(nextPositions);
            if (b) {
                this.moveTo(duration);
            }
            return b;
        };
        Bricks.moveLeft = function () {
            for (var i = 0; i < nextPositions.length; i++) {
                nextPositions[i].x--;
            }
        };
        Bricks.moveRight = function () {
            for (var i = 0; i < nextPositions.length; i++) {
                nextPositions[i].x++;
            }
        };
        Bricks.moveDown = function () {
            for (var i = 0; i < nextPositions.length; i++) {
                nextPositions[i].y--;
            }
        };
        //检测下一位置的数据，查看是否可以移动
        Bricks.checkCanMove = function (pos) {
            if (pos.length == 0)
                return false;
            var b = true;
            for (var i = 0; i < pos.length; i++) {
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
        };
        //将下一位置数据拷贝到当前位置，用于后续方块渲染
        Bricks.moveTo = function (duration) {
            var bricks = currBricks;
            for (var i = 0; i < nextPositions.length; i++) {
                Laya.Tween.to(bricks[i], { x: this.getBrickLeft(nextPositions[i].x), y: this.getBrickTop(nextPositions[i].y) }, duration);
            }
            currPositions = this.CopyArray(nextPositions);
            nextPositions = [];
        };
        //格子变换
        Bricks.changeBricks = function () {
            if (currRandom == null || currRandom == 0)
                return;
            changePositions = this.CopyArray(currPositions); //将当前位置数据拷贝到下一位置，用于后续处理
            this.preChange();
            var b = this.checkCanMove(changePositions);
            if (b) {
                this.change();
            }
        };
        Bricks.preChange = function () {
            var x = changePositions[0].x;
            var y = changePositions[0].y;
            for (var i = 1; i < changePositions.length; i++) {
                var currX = changePositions[i].x;
                var currY = changePositions[i].y;
                if (currX == x || currY == y) {
                    if (currX == x) {
                        changePositions[i].x -= (y - currY);
                        changePositions[i].y += (y - currY);
                    }
                    else if (currY == y) {
                        changePositions[i].x += (x - currX);
                        changePositions[i].y += (x - currX);
                    }
                }
                else {
                    if (currX > x && currY > y) {
                        changePositions[i].y -= 2;
                    }
                    else if (currX > x && currY < y) {
                        changePositions[i].x -= 2;
                    }
                    else if (currX < x && currY > y) {
                        changePositions[i].x += 2;
                    }
                    else if (currX < x && currY < y) {
                        changePositions[i].y += 2;
                    }
                }
            }
        };
        Bricks.change = function () {
            var bricks = currBricks;
            for (var i = 0; i < changePositions.length; i++) {
                bricks[i].pos(this.getBrickLeft(changePositions[i].x), this.getBrickTop(changePositions[i].y));
            }
            currPositions = this.CopyArray(changePositions);
            changePositions = [];
        };
        Bricks.soildBricks = function () {
            //记录数据：数组相应位置变为1，画上对应图片
            this.logBircks();
            //计算满行得分，满行重新绘制
            this.mathScore();
            //清空：bricks，当前坐标，下一坐标
            this.clearCurr();
        };
        Bricks.logBircks = function () {
            var gameBG = runtime.getGameBGImage();
            for (var i = 0; i < currPositions.length; i++) {
                var brick = this.createNewImage(brickSize);
                brick.left = this.getBrickLeft(currPositions[i].x);
                brick.top = this.getBrickTop(currPositions[i].y);
                gameBG.addChild(brick);
                brickArr[currPositions[i].x][currPositions[i].y].isLog = true;
                brickArr[currPositions[i].x][currPositions[i].y].Brick = brick;
            }
        };
        Bricks.mathScore = function () {
            var destoryLines = this.getDestoryLines();
            var destoryCount = 0;
            if (destoryLines.length > 0) {
                destoryCount = this.destoryLines(destoryLines);
                var score = Laya.stage.getChildByName('score');
                var value = parseInt(score.text);
                value += Math.pow(2, destoryCount) * brickXCount;
                score.text = value.toString();
            }
        };
        Bricks.getDestoryLines = function () {
            var destoryLines = [];
            for (var j = 0; j < brickArr[0].length; j++) {
                var b = true;
                for (var i = 0; i < brickArr.length; i++) {
                    if (!brickArr[i][j].isLog) {
                        b = false;
                        break;
                    }
                }
                if (b)
                    destoryLines.push(j);
            }
            return destoryLines;
        };
        Bricks.destoryLines = function (destoryLines) {
            var destoryCount = 0;
            for (var j = 0; j < brickArr[0].length; j++) {
                if (destoryLines.indexOf(j) > -1) {
                    for (var i = 0; i < brickArr.length; i++) {
                        brickArr[i][j].Brick.destroy();
                        brickArr[i][j].Brick = null;
                        brickArr[i][j].isLog = false;
                    }
                    destoryCount++;
                }
                else {
                    if (j == 0)
                        continue;
                    for (var i = 0; i < brickArr.length; i++) {
                        if (brickArr[i][j].isLog) {
                            var nextJ = j;
                            nextJ -= destoryCount;
                            Laya.Tween.to(brickArr[i][j].Brick, { x: this.getBrickLeft(i), y: this.getBrickTop(nextJ) }, 100);
                            brickArr[i][nextJ].Brick = brickArr[i][j].Brick;
                            brickArr[i][nextJ].isLog = true;
                            brickArr[i][j].Brick = null;
                            brickArr[i][j].isLog = false;
                        }
                    }
                }
            }
            return destoryCount;
        };
        Bricks.clearCurr = function () {
            if (currBricks.length > 0) {
                for (var i = 0; i < currBricks.length; i++) {
                    currBricks[i].destroy();
                }
            }
            currBricks = [];
            currPositions = [];
            nextPositions = [];
        };
        Bricks.CopyArray = function (sourceArr) {
            var targetArr = [];
            for (var i = 0; i < sourceArr.length; i++) {
                var pos = new BrickPos(sourceArr[i].x, sourceArr[i].y);
                targetArr.push(pos);
            }
            return targetArr;
        };
        Bricks.getBrickLeft = function (x) {
            return x * brickSize;
        };
        Bricks.getBrickTop = function (y) {
            return gameAreaHeight - (y + 1) * brickSize;
        };
        Bricks.getPostionByRandom = function (random) {
            var postions = [];
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
        };
        return Bricks;
    }());
    Bricks_1.Bricks = Bricks;
})(Bricks || (Bricks = {}));
//# sourceMappingURL=Bricks.js.map