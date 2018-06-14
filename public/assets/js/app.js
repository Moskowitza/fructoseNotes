console.log("app.js has loaded")
// Execute the scrape when passed
$("#scrape").on("click", function () {
  $.ajax({
    method: "GET",
    url: "/scrape/"
  });});


// Also, remove the values entered in the input and textarea for note entry
$(".addNote").on("click", function () {
  // Empty the notes from the note section
  console.log("addnote clicked")
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");
  console.log("thisId "+thisId)
  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function (data) {
      console.log(data);
      // The title of the article
      $("#indexNotes").append("<h2>" + data.notes.title + "</h2>");
      // The image of the article
      $("#indexNotes").append("<img src=" + "'" + data.notes.imgLink + "'" + "alt='img not found>");
      // An input to enter a new title
      $("#indexNotes").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#indexNotes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#indexNotes").append("<button data-id='" + data.notes._id + "' id='savenote'>Save Note</button>");

      // If there's a note in the article
      if (data.notes) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.notes.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.notes.body);
      }
    });
});

// When you click the savenote button
$(document).on("click", "#savenote", function () {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function (data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
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