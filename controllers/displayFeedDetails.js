var args = arguments[0] || {};

var description = args.description || "";
var content = args.content || "";

function redirectToArticle(){
	Ti.Platform.openURL(args.link);
}

$.feedDetails.html = description + content;