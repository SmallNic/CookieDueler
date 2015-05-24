var express = require("express")
var app = express()

var hbs = require('hbs');
app.set("view engine", "hbs");

var bodyParser = require("body-parser")
app.use(bodyParser.json())//handles json POST requests
app.use(bodyParser.urlencoded({ extended:true }) ) //handles form submissions

app.use(express.static(__dirname + "/public"))

// var mongoose = require('mongoose');
// mongoose.createConnection('mongodb://localhost/cookie_dueler');
var db = require("./config/db")
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// //once is the method that creates a connection to the db
// db.once('open', function (callback){
//   //from here we are in an open connection to the database
//   console.log("Connection established to: ", db.name)
// })

var Game = require("./models/game")( db )
var Player = require("./models/player")( db )

var gameCount = 0


app.listen(3000, function (){
  console.log("Cookie Dueler server listening at http://localhost:3000/")
})

app.get('/', function(req, res){
  res.render('index')
})

app.post('/', function (req, res){
  if(!req.body.name){
    res.send("Error: [name] is required.  Found: '" + Object.keys(req.body) + "'");
    return
  }

  Player.create({name:req.body.name}, function (err, results){
    if (err) return handleError(err);
  })

  Player.count({}, function( err, count){
    if (err) return handleError(err);
    if(count%2 ==0){

      // var player1
      // var player2
      //
      Player.find({},"-_id name", { limit: 2, sort: { _id : -1 } }, function (err, players){
        if (err) return handleError(err);
        // console.log("Player 1:", players[1].name)
        var player1 = players[1].name
        // console.log("Player 2:", players[0].name)
        var player2 = players[0].name
        // console.log("player1:", player1)
        // console.log("player2:", player2)

        gameCount++
        Game.create({num:gameCount, player1:player1, player2:player2}, function (err, results) {
          if (err) return handleError(err);
          console.log("new game created")
          console.log("gameNumber", results.num)
          console.log("player1", results.player1)
          console.log("player2", results.player2)
        })
      })

      // lastTwoPlayers.select("-_id name");
      // lastTwoPlayers.exec(function (err, player) {
      //   if (err) return handleError(err);
      //   console.log("1:", player.name, "2:", player.name)
      // })
      // console.log(lastTwoPlayers)
    }
  })

  var game = {
    num: getGameNumber( Game ),
    player1: req.body.name,
  }


  res.render("welcome", {
    name:req.body.name
  })
})

function getGameNumber( Game ){
  var gameNumber;
  Game.count({}, function( err, count){
    if (err) return handleError(err);
    gameNumber = count
    console.log(gameNumber)
  })
  return gameNumber
}
