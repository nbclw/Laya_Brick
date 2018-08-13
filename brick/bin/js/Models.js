/**
* Models
*/
var Models;
(function (Models) {
    var LogBrick = /** @class */ (function () {
        function LogBrick() {
            this.isLog = false;
        }
        ;
        return LogBrick;
    }());
    Models.LogBrick = LogBrick;
    var BrickPos = /** @class */ (function () {
        function BrickPos(_x, _y) {
            this.x = _x;
            this.y = _y;
        }
        return BrickPos;
    }());
    Models.BrickPos = BrickPos;
})(Models || (Models = {}));
//# sourceMappingURL=Models.js.map