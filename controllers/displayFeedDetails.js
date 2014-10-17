var args = arguments[0] || {};

var description = args.description || "lol";
var content = args.content || "";
var link = args.link || "";

function redirectToArticle(){
	Ti.Platform.openURL(args.link);
}

$.feedDetails.html = description + content;