import $ from 'jquery';
// work with `extract-text-webpack-plugin`.
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/index.css';

class App {
  constructor() {
    $('#btn-to-join-session').click(this._handleJoinSession);
  }

  _handleJoinSession() {
    let sessionName = $('#input-name').val();
    document.cookie = `session_name=${sessionName}`;
    location.href = '/join_session.html';
    return false;
  }
}

$(() => new App);
