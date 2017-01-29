var GGJ = GGJ || {};

GGJ.TimeOut = (function () {
	var id
	var timeOut = {
		start: function () {
			id = setTimeout(function () {
				main.emitEvent("GameOver")
			}, 3000);
		},
		space: function () {
			clearTimeout(id);
			main.emitEvent('GameOver');
		},
		view: function () {
			return m('.start-background', {
				onclick: function () {
					main.emitEvent('GameOver');
				}
			}, [
				m('.huge-text', "TIME UP!")
			]);
		}
	};

	main.on('TimeUp', function () {
		GGJ.UI.mode(timeOut);
	});

	
})();