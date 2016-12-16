$(document).ready(function(){
  $("#join_with_name").click(function(){
    document.cookie = "user_name=" + $("#input-user-name").val() + "; point=''";
    window.location.href = "http://hiveerli.me/poker/session.html";
    return false;
  });
});
