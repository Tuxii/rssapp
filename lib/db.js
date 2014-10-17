var version = "0.4";
var dbName = 'rssapp.sqlite';


exports.loadDb = function(){
	var db = Ti.Database.install(dbName, version);
	db.close();
};

exports.find = function(table, fields, all, condition){
	var db = Ti.Database.open(version);
	var all = all || true;
	var data = [];
	var condition = condition || null;
	var sql = "SELECT "+fields+" FROM "+table+" ";
	if (condition){
		sql += "WHERE "+condition+" ";
	};
	if(!all){
		sql += "LIMIT 1";
	}
	
	var results = db.execute(sql);
	db.close();
	Ti.API.info(sql);
	Ti.API.info(JSON.stringify(results));
	while(results.isValidRow()){
                          
		data.push({id: results.fieldByName('id'), url : results.fieldByName('url'), title: results.fieldByName('title'), icon: results.fieldByName('icon')});
		results.next();
	};
	return data;
};

exports.insert = function(table, values){
	var db = Ti.Database.open(version);
	
	var sql = "INSERT INTO " + table + "(";
	var last_item = Object.keys(values)[Object.keys(values).length - 1];
	for(var i in values){
		if(i == last_item){
			sql += "'"+i+"'";
		} else {
			sql += "'"+i+"', ";
		}
	} 
	
	sql += ") VALUES (";
	var last_item = values[Object.keys(values)[Object.keys(values).length - 1]];
	for(var i in values){
		if(values[i] == last_item){
			sql += "'"+values[i]+"'";
		} else {
			sql += "'"+values[i]+"', ";
		}
	}
	
	sql += ")";
	Ti.API.info(sql);
	var results = db.execute(sql);
	db.close();
	return results;
};

exports.delete = function(table, id){
	var db = Ti.Database.open(version);
	var sql = "DELETE FROM "+table+" WHERE id=" + id;
	var results = db.execute(sql);
	db.close();
};
