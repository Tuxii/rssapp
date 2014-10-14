var args = arguments[0] || {};

alert(args.desc);
$.desc.text = args.text;
Ti.API.info(JSON.stringify(args));
