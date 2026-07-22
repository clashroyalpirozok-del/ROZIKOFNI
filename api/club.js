import express from 'express';
const app = express();

const API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImNkNzM5ZGY2LWZhOWEtNDg4Ny05M2FlLWVlODQ3Zjc2NzM4MiIsImlhdCI6MTc4NDcyNDAxNywic3ViIjoiZGV2ZWxvcGVyLzAyOWI3NTAyLTE3MDMtNGI1OS04Y2Q1LWNjMzc4NzYxYzZkMCIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiMTI4LjEyOC4xMjguMTI4Il0sInR5cGUiOiJjbGllbnQifV19.ZJQE-H1YGRFHzt5S7J0mHMzQUVn4zLIKNLpsmH7rGeUh-aEz7tvgVaFpy97sqjr-KhPyXwjgWyccYzChgkki3A';

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/club', async (req, res) => {
    const tag = req.query.tag;
    if (!tag) return res.status(400).json({ error: 'Tag required' });

    const cleanTag = tag.replace('#', '');
    const url = `https://api.brawlstars.com/v1/clubs/%23${cleanTag}`;

    try {
        const response = await fetch(url, {
            headers: { 'Authorization': `Bearer ${API_KEY}` }
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
