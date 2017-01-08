import $ from 'jquery';

class Join {
  constructor() {
    $('#join_with_name').click(this._handleJoinSession);
  }

  _handleJoinSession() {
    let userName = $('#input-user-name').val()
    document.cookie = `user_name=${userName}; point=''`;
    location.href = '/session.html';
    return false;
  }
}

$(() => new Join);
