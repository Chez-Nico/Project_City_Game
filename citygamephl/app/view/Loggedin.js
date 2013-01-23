Ext.define('cityGamePhl.view.Loggedin', {
    extend: 'Ext.TabPanel',
    alias: "widget.loggedinview",
    
    tabBar:{ 
    	docked:'top',
    	layout: {
    	pack:'center'
    	}
    
    },
    config:{
       title: 'Loggedin',
       
  
    
    	items:[
    		
    		{
    		
    		xtype:'mapCard'
    		
    		},
    		{
    		
    		title:'Opdracht',
    		badgeText:'1'
    		
    		},
    		{
    		
    		xtype:'photoCard'
    		
    		},
    		{
    		
    		title:'Chat'
    		
    		},
    		{
    		
    		title:'Uitleg'
    		
    		}
   	
    	]
    
    }, init: function() {
        console.log("test");
    }
    
    });
