/**
* Bricks
*/
var Bricks;
(function (Bricks_1) {
    var Image = Laya.Image;
    var BrickPos = Models.BrickPos;
    var currPositions = new Array();
    var nextPositions = new Array();
    var currBricks = new Array();
    var Bricks = /** @class */ (function () {
        function Bricks() {
        }
        //创建新的方块坐标，若创建失败，则游戏结束
        Bricks.createNewBricksPostion = function () {
            var b = true;
            var max = 5;
            var min = -5;
            var random = parseInt((Math.random() * (max - min + 1) + min).toString(), 10);
            this.createNewBricksPostionByRandom(random);
            // this.createNewBricksPostionByRandom(0);
            for (var i = 0; i < currPositions.length; i++) {
                if (brickArr[currPositions[i].x][currPositions[i].y - 1].isLog) {
                    b = false;
                    break;
                }
            }
            if (b) {
                this.drawNewBricks();
            }
            return b;
        };
        //根据坐标画出新方块
        Bricks.drawNewBricks = function () {
            var gameBG = runtime.getGameBGImage();
            for (var i = 0; i < currPositions.length; i++) {
                var brick = this.createNewImage();
                brick.left = this.getBrickLeft(currPositions[i].x);
                brick.top = this.getBrickTop(currPositions[i].y);
                gameBG.addChild(brick);
                currBricks.push(brick);
            }
        };
        Bricks.createNewImage = function () {
            var brick = new Image(imgsUrl[2]);
            brick.height = brickSize;
            brick.width = brickSize;
            return brick;
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
            var b = this.checkCanMove();
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
        Bricks.checkCanMove = function () {
            if (nextPositions.length == 0)
                return false;
            var b = true;
            for (var i = 0; i < nextPositions.length; i++) {
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
                var brick = this.createNewImage();
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
                            Laya.Tween.to(brickArr[i][j].Brick, { x: this.getBrickLeft(i), y: this.getBrickTop(j - destoryCount) }, 100);
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
        Bricks.createNewBricksPostionByRandom = function (random) {
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
        };
        return Bricks;
    }());
    Bricks_1.Bricks = Bricks;
})(Bricks || (Bricks = {}));
//# sourceMappingURL=Bricks.js.map