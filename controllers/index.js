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
		var row = Ti.UI.createTableViewRow({
			rowIndex: i,
			height: 40,
			selectedBackgroundColor: "white",
			horizontalWrap: true,
		});
		
		var title = Ti.UI.createLabel({
			text: feeds[i].title,
			left:50
		});
		
		Ti.API.info(feeds[i].icon);
		var icon = Ti.UI.createImageView({
			left : 10,
			width: 35,
			height: 35,
			image: feeds[i].icon
		});
		row.url = feeds[i].url;
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
	$.feedsList.data = tableData;
}


function displayLoading(){
	
	


	
}


$.index.open();
