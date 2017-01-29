var GGJ = GGJ || {};

GGJ.GameOver = (function () {
	var id;
	var gameOver = {
		start: function () {
			id = setTimeout(function () {
				main.emitEvent("GoTitle")
			}, 5000);
		},
		space: function () {
			main.emitEvent('GoTitle');
			clearTimeout(id);
		},
		view: function () {
			return m('.start-background', {
				onclick: function () {
					main.emitEvent('GoTitle');
				}
			}, [
				m('.huge-text', "Game Over: " + main.score)
			]);
		}
	};

	main.on('GameOver', function () {
		GGJ.UI.mode(gameOver);
	});

	
})();