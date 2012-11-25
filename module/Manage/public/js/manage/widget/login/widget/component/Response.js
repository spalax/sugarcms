define([
        "dojo/_base/declare",
        "manage/component/response/Status"
        ], function(declare, Response) {
// module:
//      manage/widget/main/package/login/form/widget/component/Response
    return declare([ Response ], {
        // summary:
        //      Response for the login form
        
        isSuccess: function () {
            // summary:
            //      Return true if user logged in successfully
            try {
                return this.getStatus() == 0; // Boolean
            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        }
    });
});