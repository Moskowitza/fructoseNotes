console.log("app.js has loaded")
// Execute the scrape
$("#scrape").on("click", function () {
  window.location = "./scrape";
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
      // reload the page with new data
      location.reload();
    });
});