var args = arguments[0] || {};
var tableData = [];

$.displayFeed.title = args.title;


for(var i=0, j=args.data.length; i<j; i++){
	var row = Ti.UI.createTableViewRow({
		rowIndex: i,
		height: 50,
		backgroundSelectedColor: "white"
	});
	
	var title = Ti.UI.createLabel({
		text: args.data[i].title,
		left:0
	});

	row.description = args.data[i].description;
	
	row.content = args.data[i].content;
	row.link = args.data[i].link;
	row.add(title);
	
	tableData.push(row);
	
	row.addEventListener('click', function(e){
		Ti.API.info("e =>" + JSON.stringify(e));
		Ti.API.info("edata =>" + JSON.stringify(e.rowData));
		Alloy.createController('displayFeedDetails', this).getView().open();
	});
}

$.table.data = tableData;

