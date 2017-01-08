import $ from 'jquery';
import Cookies from 'js-cookie';

let defaultPoints = [
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
    this.sessionName = Cookies.get('session_name');
    this.userName = Cookies.get('user_name');
    this.cookiePoint = Cookies.get('point');

    // redirect to login page
    if (!this.sessionName) {
      location.href = '/index.html';
    }

    if (this.sessionName && !this.userName) {
      location.href = '/join_session.html';
    }
  }

  _initConncetion() {
    let ws = new WebSocket('ws://achex.ca:4010');
    let that = this;

    ws.onmessage = function(evt) {
      let myReceivedMessage = JSON.parse(evt.data);

      // add new user also sync me to him
      if (myReceivedMessage.type === 'new_connection') {
        that._appendUser(myReceivedMessage.user_name, myReceivedMessage.point);
        if (that.userName !== myReceivedMessage.user_name) {
          ws.send(JSON.stringify({
            to: myReceivedMessage.user_name,
            type: 'new_connection_sync',
            user_name: that.userName,
            point: that.cookiePoint
          }));
        }
      }

      // add sync user
      if (myReceivedMessage.type === 'new_connection_sync') {
        that._appendUser(myReceivedMessage.user_name, myReceivedMessage.point);
      }

      // sync user update
      if (myReceivedMessage.type === 'user_choose_point') {
        if (that.userName !== myReceivedMessage.user_name) {
          let $user = $(`#${myReceivedMessage.user_name}`);
          $user.text(myReceivedMessage.point);
          $user.attr('class', 'ready-point');
        }
      }

      // clear all votes
      if (myReceivedMessage.type === 'clear_all_votes') {
        $('td[id]').each(function() {
          this.innerText = '';
          this.className = 'hidden-point';
        });

        Cookies.remove('point');
      }

      // show all votes
      if (myReceivedMessage.type === 'show_all_votes') {
        $('td[id]').each(function() {
          this.className = '';
        });
      }
    };

    // reconnect when server is disconnected
    ws.onclose = function(evt) {
      location.reload();
    };

    // add event handler for error
    ws.onerror = function(evt) {
      alert('Server Error');
    };

    // add event handler for new connection
    ws.onopen = function(evt) {
      // setup user ID
      ws.send(JSON.stringify({
        setID: that.userName,
        passwd: 'free'
      }));

      // register Broadcast
      ws.send(JSON.stringify({
        cmd: 'register_broadcast',
        bid: that.sessionName
      }));

      // broadcast new connection
      ws.send(JSON.stringify({
        bc: that.sessionName,
        type:'new_connection',
        user_name: that.userName,
        point: that.cookiePoint
      }));
    };

    this.ws = ws;
  }

  _registerEventHanlders() {
    let that = this;

    $('#point_labels').on('click', 'button', function() {
      let point = this.textContent.replace(/[^(\d\.)|?]*/g, '');
      let $user = $(`#${that.userName}`);

      $user.text(point);
      $user.attr('class', 'ready-point');

      Cookies.set('point', point);

      that.ws.send(JSON.stringify({
        bc: that.sessionName,
        type: 'user_choose_point',
        user_name: that.userName,
        point
      }));
    });

    // clear all votes
    $('#clear-votes').click(function() {
      $('td[id]').each(function() {
        this.innerText = '';
        this.className = 'hidden-point';
      });

      Cookies.remove('point');

      that.ws.send(JSON.stringify({
        bc: that.sessionName,
        type: 'clear_all_votes'
      }));
    });

    // show votes
    $('#show-votes').click(function() {
      // $('td.hidden-point').removeClass('hidden-point');
      $('td[id]').each(function() {
        this.className = '';
      });

      that.ws.send(JSON.stringify({
        bc: that.sessionName,
        type:'show_all_votes'
      }));
    });
  }

  _initPointLabels() {
    $('#session_name').text(this.sessionName);
    for (let i = 0 ; i < defaultPoints.length; i++) {
      let $row = $('<button type="button" class="btn btn-info points">');
      $row.html(defaultPoints[i].label);
      $('#point_labels').append($row);
    }
  }

  _appendUser(userName, point) {
    if ($(`td[id=${userName}]`)[0] === undefined) {
      let $userPointList = $('#user-point-list');
      if (point === undefined || point === 'undefined') {
        $userPointList.append(`<tr><td>${userName}</td><td id=${userName} class="hidden-point"></td></tr>`);
      } else {
        $userPointList.append(`<tr><td>${userName}</td><td id=${userName} class="ready-point"></td></tr>`);
      }
    }
  }
}

$(() => new Session);
