// Insantiate Express
var express = require("express")
var app = express()

// Instantiate Socket.io
var server = require('http').createServer(app);
var io = require('socket.io')(server);

// Instantiate Handlebars
var hbs = require('hbs');
app.set("view engine", "hbs");

// Instantiate body parser
var bodyParser = require("body-parser")
app.use(bodyParser.json())//handles json POST requests
app.use(bodyParser.urlencoded({ extended:true }) ) //handles form submissions

// Set up path for assets
app.use(express.static(__dirname + "/public"))

//Connect to database
// var db = require("./config/db")
// var Game = require("./models/game")( db )
// var Player = require("./models/player")( db )

//Initialize game counter
var gameCount = 0

//Open server
server.listen(process.env.PORT || 3000, function(){
  console.log("Cookie Dueler server listening at http://localhost:3000/")
})

//Define route handler that gets called when we open home page
// app.get('/', function(req, res){
//   res.render('index')
// })

//Define route handler that gets called when we submit form from home page
app.get('/', function (req, res){
  // if(!req.body.name){
  //   res.send("Error: [name] is required.  Found: '" + Object.keys(req.body) + "'");
  //   return
  // }
  //
  // Player.create({name:req.body.name}, function (err, results){
  //   if (err) return handleError(err);
  // })
  //
  // Player.count({}, function( err, count){
  //   if (err) return handleError(err);
  //   if(count%2 ==0 && count > 0){
  //     console.log("count", count)
  //     Player.find({},"-_id name", { limit: 2, sort: { _id : -1 } }, function (err, players){
  //       if (err) return handleError(err);
  //       var player1 = players[1].name
  //       var player2 = players[0].name
  //
  //       gameCount++
  //       Game.create({num:gameCount, player1:player1, player2:player2}, function (err, results) {
  //         if (err) return handleError(err);
  //         console.log("new game created")
  //         console.log("gameNumber", results.num)
  //         console.log("player1", results.player1)
  //         console.log("player2", results.player2)
          // document.getElementById("#player1").text(results.player1)
          // document.getElementById("#player2").text(results.player2)
    //       res.render("welcome", {
    //         leftName:results.player1,
    //         rightName:results.player2
    //       })
    //     })
    //   })
    // }
    // else{
      res.render("welcome", {
        leftName:"Player 1",
        rightName:"Player 2"
      })
  //   }
  // })
  //
  //

})


io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('leftClick', function( msg){
    console.log("left cookie was clicked")
    io.emit('leftClick')
  })

  socket.on('rightClick', function( msg){
    console.log("right cookie was clicked")
    io.emit('rightClick')
  })

  socket.on('left wins', function(){
    io.emit('left wins')
  })

  socket.on('right wins', function(){
    io.emit('right wins')
  })

  socket.on('tie', function(){
    io.emit('tie')
  })

  socket.on('count down', function(){
    io.emit('count down')
  })

  socket.on('refresh', function(){
    io.emit('refresh')
  })

});
