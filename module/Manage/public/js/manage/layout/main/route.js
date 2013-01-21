define([
    "require",
    "dojo/_base/declare",
    "dojo/aspect",
    "dojo/_base/lang",
    "dojo/Evented",
    "dojo/Stateful",
    "dojo/router"
], function(_require, declare, aspect, lang, Stateful, Evented,
            router) {

    return declare("BaseRoute", [ Stateful, Evented ], {
        // summary:
        //      This is a base class for all Routes contained
        //      inside package.

        uri: '',

        handle: function (/*Object?*/ evt) {
            // summary:
            //      Every route must have handler, for calling
            //      when route match.
            // returns:
            //      It is returns nothing (void)

            this.emit('handle', evt);
        },

        _uriGetter: function () {
            try {
                return this.uri;
            } catch (e) {
                 console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                 throw e;
            }
        },

        register: function () {
            // summary:
            //      Method for register route handler,
            //      it is will be called every time when
            //      route will be match.
            try {
                var _self = this,
                    routePath = this.get('uri');

                router.register(routePath, function (e) {
                    try {
                        console.debug("Loading route >>> ", routePath, e);
                        _self.handle(e);
                        console.debug("Route >>>> ", routePath, ' loaded');
                    } catch (e) {
                        console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                        throw e;
                    }
                });
                console.debug("Added route to the router ", routePath,
                    " and obj is  ", this);


            } catch (e) {
                 console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                 throw e;
            }
        }
    });
});