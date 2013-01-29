define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/hash",
    "dojo/topic",
    "dojo.DeferredList"
], function(declare, hash, topic, DeferredList){

    // module:
    //		dojo/router/RouterBase

    // Creating a basic trim to avoid needing the full dojo/string module
    // similarly to dojo/_base/lang's trim
    var trim;
    if(String.prototype.trim){
        trim = function(str){ return str.trim(); };
    }else{
        trim = function(str){ return str.replace(/^\s\s*/, '').replace(/\s\s*$/, ''); };
    }

    // Firing of routes on the route object is always the same,
    // no clean way to expose this on the prototype since it's for the
    // internal router objects.
    function fireRoute(params, currentPath, newPath){
        var queue, isStopped, isPrevented, eventObj, i, l;

        queue = this.callbackQueue;
        isStopped = false;
        isPrevented = false;
        eventObj = {
            stopImmediatePropagation: function(){ isStopped = true; },
            preventDefault: function(){ isPrevented = true; },
            oldPath: currentPath,
            newPath: newPath,
            params: params
        };

        for(i=0, l=queue.length; i<l; ++i){
            if(!isStopped){
                queue[i](eventObj);
            }
        }

        return !isPrevented;
    }

    // Our actual class-like object
    var RouterBase = declare(null, {
        // summary:
        //		A module that allows one to easily map hash-based structures into
        //		callbacks. The router module is a singleton, offering one central
        //		point for all registrations of this type.
        // example:
        //	|	var router = new RouterBase({});
        //	|	router.register("/widgets/:id", function(evt){
        //	|		// If "/widgets/3" was matched,
        //	|		// evt.params.id === "3"
        //	|		xhr.get({
        //	|			url: "/some/path/" + evt.params.id,
        //	|			load: function(data){
        //	|				// ...
        //	|			}
        //	|		});
        //	|	});

        _routes: null,
        _routeIndex: null,
        _targets: {},
        _started: false,
        _currentPath: "",

        idMatch: /:(\w[\w\d]*)/g,
        idReplacement: "([^\\/]+)",
        globMatch: /\*(\w[\w\d]*)/,
        globReplacement: "(.+)",

        constructor: function(kwArgs){
            // A couple of safety initializations
            this._routes = [];
            this._routeIndex = {};
            this._targets = {};

            // Simple constructor-style "Decorate myself all over" for now
            for(var i in kwArgs){
                if(kwArgs.hasOwnProperty(i)){
                    this[i] = kwArgs[i];
                }
            }
        },

        register: function(/*String|RegExp*/ target, /*String|RegExp*/ route, /*Function*/ callback){
            // summary:
            //		Registers a route to a handling callback
            // description:
            //		Given either a string or a regular expression, the router
            //		will monitor the page's hash and respond to changes that
            //		match the string or regex as provided.
            //
            //		When provided a regex for the route:
            //
            //		- Matching is performed, and the resulting capture groups
            //		are passed through to the callback as an array.
            //
            //		When provided a string for the route:
            //
            //		- The string is parsed as a URL-like structure, like
            //		"/foo/bar"
            //		- If any portions of that URL are prefixed with a colon
            //		(:), they will be parsed out and provided to the callback
            //		as properties of an object.
            //		- If the last piece of the URL-like structure is prefixed
            //		with a star (*) instead of a colon, it will be replaced in
            //		the resulting regex with a greedy (.+) match and
            //		anything remaining on the hash will be provided as a
            //		property on the object passed into the callback. Think of
            //		it like a basic means of globbing the end of a route.
            // example:
            //	|	router.register("/foo/:bar/*baz", function(object){
            //	|		// If the hash was "/foo/abc/def/ghi",
            //	|		// object.bar === "abc"
            //	|		// object.baz === "def/ghi"
            //	|	});
            // returns: Object
            //		A plain JavaScript object to be used as a handle for
            //		either removing this specific callback's registration, as
            //		well as to add new callbacks with the same route initially
            //		used.
            // route: String|RegExp
            //		A string or regular expression which will be used when
            //		monitoring hash changes.
            // callback: Function
            //		When the hash matches a pattern as described in the route,
            //		this callback will be executed. It will receive an event
            //		object that will have several properties:
            //
            //		- params: Either an array or object of properties pulled
            //		from the new hash
            //		- oldPath: The hash in its state before the change
            //		- newPath: The new hash being shifted to
            //		- preventDefault: A method that will stop hash changes
            //		from being actually applied to the active hash. This only
            //		works if the hash change was initiated using `router.go`,
            //		as changes initiated more directly to the location.hash
            //		property will already be in place
            //		- stopImmediatePropagation: When called, will stop any
            //		further bound callbacks on this particular route from
            //		being executed. If two distinct routes are bound that are
            //		different, but both happen to match the current hash in
            //		some way, this will *not* keep other routes from receiving
            //		notice of the change.

            return this._registerRoute(target, route, callback);
        },

        startup: function(){
            // summary:
            //		This method must be called to activate the router. Until
            //		startup is called, no hash changes will trigger route
            //		callbacks.

            if(this._started){ return; }

            var self = this;

            this._started = true;
            this._handlePathChange(hash());
            topic.subscribe("/dojo/hashchange", function(){
                // No need to load all of lang for just this
                self._handlePathChange.apply(self, arguments);
            });
        },

        _handlePathChange: function(newPath){
            var i, j, li, lj, routeObj, result,
                allowChange, parameterNames, params,
                routes = this._routes,
                currentPath = this._currentPath;

            if(!this._started || newPath === currentPath){ return allowChange; }

            allowChange = true;

            for(i=0, li=routes.length; i<li; ++i){
                routeObj = routes[i];
                result = routeObj.route.exec(newPath);

                if(result){
                    if(routeObj.parameterNames){
                        parameterNames = routeObj.parameterNames;
                        params = {};

                        for(j=0, lj=parameterNames.length; j<lj; ++j){
                            params[parameterNames[j]] = result[j+1];
                        }
                    }else{
                        params = result.slice(1);
                    }
                    allowChange = routeObj.fire(params, currentPath, newPath);
                }
            }

            if(allowChange){
                this._currentPath = newPath;
            }

            return allowChange;
        },

        _convertRouteToRegExp: function(route){
            // Sub in based on IDs and globs
            route = route.replace(this.idMatch, this.idReplacement);
            route = route.replace(this.globMatch, this.globReplacement);
            // Make sure it's an exact match
            route = "^" + route + "$";

            return new RegExp(route);
        },

        _getParameterNames: function(route){
            var idMatch = this.idMatch,
                globMatch = this.globMatch,
                parameterNames = [], match;

            idMatch.lastIndex = 0;

            while((match = idMatch.exec(route)) !== null){
                parameterNames.push(match[1]);
            }
            if((match = globMatch.exec(route)) !== null){
                parameterNames.push(match[1]);
            }

            return parameterNames.length > 0 ? parameterNames : null;
        },

        _indexRoutes: function(){
            var i, l, route, routeIndex, routes = this._routes;

            // Start a new route index
            routeIndex = this._routeIndex = {};

            // Set it up again
            for(i=0, l=routes.length; i<l; ++i){
                route = routes[i];
                routeIndex[route.route] = i;
            }
        },

        _registerRoute: function(/*String|RegExp*/target, /*String|RegExp*/route, /*Function*/callback, /*Boolean?*/isBefore){
            var index, targetIndex, exists, routeObj, callbackQueue, removed,
                targetContainer = [], self = this,
                matchedRoute = target+'/'+route,
                routes = this._routes, routeIndex = this._routeIndex;

            var _lookInSubroutines = function (target, subroutines, parentRoute){
                for (var i = 0; i < subroutines.length; i++) {
                    var _subroutines = subroutines[i].subroutines;
                    var _matchingRoute = (parentRoute || '') +'/'+subroutines[i].route;
                    if (_matchingRoute == target) {
                        targetIndex = i;
                        callbackQueue = [callback];
                        targetContainer = subroutines;
                        matchedRoute = _matchingRoute;

                        subroutines[i].fire = callback;
                    } else if(_subroutines && _subroutines.length > 0) {
                        var result = _lookInSubrscribers(target, _subroutines, _matchingRoute);
                        if (result) {
                            callbackQueue.unshift(subroutines[i].fire);
                            return true;
                        }
                    }
                }
                return null;
            };

            var _findNearestParent = function (target, subroutines) {
                var _nearestTargets = target.split('/');
                while (_nearestTargets.length > 1) {
                    _nearestTargets.pop();
                    var result = _lookInSubroutines(_nearestTargets.join('/'), subroutines);
                    if (result) {
                        return result;
                    }
                }
            };

            var foundTarget = _lookInSubroutines(target, this._targets);

            if (!foundTarget) {
                var nearestParent = _findNearestParent(target, this._targets);
                var _preparingRoute = {route: route,
                                       subroutines: [],
                                       fire: callback};

                if (!nearestParent) {
                    targetIndex = this._targets.push(_preparingRoute)-1;
                } else {
                    targetIndex = nearestParent.object.subroutines.
                                                push(_preparingRoute)-1;

                    targetContainer = nearestParent.container;
                }
            }

            index = this._routeIndex[matchedRoute];
            exists = typeof index !== "undefined";

            if(exists){
                routeObj = routes[index];
            }

            routeObj = {
                route: matchedRoute,
                callbackQueue: callbackQueue,
                fire: fireRoute
            };


            if(typeof route == "string"){
                routeObj.parameterNames = this._getParameterNames(route);
                routeObj.route = this._convertRouteToRegExp(route);
            }

            if(!exists){
                index = routes.length;
                routeIndex[matchedRoute] = index;
                routes.push(routeObj);
            }

            // Useful in a moment to keep from re-removing routes
            removed = false;

            return { // Object
                remove: function(){
                    if(removed){ return; }

                    targetContainer.splice(targetIndex, 1);

                    if(targetContainer.length === 0){
                        routes.splice(index, 1);
                        self._indexRoutes();
                    }

                    removed = true;
                },

                register: function(callback){
                    return self.register(target, route, callback);
                }
            };
        }
    });

    return RouterBase;
});
