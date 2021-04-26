var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'library',
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = {
	executeQuery: function(sql, sqlParam, callback){
		if(sqlParam == null)
		{
			connection.query(sql, function(error, result){
				if(error)
				{
					console.log(error);
				}
				callback(result);
			});
		}
		else
		{
			connection.query(sql, sqlParam, function(error, result){
				if(error)
				{
					console.log(error);
				}
				callback(result);
			});
		}
	}
};
