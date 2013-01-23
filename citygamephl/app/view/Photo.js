Ext.define('cityGamePhl.view.Photo', {
    extend: 'Ext.Panel',
    requires: ['Ext.Img','Ext.Button','Ext.Carousel'],
    xtype: 'photoCard',
    config: {
    	title:'foto',
        layout: 'vbox',
        align: 'stretch',
        scrollable: false,
                launch : function() {
    
    	 Ext.Msg.alert('You are currently connected via ' );
    		
    
      },
        
		items: [{
		                xtype: 'button',
		                ui: 'normal',
		                text: 'Take Picture',
		                action:'snapPicture'
		                
		            },				    {
				        xtype: 'carousel',
				        id: 'carousel',
				        height:'50%',
						style:'center'		       
							
				    },
				    {
		                xtype: 'button',
		                ui: 'normal',
		                text: 'Save picture',
		                action:'savePicture'
		            },
				    {
		                xtype: 'button',
		                ui: 'normal',
		                text: 'Empty carosel',
		                action:'removeCar'
		            }


				    
			]   
   },
});

 