$(document).ready(function(){

  var counter = 0;

  $("#cookie").on("click", function(){
    counter ++
    console.log("click")
    $("#clickCounter").text(counter)
  })

})
