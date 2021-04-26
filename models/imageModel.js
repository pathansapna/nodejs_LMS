var db=require('./config');
module.exports={ 
  storeImage:function(inputValues,callback){

  // check unique email address
var sql='SELECT * FROM images WHERE user_id =?';
db.query(sql,inputValues.id,function (err, data, fields) {
 if(err) throw err
 if(data.length>1){
     var msg = inputValues.user_id + " is already exist";
 }else{ 
  var sql = (user, callback) => {
    var sql = "INSERT INTO images VALUES(null, ?, ?)";   
    db.executeQuery(sql, [user.image_name, user.user_id], function(result) {
        callback(result);
    });
};





    // save users data into database
    var sql = 'INSERT INTO images SET ?';
   db.query(sql, inputValues, function (err, data) {
      if (err) throw err;
   });
  var msg = inputValues.user_id + "is uploaded successfully";
 }
 return callback(msg)
})
  }
}