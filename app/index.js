// index.js
const express = require('express');
const app = express();
app.get('/', (req, res) => {
  var mysql = require('mysql');
  var con = mysql.createConnection({
    host: "db",
    user: "root",
    password: "root123",
    database: "ffull"
  });
  var names = [ 'Jorge', 'Maria', 'João', 'Pedro', 'Vitor', 'José', 'Flávia', 'Lúcia', 'Angela' ];

  let list = 'Full Cycle Rocks!<br>';
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var personToInsert = names[Math.floor(Math.random() * names.length)];
    var sql = "INSERT INTO people (name) VALUES ('"+personToInsert+"')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted:" +personToInsert);
    });
    
    sql = "SELECT id, name FROM people";
    con.query(sql, function (err, result) {
      if (err) throw err;
      var names = result.map(function(item) {
        return item['id']+':'+item['name']+'<br>';
      }).join('');
      res.send('<p>Full Cycle Rocks!</p>'+names)
    });
  });
  
})
app.listen(5000, () => console.log('Server is up and running'));