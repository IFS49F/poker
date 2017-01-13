import $ from 'jquery';
import Cookies from 'js-cookie';
import DEFAULT_POINTS from '../configs/defaultPoints';

class Session {
  constructor() {
    this.checkPermissions();
    this.initConncetion();
    this.registerEventHanlders();
    this.initPointLabels();
  }

  checkPermissions() {
    this.sessionName = Cookies.get('session_name');
    this.userName = Cookies.get('user_name');
    this.cookiePoint = Cookies.get('point');

    // redirect to login page
    if (!this.sessionName) {
      window.location.href = '/index.html';
    }

    if (this.sessionName && !this.userName) {
      window.location.href = '/join_session.html';
    }
  }

  initConncetion() {
    let ws = new WebSocket('ws://achex.ca:4010');

    ws.onmessage = (event) => {
      let myReceivedMessage = JSON.parse(event.data);

      // add new user also sync me to him
      if (myReceivedMessage.type === 'new_connection') {
        this.appendUser(myReceivedMessage.user_name, myReceivedMessage.point);
        if (this.userName !== myReceivedMessage.user_name) {
          ws.send(JSON.stringify({
            to: myReceivedMessage.user_name,
            type: 'new_connection_sync',
            user_name: this.userName,
            point: this.cookiePoint
          }));
        }
      }

      // add sync user
      if (myReceivedMessage.type === 'new_connection_sync') {
        this.appendUser(myReceivedMessage.user_name, myReceivedMessage.point);
      }

      // sync user update
      if (myReceivedMessage.type === 'user_choose_point') {
        if (this.userName !== myReceivedMessage.user_name) {
          let $user = $(`#${myReceivedMessage.user_name}`);
          $user.text(myReceivedMessage.point);
          $user.attr('class', 'ready-point');
        }
      }

      // clear all votes
      if (myReceivedMessage.type === 'clear_all_votes') {
        $('td[id]').each((index, element) => {
          element.innerText = '';
          element.className = 'hidden-point';
        });

        Cookies.remove('point');

        $('#statistics').hide();
        $('.point_count').remove();
      }

      // show all votes
      if (myReceivedMessage.type === 'show_all_votes') {
        let pointHash = {};

        $('td[id]').each((index, element) => {
          element.className = '';

          if (element.innerText !== '') {
            if (!pointHash[element.innerText]) {
              pointHash[element.innerText] = 1;
            } else {
              pointHash[element.innerText] += 1;
            }
          }
        });

        Object.keys(pointHash).forEach((key) => {
          $(`<tr class="point_count"><td>${key}</td><td>${pointHash[key]}</td></tr>`).appendTo('#point-count-list');
        });

        $('#statistics').show();
      }
    };

    // reconnect when server is disconnected
    ws.onclose = () => window.location.reload();

    // add event handler for error
    ws.onerror = () => alert('Server Error');

    // add event handler for new connection
    ws.onopen = () => {
      // setup user ID
      ws.send(JSON.stringify({
        setID: this.userName,
        passwd: 'free'
      }));

      // register Broadcast
      ws.send(JSON.stringify({
        cmd: 'register_broadcast',
        bid: this.sessionName
      }));

      // broadcast new connection
      ws.send(JSON.stringify({
        bc: this.sessionName,
        type: 'new_connection',
        user_name: this.userName,
        point: this.cookiePoint
      }));
    };

    this.ws = ws;

    // maybe in the future this would be used
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
  }

  registerEventHanlders() {
    $('#point-labels').on('click', 'button', (event) => {
      let point = event.target.textContent.replace(/[^(\d)|?]*/g, '');
      let $user = $(`#${this.userName}`);

      $user.text(point);
      $user.attr('class', 'ready-point');

      Cookies.set('point', point);

      this.ws.send(JSON.stringify({
        bc: this.sessionName,
        type: 'user_choose_point',
        user_name: this.userName,
        point
      }));
    });

    // clear all votes
    $('#clear-votes').click(() => {
      $('td[id]').each((index, element) => {
        element.innerText = '';
        element.className = 'hidden-point';
      });

      Cookies.remove('point');

      this.ws.send(JSON.stringify({
        bc: this.sessionName,
        type: 'clear_all_votes'
      }));
    });

    // show votes
    $('#show-votes').click(() => {
      // $('td.hidden-point').removeClass('hidden-point');
      $('td[id]').each((index, element) => {
        element.className = '';
      });

      this.ws.send(JSON.stringify({
        bc: this.sessionName,
        type: 'show_all_votes'
      }));
    });
  }

  initPointLabels() {
    $('#session-name').text(this.sessionName);
    for (let i = 0; i < DEFAULT_POINTS.length; i++) {
      let $row = $('<button type="button" class="btn btn-info points">');
      $row.html(DEFAULT_POINTS[i].label);
      $('#point-labels').append($row);
    }
  }

  appendUser(userName, point) {
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

$(() => new Session());
