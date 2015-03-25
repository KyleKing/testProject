// Login Demo - Famous Dead People Package
Meteor.subscribe("users");

Template.registerHelper('userList', function(){
  return Meteor.users.find();
});

Template.login.rendered = function() {
    $('#sandbox-container .input-group.date').datepicker({
        todayHighlight: true,
        toggleActive: true
    });
};

Accounts.ui.config({
    requestPermissions: {},
    extraSignupFields: [{
        fieldName: 'name',
        fieldLabel: 'Name',
        inputType: 'text',
        visible: true,
        saveToProfile: true
    }, {
        fieldName: 'UID',
        fieldLabel: 'UID',
        inputType: 'text',
        visible: true,
        saveToProfile: true
    }, {
        fieldName: 'terms',
        fieldLabel: 'I accept the terms and conditions',
        inputType: 'checkbox',
        visible: true,
        saveToProfile: false
    }]
});