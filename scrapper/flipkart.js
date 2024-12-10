import puppeteer from "puppeteer";

const flipkartScraper = async (query) => {
    const browser = await puppeteer.launch({
        headless: false, // Set to false for debugging
    });

    const page = await browser.newPage();

    try {
        // Open Flipkart
        await page.goto(`https://www.flipkart.com/search?q=${query}`, { waitUntil: "load", timeout: 0 });

        // Close the login popup if it appears
        // try {
        //     await page.click("button._2KpZ6l._2doB4z"); // Close button for login popup
        // } catch (err) {
        //     console.log("No login popup to close.");
        // }

        // Search for the product
        // await page.type("input[type='text']", query, { delay: 100 });
        // await page.keyboard.press("Enter");
        // await page.waitForSelector("div._1YokD2._3Mn1Gg", { timeout: 5000 });

        const results = await page.evaluate(() => {
            const results = document.querySelectorAll(".VJA3rP");
            const resultArray = [...results];
            const productLinks = resultArray.map(result => result.href);
            return productLinks;
        }
        );
        console.log("Found", results.length, "products");

        const products = [];

        for (const link of results) {
            try {
                await page.goto(link, { waitUntil: "load", timeout: 0 });
                const htmlContent = await page.content();
                console.log("Fetched product page:", link);
                products.push({ link, htmlContent });
                await new Promise((resolve) => setTimeout(resolve, 12000)); // Wait for 1 second before fetching the next product
            } catch (err) {
                console.error("Error fetching product page:", err);
            }
        }
        console.log("Fetched", products.length, "products");
        await page.wai
        await browser.close();
        return products;


    } catch (err) {
        console.error("Error searching for the product:", err);
    }

};

export default flipkartScraper;

// Usage Example
(async () => {
    const query = "laptop";
    const products = await flipkartScraper(query);
    console.log("Scraped Products:", products);
})();