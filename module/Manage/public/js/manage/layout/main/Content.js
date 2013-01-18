define([
    "../StackContainer",
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/_base/array",
    "dojo/router",
    "dojo/hash",
    "dojo/on",
    "dijit/_TemplatedMixin",
    "dojo/text!./templates/Content.html"
], function(StackContainer, declare, lang, array, router, hash, on, _TemplatedMixin, template) {
    return declare([ StackContainer, _TemplatedMixin ], {
        templateString:  template,
        _firstRoute: '#/',

        postCreate: function() {
            // summary:
            //      Parse JSON files with predefined package configurations.
            //      Collecting routes from package files.
            try {
                if (!lang.isArray(this.routes)) {
                    throw "Routes must be defined for container";
                }
                var _self = this;

                array.forEach(this.routes, lang.hitch(this, '_registerNewRoute'));
                this.inherited(arguments);
            } catch (e) {
                console.error(this.declaredClass + " " + arguments.callee.nom, arguments, e);
                throw e;
            }
        },
        
        _registerNewRoute: function (route) {
            // summary:
            //      Registering route as new one to the router. 
            //      Route must feet required format, if so then
            //      it is will added to the router and when
            //      user will request path from router will
            //      be callback called.
            //
            // route: Object
            //      Object who contains URL of the route and callback
            //      which will associate URL and init from this unit..
            try {
                console.debug("Route loaded ", route, " and type ");
                if (!array.every(['route', 'init'], function (key){
                    return typeof(route[key]) != 'undefined';
                })) {
                    throw "Route array has incompatible format. It is must contains keys route and" +
                          " callback";
                }
                
                if (typeof(route['init']) != "function") {
                    throw "Callback must be function";
                }

                // Registering first route, it is will be loaded
                // by default if any hashes are defined by users
                if (!this._firstRoute) {
                   this._firstRoute = route['route'];
                }

                var _self = this;
                router.register(route['route'], function (e) {
                    
                    try {
                        console.debug("Loading route >>> ", route['route']);
    
                        var _module = route['init'](e);
                        
                        _self.addChild(_module);
                        _self.selectChild(_module);
                        
                        var __conn = dojo.connect(_module, 'onHide', function (){
                            dojo.disconnect(__conn);
                            _self.removeChild(_module);
                            _module.destroyRecursive();
                        });
    
                        console.debug("Route >>>> ", route['route'], ' loaded');
                    } catch (e) {
                        console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                        throw e;
                    }
                });

                console.debug("Added route to the router ", route, 
                              " and callback ", route['init']);
            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        }
    });
});