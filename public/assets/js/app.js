console.log("app.js has loaded")
$("#scrape").on("click",function(){
    $.ajax("./scrape")
        // With that done, add the note information to the page
        .then(function (data) {
          console.log(data);
        });
});