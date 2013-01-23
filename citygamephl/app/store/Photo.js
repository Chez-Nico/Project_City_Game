Ext.define('cityGamePhl.store.Photo',{
	extend: 'Ext.data.Store',
	xtype:'imagesqueue',
	requires:['Ext.data.proxy.LocalStorage'],
config: {
		fields:['timestamp','src'],
		storeId:'theImageQueue',
		autoLoad:true,
		proxy:{
			type:'localstorage',
			id:'idImagesQueue',
			reader: {
				type: 'json'
			}
		}
	}
});