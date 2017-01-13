import $ from 'jquery';

class Join {
  constructor() {
    $('#btn-join-session').click(this.handleJoinSession);
  }

  handleJoinSession() {
    let userName = $('#input-user-name').val();
    window.document.cookie = `user_name=${userName}; point=''`;
    window.location.href = '/session.html';
    return false;
  }
}

$(() => new Join());
