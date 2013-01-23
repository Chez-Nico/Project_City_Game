Ext.define('cityGamePhl.controller.Map', {
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
        
        //de map krijgen van de view
        this.map = Ext.getCmp('demap'); 						
		 		
		//Dit zijn de arrays die de markers bij houden
		this.activeHunterMarkers = new Array();
		this.activePreyMarkers = new Array();
		//Instantie aanmaken van mijn locatie
		this.mylocation = new google.maps.Marker({ });  
		
       
		
		
	/*		this.map.on('maprender', function(comp, map) {
		 

		      
		});
		
*/


function HomeControl(controlDiv, map,loc) {

  // Set CSS styles for the DIV containing the control
  // Setting padding to 5 px will offset the control
  // from the edge of the map.
  controlDiv.style.padding = '5px';

  // Set CSS for the control border.
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = 'white';
  controlUI.style.borderStyle = 'solid';
  controlUI.style.borderWidth = '2px';
  controlUI.style.cursor = 'pointer';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to set the map to Home';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.style.fontFamily = 'Arial,sans-serif';
  controlText.style.fontSize = '12px';
  controlText.style.paddingLeft = '4px';
  controlText.style.paddingRight = '4px';
  controlText.innerHTML = '<strong>Mijn locatie</strong>';
  controlUI.appendChild(controlText);

  // Setup the click event listeners: simply set the map to Chicago.
  google.maps.event.addDomListener(controlUI, 'click', function() {
  	var plaats = new google.maps.LatLng(loc.position.Ya, loc.position.Za); 
    map.setCenter(plaats)
  });
}
		var homeControlDiv = document.createElement('div');
  var homeControl = new HomeControl(homeControlDiv, this.map.getMap(),this.mylocation);

  homeControlDiv.index = 1;
  this.map.getMap().controls[google.maps.ControlPosition.TOP_RIGHT].push(homeControlDiv);
	

    },
    hunterLocation:function(){
    
    	
    	Ext.Ajax.request({
							    url: 'http://webservice.citygamephl.be/CityGamePHLWeb/resources/generic/getLocations/'+encodeURI(1)+'/'+encodeURI(1),
							    success: function(response, opts) {
							    
							        var hunterLocations = Ext.decode(response.responseText);
							         var infowindow = null;
							         
							         infowindow = new google.maps.InfoWindow({
										content: "holding..."
										});
																	        
							        for(var i=0; i<this.activeHunterMarkers.length; i++){
									        this.activeHunterMarkers[i].setMap(null);
									}


							        var hunterIcon = new google.maps.MarkerImage("resources/icons/Elmer-Fudd-Hunting-icon.png", null , null, null, new google.maps.Size(30,30));
			      					for(var hunterLocation in hunterLocations )
									{
									    console.log(hunterLocations[hunterLocation].player);
									    
									 var marker = new google.maps.Marker({
							        		position: new google.maps.LatLng(hunterLocations[hunterLocation].latitude, hunterLocations[hunterLocation].longitude),
							        		map: this.map.getMap(),
							        		optimized: false,
							        		icon:hunterIcon,
							        		title:'Een Jager',
							        		html:hunterLocations[hunterLocation].player
							     	 });
							     	 
							     	
							     	google.maps.event.addListener(marker, 'click', function () {
									// where I have added .html to the marker object.
									infowindow.setContent(this.html);
									infowindow.open(this.map, this);
									});
																		    
									    
									    this.activeHunterMarkers.push(marker);
									    
									}

							   

							   },
							   failure: function(response, opts) {
							      console.log('server-side failure with status code ' + response.status);
							   },
							   scope:this
							});
							

    
    
    
    },
    preyLocation:function(){
    
    	
    	Ext.Ajax.request({
							    url: 'http://webservice.citygamephl.be/CityGamePHLWeb/resources/generic/getLocations/'+encodeURI(1)+'/'+encodeURI(1),
							    success: function(response, opts) {
							    
							    	//locaties van de prooi opvragen
							        var preyLocations = Ext.decode(response.responseText);
							        //instantie maken van het infowindow bij het klikken op het icon
							        var infowindow = new google.maps.InfoWindow({});
									//Alle huidige markers van de map gooien om de nieuwe er op te kunnen zetten								        
							        for(var i=0; i<this.activePreyMarkers.length; i++){
									        this.activePreyMarkers[i].setMap(null);
									}

									//Icon aanmaken van de prooi
							        var preyIcon = new google.maps.MarkerImage("resources/icons/Prey.png", null , null, null, new google.maps.Size(30,30));
							        //Alle locaties verkrijgen
			      					for(var preyLocation in preyLocations )
									{
									    console.log(preyLocations[preyLocation].player);
									    
									 var marker = new google.maps.Marker({
							        		position: new google.maps.LatLng(preyLocations[preyLocation].latitude, preyLocations[preyLocation].longitude),
							        		map: this.map.getMap(),
							        		optimized: false,
							        		icon:preyIcon,
							        		title:'Een Jager',
							        		html:preyLocations[preyLocation].player
							     	 });
							     	 
							     	
							     	google.maps.event.addListener(marker, 'click', function () {
									// where I have added .html to the marker object.
									infowindow.setContent(this.html);
									infowindow.open(this.map, this);
									});
																		    
									    
									    this.activePreyMarkers.push(marker);
									    
									}

							   

							   },
							   failure: function(response, opts) {
							      console.log('server-side failure with status code ' + response.status);
							   },
							   scope:this
							});
							

    
    
    
    },
    myLocation : function(){
    
    var offlineLocations = Ext.getStore('MyOfflineLocation');
     Ext.device.Geolocation.watchPosition({
                enableHighAccuracy : true,
                allowHighAccuracy: true,
				frequency: 10000,
                scope: this,
                callback: function(position) {
      
      					//plaats de locatie van van de marker naar de nieuwe locatie
                		this.mylocation.setPosition(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
						
						//variable waar de data in komt die verstuurd moet worden naar de webserver
                		var dataToSend = null;
                		
                		//kijken of er een connectie is
                		if (Ext.device.Connection.isOnline()) {
							this.hunterLocation();
							
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
							
								
							dataToSend = Ext.encode(myArray);
							
							
							}else{
						    
						    //stuur de tijd en huidige locatie door 
						    dataToSend = Ext.encode(new Date().getTime()+','+position.coords.latitude+','+position.coords.longitude);
						    
							}
							
							if(dataToSend != null){
							 Ext.Ajax.request({
							    url: 'http://webservice.citygamephl.be/CityGamePHLWeb/resources/generic/create',
							    method: 'POST',
							    contentType: "application/json; charset=utf-8",
							    jsonData: dataToSend,
							    success: function(response, opts) {
							    
							    //maak de datastore leeg
										offlineLocations.getProxy().clear();
										offlineLocations.data.clear();
										offlineLocations.sync();
							   },
							   failure: function(response, opts) {
							      console.log('server-side failure with status code ' + response.status);
							   },
							   scope:this
							});
							
						}
						
						} else {
						    
						    //als het device niet verbonden is met het internet sla de gegevens op in een datastore
						   				offlineLocations.add({
													        	timeStamp: new Date().getTime(),
													        	latitude: position.coords.latitude,
													        	longitude: position.coords.longitude						        
							        					});
										offlineLocations.sync();
						}
						
						
                		
 
                },
                failure: function() {
                    Ext.device.Notification.show({
                        title: 'Geolocation',
                        message: 'Uw locatie kan niet opgevraagd worden'
                    });
                }
            });

    
    },
    
    init: function () {
        this.callParent();
               
           
    },
    start: function(){
     /*Deze functie word aangeropen bij het opstarten van de applicatie
 Het eerste wat er gebeurd is de huidige locatie op vragen van waar we bevinden
 scope:this > zorgt er voor dat de this naar de hoofd aplicatie refereert.
 allowHighAccuracy > bepaald of er gps gebruikt mag worden of niet
 success:function > als de locatie op gevraagd kan worden word er naar deze functie verwezen
 failre:function > word aangeroepen als er iets fouts gebeurd met het op vrage van de gps
 */ 
    Ext.device.Geolocation.getCurrentPosition({
            scope: this,
            enableHighAccuracy : true,
            allowHighAccuracy: true,

            success: function(position) { 
            //Dit zet de map locatie naar het punt waar jij zelf bent
                this.map.setMapCenter(position.coords);
                
                //Dit maakt een icoontje aan
 					var myIcon = new google.maps.MarkerImage("resources/icons/myLocationDot.png", null , null, null, new google.maps.Size(30,30));
				           console.log("ll");
				           //hier maak ik het icoon aan 
				           this.mylocation = new google.maps.Marker({
				                map: this.map.getMap(),
				                optimized: false, 
  								icon: myIcon				               
				            });                
				            //dit plaatst het icoontje op de map
				            this.mylocation.setPosition(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));

                
            },
            failure: function(data) {
                this.setMasked(false);
                Ext.device.Notification.show({
                    title: 'Geolocation',
                    message: "Fout bij het opvragen van jouw locatie"
                });
                
                
                
            }
        });
    
    		//De functies aanroepen
		this.hunterLocation();
		this.myLocation();   
    
    
    }
    
});
