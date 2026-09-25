const https = require('https');
const fs = require('fs');
const path = require('path');

const urls = {
    1: "https://m.media-amazon.com/images/I/61r5cQZp9uL._AC_SX679_.jpg",
    2: "https://m.media-amazon.com/images/I/51wXF5tDdwL._AC_SX679_.jpg",
    3: "https://m.media-amazon.com/images/I/51EJD2w3bLL._AC_SX679_.jpg",
    4: "https://m.media-amazon.com/images/I/71uK5H5KbwL._AC_SX679_.jpg",
    5: "https://m.media-amazon.com/images/I/71-0BIf6r1L._AC_SX679_.jpg",
    6: "https://m.media-amazon.com/images/I/71337Yn0J2L._AC_SX679_.jpg",
    7: "https://m.media-amazon.com/images/I/61Gg9Pj8a6L._AC_SX679_.jpg",
    8: "https://m.media-amazon.com/images/I/71OQ1Dk2z8L._AC_SX679_.jpg",
    9: "https://m.media-amazon.com/images/I/81k392sKtbL._AC_SX679_.jpg",
    10: "https://m.media-amazon.com/images/I/71vW1XN0D4L._AC_SX679_.jpg",
    11: "https://m.media-amazon.com/images/I/71c6N-u79NL._AC_SX679_.jpg",
    12: "https://m.media-amazon.com/images/I/613yYQ17G2L._AC_SX679_.jpg",
    13: "https://m.media-amazon.com/images/I/61H4hOHTY9L._AC_SX679_.jpg",
    14: "https://m.media-amazon.com/images/I/715Qp9FjHQL._AC_SX679_.jpg",
    15: "https://m.media-amazon.com/images/I/61G3-8D1pVL._AC_SX679_.jpg",
    16: "https://m.media-amazon.com/images/I/71-i4F9A--L._AC_SX679_.jpg",
    17: "https://m.media-amazon.com/images/I/618x+4O41pL._AC_SX679_.jpg",
    18: "https://m.media-amazon.com/images/I/61jC+kM1Y-L._AC_SX679_.jpg",
    19: "https://m.media-amazon.com/images/I/51p34E1wMWL._AC_SX679_.jpg",
    20: "https://m.media-amazon.com/images/I/71X8kI2F3fL._AC_SX679_.jpg",
    21: "https://m.media-amazon.com/images/I/612aVp6VfGL._AC_SX679_.jpg",
    22: "https://m.media-amazon.com/images/I/61lqKj-z9PL._AC_SX679_.jpg",
    23: "https://m.media-amazon.com/images/I/61y8B3H5NqL._AC_SX679_.jpg",
    24: "https://m.media-amazon.com/images/I/71Czt9qMqML._AC_SX679_.jpg"
};

const dir = path.join(__dirname, 'assets', 'images');
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

async function downloadImage(id, url) {
    return new Promise((resolve, reject) => {
        const dest = path.join(dir, `product-${id}.jpg`);
        const file = fs.createWriteStream(dest);
        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        };
        https.get(url, options, function (response) {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
                return;
            }
            response.pipe(file);
            file.on('finish', function () {
                file.close(() => resolve());
            });
        }).on('error', function (err) {
            fs.unlink(dest, () => { });
            reject(err.message);
        });
    });
}

async function run() {
    for (const [id, url] of Object.entries(urls)) {
        console.log(`Downloading ${id}...`);
        try {
            await downloadImage(id, url);
        } catch (e) {
            console.error(`Failed to download ${id}:`, e);
        }
    }
    console.log('Done!');
}

run();
