// First, we grab the body of the html with request
const axios = require('axios');
const cheerio = require('cheerio');

var scrape = function () {
    return axios.get("http://www.hifructose.com/")
        .then(function (response) {
            // Then, we load that into cheerio and save it to $ for a shorthand selector
            var $ = cheerio.load(response.data);
            var articles = [];
            // Now, we grab every h2 within an article tag, and do the following:
            $("article.status-publish").each(function (i, element) {
                // Save an empty result object
                // Add the text and href of every link, and save them as properties of the result object
                var title = $(this)
                    .find("h1.entry-title")
                    .find("a")
                    .text()
                    .trim();
                var link = $(this)
                    .find("h1.entry-title")
                    .find("a")
                    .attr("href");
                var imgLink = $(this)
                    .find("div.entry-content")
                    .find("img")
                    .attr("src");
                // there are two p tags, I think this works because the first only contains a link, this one has text. N
                var bodyText = $(this)
                    .find("div.entry-content")
                    .find("p")
                    .text()
                    .trim();
                // if we have everything, make an object and put it in an array
                if (title && link && imgLink && bodyText) {
                    var dataToAdd = {
                        title: title,
                        link: link,
                        imgLink: imgLink,
                        bodyText: bodyText
                    };
                    articles.push(dataToAdd);
                }
            })
            return articles;
        });
}

module.exports = scrape;