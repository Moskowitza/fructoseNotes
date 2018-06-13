console.log("app.js has loaded")
// Execute the scrape by going to the scape page
$("#scrape").on("click", function () {
  window.location = "./scrape";
});

$("#display").on("click", function () {
  $.ajax({
    method: "GET",
    url: "/articles/"
  });
});
// Return Home
$("#home").on("click", function () {
  window.location = "./";
});

$(".delete").on("click", function () {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");
  console.log("this id " + thisId);
  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "GET",
    url: "/delete/" + thisId,
    data: {
      id: thisId
    }
  })
    // With that done
    .then(function (data) {
      // Log the response
      console.log(data);
      location.reload();
    });

  // Also, remove the values entered in the input and textarea for note entry
$(".addNote").on("click",function(){
        // Populate the Note div
        $("#notes").append("<h2>" + data.title + "</h2>");
         // The image of the article
         $("#notes").append("<img src="+"'"+ data.imgLink+"'"+ "alt='img not found>");
        // An input to enter a new title
        $("#notes").append("<input id='titleinput' name='title' >");
        // A textarea to add a new note body
        $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
        // A button to submit a new note, with the id of the article saved to it
        $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
})
});