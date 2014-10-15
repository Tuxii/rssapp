var version = "0.1";
var dbName = 'rssapp.db';
var db = Ti.Database.install(dbName, version);

exports.find = function(table, fields, uniq, condition){
	var db = Ti.Database.open(version);
	
	var condition = condition || null;
	var sql = "SELECT "+fields+" FROM "+table+" ";
	if (condition){
		sql += "WHERE "+condition+" ";
	};
	if(uniq){
		sql += "LIMIT 1";
	}
	
	var results = db.execute(sql);
	db.close();
	return results;
};

exports.insert = function(table, field, value){
	
	
}
