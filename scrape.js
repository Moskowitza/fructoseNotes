// First, we grab the body of the html with request
const axios=require('axios');
const cheerio=require('cheerio');
const db=require('./models');
console.log("SCRAPE");
axios.get("http://www.hifructose.com/").then(function (response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);

    // Now, we grab every h2 within an article tag, and do the following:
    $("article.status-publish").each(function (i, element) {
        // Save an empty result object
        var result = {};
        // Add the text and href of every link, and save them as properties of the result object
        result.title = $(this)
            .find("h1.entry-title")
            .find("a")
            .text();
        result.link = $(this)
            .find("h1.entry-title")
            .find("a")
            .attr("href");
        result.imgLink = $(this)
            .find("div.entry-content")
            .find("img")
            .attr("src");
        // there are two p tags, I think this works because the first only contains a link, this one has text. N
        result.bodyText = $(this)
            .find("div.entry-content")
            .find("p")
            .text();
        // Create 1 new Article using the `result` object built from scraping
        db.Article.create(result)
            .then(function (dbArticle) {
                // View the added result in the console
                console.log(dbArticle);
                res.json(dbArticle)
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                return res.json(err);
            })
    });
});

