define([
    "dojo/_base/declare",
    "dijit/layout/ContentPane",
    "dojo/hash",
    "dojo/_base/lang",
    "dojo/aspect",
    "dojo/_base/array",
    "../../StackContainer",
    "../package"
], function(declare, ContentPane, hash, lang, aspect, array, StackContainer, _Package) {
    return declare("ContentPackage", [ ContentPane, _Package ], {

        postCreate: function () {
            try {
                var _self = this;
                var container = new StackContainer();

                array.forEach(this.getRoutes(), function (route){
                    var routeObject = new route();
                    routeObject.on('handle', lang.hitch(_self, '_handle', container, routeObject));
                    _self.routes.push(routeObject);
                });

                this.addChild(container);
                this.inherited(arguments);

            } catch (e) {
                 console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                 throw e;
            }
        },

        _handle: function (/*dijit.layout.StackContainer*/ container, /*route.route*/ route, /*Object*/ evt) {
            // summary:
            //      Handler for all routes
            try {
                if (!this._inst) {
                    this._inst = route.getInstance();
                    console.debug("Route handled: New instance created >>>", this._inst);
                    container.addChild(this._inst);

                    aspect.before(this, 'onShow', lang.hitch(this._inst, 'refresh'));
                    aspect.after(this, 'onHide', lang.hitch(this._inst, 'onHide'));
                }

                console.debug("Route handled: params >>>", evt);
                this._inst.attr(evt && evt.params || {});

                container.selectChild(this._inst);
                this.getParent().selectChild(this);
            } catch (e) {
                 console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                 throw e;
            }
        },

        onShow: function () {
            // summary:
            //      Called every time when user
            //      select tab with appropriate package.
            //      This method will change the hash for
            //      the correct router work.
            try {
                hash(this.defaultRoute);
            } catch (e) {
                 console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                 throw e;
            }
        },

        getRoutes: function () {
            // summary:
            //      In this method routes are added to
            //      the routes array
            // returns:
            //      Array of route Classes
            // tags:
            //      protected

            throw new TypeError("abstract");
        },

        registerRoute: function (/*route.route*/ route) {
            // see: package::registerRoute
            try {
                console.debug("Register route >>>>", route);
                route.register();
            } catch (e) {
                 console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                 throw e;
            }
        }
    });
});