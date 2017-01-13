import $ from 'jquery';
import DEFAULT_POINTS from '../configs/defaultPoints';

class NewSession {
  constructor() {
    this.initDefaultPoints();
    this.initEventHandlers();
  }

  initDefaultPoints() {
    for (let i = 0; i < DEFAULT_POINTS.length; i++) {
      let row$ = $('<tr>');
      let label = DEFAULT_POINTS[i].label;
      row$.append($('<td>').html(label));
      let value = DEFAULT_POINTS[i].value;
      row$.append($('<td>').html(value));
      $('#default-points-list').append(row$);
    }
  }

  initEventHandlers() {
    $('#btn-create-session').click(this.handleCreateSession);
  }

  handleCreateSession() {
    let sessionName = $('#input-session-name').val();

    $.ajax('https://leancloud.cn:443/1.1/classes/session', {
      method: 'POST',
      headers: {
        'X-LC-Id': 'IuBpRcjICs1OlVjLeBm99rSO-gzGzoHsz',
        'X-LC-Key': 'Tan5kGI0Swx4cMte10sHrEjW'
      },
      contentType: 'application/json',
      processData: false,
      data: JSON.stringify({
        name: sessionName,
        points: DEFAULT_POINTS
      }),
      success() {
        window.document.cookie = `session_name=${sessionName}`;
        window.location.href = '/join_session.html';
      }
    });
  }
}

$(() => new NewSession());
