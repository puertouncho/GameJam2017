var GGJ = GGJ || {};



GGJ.LevelSelect = (function () {
	var levels = [{
			name: "01",
			description: "Nice And Easy"
		},
		{
			name: "02",
			description: "Sinful Pleasures"
		},
		{
			name: "03",
			description: "Say Hello, Wave Goodbye"
		},
		{
			name: "04",
			description: "Royal Salute"
		},
		{
			name: "05",
			description: "Catching Waves"
		},
		{
			name: "06",
			description: "Waving Not Drowning"
		},
		{
			name: "07",
			description: "Are You Crazy"
		},
		{
			name: "08",
			description: "Ultimate Surfing"
		}

	];

	var maxLevel = 0;
	maxLevel = (+localStorage.getItem('level')) || 1;

	var levelSelect = {
		space: function () {
			main.emitEvent('StartGame', [maxLevel]);
		},
		view: function () {

			return m('.start-background', {

			}, [
				m('.levels.container', [
					m('.row', [
						levels.map(function (level, index) {
							return m('.col-xs-3.box-bg', {
								onclick: function () {
									if (index <= maxLevel)
										main.emitEvent('StartGame', [index + 1]);
								},
								className: index > maxLevel ? 'disabled' : ''
							}, [
								m('.level-title', level.name),
								m('.level-description', level.Creadescription)
							])
						})

					])
				]),
				m('img.select-image[src=images/screens/Level_Select_pickups.png]'),
				m('.start-instructions', "Press Space To Start")
			]);
		}
	};



	main.on('LevelSelect', function () {
		GGJ.UI.mode(levelSelect);
	});

})();