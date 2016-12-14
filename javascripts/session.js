var sessionName = Cookies.get("session_name");

$.ajax("https://leancloud.cn:443/1.1/classes/session",
{
  headers: { "X-LC-Id": "IuBpRcjICs1OlVjLeBm99rSO-gzGzoHsz",
            "X-LC-Key": "Tan5kGI0Swx4cMte10sHrEjW" },
  data: 'where=' + JSON.stringify({"name":sessionName}),
  success: function(data){
    $("#session_name").text(sessionName);
    var points = data.results[0].points;
    for(var i = 0 ; i < points.length; i++) {
      var row$ = $('<button type="button" class="btn btn-info">');
      row$.html(points[i]);
      $("#point_labels").append(row$);
    }
  }
});
