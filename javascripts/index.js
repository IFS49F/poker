// new session
require(["session_new"], function(sessionNew){
})


$(document).ready(function(){
  $("#join_session").click(function(){
    document.cookie = "session_name=" + $("#input-name").val();
    window.location.assign("http://hiveerli.me/poker/session.html");
  });
});

