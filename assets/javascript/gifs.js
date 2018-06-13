const OFFSET_RANGE_AND_LIMIT = 10;

var things = ["jerma985", "STAR_", "tf2", "trivia", "cats"];
var favorites = JSON.parse(localStorage.getItem("favorites"));
var name = '';
if (!Array.isArray(favorites)) {
    favorites = [];
}
console.log(favorites);


var offset = -OFFSET_RANGE_AND_LIMIT, name = '';
function display(q) {
    if (!name) {
        console.log("Inintialized name")
        name = q;
    }
    console.log(q, "|", name)
    if (q !== name) {
        $("#gifList").empty();
        offset = 0;
        console.log("reset offset to 0");
        name = q;
    } else {
        offset += OFFSET_RANGE_AND_LIMIT;
        console.log("extending offset")
    }

    $.ajax({
        url: "https://api.giphy.com/v1/gifs/search?api_key=JsOrk4DPRptpQzXrA30BBPvS3D44I8Gz&q=" + q + "&limit=" + OFFSET_RANGE_AND_LIMIT + "&offset=" + offset + "&rating=PG-13&lang=en",
        method: "GET"
    }).then(function (response) {
        for (var g = 0; g < response.data.length; g++) {
            var imageSRC = response.data[g].images.fixed_height_still.url;
            var textSRC = $("<p>").html(response.data[g].rating + " <button class='download'>Download</button>");
            var newDiv = $("<div>").attr("class", "float-left ml-2 border")
                                   .append("<img src=" + imageSRC + ">");
            if (!favorites.includes(response.data[g].id)) {
                textSRC.append("<button class='favorite' image_data = " + response.data[g].id + ">Favorite</button>");
            } else {
                textSRC.append("<button class='favorite' image_data = " + response.data[g].id + ">Unfavorite</button>");
            }
            newDiv.append(textSRC);
            $("#gifList").append(newDiv);
        }
    });

}

function renderButtons() {
    $("#buttonList").empty();
    things.forEach(function (item) {
        var newButton = $("<button>").text(item).attr("class", "ml-2 btn btn-light p-3");
        $("#buttonList").append(newButton);
    });
}


$("document").ready(function () {

    renderButtons();

    $("#submitButton").on("click", function () {
        var newThing = $("#searchTXT").val();
        console.log("Submitted " + newThing);
        if (!(things.includes(newThing))) {
            things.push(newThing);
            renderButtons();
        }
    });

    $("#searchPage").on("click", function () {
        $("#gifList").empty();
        renderButtons();
    });

    $("#favoritesPage").on("click", function () {
        $("#buttonList").empty();
        $("#gifList").empty();
        if (favorites.length > 0) {
            $.ajax({
                url: "https://api.giphy.com/v1/gifs?api_key=JsOrk4DPRptpQzXrA30BBPvS3D44I8Gz&ids=" + localStorage.getItem("favorites_raw"),
                method: "GET"
            }).then(function (response) {
                for (var g = 0; g < response.data.length; g++) {
                    var imageSRC = response.data[g].images.fixed_height_still.url;
                    var textSRC = $("<p>").html(response.data[g].rating + " <button class='download'>Download</button>");
                    var newDiv = $("<div>").attr("class", "float-left ml-2 border")
                                           .append("<img src=" + imageSRC + ">");
                    if (!favorites.includes(response.data[g].id)) {
                        textSRC.append("<button class='favorite' image_data = " + response.data[g].id + ">Favorite</button>");
                    } else {
                        textSRC.append("<button class='favorite' image_data = " + response.data[g].id + ">Unfavorite</button>");
                    }
                    newDiv.append(textSRC);
                    $("#gifList").append(newDiv);
                }
            });
        }
    })

    $("#buttonList").on("click", "button", function () {
        display(this.innerHTML);
    });

    $("#gifList").on("click", "img", function () {
        // console.log(this.src);
        if (this.src.includes("_s")) {
            var newSrc = this.src.slice(0, -6) + '.gif';
            console.log("To Animated", newSrc);
        } else {
            newSrc = this.src.slice(0, -4) + '_s.gif';
            console.log("To Still", newSrc);
        }
        this.src = newSrc;

        // "https://media3.giphy.com/media/M7x89frkhOsyk/200.gif"; Animated
        // "https://media3.giphy.com/media/M7x89frkhOsyk/200_s.gif"; Still
    })
        .on("click", ".favorite", function () {
            var image_data = $(this).attr("image_data");
            if (!favorites.includes(image_data)) {//add to favorites
                this.innerHTML = "Unfavorite";
                favorites.push(image_data);
                localStorage.setItem("favorites", JSON.stringify(favorites));
                localStorage.setItem("favorites_raw", favorites);
                console.log("added ", image_data);
            } else {//remove from favorites
                this.innerHTML = "Favorite";
                favorites.splice(favorites.indexOf(image_data), 1);
                localStorage.setItem("favorites", JSON.stringify(favorites));
                localStorage.setItem("favorites_raw", favorites);
                console.log("removed ", image_data);
            }

        })
        .on("click", ".download", function () {
            console.log("downloaded");

        });




});