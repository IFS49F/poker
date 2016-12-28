define(['jquery'], function($){
  // append user function
  return function(user_name, point) {
    if($('td[id=' + user_name + ']')[0] == undefined){
      if(point == undefined || point == "undefined"){
        $("#user-point-list").append('<tr><td>' + user_name + '</td><td id=' + user_name +' class="hidden-point"></td></tr>');
      }else{
        $("#user-point-list").append('<tr><td>' + user_name + '</td><td id=' + user_name +' class="ready-point">' + point + '</td></tr>');
      }
    }
  }
});
