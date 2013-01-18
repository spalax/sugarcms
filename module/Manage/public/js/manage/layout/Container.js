define([
    "./StackContainer",
    "./login/Container",
    "./main/Container"
], function(StackContainer, LoginContainer, MainContainer) {
    // summary:
    //      Primary and top container, it is
    //      contains Main and Login containers
    //      and responsible for switch between them.
    //      Furthermore it is subscribing on event SessionExpired
    //      this event should force user to login once again.

    return require('dojo/_base/declare')([ StackContainer ], {

        // isAuth: [public] Boolean
        //      Contains information is user auth in
        //      system or not
        isAuth: false,

        postCreate: function() {
            // summary:
            //      Parse JSON files with predefined package configurations.
            //      Collecting routes from package files.
            try {
                var _self = this;

                require('dojo/dom-style').set(this.domNode, 'visibility', 'hidden');
                this.connect(this, 'startup', function (){
                   require('dojo/dom-style').set(this.domNode, 'visibility', 'visible');
                });

                this.subscribe("poller-SessionExpired", function (){
                    _self.set('isAuth', false);
                });

                this._addLoginContainerChild();
                this._addMainContainerChild();

                this.inherited(arguments);
            } catch (e) {
                console.error(this.declaredClass + " " + arguments.callee.nom, arguments, e);
                throw e;
            }
        },

        _setIsAuthAttr: function (/*Boolean*/ auth) {
            // summary:
            //      Setter handle user logIn and logOut.
            //      If auth == true then user should see
            //      MainContainer else LoginContainer
            try {
                if (auth) {
                    this._showMain();
                } else {
                    this._showLogin();
                }
            } catch (e) {
                 console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                 throw e;
            }
        },

        _showLogin: function () {
            // summary:
            //      Method switch user to the LoginContainer
            //      and force him to login one more time.
            try {
                console.debug("Switch to Login screen");
                var _self = this;
                this.selectChild(this._loginContainer);

                require('dojo/_base/array').forEach(this.getChildren(), function (child) {
                    try {
                        if (child == _self._mainContainer) {
                            child.destroyRecursive();
                            _self.removeChild(child);
                        }
                    } catch (e) {
                         console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                         throw e;
                    }
                });

                this._addMainContainerChild();
            } catch (e) {
                 console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                 throw e;
            }
        },

        _showMain: function () {
            // summary:
            //      Method will switch user to the MainContainer
            try {
                console.debug("Switch to Main screen");
                this._selectMainContainerChild();
            } catch (e) {
                 console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                 throw e;
            }
        },

        _addLoginContainerChild: function () {
            // summary:
            //      Adding LoginContainer to the current
            //      container and subscribe on events provided
            //      by LoginContainer.
            try {
                if (!this._loginContainer) {
                    this._loginContainer = new LoginContainer();
                }
                this._loginContainer.on('LoginSuccess',
                                        require('dojo/_base/lang').hitch(this,
                                                                         '_showMain'));
                this.addChild(this._loginContainer);
            } catch (e) {
                 console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                 throw e;
            }
        },

        _addMainContainerChild: function () {
            // summary:
            //      Adding MainContainer to the current container.
            try {
                if (!this._mainContainer) {
                    this._mainContainer = new MainContainer();
                }
                this.addChild(this._mainContainer);
            } catch (e) {
                 console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                 throw e;
            }
        },

        _selectMainContainerChild: function () {
            // summary:
            //      Selecting MainContainer in current container.
            try {
                if (!this._mainContainer) {
                    this._addMainContainerChild();
                }
                this.selectChild(this._mainContainer);
            } catch (e) {
                 console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                 throw e;
            }
        },

        addChild: function (/*dijit._Container*/ child) {
            // summary:
            //      Adding consistency check for disallow
            //      children duplication
            try {
                var result = require('dojo/_base/array').some(this.getChildren(), function (_child){
                   return child == _child;
                });

                if (result) {
                    throw "You could not add more then one LoginContainer or MainContainer " +
                          "inside current container";
                }

                this.inherited(arguments);
            } catch (e) {
                 console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                 throw e;
            }
        },

        startup: function () {
            try {
                this.inherited(arguments);
                this.resize();
            } catch (e) {
                 console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                 throw e;
            }
        }
    });
});