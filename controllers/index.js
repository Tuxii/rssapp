var rss = require('rss');
var db = require("db");
db.loadDb();
populate_feeds_list();

$.loading.hide();

function showDialog(){
     $.dialog.show();
};

function doClick(e){
	
	
	if(e.index == 0){ // clicked add feed
		var url = $.addFeedInput.value;
		rss.parseFeed(url, function(data){
			db.insert('feeds', {url: url, title: data.title, icon:data.icon});
			populate_feeds_list();
		});
		
	}

};

function populate_feeds_list(){
	var feeds = db.find('feeds', "*");


	var tableData = [];
	
	for(var i=0, j=feeds.length; i<j; i++){

		Ti.API.info(feeds[i].id);
		var row = Ti.UI.createTableViewRow({
			rowIndex: i,
			height: 50,
			objName: 'row',
			url: feeds[i].url,
			feedID : feeds[i].id,
			backgroundSelectedColor: "white",
			horizontalWrap: true,
		});
		
		var title = Ti.UI.createLabel({
			text: feeds[i].title,
			left:50,
			touchEnabled : false
		});
		
	
		var icon = Ti.UI.createImageView({
			left : 10,
			width: 35,
			height: 35,
			touchEnabled : false,
			image: feeds[i].icon
		});
		
		row.url = feeds[i].url;
		var url = feeds[i].url;
		
		row.add(icon);
		row.add(title);
		
		tableData.push(row);
		
		var enabledWrapperView = Ti.UI.createView({
	        objName : 'enabledWrapperView',
	        rowID : i,
	        width : Ti.UI.FILL,
	        height : '100%'
	    });
	 
	    var disabledWrapperView = Ti.UI.createView({
	        objName : 'disabledWarpperView',
	        touchEnabled : false,
	        width : Ti.UI.FILL,
	        height : '100%'
	    });
	    
	    disabledWrapperView.add(icon);
	    disabledWrapperView.add(title);
	    
	    enabledWrapperView.add(disabledWrapperView);
		
		row.add(enabledWrapperView);
		
		row.addEventListener('click', function(e){
			$.loading.show();
			rss.parseFeed(this.url, function(data){
				$.loading.hide();
				Alloy.createController('displayFeed', data).getView().open();
			});
		});
		
		
	}
	$.feedsList.objName = "table";
	var swiped = "none";
	$.feedsList.addEventListener('swipe', function(e){
		e.bubbles = false;
		if (e.source && e.source.objName !== 'table') {
	        Ti.API.info('Row swiped: ' + e.source);
	        Ti.API.info('Row swiped: ' + e.source.objName);
	        Ti.API.info('Row ID : ' + e.rowData.feedID);
	 
	        // log e 
	        Ti.API.info('e : ' + JSON.stringify(e));
	        
               $.feedsList.deleteRow(e.index);
               db.delete('feeds', e.rowData.feedID);
               
	        // you can copy this output line from { to the end and paste it to http://jsonlint.com/ to analyze it.
	        // Or set a breakpoint, debug and examine variables and values.
	 
	        // text property from label
	        // hierarchy: row -> enabledWrapperView -> disabledWrapperView -> label
		} else{
		}
	});
	$.feedsList.data = tableData;
}


function displayLoading(){
	
	


	
}


$.index.open();
