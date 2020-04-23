function initApp() {
  $.get("../components/nav/nav.html", function (data) {
    $("#nav-holder").html(data);
  });

  $.get("../components/footer/footer.html", function (data) {
    $("footer").html(data);
  });

  $.get("../components/home/home.html", function (data) {
    $("#app").html(data);
  });
}

$(document).ready(function () {
  initApp();
});
