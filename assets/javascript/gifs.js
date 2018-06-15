const OFFSET_RANGE_AND_LIMIT = 10;

var things = ["Dyrus", "Criken", "UberHaxorNova", "ImmortalHD", "Cow Chop", "Jesse Cox", "Crendor", "Game Grumps", "JonTron", "Arin Hanson"];
var favorites = JSON.parse(localStorage.getItem("favorites"));
var name = '';
var redButton = "favorite btn btn-danger ml-2 float-right rounded-0 ";
var greenButton = "favorite btn btn-success ml-2 float-right rounded-0";
var starIcon = "";
var offset = -OFFSET_RANGE_AND_LIMIT;
if (!Array.isArray(favorites)) {
    favorites = [];
}
// console.log(favorites);



function displayResponse(response) {
    for (var g = 0; g < response.data.length; g++) {
        var imageSRC = response.data[g].images.fixed_height_still.url;
        var newDiv = $("<div>").attr("class", "gifContent bg-light m-2 border border-light rounded text-center float-left")
            .append("<img src=" + imageSRC + " title='" + response.data[g].title + "'>");

        var text = $("<p>").html("Rating: " + response.data[g].rating + "<a class='text-capitalize btn btn-primary float-right rounded-0 topRightBorderRadius' href='" + response.data[g].images.original.url + "'target='_blank' download>Download</a>").attr("class", "border-bottom bg-light text-uppercase text-truncate font-weight-bold color-primary mb-0");

        if (!favorites.includes(response.data[g].id)) {
            text.append("<button class='" + greenButton + "' image_data = " + response.data[g].id + ">Favorite</button>");
        } else {
            text.append("<button class='" + redButton + "' image_data = " + response.data[g].id + ">Unfavorite</button>");
        }

        newDiv.prepend(text);
        $("#gifList").append(newDiv);
    }
}

function display(q) {
    if (!name) {
        // console.log("Inintialized name");
        name = q;
    }
    console.log(q, "|", name)
    if (q !== name) {
        $("#gifList").empty();
        offset = 0;
        // console.log("reset offset to 0");
        name = q;
    } else {
        offset += OFFSET_RANGE_AND_LIMIT;
        // console.log("extending offset")
    }

    $.ajax({
        url: "https://api.giphy.com/v1/gifs/search?api_key=JsOrk4DPRptpQzXrA30BBPvS3D44I8Gz&q=" + q + "&limit=" + OFFSET_RANGE_AND_LIMIT + "&offset=" + offset + "&rating=PG-13&lang=en",
        method: "GET"
    }).then(displayResponse);

}

function renderButtons() {
    $("#buttonList").empty();
    things.forEach(function (item) {
        var newButton = $("<button>").text(item).attr("class", "ml-2 mb-2 btn btn-light p-3");
        $("#buttonList").append(newButton);
    });
}


$("document").ready(function () {

    renderButtons();

    $("#submitButton").on("click", function (event) {
        event.preventDefault();
        var newThing = $("#searchTXT").val().trim();
        // console.log("Submitted " + newThing);
        if (!(things.includes(newThing)) && newThing != '') {
            things.push(newThing);
            renderButtons();
        }
        $("#searchTXT").val('');

    });

    $("#gifsPage").on("click", function () {
        $("#buttonList").show();
        $("#gifList").show();
        renderButtons();
    });

    $("#favoritesPage").on("click", function () {
        $("#buttonList").hide();
        $("#gifList").hide();
        if (favorites.length > 0) {
            $.ajax({
                url: "https://api.giphy.com/v1/gifs?api_key=JsOrk4DPRptpQzXrA30BBPvS3D44I8Gz&ids=" + localStorage.getItem("favorites_raw"),
                method: "GET"
            }).then(displayResponse);
        }
    })

    $("#buttonList").on("click", "button", function () {
        display(this.innerHTML);
    });

    $("#gifList").on("click", "img", function () {
        // console.log(this.src);
        if (this.src.includes("_s")) {
            var newSrc = this.src.slice(0, -6) + '.gif';
            // console.log("To Animated", newSrc);
        } else {
            newSrc = this.src.slice(0, -4) + '_s.gif';
            // console.log("To Still", newSrc);
        }
        this.src = newSrc;

        // "https://media3.giphy.com/media/M7x89frkhOsyk/200.gif"; Animated
        // "https://media3.giphy.com/media/M7x89frkhOsyk/200_s.gif"; Still
    })
        .on("click", ".favorite", function () {
            var image_data = $(this).attr("image_data");
            if (!favorites.includes(image_data)) {//After adding to favorites
                $(this).text("Unfavorite").attr("class", redButton);
                favorites.push(image_data);
                localStorage.setItem("favorites", JSON.stringify(favorites));
                localStorage.setItem("favorites_raw", favorites);
                // console.log("added ", image_data);
            } else {//After removing from favorites
                $(this).text("Favorite").attr("class", greenButton);
                favorites.splice(favorites.indexOf(image_data), 1);
                localStorage.setItem("favorites", JSON.stringify(favorites));
                localStorage.setItem("favorites_raw", favorites);
                // console.log("removed ", image_data);
            }

        })
});