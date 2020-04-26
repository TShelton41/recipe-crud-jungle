function initListeners() {
  $("#nav-holder nav .links a").click(function (e) {
    let id = e.currentTarget.id;
    changeView(id);
  });
}

function initApp() {
  $.get("../views/nav/nav.html", function (data) {
    $("#nav-holder").html(data);
    initListeners();
  });

  $.get("../views/footer/footer.html", function (data) {
    $("footer").html(data);
  });

  changeView("home");
}

function changeView(viewName) {
  $.get(`../views/${viewName}/${viewName}.html`, function (data) {
    $("#app").html(data);
  });
}

$(document).ready(function () {
  initApp();
});
