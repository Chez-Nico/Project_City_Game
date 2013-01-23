Ext.define('cityGamePhl.controller.Photo', {
    extend: 'Ext.app.Controller',

    requires: ['Ext.device.Notification','Ext.device.Camera','Ext.device.Connection','Ext.data.JsonP'],


     config: {
      		refs: {
					principal:'photoCard',
					logo: '#logo',
					carousel : '#carousel',
				},
			control:{
					'photoCard button[action=snapPicture]': {
						tap: 'openCamera'
					},
					'photoCard button[action=savePicture]': {
						tap: 'sendPicture'
					},
					'photoCard button[action=removeCar]': {
						tap: 'removeCar'
					}


    			}    
    
    		},
    
    
openCamera: function(button,eve){
		Ext.device.Camera.capture({
            success: this.onCaptureSuccess,
            scope: this,
            quality : 50,//for testing havving this at 50 does faster uploads
            source: 'camera',
            destination: 'data'
        });
	},
    onCaptureSuccess: function(uri) {
   console.log('got foto:'+uri);
        Ext.getStore('theImageQueue').add({src: uri});
                var lostor = Ext.getStore('theImageQueue');
			        lostor.add({
						        	src: uri,
						        	timestamp: new Date().getTime()
						        });
					lostor.sync();
					
				var	yourCarousel = Ext.getCmp('carousel');
				
					                    yourCarousel.add({
					                        html: '<center><img  src="data:image/jpeg;base64,' + lostor.last().get('src') + '" /></center>'
					                    });
					                   yourCarousel.next();
   
    },
    removeCar: function(button,eve){
    var lostor = Ext.getStore('theImageQueue');
    	lostor.getProxy().clear();
    	lostor.data.clear();
    	lostor.sync();	
    	
    	var	yourCarousel = Ext.getCmp('carousel');
		yourCarousel.removeAll();
    },
    sendPicture: function(button,eve){
    	

    	var	yourCarousel = Ext.getCmp('carousel');
		if(yourCarousel.getItems().length == 1){
		
			Ext.device.Notification.show({
		    title: 'Er moet een foto genomen worden',
		    message: 'Neem een foto voor je iets wilt verzenden'
			});
		
		}else{
		
		var	yourCarousel = Ext.getCmp('carousel');
		var activeIndex = yourCarousel.indexOf(yourCarousel.getActiveItem());
		 var lostor = Ext.getStore('theImageQueue');
		 var photoLoster = lostor.getAt(activeIndex-1).get('src');

	   Ext.Ajax.request({
        url: 'http://webservice.citygamephl.be/CityGamePHLWeb/resources/generic/sendPhoto',
        method: 'POST',
        params: {
            gameID: 1,
            playerID: 1,
            assignmentID: 1,
            photo: photoLoster 
            
        },
        success: function (response) {
			console.log(response);

        },
        failure: function (response) {
            //me.sessionToken = null;
            //me.singInFailure('Login failed. Please try again later.');
        }
    });
		 



			
			      //  content: lostor.getAt(activeIndex-1).get('src')
			
			
		/*	Ext.data.JsonP.request({
						    url: 'http://webservice.citygamephl.be/CityGamePHLWeb/resources/generic/tekst',
							params: {PhotoCoding: ""},
							callbackKey: 'callback',
				         
						    success: function(data){
						    Ext.Msg.alert('Success', data );
						    },
						
						    failure: function(data) {
						        Ext.Msg.alert('failure',data );
						    }
						    						});
						    						*/			
		

					/*	Ext.define('User', {
					    extend: 'Ext.data.Model',
					    config: {
					        fields: ['id', 'name', 'email']
					    }
					});
					
					var store = Ext.create('Ext.data.Store', {
					    model: 'User',
					    proxy: {
					        type: 'jsonp',
					        url : 'http://localhost:8080/WebApplication2/resources/generic/getPhoto'
					    }
					});

store.load();

	*/
						
		}


		
    
    
    },
    launch:function(){
    var lostor = Ext.getStore('theImageQueue');
    var	yourCarousel = Ext.getCmp('carousel');
			lostor.each(function(record) {	
                yourCarousel.add({
                    html: '<center><img  src="data:image/jpeg;base64,' + record.get('src') + '" /></center>'
                });
			});		                  


    	Ext.device.Connection.on({
    	
    		onlinechange: function( online, type, eOpts ){
    			if(online){
    			
    				if(type == Ext.device.Connection.WIFI || type == Ext.device.Connection.ETHERNET){
    					Ext.Msg.alert('Connection', 'We are now connected with: '+type);
    				}
    			}
    		}
    	});
    },
    
});

