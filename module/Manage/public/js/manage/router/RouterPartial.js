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

        _registerRoute: function(/*String*/target, /*String|RegExp*/route, /*Function*/callback, /*Boolean?*/isBefore){

            route = lang.isString(route) && route.replace(new RegExp('/', 'g'), '');

            if (target == '/') {
                var matchedRoute = '/'+route;
            } else {
                var matchedRoute = target+'/'+route;
            }

            var index, exists, routeObj, callbackQueue = [], removed, self = this,
                routes = this._routes, routeIndex = this._routeIndex,
                targets = this._targets, parentTarget, foundTarget = null;

            var _splitTarget = [""];
            if (target != '/') {
                _splitTarget = lang.isString(target) && target.split('/') || [];
            }

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
            })(_splitTarget, targets);

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

            console.debug("Register routes >>>", routeObj, matchedRoute);


            if(typeof route == "string"){
                routeObj.parameterNames = this._getParameterNames(matchedRoute);
                routeObj.route = this._convertRouteToRegExp(matchedRoute);
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
