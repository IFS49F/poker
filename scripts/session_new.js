var $ = require('jquery');

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

for(var i = 0; i < defaultPoints.length; i++) {
  var row$ = $('<tr>');
  var label = defaultPoints[i].label;
  row$.append($('<td>').html(label));
  var value = defaultPoints[i].value;
  row$.append($('<td>').html(value));
  $("#default-points-list").append(row$);
}

$("#create_session").click(function(){
  $.ajax("https://leancloud.cn:443/1.1/classes/session",
  {
    method: 'POST',
    headers: { "X-LC-Id": "IuBpRcjICs1OlVjLeBm99rSO-gzGzoHsz",
              "X-LC-Key": "Tan5kGI0Swx4cMte10sHrEjW" },
    contentType: "application/json",
    processData: false,
    data: JSON.stringify({name: $("#input-session-name").val(), points: defaultPoints}),
    success: function(data) {
      document.cookie = "session_name=" + $("#input-session-name").val();
      window.location.href = "join_session.html";
    }
  });
});
