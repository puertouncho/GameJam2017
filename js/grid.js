var GGJ = GGJ || {}

GGJ.Grid = (function () {
	
	PIXI.loader
		.add('grid', 'images/background/bg_grid_tile.png')
		.add('gradient', 'images/background/bg_gradient_1.png')

	if (getParameterByName('other')) {
		main.on('CreateControllers', function () {
			var grid = new PIXI.Container();
			main.backStage.addChild(grid);
			var tile = new PIXI.extras.TilingSprite.fromImage('grid', innerWidth * 3, resolutionY * 5);
			grid.addChild(tile);
			var fade = new PIXI.Sprite.fromImage('gradient');
			fade.scale.x = resolutionX / 20;
			fade.scale.y = resolutionY / 500;
			tile.alpha = 0.3;
			fade.alpha = 0.7;
			grid.addChild(fade);       
			main.ticks.push(function (dt) {
				tile.x = -main.scrollOffset / 2 % 100;
				tile.y = - 1000 - ((main.master.y / 2) % 100);
			});
		})
	}	
	

})();