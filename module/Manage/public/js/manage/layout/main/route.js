define([
    "require",
    "dojo/_base/declare",
    "dojo/aspect",
    "dojo/_base/lang",
    "dojo/Evented",
    "dojo/router"
], function(_require, declare, aspect, lang, Evented,
            router) {

    var baseRoute = declare("BaseRoute", [ Evented ], {
        // summary:
        //      This is a base class for all Routes contained
        //      inside package.

        handle: function (/*Object?*/ evt) {
            // summary:
            //      Every route must have handler, for calling
            //      when route match.
            // returns:
            //      It is returns nothing (void)

            this.emit('handle', evt);
        },

        register: function () {
            // summary:
            //      Method for register route handler,
            //      it is will be called every time when
            //      route will be match.
            try {
                var _self = this,
                    routePath = this.getRoute();

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

    var containerRoute = declare("ContainerRoute", [], {
        // summary:
        //      Mixin for adding functionality of saving
        //      and working with container dijit._Container

        _container: null,

        setContainer: function (container) {
            // summary:
            //      Setter for _container
            //  tags:
            //      protected
            try {
                if (!container.isInstanceOf(_require('dijit/_Container'))) {
                    throw "container must be instance of dijit._Container";
                }
                this._container = container;
            } catch (e) {
                 console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                 throw e;
            }
        },

        getContainer: function () {
            // summary:
            //      Getter for __container
            // returns:
            //      dijit._Container
            // tags:
            //      protected
            try {
                return this._container;
            } catch (e) {
                 console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                 throw e;
            }
        }
    });

    var customInstanceRoute = declare(null, {
        // summary:
        //      This is a base class for all Routes who need
        //      specific instance instantiation

        createObject: function () {
            // summary:
            //      Returning newly created object
            // returns:
            //      Object of handler
            // tags:
            //      protected
            throw new TypeError("abstract");
        },

        getInstance: function (/*Boolean?*/ alwaysFresh) {
            // summary:
            //      Return instantiated or cached object
            // returns:
            //      Object
            // tags:
            //      protected

            if (!this.__instance || alwaysFresh) {
                this.__instance = this.createObject();
            }
            return this.__instance;
        }
    });

    return {
            route: baseRoute,
            container: containerRoute,
            custominstance: customInstanceRoute
          };
});