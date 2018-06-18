console.log("app.js has loaded")

$(document).ready(function(){
// Execute the scrape when passed
$("#scrape").on("click", function () {
  $.ajax({
    method: "GET",
    url: "/scrape/"
  })
    .then(function (data) {
      alert("New articles scraped")
      location.reload();
  });
});

// When you click the savenote button
$(".savenote").on("click", function () {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");
  console.log("thisID : "+thisId)
  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput_"+thisId).val(),
      // Value taken from note textarea
      body: $("#bodyinput_"+thisId).val()
    }
  })
    // With that done
    .then(function (data) {
      // Log the response
      console.log("saved response Data "+data);
      // Remove the values entered in the input and textarea for note entry
      $("#titleinput_"+thisId).val("");
      $("#bodyinput_"+thisId).val("");
      location.reload();
    });


});

// Delete an Article
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
})

// Delete a NOTE
$(".deleteNote").on("click", function () {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");
  console.log("this id " + thisId);
  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "GET",
    url: "/deleteNote/" + thisId,
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
})
});