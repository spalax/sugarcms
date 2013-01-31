define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/router/RouterBase"
], function(declare, lang, RouterBase){

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
    var RouterPartial = declare([RouterBase], {

        _targets: {},

        constructor: function(){
            this._targets = {};
        },

        register: function(/*String|RegExp*/ target, /*String|RegExp*/ route, /*Function*/ callback){
            // see: BaseRouter::register
            //
            // description:
            //		It is has the same behavior as BaseRouter::register
            //      except one extra parameter target. Parameter target
            //      it is kind of namespace where your route will be
            //      executed. On example you have two nested TabContainers.
            //      First TabContainer"Users" with three tabs "Admins, Moderators, Regular".
            //      Second (Nested inside tab Users->Regular) TabContainer has another two tabs
            //      "Accepted, Pending". You need to provide ability to bring Users->Regular->Pending
            //      tab to user by url /users/regular/pending.

            //      If we will use plain BaseRouter: you will need to register a route
            //      with callback and inside callback define something like
            //      (UsersTabContainer-->SelectChild(Regular)-->SelectChild(Pending))
            //
            //      If we will use PartialRouter: you will need to register three routes
            //      register('/', '/users', OpenTabContainer(User));
            //      register('/users', '/regular', SelectChild(Regular));
            //      register('/users/regular', '/pending', SelectChild(Pending));
            //      And when user will put in address /users/regular/pending, router
            //      will execute callback for every peace of the user URI
            //          - one for /users,
            //          - one for /regular inside the /users,
            //          - one for /pending inside the /regular who inside the /users
            //      So in result will be 3 callbacks executed one for every peace of route.
            // example:
            //  |   router.register("/","/users", function (){
            //  |        // if the hash was /users
            //  |   }).register("/regular", function (){
            //  |       // if the hash was /users/regular
            //  |   })
            // returns: Object
            //		A plain JavaScript object to be used as a handle for
            //		either removing this specific callback's registration, as
            //		well as to add new callbacks with the same target initially
            //		used.
            // target: String
            //      Namespace where route will have effect
            // -----
            // all other parameters the same with BaseRouter

            return this._registerRoute(target, route, callback);
        },

        _prepareTargets: function (/*String|Array|RegExp*/ targets) {
            // summary:
            //      Method transform targets to suitable array
            //      format.
            // returns:
            //      Array
            try {
                var _splitTarget = [];

                if (targets instanceof Array) {
                    _splitTarget = targets;
                } else if (typeof targets == 'object') {
                    _splitTarget = [targets];
                } else if (typeof targets == 'string') {
                    _splitTarget = targets.split('/');
                    // Avoiding situation when split "/"
                    // and return ["", ""] now it is
                    // will be [""], avoid as well
                    // situation if targets equal empty "".
                    if (_splitTarget && _splitTarget.length > 1 && _splitTarget[0] == '') {
                        _splitTarget.splice(0,1)
                    }
                } else {
                    throw "Targets must be array or string types";
                }
                return _splitTarget;
            } catch (e) {
                 console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                 throw e;
            }
        },

        registerBefore: function(/*String|RegExp*/ route, /*Function*/ callback){
            // summary:
            //		This method is unsupported

            // FIXME:
            //      It is not correct to close one of methods
            //      in public interface of parent.
            //      Parent must be reorganized.
            throw TypeError("Method unsupported");
        },

        _stripExclusiveRegExp: function (/*String*/ str) {
            return str.replace(new RegExp(/^(\/\^|\/)/), '').
                        replace(new RegExp(/(\$\/|\/)$/), '');
        },

        _registerRoute: function(/*String|Array*/targets, /*String|RegExp*/route, /*Function*/callback){

            var index, exists, routeObj, callbackQueue = [], removed, self = this,
                routes = this._routes, routeIndex = this._routeIndex,
                parentTarget, foundTarget = null;

            if (lang.isFunction(route)) {
                callback = route;
                route = targets;
                targets = '/';
            }

            if (typeof targets == 'undefined') {
                throw "Targets must be defined";
            }

            if (typeof route == 'undefined') {
                throw "Route must be defined";
            }

            if (!lang.isFunction(callback)) {
                throw "Callback must be defined";
            }

            _splitTarget = this._prepareTargets(targets);

            var matchedRoute = '';
            for (var i = 0;i < _splitTarget.length; i++) {
                var _t = '';
                // Understanding is one of targets`s item
                // regexp.
                if (typeof _splitTarget[i] == 'object') {
                   _t = this._stripExclusiveRegExp(_splitTarget[i].toString());
                } else {
                   _t = _splitTarget[i].substr(0, 1) != '/' && '/'+_splitTarget[i] || _splitTarget[i];
                }
                console.log("T >>>", _t);
                if (_t != '/' && _t != '\\/') {
                    matchedRoute+=_t;
                }
                _splitTarget[i] = _t;
            }

            if (typeof route == 'object') {
                matchedRoute+=this._stripExclusiveRegExp(route.toString());
            } else {
                matchedRoute+=route;
            }

            console.log("Targets splitted", _splitTarget);
            (function _findRoute (splitTarget, targetsPointer) {
                var node = splitTarget.shift();
                foundTarget = targetsPointer[node];

                if (!foundTarget) {
                    foundTarget = targetsPointer[node] = {"fire": null, "sr": {}};
                }

                lang.isFunction(foundTarget['fire']) && callbackQueue.push(foundTarget['fire']);

                if (!splitTarget.length) {
                    targetsPointer[node]['sr'][route] = {"fire": callback,
                                                         "sr": {}};

                    parentTarget = targetsPointer[node].sr;
                    foundTarget = targetsPointer[node]['sr'][route];
                    callbackQueue.push(callback);
                } else {
                    parentTarget = foundTarget.sr;
                    _findRoute(splitTarget, foundTarget.sr);
                }
            })(_splitTarget, this._targets);

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

            console.debug("Register routes >>>", routeObj, matchedRoute, this._targets);


            routeObj.parameterNames = this._getParameterNames(matchedRoute);
            routeObj.route = this._convertRouteToRegExp(matchedRoute);

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
                    console.log("Delete ",parentTarget," route >>", route);
                    delete(parentTarget[route]);
                    routes.splice(index, 1);
                    self._indexRoutes();
                    removed = true;
                },

                register: function(route, callback){
                    return self.register(matchedRoute, route, callback);
                }
            };
        }
    });

    return RouterPartial;
});
