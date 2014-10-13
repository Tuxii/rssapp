var rss = require('rss');

function showDialog(){
    $.dialog.show();
};

function doClick(e){
	
		if(e.index == 0){ // clicked add feed
			var url = $.addFeedInput.value;
			var retour = rss.parseFeed(url, function(data){
				Alloy.createController('ViewFeed');
				alert(data);
			});
			
		}

};


$.index.open();
