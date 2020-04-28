var _db;

function initListeners() {
  $("#nav-holder nav .links a").click(function (e) {
    e.preventDefault();
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

  changeView("browse");
}

function changeView(viewName) {
  $.get(`../views/${viewName}/${viewName}.html`, function (data) {
    $("#app").html(data);

    if (viewName == "create-recipe") {
      var ingredientNumber = 3;
      var instructionNumber = 3;

      $("#ingredient").click(function (e) {
        e.preventDefault();
        ingredientNumber++;

        $(".create-recipe-ingredients").append(
          `<input type="text" id="ingredient${ingredientNumber}" placeholder="Ingredient #${ingredientNumber}" />`
        );
      });

      $("#instruction").click(function (e) {
        e.preventDefault();
        instructionNumber++;

        $(".create-recipe-instructions").append(
          `<input type="text" id="instruction${instructionNumber}" placeholder="Instruction #${instructionNumber}" />`
        );
      });

      $("#submit").click(function (e) {
        console.log("submit");
        let rName = $("#recipeName").val();
        let rDescription = $("#recipeDescription").val();
        let rTotalTime = $("#recipeTotalTime").val();
        let rServingSize = $("#recipeServingSize").val();
        let ingredientArray = [];
        let instructionArray = [];
        console.log(rDescription);

        $(".create-recipe-ingredients")
          .find("input")
          .each(function (idx, value) {
            let ingredID = value.id;
            var obj = {};
            obj[ingredID] = $("#" + value.id).val();
            ingredientArray.push(obj);
          });
        console.log(ingredientArray);

        $(".create-recipe-instructions")
          .find("input")
          .each(function (idx, value) {
            console.log("instructions", $("#" + value.id).val());
          });

        recipeObj = {
          recipeName: rName,
          recipeDescription: rDescription,
          recipeIngredArray: ingredientArray,
        };

        sendToDB(recipeObj);
      });
    }

    if (viewName == "browse") {
      getAllRecipes();
    }
  });
}

function getAllRecipes() {
  _db
    .collection("Recipes")
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        var id = doc.id;
        var rawData = doc.data();
        console.log(id + " " + rawData);
        // `<div class="edit" data-id="${id}">Edit Recipe</div>`;
      });
    });
}

function sendToDB(recipe) {
  _db
    .collection("Recipes")
    .add(recipe)
    .then(function (docRef) {
      //remove loading screen
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function (error) {
      //remove loading screen
      //add alert for error
      console.log("Error adding document: ", error);
    });
}

$(document).ready(function () {
  firebase
    .auth()
    .signInAnonymously()
    .then(function (result) {
      console.log("connected");
      _db = firebase.firestore();
      //remove loader
      // callback();
      console.log("ready");
      initApp();
    });
});
