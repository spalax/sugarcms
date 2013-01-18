define([
    "dijit/_Widget",
    "dijit/_Contained",
    "dijit/_Container",
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/_base/array",
    "dojo/router",
    "dijit/_TemplatedMixin",
    "./_Package",
    "dojo/json",
    "./Content",
    "./Rounded",
    "./Toolbar",
    "dojo/text!./resources/packages/Content.json",
    "dojo/text!./resources/packages/Rounded.json",
    "dojo/text!./resources/packages/Toolbar.json",
    "dojo/text!./templates/Container.html"
], function(_Widget, _Contained, _Container, declare, lang, array, router,
            _TemplatedMixin, _Package, JSON, ContentContainer,
            RoundedContainer, ToolbarContainer,
            contentPackagesJSONString, roundedPackagesJSONString,
            toolbarPackagesJSONString, template) {
    return declare([ _Widget, _Contained, _Container, _TemplatedMixin ], {
        templateString:  template,

        postCreate: function() {
            // summary:
            //      Parse JSON files with predefined package configurations.
            //      Collecting routes from package files.
            try {
            	routes = this._getRoutes(JSON.parse(toolbarPackagesJSONString));
                this.addChild(new ToolbarContainer({routes: routes}));
                console.debug("Loaded ToolbarContainer with routes", routes);
            	
                routes = this._getRoutes(JSON.parse(roundedPackagesJSONString));
                this.addChild(new RoundedContainer({routes: routes}));
                console.debug("Loaded RoundedContainer with routes", routes);

                var routes = this._getRoutes(JSON.parse(contentPackagesJSONString));
                this.addChild(new ContentContainer({routes: routes}));
                console.debug("Loaded ContentContainer with routes", routes);
                
                this.inherited(arguments);
            } catch (e) {
                console.error(this.declaredClass + " " + arguments.callee.nom, arguments, e);
                throw e;
            }
        },

        _getRoutes: function (packages) {
            // summary:
            //      Walking thru packages array and
            //      extracting routes from every package.
            //      Collect them and return.
            // returns:
            //      Array of collected routes
            try {
                var routes = [];
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
                                var _routes = packageObject.getRoutes();
                                console.debug("Array with routes ", _routes,
                                    " was read from package ", pack['package']);
                                array.forEach(_routes, function (route){
                                    routes.push(route);
                                });
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
                return routes;
            } catch (e) {
                 console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
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
        }
    });
});