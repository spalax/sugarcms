define([
        "dojo/_base/declare",
        "dijit/layout/ContentPane",
        "dijit/_TemplatedMixin",
        "dijit/_WidgetsInTemplateMixin",
        "dijit/form/TextBox",
        "dojo/request",
        "./component/Response",
        "dojo/text!./templates/Form.html"
        ], function(declare, ContentPane, _TemplatedMixin,
                     _WidgetsInTemplateMixin, TextBox, request, Response, template) {
// module:
//      manage/widget/main/package/login/form/widget/Form
    return declare([ ContentPane, _TemplatedMixin, _WidgetsInTemplateMixin ], {
        // summary:
        //      This is class for displaying login Form
        templateString: template,
        
        _onLogin: function () {
            // summary: 
            //      Called every time when user click on the button in Template
            // tags: 
            //      private
            try {
                var buttonNode = this.buttonNode;
                
                request.post('/manage/login.json',
                             {data:{
                                 login: this.loginNode.get('value'),
                                 password: this.passwordNode.get('value')
                               }, 
                              handleAs: 'json'}).then(function (data) {
                                  // summary: 
                                  //      Success back function called if request
                                  //      successfully executed
                                  try {
                                      var responseObject = new Response(data);
                                      if (responseObject.isSuccess()) {
                                          alert("Successfully logged in");
                                      } else {
                                          alert("Logged in failed");
                                      }
                                  } catch (e) {
                                      console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                                      throw e;
                                  }
                              }, function () {
                                // summary: 
                                //      Error back function called if some thing gone wrong in
                                //      callback or request was fail
                                try {
                                    
                                } catch (e) {
                                    console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                                    throw e;
                                }
                            }).always(function () {
                                  try {
                                      alert("Called every time");
                                      buttonNode.cancel();
                                  } catch (e) {
                                      console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                                      throw e;
                                  }
                              });
                
            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        }
    });
});