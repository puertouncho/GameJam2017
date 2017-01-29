var GGJ;
var MINIMUM_AMPLITUDE = 0.01;
		
(function (GGJ) {
	var Wave = {};
	Wave.line = (function () {

		var empty = {};
		var nextWaveId = 0;
		var otherLines = new PIXI.Container();

		function WaveSegment(args) {
			args = args || empty;
			this.t = args.t || 0;
			this.amplitude = args.amplitude || 1;
			this.duration = args.duration || 2;
			this.decay = args.decay !== undefined ? args.decay : 0.5;
			this.impact = args.impact || 0;
			this.time = 0;
			this.speed = args.speed || 1;
			waves[length++] = this;
			this.id = nextWaveId++;
			this.graphic = new PIXI.Graphics();
			this.color = Math.floor(Math.random() * 128 + 128) * 65536 + Math.floor(Math.random() * 128 + 128) * 256 + Math.floor(Math.random() * 128) + 128;
			otherLines.addChild(this.graphic);
		}

		WaveSegment.prototype.draw = function (options) {
			var height = options.height;
			var width = options.width || innerWidth;
			var time = options.time;
			var divisions = options.divisions || 100;
			var duration = options.duration;
			var graphic = this.graphic;
			graphic.clear();
			

			for (var x = 0; x < innerWidth; x += width / divisions, time += duration / divisions) {
				graphic.lineStyle(1, this.color, Math.max(0.24, 1 - this.time) * (time < this.t || time > this.endTime() ? 0 : 1));
				if (x == 0) {
					graphic.moveTo(x, this.solve(time) * height);
				} else {
					graphic.lineTo(x, this.solve(time) * height);
				}
			}

		};

		WaveSegment.prototype.remove = function () {
			otherLines.removeChild(this.graphic);
		};

		WaveSegment.prototype.tick = function (dt) {
			this.time = Math.min(1, this.time + dt * this.speed);
			this.impact = Easie.circInOut(this.time, 0, 1, 1);
		};

		WaveSegment.prototype.updated = function () {
			this._endTime = 0;
		};

		WaveSegment.prototype.solve = function (t) {
			if (t < this.t || t > this.endTime()) return 0;
			var position = t - this.t;
			var cycle = Math.floor(position / this.duration);
			var amplitude = this.impact * this.amplitude * (this.decay ? Math.pow(this.decay, cycle) : 1);
			var point = (position % this.duration) / this.duration;
			var value = this.fn(point) * amplitude;
			return value;
		};
		WaveSegment.prototype.fn = function (t) {
			return -Math.sin(Math.PI * 2 * t);
		};
		WaveSegment.prototype.endTime = function () {
			if (this._endTime) return this._endTime;
			this._endTime = this.decay == 0 ? Infinity : this.t + (this.duration * (2 + -Math.log2(this.decay)));
			return this._endTime;
		};

		function drawAllLines(options) {
			for (var i = 0; i < length; i++) {
				waves[i].draw(options);
			}
		}

		function draw(options) {
			var graphic = options.graphic;
			var duration = options.duration || 10;
			var divisions = options.divisions || 200;
			var width = options.width || innerWidth;
			var height = options.height || 300;
			var time = options.time || 0;
			var change = (options.change || divisions / 4) * width / divisions;
			var changed = false;

			graphic.clear();
			graphic.lineStyle(4, 0x77FFFF, 0.8);

			for (var x = 0; x < innerWidth; x += width / divisions, time += duration / divisions) {
				graphic.lineStyle(x < change ? 8 - Math.min(8, Math.max(1, (change - x)/14 )) : 1, 0x77FFFF, x < change ? 1 : 0.6);
				if (x == 0) {
					graphic.moveTo(x, Wave.line.solve(time) * height);
				} else {
					graphic.lineTo(x, Wave.line.solve(time) * height);
				}
			}
		}

		var waves = [];
		var alternate = [];
		var length = 0;
		var alternateLength = 0;

		main.on('LevelReady', function () {
			waves = [];
			alternate = [];
			length = 0;
			alternateLength = 0;
			otherLines.removeChildren();
		});		


		return {
			lines: otherLines,
			Wave: WaveSegment,
			window: function (start, end) {
				alternateLength = 0;
				for (var i = length - 1; i >= 0; i--) {
					var wave = waves[i];
					if (wave.endTime() > start) {
						alternate[alternateLength++] = wave;
					} else {
						wave.remove();
					}
				}
				length = alternateLength;
				var temp = waves;
				waves = alternate;
				alternate = temp;
				main.waves = length;
			},
			draw: draw,
			drawAllLines: drawAllLines,
			solve: function (t) {
				var v = 0;
				for (var i = 0; i < length; i++) {
					v += waves[i].solve(t);
				}
				return v;
			},
			tick: function (dt) {
				for (var i = 0; i < length; i++) {
					waves[i].tick(dt);
				}
			}
		};


	})();

	GGJ.Wave = Wave;
})(GGJ = GGJ || (GGJ = {}));