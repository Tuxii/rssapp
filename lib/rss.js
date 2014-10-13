exports.parseFeed = function(url, callback){
	var data = [];
	var xhr = Ti.Network.createHTTPClient();
	
	xhr.open('GET', url);
	xhr.onload = function(){
		
		try{
			var feed = this.responseXML.documentElement;
			var items = feed.getElementsByTagName('item');
			var x = 0;
			
			for(var i=0, j=items.length; i<j; i++){
				var item = items.item(i);
				var description = item.getElementsByTagName('description').item(0).text;
				var title = item.getElementsByTagName('title').item(0).text;
				
				
				
				alert(title);
				alert(description);
				data.push({title: title, description: description});
				
			}
			callback(data);
			
		}
		catch(E) {
			alert('les petits pois sont rouge');
			alert(E);
		}
	};
	
	
	xhr.send();
};