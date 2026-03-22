export default async function handler(req, res) {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        const response = await fetch(decodeURIComponent(url));
        const data = await response.text();

        // CORS headers ताकि आपका प्लेयर इसे पढ़ सके
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.setHeader('Content-Type', 'application/json');

        res.status(200).send(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
}
