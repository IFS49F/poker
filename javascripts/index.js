// new session
require(["session_new"], function(sessionNew){
})

// load session
require(["session"], function(session){
})


$(document).ready(function(){
  $("#join_session").click(function(){
    document.cookie = "session_name=" + $("#input-name").val();
    window.location.href = "http://hiveerli.me/poker/session.html";
    return false;
  });
});

