var GGJ = GGJ || {};

GGJ.LevelComplete = (function () {
	var levelComplete = {
		start: function () {
		},
		space: function () {
			main.emitEvent('CreateLevel', [+main.difficulty + 1])
		},
		view: function () {
			return m('.start-background', {
				onclick: function () {
					main.emitEvent('GameOver');
				}
			}, [
				m('.huge-text', "LEVEL COMPLETE!")
			]);
		}
	};

	main.on('LevelComplete', function () {
		GGJ.UI.mode(levelComplete);
	})
	
	
})();