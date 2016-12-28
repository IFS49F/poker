define(['jquery','js-cookie'], function initPointLabels($, Cookies){
  var sessionName = Cookies.get("session_name");
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

  // show points label list
  $("#session_name").text(sessionName);
  for(var i = 0 ; i < defaultPoints.length; i++) {
    var row$ = $('<button type="button" class="btn btn-info points">');
    row$.html(defaultPoints[i].label);
    $("#point_labels").append(row$);
  }
});
