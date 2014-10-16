var rss = require('rss');
var db = require("db");
db.loadDb();
populate_feeds_list();

function showDialog(){
     $.dialog.show();
};

function doClick(e){
	
	
	if(e.index == 0){ // clicked add feed
		var url = $.addFeedInput.value;
		rss.parseFeed(url, function(data){
			db.insert('feeds', {url: url, title: data.title});
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
			height: 50,
			selectedBackgroundColor: "white"
		});
		
		var title = Ti.UI.createLabel({
			text: feeds[i].title,
			left:0
		});
		row.url = feeds[i].url;
		var url = feeds[i].url;
		row.add(title);
		
		tableData.push(row);
		
		row.addEventListener('click', function(e){
			rss.parseFeed(url, function(data){
				Alloy.createController('displayFeed', data).getView().open();
			});
		});
	}
	$.feedsList.data = tableData;
}


function displayLoading(){
	
	var activityIndicator = Ti.UI.createActivityIndicator({
	  color: 'green',
	  font: {fontFamily:'Helvetica Neue', fontSize:26, fontWeight:'bold'},
	  message: 'Loading...',
	  style:style,
	  top:10,
	  left:10,
	  height:Ti.UI.SIZE,
	  width:Ti.UI.SIZE
	});

	
}


$.index.open();
