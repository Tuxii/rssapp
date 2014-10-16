
exports.parseFeed = function(url, callback){
	var data = {};
	var articles = [];
	var xhr = Ti.Network.createHTTPClient();
	
	xhr.open('GET', url);
	xhr.onload = function(e){
		
		
			var feed = this.responseXML.documentElement;
			var items = feed.getElementsByTagName('item');
			var x = 0;
			data.title = feed.getElementsByTagName('title').item(0).text;
			data.icon = "http://www.google.com/s2/favicons?domain=" + feed.getElementsByTagName('link').item(0).text;
			for(var i=0, j=items.length; i<j; i++){
				var item = items.item(i);
				var description = item.getElementsByTagName('description').item(0).textContent;
				
				var content = item.getElementsByTagName('content:encoded').item(0);

				if(content !== null || typeof content === 'undefined'){
					content = content.firstChild.textContent;
				} else {
					content = "";
				}
				var title = item.getElementsByTagName('title').item(0).text;
				var link = item.getElementsByTagName('link').item(0).text;
				articles.push({title: title, content: content, link: link});
				
			}
			data.data = articles;
			callback(data);
			
		
	};
	
	xhr.onerror = function(e){
		Ti.API.debug(e);
		Ti.API.debug(e.error);
		
	};
	
	xhr.send();
};