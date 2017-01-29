var GGJ = GGJ || {}

GGJ.UI = (function () {
	
	var empty = {
		view: function () {
			return m('.empty');
		},
		space: function () {
			
		}
	}
	

	function UI(args) {
		this.mode = m.prop(empty);
		this.mode.change(function (value) {
			if (value.start) {
				value.start();
			}
		});
		main.on('space:release', function () {
			this.mode().space();
		}.bind(this));
	};

	var ui = new UI();

	var UIComponent = {
		view: function (ctrl, args) {
			return ui.mode().view();
		}
	}
	var uiElement;
	window.addEventListener('load', function () {
		m.mount(uiElement = document.querySelector('#ui'), UIComponent);	
	});

	main.on('HideUI', function () {
		uiElement.style.display = 'none';
		ui.mode(empty);
	});

	return ui;

})();