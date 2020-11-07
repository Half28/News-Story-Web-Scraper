# News-Story-Web-Scraper
A series of files that scrape HackerNews for the top stories of today.
I plan on adding more files with features in the future, so just bear with me.

# Base.js
Base.js is a simple JavaScript program that uses Node and NPM, as well as Puppeteer, Chalk (optional; it's for console log coloring for ease of use), and fs. It scrapes the data from HackerNews (https://news.ycombinator.com) and stores the title of the stories, links to the stories, and date gathered in a JSON called "news.json". Please note that running this program multiple times will cause it to **append** to news.json, so you will need to parse duplicates if you run it multiple times before the stories have been updated. (Working on a way to prevent this, but for now, this is how it has to be)
