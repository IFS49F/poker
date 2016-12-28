var $ = require('jquery');
var Cookies = require('js-cookie');

var sessionName = Cookies.get("session_name");
var userName = Cookies.get("user_name");
var cookie_point = Cookies.get("point");

// redirect to login page
if(!sessionName) {
  window.location.href = "index.html";
}

if(sessionName && !userName) {
  window.location.href = "join_session.html";
}

var defaultPoints = [
  {label: "0 points", value: "0"},
  {label: "0.5 point", value: "0.5"},
  {label: "1 point", value: "1"},
  {label: "2 points", value: "2"},
  {label: "3 points", value: "3"},
  {label: "5 points", value: "5"},
  {label: "8 points", value: "8"},
  {label: "13 points", value: "13"},
  {label: "20 points", value: "20"},
  {label: "40 points", value: "40"},
  {label: "100 points", value: "100"},
  {label: "?", value: '?'}
];

// initialize websocket
// make new conncetion
var ws = new WebSocket('ws://achex.ca:4010');

// show points label list
$("#session_name").text(sessionName);
for(var i = 0 ; i < defaultPoints.length; i++) {
  var row$ = $('<button type="button" class="btn btn-info points">');
  row$.html(defaultPoints[i].label);
  $("#point_labels").append(row$);
}

// append user function
var append_user = function(user_name, point) {
  if($('td[id=' + user_name + ']')[0] == undefined){
    if(point == undefined || point == "undefined"){
      $("#user-point-list").append('<tr><td>' + user_name + '</td><td id=' + user_name +' class="hidden-point"></td></tr>');
    }else{
      $("#user-point-list").append('<tr><td>' + user_name + '</td><td id=' + user_name +' class="ready-point">' + point + '</td></tr>');
    }
  }
}

// show user on page
// append_user(userName);

// choose a points
$('#point_labels').on('click', 'button', function(){
  var point = this.textContent.replace(/[^(\d\.)|?]*/g, '');
  $('#' + userName).text(point);
  $('#' + userName).attr('class', 'ready-point');
  Cookies.set('point', point);
  ws.send(JSON.stringify({"bc": sessionName, "type":"user_choose_point", "user_name": userName, "point": point}));
});

// clear all votes
$('#clear-votes').click(function(){
  $("td[id]").each(function(){
    this.innerText = '';
    this.className = 'hidden-point';
  });
  Cookies.remove('point');
  ws.send(JSON.stringify({"bc": sessionName, "type":"clear_all_votes"}));
});

// show votes
$('#show-votes').click(function(){
  // $('td.hidden-point').removeClass('hidden-point');
  $("td[id]").each(function(){
    this.className = '';
  });
  ws.send(JSON.stringify({"bc": sessionName, "type":"show_all_votes"}));
});

// --- WEBSOCKET ---
//***************************
//
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
