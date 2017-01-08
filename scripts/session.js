import $ from 'jquery';
import Cookies from 'js-cookie';

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

class Session {
  constructor() {
    this._checkPermissions();
    this._initConncetion();
    this._registerEventHanlders();
    this._initPointLabels();
  }

  _checkPermissions() {
    this.sessionName = Cookies.get("session_name");
    this.userName = Cookies.get("user_name");
    this.cookie_point = Cookies.get("point");

    // redirect to login page
    if(!this.sessionName) {
      window.location.href = "index.html";
    }

    if(this.sessionName && !this.userName) {
      window.location.href = "join_session.html";
    }
  }

  _initConncetion() {
    var ws = new WebSocket('ws://achex.ca:4010');
    let that = this;

    ws.onmessage = function(evt){
      var my_received_message = JSON.parse(evt.data);

      // add new user also sync me to him
      if(my_received_message.type == "new_connection"){
        that.append_user(my_received_message.user_name, my_received_message.point);
        if(that.userName != my_received_message.user_name){
          ws.send(JSON.stringify({"to": my_received_message.user_name, "type": "new_connection_sync", "user_name": that.userName, "point": that.cookie_point}));
        }
      }

      // add sync user
      if(my_received_message.type == "new_connection_sync"){
        that.append_user(my_received_message.user_name, my_received_message.point);
      }

      // sync user update
      if(my_received_message.type == "user_choose_point"){
        if(that.userName != my_received_message.user_name){
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
      }

      // show all votes
      if(my_received_message.type == "show_all_votes"){
        $("td[id]").each(function(){
          this.className = '';
        });
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
      ws.send(JSON.stringify({"setID":that.userName, "passwd":"free"}));
      // register Broadcast
      ws.send(JSON.stringify({"cmd":"register_broadcast", "bid":that.sessionName}));
      // broadcast new connection
      ws.send(JSON.stringify({"bc": that.sessionName, "type":"new_connection", "user_name": that.userName, "point": that.cookie_point}));
    };

    this.ws = ws;
  }

  _registerEventHanlders() {
    let that = this;

    $('#point_labels').on('click', 'button', function(){
      var point = this.textContent.replace(/[^(\d\.)|?]*/g, '');
      $('#' + that.userName).text(point);
      $('#' + that.userName).attr('class', 'ready-point');
      Cookies.set('point', point);
      that.ws.send(JSON.stringify({"bc": that.sessionName, "type":"user_choose_point", "user_name": that.userName, "point": point}));
    });

    // clear all votes
    $('#clear-votes').click(function(){
      $("td[id]").each(function(){
        this.innerText = '';
        this.className = 'hidden-point';
      });
      Cookies.remove('point');
      that.ws.send(JSON.stringify({"bc": that.sessionName, "type":"clear_all_votes"}));
    });

    // show votes
    $('#show-votes').click(function(){
      // $('td.hidden-point').removeClass('hidden-point');
      $("td[id]").each(function(){
        this.className = '';
      });
      that.ws.send(JSON.stringify({"bc": that.sessionName, "type":"show_all_votes"}));
    });
  }

  _initPointLabels() {
    $("#session_name").text(this.sessionName);
    for(var i = 0 ; i < defaultPoints.length; i++) {
      var row$ = $('<button type="button" class="btn btn-info points">');
      row$.html(defaultPoints[i].label);
      $("#point_labels").append(row$);
    }
  }

  append_user(user_name, point) {
    if($('td[id=' + user_name + ']')[0] == undefined){
      if(point == undefined || point == "undefined"){
        $("#user-point-list").append('<tr><td>' + user_name + '</td><td id=' + user_name +' class="hidden-point"></td></tr>');
      }else{
        $("#user-point-list").append('<tr><td>' + user_name + '</td><td id=' + user_name +' class="ready-point">' + point + '</td></tr>');
      }
    }
  }
}

$(() => new Session);
