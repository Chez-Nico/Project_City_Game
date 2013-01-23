Ext.define('cityGamePhl.store.Location', {
	extend: 'Ext.data.Store',
	requires:['Ext.data.proxy.LocalStorage'],
config: {
		fields:['timeStamp','latitude','longitude'],
		storeId:'MyOfflineLocation',
		autoLoad:true,
		proxy:{
			type:'localstorage',
			id:'idMyOfflineLocation',
			reader: {
				type: 'json'
			}
		}
	}
});