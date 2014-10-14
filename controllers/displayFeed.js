var args = arguments[0] || {};
var tableData = [];

$.displayFeed.title = args.title;


for(var i=0, j=args.data.length; i<j; i++){
	var row = Ti.UI.createTableViewRow({
		rowIndex: i,
		height: 50,
		selectedBackgroundColor: "white"
	});
	
	var title = Ti.UI.createLabel({
		text: args.data[i].title,
		left:0
	});
	row.desc = args.data[i].description;
	
	row.content = args.data[i].content;
	row.add(title);
	
	tableData.push(row);
	
	row.addEventListener('click', function(e){
		Alloy.createController('displayFeedDetails', e).getView().open();
	});
}

$.table.data = tableData;

