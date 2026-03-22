export default async function handler(req, res) {
    const { url } = req.query;
    if (!url) return res.status(400).send('URL missing');

    try {
        const response = await fetch(decodeURIComponent(url), {
            headers: {
                'Origin': 'https://web.classplusapp.com',
                'Referer': 'https://web.classplusapp.com/',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });
        
        const data = await response.text();
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/vnd.apple.mpegurl'); // m3u8 के लिए ज़रूरी
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send('API Error');
    }
}
