module.exports = function( db ){
  var gameSchema = new db.Schema({
      num: Number,
      player1: String,
      player2: String,
      finalScore: Number
  })
  return db.model('Game', gameSchema)
}
