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
			height: 40,
			feedID : feeds[i].id,
			backgroundSelectedColor: "white",
			horizontalWrap: true,
		});
		
		var title = Ti.UI.createLabel({
			text: feeds[i].title,
			left:50
		});
		
	
		var icon = Ti.UI.createImageView({
			left : 10,
			width: 35,
			height: 35,
			image: feeds[i].icon
		});
		
		row.url = feeds[i].url;
		row.feedID = feeds[i].id;
		var url = feeds[i].url;
		
		row.add(icon);
		row.add(title);
		
		tableData.push(row);
		
		row.addEventListener('click', function(e){
			$.loading.show();
			rss.parseFeed(url, function(data){
				$.loading.hide();
				Alloy.createController('displayFeed', data).getView().open();
			});
		});

		
		
	}
	$.feedsList.objName = "table";
	var swiped = "none";
	$.feedsList.addEventListener('swipe', function(e){
		if (e.source && e.source.objName !== 'table') {
	        Ti.API.info('Row swiped: ' + e.source);
	        Ti.API.info('Row swiped: ' + e.source.objName);
	        Ti.API.info('Row ID : ' + e.source.rowID);
	 
	        // log e 
	        Ti.API.info('e : ' + JSON.stringify(e));
	        
	        
                Titanium.API.info("SWIPE = " + e.direction);
                if (e.direction == 'left' && swiped == 'none')
                {
                    e.source.animate({left: ('-25%'), duration: 50}, function()
                    {
                        e.source.left = '-25%';
                    });
                    swiped = 'left';
                }
                else if (e.direction == 'right' && swiped == 'left')
                {
                    e.source.animate({right: ('0%'), duration: 50}, function()
                    {
                        e.source.left = '0%';
                    });
                    swiped = 'none';
                }
                 
                 
               $.feedsList.deleteRow(e.index);
               db.delete('feeds', e.source.feedID);
               
	        // you can copy this output line from { to the end and paste it to http://jsonlint.com/ to analyze it.
	        // Or set a breakpoint, debug and examine variables and values.
	 
	        // text property from label
	        // hierarchy: row -> enabledWrapperView -> disabledWrapperView -> label
		}
	});
	$.feedsList.data = tableData;
}


function displayLoading(){
	
	


	
}


$.index.open();
