define(['jquery', 'js-cookie', './append_user.js'], function($, Cookies, append_user){
  var sessionName = Cookies.get("session_name");
  var userName = Cookies.get("user_name");
  var cookie_point = Cookies.get("point");
  var ws = new WebSocket('ws://achex.ca:4010');

  // add event handler for incomming message
  ws.onmessage = function(evt){
    var my_received_message = JSON.parse(evt.data);

    // add new user also sync me to him
    if(my_received_message.type == "new_connection"){
      append_user(my_received_message.user_name, my_received_message.point);
      if(userName != my_received_message.user_name){
        ws.send(JSON.stringify({"to": my_received_message.user_name, "type": "new_connection_sync", "user_name": userName, "point": cookie_point}));
      }
    }

    // add sync user
    if(my_received_message.type == "new_connection_sync"){
      append_user(my_received_message.user_name, my_received_message.point);
    }

    // sync user update
    if(my_received_message.type == "user_choose_point"){
      if(userName != my_received_message.user_name){
        $('#' + my_received_message.user_name).text(my_received_message.point);
        $('#' + my_received_message.user_name).attr('class', 'ready-point');
      }
    }

    // clear all votes
    if(my_received_message.type == "clear_all_votes"){
      $("td[id]").each(function(){
        this.innerText = '';
        this.className = 'hidden-point';
      });
      Cookies.remove('point');
      $('#statistics').hide();
      $('.point_count').remove();
    }

    // show all votes
    if(my_received_message.type == "show_all_votes"){
      var pointArray = [];
      $("td[id]").each(function(){
        this.className = '';
        if(this.innerText != '') {
          pointArray.push(this.innerText);
        }
      });

      var pointHash = {};
      pointArray.forEach(function(point_value){
        if(!pointHash[point_value]) {
          pointHash[point_value] = 1;
        } else {
          pointHash[point_value] += 1;
        }
      });

      for ( var key in pointHash) {
        $('<tr class="point_count"><td>' + key + '</td><td>' + pointHash[key] + '</td></tr>').appendTo("#point-count-list");
      }

      $('#statistics').show();
    }
  };

  // reconnect when server is disconnected
  ws.onclose= function(evt){
    window.location.reload();
  };

  // add event handler for error
  ws.onerror= function(evt){
    alert('Server Error');
  };

  // add event handler for new connection
  ws.onopen= function(evt){
    // setup user ID
    ws.send(JSON.stringify({"setID":userName, "passwd":"free"}));
    // register Broadcast
    ws.send(JSON.stringify({"cmd":"register_broadcast", "bid":sessionName}));
    // broadcast new connection
    ws.send(JSON.stringify({"bc": sessionName, "type":"new_connection", "user_name": userName, "point": cookie_point}));
  };

  return ws;
});
