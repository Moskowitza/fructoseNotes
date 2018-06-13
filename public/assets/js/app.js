$("#scrape").on("click",function(){
    $.ajax({
        method: "GET",
        url: "/scrape/" 
      })
        // With that done, add the note information to the page
        .then(function (data) {
          console.log("scrape complete");
        });
});