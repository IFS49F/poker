require('bootstrap/dist/css/bootstrap.css')
require('../styles/index.css');

var $ = require('jquery/dist/jquery.js');

$(document).ready(function(){
  $("#join_session").click(function(){
    document.cookie = "session_name=" + $("#input-name").val();
    window.location.href = "join_session.html";
    return false;
  });
});
