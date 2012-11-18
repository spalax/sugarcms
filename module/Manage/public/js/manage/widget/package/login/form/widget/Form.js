define([
        "dojo/_base/declare",
        "dijit/layout/ContentPane",
        "dijit/_TemplatedMixin",
        "dijit/_WidgetsInTemplateMixin",
        "dijit/form/TextBox",
        "dojo/request",
        "dojo/text!./templates/Form.html"
        ], function(declare, ContentPane, _TemplatedMixin, 
                     _WidgetsInTemplateMixin, TextBox, request, template) {
// module:
//      manage/widget/package/login/form/widget/Form
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
                request.post('/manage/login/in',
                             {data:{
                                 login: this.loginNode.get('value'),
                                 password: this.passwordNode.get('value')
                             }}).then(function (response){
                                 alert("Responsed");
                                 console.log(response);
                             });
            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        }
    });
});