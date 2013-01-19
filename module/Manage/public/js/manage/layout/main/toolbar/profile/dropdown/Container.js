define([
    "dojo/_base/declare",
    "dijit/form/DropDownButton",
    "./TooltipDialog"
], function(declare, DropDownButton, TooltipDialog) {
    return declare([ DropDownButton ], {
        //  summary:
        label: "Test",
        showLabel: true,
        iconClass: 'userIcon',
        baseClass: 'menu manage',
        dropDown: new TooltipDialog()
    });
});