require('./session/init_point_labels');
var $ = require('jquery');
var Cookies = require('js-cookie');
var sessionName = Cookies.get("session_name");
var userName = Cookies.get("user_name");
var ws = require('./session/websocket_server');

// redirect to login page
if(!sessionName) {
  window.location.href = "index.html";
}

// redirect to join session page
if(sessionName && !userName) {
  window.location.href = "join_session.html";
}

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
