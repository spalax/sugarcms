define([
    "dojo/_base/declare",
    "dijit/layout/ContentPane",
    "dojo/hash",
    "dojo/_base/lang",
    "dojo/aspect",
    "dojo/_base/array",
    "../../StackContainer",
    "./route",
    "../package"
], function(declare, ContentPane, hash, lang, aspect, array, StackContainer, route, _Package) {
    return declare("ContentPackage", [ ContentPane,  _Package ], {

        // _container: [privat] dijit.layout.StackContainer
        _container: null,

        postCreate: function () {
            try {
                this._container = new StackContainer();
                this.addChild(this._container);

                this.inherited(arguments);
            } catch (e) {
                 console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                 throw e;
            }
        },

        getRoute: function (/*Object*/ routeParams) {
            // see: package::getRoute
            try {
                var routeObject = new route(routeParams);
                routeObject.on('handle', lang.hitch(this, 'handle', this._container, routeObject));
                return routeObject;
            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        },

        handle: function (/*dijit.layout.StackContainer*/ container, /*route.route*/ routeObject, /*Object*/ evt) {
            // summary:
            //      Handler for all routes
            try {
                if (!this._inst) {
                    this._inst = routeObject.getInstance();
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