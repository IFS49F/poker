import $ from 'jquery';

class App {
  constructor() {
    $('#join_session').click(this._handleJoinSession);
  }

  _handleJoinSession() {
    document.cookie = "session_name=" + $("#input-name").val();
    window.location.href = "join_session.html";
    return false;
  }
}

$(() => new App);
