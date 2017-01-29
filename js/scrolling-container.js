var GGJ;
(function (main) {
	main.scrollOffset = 0;

	main.scrollingContainer = new PIXI.Container();

	main.on('CreateControllers', function () {
		main.playerStage.addChild(main.scrollingContainer);
	});

	main.updateScrollPosition = function (pos) {
		main.scrollingContainer.x = -pos;
		main.scrollOffset = pos;
	}

	
})(main);