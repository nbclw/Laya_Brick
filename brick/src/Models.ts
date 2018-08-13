/**
* Models 
*/
module Models {
	import Image = Laya.Image;
	export class LogBrick {
		constructor() {
		}
		public isLog: boolean= false;;
		public Brick: Image;
	}
	
	export class BrickPos {
		constructor(_x: number, _y: number) {
			this.x = _x;
			this.y = _y;
		}
		public x: number;
		public y: number;
	}
}