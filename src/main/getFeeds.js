import fs from 'fs/promises';
import axios from 'axios';
const Parser = require('rss-parser');
const parser = new Parser();
import path from 'path';


// Path to your configuration file
const configPath = path.join(__dirname, '../../src/main/rss-config.json');

// Function to process and sanitize feed item descriptions
function returnSlice(result, count, category, title) {
    return result.items.slice(0, count).map((item) => ({
        title: item.title,
        publisher: title,
        description: item.contentSnippet,
        category: category,
        link: item.link,
        pubDate: item.pubDate,
    }));
}

async function getFeeds() {
    try {
        const data = await fs.readFile(configPath, 'utf8');
        const config = JSON.parse(data);

        // Use map to create an array of promises for each category
        const allFeeds = await Promise.all(
            config.categories.map(async (category) => {
                // Get appropriate settings
                const categoryCount = config.settings.categoryCount[category.name];

                // Map feeds to promises for fetching and processing
                return Promise.all(
                    category.feeds.map(async (feed) => {
                        try {
                            const response = await axios.get(feed.url);
                            const result = await parser.parseString(response.data);
                            return returnSlice(result, categoryCount, category.name, feed.title);
                        } catch (err) {
                            console.error(`Error fetching data from ${feed.title}:`, err.message);
                            return [];
                        }
                    })
                );
            })
        );

        // Flatten the array and return the result
        return allFeeds.flat(2);
    } catch (error) {
        console.error('Error fetching rss feeds:', error);
        return { error: 'Failed to fetch rss feeds' };
    }
}

export default getFeeds;

// Uncomment to test the function directly
// if (require.main === module) {
//     getFeeds().then(feeds => {
//         console.log(feeds);
//     });
// }
