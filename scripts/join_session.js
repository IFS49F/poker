import $ from 'jquery';

class Join {
  constructor() {
    $('#join_with_name').click(this._handleJoinSession);
  }

  _handleJoinSession() {
    document.cookie = "user_name=" + $("#input-user-name").val() + "; point=''";
    window.location.href = "session.html";
    return false;
  }
}

$(() => new Join);
