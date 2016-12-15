var sessionName = Cookies.get("session_name");
var userName = Cookies.get("user_name");

$.ajax("https://leancloud.cn:443/1.1/classes/session",
{
  headers: { "X-LC-Id": "IuBpRcjICs1OlVjLeBm99rSO-gzGzoHsz",
            "X-LC-Key": "Tan5kGI0Swx4cMte10sHrEjW" },
  data: 'where=' + JSON.stringify({"name":sessionName}),
  success: function(data){
    $("#session_name").text(sessionName);
    var points = data.results[0].points;
    for(var i = 0 ; i < points.length; i++) {
      var row$ = $('<button type="button" class="btn btn-info points">');
      row$.html(points[i].label);
      $("#point_labels").append(row$);
    }
  }
});

var user_point$ = $('<tr>');
user_point$.append($('<td>').html(userName));
var td_with_id_class = '<td id=' + userName + ' ' + 'class=hidden-point' + '>';
user_point$.append($(td_with_id_class));
$("#user-point-list").append(user_point$);

$("button.points").click(function(this){
  var point = this.textContext.replace( /[^\d\.]*/g, '');
  $('#' + userName).text(point);
});


// --- WEBSOCKET ---
//***************************
// make new conncetion
var ws = new WebSocket('ws://achex.ca:4010');

// setup user ID
ws.send(JSON.stringify({"setID":userName, "passwd":"free"}));

// register Broadcast
ws.send(JSON.stringify({"cmd":"register_broadcast", "bid":sessionName}));

// add event handler for incomming message
ws.onmessage = function(evt){
  var my_received_message = evt.data;
  logf('received: ' + my_received_message);
};

// add event handler for diconnection
ws.onclose= function(evt){
  logf('log: Diconnected');
};

// add event handler for error
ws.onerror= function(evt){
  logf('log: Error');
};

// add event handler for new connection
ws.onopen= function(evt){
  logf('log: Connected');
};
