Ext.define("cityGamePhl.controller.Pap", {
    extend: "Ext.app.Controller",
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
 
                    
    },
    launch: function () {
        this.callParent();
        this.map = Ext.getCmp('demap');
           						
		
	
	/*	this.map.on('maprender', function(comp, map) {
		 

		      
		});
		*/
		
			this.myLocation();

        
        
    },
   myLocation: function(){
    this.callParent();
   this.map = Ext.getCmp('demap');

   var mylocation;
   Ext.device.Geolocation.getCurrentPosition({
            scope: this,
            success: function(position) {  
                
                console.log(this.map);
 					var myIcon = new google.maps.MarkerImage("resources/icons/me.png", null , null, null, new google.maps.Size(30,30));
				           console.log("ll");
				           mylocation = new google.maps.Marker({
				                map: this.map.getMap(),
				                optimized: false, 
  								icon: myIcon				               
				            });           
				            
			this.map.setMapCenter(position.coords);     
                
            },
            failure: function(data) {
                this.setMasked(false);
                Ext.device.Notification.show({
                    title: 'Geolocation',
                    message: "Fout bij het opvragen van jouw locatie"
                });
                
                
                
            }
        });

		
		

		
		var offlineLocations = Ext.getStore('MyOfflineLocation');

        
             Ext.device.Geolocation.watchPosition({
       //         enableHighAccuracy : false,
                allowHighAccuracy: true,
				frequency: 3000,
                scope: this,
                callback: function(position) {
      
                		mylocation.setPosition(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
                		
                		// Add circle overlay and bind to marker
						/*var circle = new google.maps.Circle({
						  map: this.map.getMap(),
						  radius: 16093,    // 10 miles in metres
						  fillColor: '#AA0000'
						});
						circle.bindTo('center', mylocation, 'position');*/

                		var dataToSend = null;
                		if (Ext.device.Connection.isOnline()) {
						//    Ext.Msg.alert('You are currently connected via ' + Ext.device.Connection.getType());
						
							if(offlineLocations.getCount() != 0){
							var myArray = new Array(offlineLocations.getCount());
							var index = 0;
							offlineLocations.each(function(record, index){
							
							
							 record.set('index', index);
							 myArray[index] = new Array(3);
								myArray[index][0] = record.get('timeStamp');
    						 	myArray[index][1] = record.get('latitude');
    						 	myArray[index][2] = record.get('longitude');
    						})
							
							offlineLocations.getProxy().clear();
							offlineLocations.data.clear();
							offlineLocations.sync();
								
							dataToSend = Ext.encode(myArray);
							
							
							}else{
						    
						    dataToSend = Ext.encode(new Date().getTime()+','+position.coords.latitude+','+position.coords.longitude);
						    
							}
							
							if(dataToSend != null){
							 Ext.Ajax.request({
							    url: 'http://webservice.citygamephl.be/CityGamePHLWeb/resources/generic/create',
							    method: 'POST',
							    contentType: "application/json; charset=utf-8",
							    jsonData: dataToSend,
							    success: function(response, opts) {
									 console.log('d');
							   },
							   failure: function(response, opts) {
							      console.log('server-side failure with status code ' + response.status);
							   },
							   scope:this
							});
							
						}
						
						} else {
						    
						    
						   				offlineLocations.add({
													        	timeStamp: new Date().getTime(),
													        	latitude: position.coords.latitude,
													        	longitude: position.coords.longitude						        
							        					});
										offlineLocations.sync();
						}
						
						
                		
 
                },
                failure: function() {
                    console.log("oooo");


                }
            });
   
   
   },
   bunnyLocation: function(){
   
   						 Ext.Ajax.request({
							    url: 'http://webservice.citygamephl.be/CityGamePHLWeb/resources/generic/bunny',
							    method: 'POST',
							    contentType: "application/json; charset=utf-8",
							    jsonData: dataToSend,
							    success: function(response, opts) {
									 console.log('d');
							   },
							   failure: function(response, opts) {
							      console.log('server-side failure with status code ' + response.status);
							   },
							   scope:this
							});

   
   
   },
   huntersLocation: function(){},
    init: function () {
        this.callParent();
               console.log("init");
 
    }
    
});
