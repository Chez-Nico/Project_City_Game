Ext.define('cityGamePhl.view.Main', {
    extend: 'Ext.form.Panel',
    alias: "widget.loginview",
    requires: ['Ext.form.FieldSet', 'Ext.form.Password', 'Ext.Label', 'Ext.Img'],
    config: {
        title: 'Login',
        items: [
                    {
                        xtype: 'image',
                        src: 'resources/icons/lock.png',
                        style: 'width:40px;height:40px;margin:auto'
                    },
                    {
                        xtype: 'label',
                        html: 'Login failed. Please enter the correct credentials.',
                        itemId: 'signInFailedLabel',
                        hidden: true,
                        hideAnimation: 'fadeOut',
                        showAnimation: 'fadeIn',
                        style: 'color:#990000;margin:5px 0px;'
                    },
                    {
                        xtype: 'fieldset',
                        title: 'Login Example',
                        items: [
                            {
                                xtype: 'textfield',
                                placeHolder: 'Username',
                                itemId: 'userNameTextField',
                                name: 'userNameTextField',
                                required: true
                            },
                            {
                                xtype: 'passwordfield',
                                placeHolder: 'Password',
                                itemId: 'passwordTextField',
                                name: 'passwordTextField',
                                required: true
                            }
                        ]
                    },
                    {
                        xtype: 'button',
                        itemId: 'logInButton',
                        ui: 'action',
                        padding: '10px',
                        text: 'Log In'
                    }
         ]
    },
    listeners: [{
    delegate: '#logInButton',
    event: 'tap',
    fn: 'onLogInButtonTap'
}],
onLogInButtonTap: function () {

    var me = this;

    var usernameField = me.down('#userNameTextField'),
        passwordField = me.down('#passwordTextField'),
        label = me.down('#signInFailedLabel');

    label.hide();

    var username = usernameField.getValue(),
        password = passwordField.getValue();

    // Using a delayed task in order to give the hide animation above
    // time to finish before executing the next steps.
    var task = Ext.create('Ext.util.DelayedTask', function () {

        label.setHtml('');

        me.fireEvent('signInCommand', me, username, password);

        usernameField.setValue('');
        passwordField.setValue('');
    });

    task.delay(500);
},
showSignInFailedMessage: function (message) {
    var label = this.down('#signInFailedLabel');
    label.setHtml(message);
    label.show();
}


});
