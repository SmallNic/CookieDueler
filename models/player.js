module.exports = function( db ){
  var playerSchema = new db.Schema({
      name: String,
  })
  return db.model('Player', playerSchema)
}
