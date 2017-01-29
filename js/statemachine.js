var StateMachine = (function () {

	function invokeParams(array, refThis, b) {
		if (!array || array.$processing) {
			return
		}

		array.$processing = true

		var i, l
		var parameters = Array.prototype.slice.call(arguments, 2)
		try {

			for (i = array.length; i >= 0; i--) {
				var v = array[i]
				if (v) {
					v.apply(refThis, parameters)
				}
			}

		} catch (e) {
			console.error(e.stack)
		}
		array.$processing = false
	}

	function invoke(array, refThis) {
		if (refThis) {
			return invokeParams.apply(refThis, arguments)
		}
		if (!array) {
			return
		}
		for (var i = array.length; i >= 0; i--) {
			var v = array[i]
			if (v) {
				v()
			}
		}
	}

	function noop() {}

	
	function StateMachine() {
		var states = {}
		var currentState = "default"
		var enter = {}
		var exit = {}
		this.changeList = []
		var self = this
		this.currentTime = Date.now()
		this.states = states
		this.enter = enter
		this.exit = exit
		
		this.change = function (fn) {
			if (fn) {
				this.changeList.push(fn)
			} else {
				invoke(this.changeList)
			}
		}

		this.define = function (state, method, fn) {
			var self = this
			if (_.isObject(state)) {
				_.forEach(state, function (s, i) {
					self.states[i] = self.states[i] || {}
					_.forEach(s, function (m, j) {
						if (j != "enter" && j != "exit") {
							self.states[i][j] = m
						} else if (j == "enter") {
							self.enter[i] = self.enter[i] || []
							self.enter[i].push(m)
						} else if (j == "exit") {
							self.exit[i] = self.exit[i] || []
							self.exit[i].push(m)
						}
					})
				})
				return state
			} else {
				this.states[state] = this.states[state] || {}
				this.states[state][method] = fn
				return fn
			}
		}

		this.call = function (method) {
			var state = this.states[this.state]
			if (!state) {
				return
			}
			method = state[method]
			if (!method) {
				return
			}
			if (arguments.length) {
				var parameters = Array.prototype.slice.call(arguments, 1)
				return method.apply(this, parameters)
			} else {
				return method.apply(this)
			}
		}

		this.register = function register(method, indirect) {
			var self = this
			method.split(' ').filter(function (m) {
				return m
			}).forEach(function (method) {
				var working = noop
				var lastState
				self.change(function () {
					self.states[lastState = self.state] = self.states[self.state] || {}
					if (indirect) {
						working =
							self.states[self.state][method] =
							self.states[self.state][method] || noop
					} else {
						self[method] =
							self.states[self.state][method] =
							self.states[self.state][method] || noop
					}
				})
				if (indirect) {
					self[method] = function stateMachineBoundFunction() {
						return working.apply(self, arguments)
					}
				}
			})

		}

		Object.defineProperties(this, {
			state: {
				get: function () {
					return currentState
				},
				set: function (v) {
					if (v == currentState) {
						return
					}
					var lastState = currentState
					currentState = v
					self.currentTime = Date.now()
					self.change()
					invoke(exit[lastState], this)
					invoke(exit["always"], this)
					invoke(enter[currentState], this)
					invoke(enter["always"], this)
				}
			},
			timeInState: {
				get: function () {
					return Date.now() - self.currentTime
				}
			}
		})

	}
	StateMachine.create = function (base, states, register, regparam) {
		StateMachine.call(base)
		if (states) {
			base.define(states)
		}
		if (register) {
			base.register(register, regparam)
		}
		return base
	}


	return StateMachine
})()