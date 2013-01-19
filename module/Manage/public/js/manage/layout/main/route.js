define([
    "dojo/_base/declare",
    "dojo/aspect",
    "dojo/_base/lang",
    "./Content",
    "./Rounded",
    "./Toolbar"
], function(declare, aspect, lang,
            ContentContainer, RoundedContainer, ToolbarContainer) {
    var baseRoute = declare(null, {
        // summary:
        //      This is a base class for all Routes contained
        //      inside package.

        handle: function (/*Object?*/ args) {
            // summary:
            //      Every route must have handler, for calling
            //      when route match.
            // returns:
            //      It is returns nothing (void)
            throw new TypeError("abstract");
        },

        getRoute: function () {
            // summary:
            //      Every route must have string route representation
            // example:
            //      /user/index or /this/is/my/route
            // returns:
            //      String representation of route
            try {
                return this._route; //String
            } catch (e) {
                 console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                 throw e;
            }
        }
    });

    var containerRoute = declare(null, {
        // summary:
        //      Mixin for adding functionality of saving
        //      and working with container dijit._Container

        constructor: function (/*dijit._Container*/ container) {
            try {
                if (!container.isInstanceOf(require('dijit/_Container'))) {
                    throw "container must be instance of dijit._Container";
                }
                this.__container = container;
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
                return this.__container;
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

        getInstance: function () {
            // summary:
            //      Return instantiated or cached object
            // returns:
            //      Object
            // tags:
            //      protected

            if (!this.__instance) {
                this.__instance = this.createObject();
            }
            return this.__instance;
        }
    });

    var instanceWithParamsRoute = declare(null, {
        // summary:
        //      This is a base class for all Routes who is the entry route

        // routeClass: [readonly protected] Callable
        //      This parameter have to contains function which would handle
        //      route match request.
        routeClass: null,

        createObject: function (/*Object*/ constructorParams) {
            // summary:
            //      Create new object
            // returns:
            //      Object of handler
            // tags:
            //      protected

            return new this.routeClass(this.processParams(constructorParams));
        },

        processParams: function (/*Object*/ params) {
            // summary:
            //      pre processor method for
            //      adding additional behavior
            //      before child will be selected
            // tags:
            //      protected

            return params;
        },

        getInstance: function (/*Object*/ params, /*Boolean*/ forceRecreate) {
            // summary:
            //      Return instantiated with params object
            //      or cached and params setted object.
            // returns:
            //      Object
            // tags:
            //      protected

            if (!this.__instance || forceRecreate) {
                this.__instance = this.createObject(params);
            } else {
                params = this.processParams(params);

                if (this.__instance.set) {
                    this.__instance.set(params);
                } else {
                    this.__instance = lang.mixin(this.__instance, params);
                }
            }
            return this.__instance;
        }
    });

    var contentContainedRoute = declare([baseRoute, containerRoute, instanceWithParamsRoute], {
        // summary:
        //      Mixin handle situation when route will
        //      be added as a child of ContentContainer
        constructor: function (/*./ContentContainer*/ container) {
            try {
                if (!container.isInstanceOf(ContentContainer)) {
                    throw "Container is not an instance of StackContainer";
                }
            } catch (e) {
                 console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                 throw e;
            }
        },

        handle: function (evt) {
            // see: baseRoute::handle
            try {
                if (!evt) {
                    throw "Event from router must be given";
                }

                var instance = this.getInstance(evt.params, true);
                var container = this.getContainer();

                aspect.after(instance, 'onHide', function (){
                    console.debug("On Hide route");
                    container.removeChild(instance);
                    instance.destroyRecursive();
                });

                container.addChild(instance);
                container.selectChild(instance);
            } catch (e) {
                 console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                 throw e;
            }
        }
    });

    var toolbarContainedRoute = declare([containerRoute, customInstanceRoute], {
        // summary:
        //      Route mixin provide validation to avoid possibilities
        //      to insert container which are not suitable with Toolbar.

        constructor: function (/*./ToolbarContainer*/ container) {
            try {
                if (!container.isInstanceOf(ToolbarContainer)) {
                    throw "Container is not an instance of ToolbarContainer";
                }
                this.getContainer().addChild(this.getInstance());
            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        }
    });

    return {
            route: baseRoute,
            stack: {
                contained: contentContainedRoute
            },
            toolbar: {
                contained: toolbarContainedRoute
            }
          };
});