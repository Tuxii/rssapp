var args = arguments[0] || {};

alert(args.content);
$.desc.text = args.text;
Ti.API.info(JSON.stringify(args));
