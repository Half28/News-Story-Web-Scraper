/*
The goal is to get the top news stories from HackerNews (my favorite news source)
Made by Half28 on GitHub (Half28/News-Story-Web-Scraper
Feel free to redist, edit, etc at your whim; I just ask that you give me credit where it's due.
For this project, you'll need node.js, npm, puppeteer, fs, and chalk. More on this can be found in the README file on Github.
*/


const puppeteer = require("puppeteer");
const chalk = require("chalk");
const fs = require("fs");

const URL = "https://news.ycombinator.com";

//Found this on a blog a while back and love it for coloring error throws, but not necessary
const error = chalk.bold.red;
const success = chalk.keyword("green");

(async() =>
{
    try {
        //Create new browser instance, navigate to news page
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(URL);
        await page.waitForSelector("a.storylink");

        //Scrape the news story content titles and links, then return them as array members
        var content = await page.evaluate(() => {
            var linkList = document.querySelectorAll("a.storylink");

            //Get the current date
            var d = new Date();
            var dateTime = d.toISOString().slice(0, 10);
            
            if (linkList == null) throw "List empty";
            if ((dateTime == "") || (dateTime == null) || (dateTime == "{}") || (dateTime == {}))
            {
                console.warn("Date object is empty");
            }
            var arr = [];
            for (var i = 0; i < linkList.length; i++)
            {
                arr[i] = {
                    title: linkList[i].innerText.trim(),
                    link: linkList[i].getAttribute("href"),
                    date: dateTime
                }
            }
            return arr;
        });

        //Write array to a .json, handling errors as necessary (unhandled promise rejections are a no-no with Puppeteer, thus the try{} catch{})
        fs.writeFile("news.json", JSON.stringify(content), function(err) {
            if (err) throw err;
          });

        //Close the browser successfully
        await browser.close();
        console.log(success("Browser closed."));
    }
    catch(err) {
        //Print error(s), then close the browser (with red text)
        console.log(error(err));
        await browser.close();
        console.log(error("Browser closed."));
    }
})();
