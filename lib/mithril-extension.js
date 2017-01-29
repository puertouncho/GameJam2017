!(function () {

    var queueRefresh = _.debounce(function queueRefresh() {
        m.startComputation();
        m.endComputation();
    }, 4, { maxWait: 200 });
    
    window.store = function (fn) {
        fn.$store = true;
        return fn;
    };

	
    m.properties = function properties(target, properties) {
		var observer = new EventEmitter();
        _.forEach(properties, function(p, k) {
            var name = k;
            observer[name] = target[name] = m.prop(p, function(value) {
                queueRefresh();
				observer.emitEvent('change', [name, value]);
            });
        });
        return observer;
    };

    function create(classes, component, args) {
        var root = document.createElement('div');
        args = args || {};
        root.className = classes;
        document.body.appendChild(root);
        return m.mount(root, m.component.apply(m, [].slice.call(arguments, 1)));
    }
    m.create = create;

    m.prop = function prop(store, callback) {
        var cbs = [];
        if(typeof store === 'function' && !store.$store) return store;
        if (!callback && callback !== false) {
            callback = queueRefresh;
        }

        var prop = function propFn(value, off) {
            if(off) {
                var idx = cbs.indexOf(value);
                cbs.splice(idx, 1);
                return value;
            }
            if (arguments.length > 0) {
                if(_.isEqual(value,store)) return;
                if(value && value.then) {
                    Promise.resolve(value)
                        .then(function (value) {
                            store = value;
                            if (typeof callback == 'function') callback(value);
                            cbs.forEach(function(cb) {
                                try {
                                    cb(value);
                                } catch(e) {

                                }
                            });
                        });
                } else {
                    store = value;
                    if (typeof callback == 'function') callback(value);
                    cbs.forEach(function(cb) {
                        try {
                            cb(value);
                        } catch(e) {
                            
                        }
                    });
                }
            }
            return store;
        };

        prop.toJSON = function toJSON() {
            if(store && _.isFunction(store.toJSON)) return store.toJSON();
            return store;
        };
        prop.value = function value(fn) {
            cbs.push(fn);
            fn(store);
        };
        prop.change = function change(fn) {
            cbs.push(fn);
        };
        return prop;
    };

    window.monkeypatch = function monkeypatch(f1, f2) {
        return function () {
            var output1, output2;
            if (typeof f1 == "function") output1 = f1.apply(this, arguments);
            if (typeof f2 == "function") output2 = f2.apply(this, arguments);

            //make compatible w/ event handler `return false` behavior
            return output1 === false || output2 === false ? false : undefined;
        };
    };

    window.using = function using(fn) {
        m.startComputation();
        Promise.resolve(fn())
            .finally(function () {
                m.endComputation();
            });
    };


})();
