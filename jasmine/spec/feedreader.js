/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // note: the 2 tests below could be combined into one with &&
        // https://stackoverflow.com/questions/17469928/how-to-use-multiple-expect-in-jasmine/17813711

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        allFeeds.forEach(function (feed, index) {
            it(`allFeeds[${index}].url - defined and not empty`, function () {
                expect(feed.url).toBeTruthy();
            });
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        allFeeds.forEach(function (feed, index) {
            it(`allFeeds[${index}].name - defined and not empty`, function () {
                expect(feed.name).toBeTruthy();
            });
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The Menu', function () {

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

        // Page HTML has <body class="menu-hidden">, fetch body 
        it('menu - hidden by default', function () {
            expect(document.body.classList.contains('menu-hidden')).toBe(true);
        });


        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        // click on first menu-icon-link
        it('menu change visibility when icon is clicked', function () {
            document.querySelector('.menu-icon-link').click();
            expect(document.body.classList.contains('menu-hidden')).toBe(false);
            document.querySelector('.menu-icon-link').click();
            expect(document.body.classList.contains('menu-hidden')).toBe(true);
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function () {

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        beforeEach(function (done) {
            const feed_id = 0;
            loadFeed(feed_id, done);
        });

        it('at least 1 .entry element within .feed after loadFeed()', function() {
           expect(document.querySelectorAll('.feed .entry').length).toBeGreaterThan(0); 
        });


    });


    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('News Feed Selection', function () {


        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        // create a feed with 1 entry and another with 2 entries
        var feed_with_one_entry;
        var feed_with_two_entries;
        beforeEach(function (done_callback) {
            const first_feed_id = 0;
            loadFeed(first_feed_id, function(done) {
                feed_with_one_entries = document.querySelector('.feed').innerHTML;
                const second_feed_id = 1;
                loadFeed(second_feed_id, function() {
                    feed_with_two_entries = document.querySelector('.feed').innerHTML;
                    done_callback(); // run callback
                });
            });
        });

        it('feed_with_two_entries is different from the one with 1', function() {
            expect(feed_with_two_entries).not.toBe(feed_with_one_entry);
        })



    });
}());