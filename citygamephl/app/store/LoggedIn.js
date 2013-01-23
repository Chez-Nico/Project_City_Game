Ext.define('cityGamePhl.store.LoggedIn', {
	extend: 'Ext.data.Store',
	requires:['Ext.data.proxy.LocalStorage'],
config: {
		fields:['username','password','type'],
		storeId:'Session',
		autoLoad:true,
		proxy:{
			type:'localstorage',
			id:'Session',
			reader: {
				type: 'json'
			}
		}
	}
});