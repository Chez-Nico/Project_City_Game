Ext.define('cityGamePhl.controller.Main',{
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            loginView: 'loginview',
            loggedinView: 'loggedinview'
        },
        control: {
            loginView: {
                signInCommand: 'onSignInCommand'
            }
        }
    },
    onSignInCommand: function (view, username, password) {
 

    var me = this,
        loginView = me.getLoginView();

    if (username.length === 0 || password.length === 0) {

        loginView.showSignInFailedMessage('Please enter your username and password.');
        return;
    }


var hashwachtwoord = CryptoJS.SHA1(password)+"";

     loginView.setMasked({
        xtype: 'loadmask',
        message: 'Signing In...'
    });
 
    Ext.Ajax.request({
        url: 'http://webservice.citygamephl.be/CityGamePHLWeb/resources/generic/login',
        method: 'POST',
        params: {
            username: username,
            password: hashwachtwoord
        },
        success: function (response) {

            var loginResponse = Ext.decode(response.responseText);

            if ( typeof loginResponse.playerID != "undefined") {

                me.signInSuccess();     //Just simulating success.
            } else {
                me.singInFailure(loginResponse.message);
            }
        },
        failure: function (response) {
            me.sessionToken = null;
            me.singInFailure('Login failed. Please try again later.');
        }
    });
},
signInSuccess: function () {
	scope:this,
    console.log('Signed in.');
    var loginView = this.getLoginView();
    var loggedinview = this.getLoggedinView();
    loginView.setMasked(false);
console.log(loggedinview);
	this.getApplication().getController('Map').start();
    Ext.Viewport.animateActiveItem(loggedinview, this.getSlideLeftTransition());
    
},
getSlideLeftTransition: function () {
    return { type: 'slide', direction: 'left' };
},
singInFailure: function (message) {
    var loginView = this.getLoginView();
    loginView.showSignInFailedMessage(message);
    loginView.setMasked(false);
}



});
