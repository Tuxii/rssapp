[1mdiff --git a/lib/db.js b/lib/db.js[m
[1mindex 5744cb9..5a9b107 100644[m
[1m--- a/lib/db.js[m
[1m+++ b/lib/db.js[m
[36m@@ -1,4 +1,4 @@[m
[31m-var version = "0.4";[m
[32m+[m[32mvar version = "0.3";[m
 var dbName = 'rssapp.sqlite';[m
 [m
 [m
[36m@@ -25,7 +25,8 @@[m [mexports.find = function(table, fields, all, condition){[m
 	Ti.API.info(sql);[m
 	Ti.API.info(JSON.stringify(results));[m
 	while(results.isValidRow()){[m
[31m-		data.push({id: results.fieldByName('id'), 	url : results.fieldByName('url'), title: results.fieldByName('title'), icon: results.fieldByName('icon')});[m
[32m+[m[41m                          [m
[32m+[m		[32mdata.push({id: results.fieldByName('id'), url : results.fieldByName('url'), title: results.fieldByName('title'), icon: results.fieldByName('icon')});[m
 		results.next();[m
 	};[m
 	return data;[m
