var GGJ = GGJ || {};

GGJ.StartScreen = (function () {
	var startScreen = {
		start: function () {
			main.emitEvent("TitleScreen");	
		},
		space: function () {
			main.emitEvent('LevelSelect');
		},
		view: function () {
			return m('.start-background', {
				onclick: function () {
					main.emitEvent('LevelSelect');
				}
			}, [
				m('.start-logo', m.trust('&nbsp;')),
				m('.start-instructions', "Press Space To Play")
			]);
		}
	};

	var empty = {
		start: function () {
			
		},
		space: function () {
			
		},
		view: function () {
			return m('.empty');
		}
	};

	window.addEventListener('load', function () {
		GGJ.UI.mode(startScreen);	
	});	
	
	main.on("GoTitle", function () {
		GGJ.UI.mode(startScreen);
	});

	main.on('CreateLevel', function () {
		GGJ.UI.mode(empty);
	});
	


})();