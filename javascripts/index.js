// new session
require(["session_new"], function(sessionNew){
})


$(document).ready(function(){
  $("#join_session").click(function(){
    document.cookie = "session_name=" + $("#input-name").value;
    window.location.href = "session.html"
  });
});

