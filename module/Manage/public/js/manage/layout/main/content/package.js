define([
    "dojo/_base/declare",
    "../../ContentPane",
    "dojo/hash",
    "dojo/_base/lang",
    "dojo/aspect",
    "dojo/_base/array",
    "../../StackContainer",
    "./route",
    "../package"
], function(declare, ContentPane, hash, lang, aspect, array, StackContainer, route, _Package) {
    return declare("ContentPackage", [ ContentPane,  _Package ], {

        // _routeInstances: [private] Array
        //      Container for created instances,
        //      made for persist instances which owned
        //      by route

        // _container: [private] dijit.layout.StackContainer
        _container: null,

        doLayout: false,

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

        extractRoute: function (/*Object*/ routeParams) {
            // see: package::extractRoute
            try {
                var routeObject = new route(routeParams);
                routeObject.on('handle', lang.hitch(this, 'handle', this._container, routeObject));
                return routeObject;
            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        },

        handle: function (/*dijit.layout.StackContainer*/ container, /*route*/ routeObject, /*Object*/ evt) {
            // summary:
            //      Handler for all routes inside content container
            try {
                if (!this._routeInstances) {
                    this._routeInstances = [];
                }
                var _inst = this._routeInstances[routeObject.get('uri')];

                if (!_inst) {
                    _inst = this._routeInstances[routeObject.get('uri')] = routeObject.getInstance();
                    console.debug("Route handled: New instance created >>>", _inst);
                    container.addChild(_inst);

                    aspect.before(this, 'onShow', lang.hitch(_inst, 'refresh'));
                    aspect.after(this, 'onHide', lang.hitch(_inst, 'onHide'));
                } else {
                    console.debug("Route handled: Cached instance will be used >>>", _inst);
                }

                console.debug("Route handled: params >>>", evt, _inst);
                _inst.attr(evt && evt.params || {});
                container.selectChild(_inst);
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