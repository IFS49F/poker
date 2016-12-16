var sessionName = Cookies.get("session_name");
var userName = Cookies.get("user_name");
var cookie_point = Cookies.get("point");

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

// maybe future time will use this
// $.ajax("https://leancloud.cn:443/1.1/classes/session",
// {
  // headers: { "X-LC-Id": "IuBpRcjICs1OlVjLeBm99rSO-gzGzoHsz",
            // "X-LC-Key": "Tan5kGI0Swx4cMte10sHrEjW" },
  // data: 'where=' + JSON.stringify({"name":sessionName}),
  // success: function(data){
    // $("#session_name").text(sessionName);
    // var points = data.results[0].points;
    // for(var i = 0 ; i < points.length; i++) {
      // var row$ = $('<button type="button" class="btn btn-info points">');
      // row$.html(points[i].label);
      // $("#point_labels").append(row$);
    // }
  // }
// });

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
    if(point == undefined){
      $("#user-point-list").append('<tr><td>' + user_name + '</td><td id=' + user_name +' class="hidden-point">' + point + '</td></tr>');
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
});

// show votes
$('#show-votes').click(function(){
  // $('td.hidden-point').removeClass('hidden-point');
  $("td[id]").each(function(){
    this.className = '';
  });
});

// --- WEBSOCKET ---
//***************************
//
// add event handler for incomming message
ws.onmessage = function(evt){
  var my_received_message = JSON.parse(evt.data);
  // add new user also sync me to him
  if(my_received_message.type == "new_user"){
    append_user(my_received_message.user_name, my_received_message.point);
    if(userName != my_received_message.user_name){
      ws.send(JSON.stringify({"to": my_received_message.user_name, "type": "new_user_sync", "user_name": userName, "point": cookie_point}));
    }
  }

  // add sync user
  if(my_received_message.type == "new_user_sync"){
    append_user(my_received_message.user_name, my_received_message.point);
  }

  // sync user update
  if(my_received_message.type == "user_choose_point"){
    if(userName != my_received_message.user_name){
      $('#' + my_received_message.user_name).text(my_received_message.point);
      $('#' + my_received_message.user_name).attr('class', 'ready-point');
    }
  }

  // sync user refresh
  if(my_received_message.type == "user_refresh"){
    ws.send(JSON.stringify({"to": my_received_message.user_name, "type": "new_user_sync", "user_name": userName, "point": cookie_point}));
  }
};

// add event handler for diconnection
ws.onclose= function(evt){
  alert('Server Diconnected');
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
  // check login
  if(Cookies.get('first_login') != 'false') {
    Cookies.set('first_login', 'false');
    ws.send(JSON.stringify({"bc": sessionName, "type":"new_user", "user_name": userName, "point": ""}));
  }else{
    append_user(userName, cookie_point);
    ws.send(JSON.stringify({"bc": sessionName, "type":"user_refresh", "user_name": userName}));
  }
};
