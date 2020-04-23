function initApp() {
  $.get("../views/nav/nav.html", function (data) {
    $("#nav-holder").html(data);
  });

  $.get("../views/footer/footer.html", function (data) {
    $("footer").html(data);
  });

  $.get("../views/home/home.html", function (data) {
    $("#app").html(data);
  });
}

$(document).ready(function () {
  initApp();
});
