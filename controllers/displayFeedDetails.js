var args = arguments[0] || {};

var description = args.description || "";
var content = args.content || "";


$.feedDetails.html = args.description + args.content;