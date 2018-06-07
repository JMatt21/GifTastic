const OFFSET_RANGE_AND_LIMIT = 1;

var things = ["jerma985", "STAR_", "tf2", "trivia", "cats"];


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
            var imageSRC = response.data[g].images.fixed_width_still.url;
            var newDiv = $("<div>").append("<img src=" + imageSRC + " class='1'>")
                                .append('<p>' + response.data[g].rating + '<p>');
            // console.log(imageSRC);
            $("#gifList").append(newDiv);
        }
    });

}

$("document").ready(function () {

    things.forEach(function (item) {
        var newButton = $("<button>").text(item);
        $("#buttonList").append(newButton);
    });
    $("#submitButton").on("click", function () {
        var newThing = $("#searchTXT").val();
        console.log("Submitted " + newThing);
        if (!(things.includes(newThing))) {
            things.push(newThing);
            var newButton = $("<button>").text($("#searchTXT").val());
            $("#buttonList").append(newButton);
        }
    });

    $("#buttonList").on("click", "button", function () {
        display(this.innerHTML);
    });

    $("#gifList").on("click", ".1", function () {
        // console.log(this.src);
        if (this.src.includes("w_s")) {
            var newSrc = this.src.slice(0, -6) + '.gif';
            console.log("To Animated", newSrc);
        } else {
            newSrc = this.src.slice(0, -4) + '_s.gif';
            console.log("To Still", newSrc);
        }
        this.src = newSrc;

        // "https://media3.giphy.com/media/M7x89frkhOsyk/200w.gif"; Animated
        // "https://media3.giphy.com/media/M7x89frkhOsyk/200w_s.gif"; Still
    });




});