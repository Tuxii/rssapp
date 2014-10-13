migration.up = function(db) {

	migrator.createTable({
		"columns": {
			"item":"text",
			"done":"integer",
			"date_completed":"text"
		}
	});
};

migration.down = function(db) {

};
