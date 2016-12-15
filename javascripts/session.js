var sessionName = Cookies.get("session_name");
var userName = Cookies.get("user_name");

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


$("#session_name").text(sessionName);
for(var i = 0 ; i < defaultPoints.length; i++) {
  var row$ = $('<button type="button" class="btn btn-info points">');
  row$.html(defaultPoints[i].label);
  $("#point_labels").append(row$);
}

// show user on page
var user_point$ = $('<tr>');
user_point$.append($('<td>').html(userName));
var td_with_id_class = '<td id=' + userName + ' ' + 'class=hidden-point' + '>';
user_point$.append($(td_with_id_class));
$("#user-point-list").append(user_point$);

// choose a points
$('#point_labels').on('click', 'button', function(){
  var point = this.textContent.replace(/[^(\d\.)|?]*/g, '');
  $('#' + userName).text(point);
  $('#' + userName).attr('class', 'ready-point');
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
  var my_received_message = evt.data;
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
};
