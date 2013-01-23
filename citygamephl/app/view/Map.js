Ext.define('cityGamePhl.view.Map', {
    extend: 'Ext.Panel',
    xtype: 'mapCard',
    requires: [
        'Ext.device.Geolocation',
        'Ext.device.Notification',
        'Ext.Map',
        'Ext.TitleBar',
        'Ext.tab.Bar',
        'Ext.SegmentedButton',
        'Ext.Ajax'
    ],

    config: {
        title  : 'Geolocation',
        iconCls: 'maps',
        layout: 'fit',
        items: [

            {
                xtype: 'map',
                id:'demap',
                autoUpdate: false,

                mapOptions : {
            	zoom: 20,
            	autoUpdate: false,
            	disableDefaultUI: true,
            	zoomControl: true,
            	navigationControl: true
                 		},
        		useCurrentLocation: false,
        		autoUpdate: false        		
            }
        ]
        
    }    

    
    
    });
