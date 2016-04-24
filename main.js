'use strict';
const _ = require('underscore'),
    request = require('request');
var cardContents,
    url = 'http://www.cnn.com/data/ocs/section/index.html:homepage1-zone-1.json',
    results = [];


request({url: url, json: true}, function (error, response, body) {
    if (!error && response.statusCode === 200) {
        var containerArray = body.zoneContents[1].containerContents;

        cardContents = _.map(containerArray, function (containerObj) {
            return containerObj.cardContents;
        });

        _.each(cardContents, function (card) {
            results.push({
                url: `http://cnn.com${card.url}`,
                headline: card.headlineText[0],
                imageUrl: card.media.elementContents.imageUrl || '',
                byLine: card.auxiliaryText || 'by CNN'
            });
        });

        results.forEach(function (element) {
            console.log(JSON.stringify(element));
            // console.log('=============================================================================');
        });

        //return JSON.stringify(results);
    }
});


/*
 * ## Task 1 (of 2)
 *
 * Create a script starting in this file, but not limited to, that will pull
 * data from a remote source JSON feed, transform it, then output a different
 * JSON feed matching a specific schema.  This should execute when running
 * `npm start` and should log output to the console.
 *
 *
 * ### Source:
 *
 *     http://www.cnn.com/data/ocs/section/index.html:homepage1-zone-1.json
 *
 *
 * ### Output:
 *
 *     A valid JSON string representing an array of articles from the
 *     "Top stories" container with the following properties for each article:
 *
 *         {
 *             "url": String,
 *             "headline": String,
 *             "imageUrl": String,
 *             "byLine": String
 *         }
 *
 *
 * ### Other information and guidelines:
 *
 * - Use the node version specified by the engines property in package.json.
 *
 * - `url` should include the protocol and domain, which would be www.cnn.com.
 *
 * - Not all articles will have an image.  If an article has something like a
 *   gallery or a video, use your best judgement.
 *
 * - The `imageUrl` should reference the highest quality image available.
 *
 * - The `byLine` should contain information about the author of the article,
 *   which may not be available for every article.
 *
 * - The source feed will represent what is on the top of the www.cnn.com
 *   homepage.  The content to map is in a _container_ with a _title_ of
 *   "Top stories".  This content changes all the time.  The placement of
 *   this container will change as well.
 *
 *
 *
 *
 * ## Task 2 (of 2)
 *
 * Configure the project to execute ESLint on all JavaScript files in the
 * project using the included .eslintrc configuration when `npm test` is run.
 * DO NOT use Grunt or Gulp.  The test should pass.
 *
 *
 *
 *
 * ## Extra Credit
 *
 * Write a unit test to validate that the JSON ouput is valid and matches the
 * expected schema.
 */
