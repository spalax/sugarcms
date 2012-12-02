define([
    "dijit/layout/StackContainer",
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/_base/array",
    "dojo/router",
    "dijit/_TemplatedMixin",
    "dojo/json",
    "./_Package",
    "dojo/text!./resources/Packages.json",
    "dojo/text!./templates/Container.html"
], function(StackContainer, declare, lang, array, router, _TemplatedMixin, JSON, 
            _Package, packagesJSONString, template) {
    return declare([ StackContainer, _TemplatedMixin ], {
        templateString:  template,
        postCreate: function() {
            // summary:
            //      Parse JSON files with predefined package configurations.
            //      Collecting routes from package files.
            try {
                var packages = JSON.parse(packagesJSONString);
                array.forEach(packages, lang.hitch(this, function (pack){
                    try {
                        if (!pack['package']) {
                            throw "Widget key does not found";
                        }
                        console.debug("Require package ", pack['package']);
                        require([ pack['package']+"/Package" ], lang.hitch(this, function (Package) {
                            try {
                                var packageObject = new Package();
                                if (!packageObject.isInstanceOf(_Package)) {
                                    throw "Loading package is not compatible with type _Package";
                                }
                                var routes = packageObject.getRoutes();
                                console.debug("Array with routes ", routes," was read from package ", pack['package']);
                                array.forEach(routes, lang.hitch(this, '_registerNewRoute'));
                            } catch (e) {
                                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                                throw e;
                            }
                        }));
                    } catch (e) {
                        console.error(this.declaredClass + " " + arguments.callee.nom, arguments, e);
                        throw e;
                    }
                }));

                this.inherited(arguments);
            } catch (e) {
                console.error(this.declaredClass + " " + arguments.callee.nom, arguments, e);
                throw e;
            }
        },

        startup: function () {
            // summary:
            //      In this startup will starting up StackContainer
            //      and router will be starting as well.
            try {
                this.inherited(arguments);
                router.startup();
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
                    throw "Route array has incopatible format. It is must containes keys route and" +
                          " callback";
                }
                
                if (typeof(route['init']) != "function") {
                    throw "Callback must be function";
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