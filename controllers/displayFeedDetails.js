var args = arguments[0] || {};

var description = args.description || "";
var content = args.content || "";
var link = args.link || "";
alert(args.link);

function redirectToArticle(){
	Ti.Platform.openURL(args.link);
}

$.feedDetails.html = description + content;