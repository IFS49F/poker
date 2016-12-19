var $ = require('jquery/dist/jquery.js');

$(document).ready(function(){
  $("#join_with_name").click(function(){
    document.cookie = "user_name=" + $("#input-user-name").val() + "; point=''";
    window.location.href = "session.html";
    return false;
  });
});
