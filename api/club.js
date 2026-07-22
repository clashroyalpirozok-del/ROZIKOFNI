import express from 'express';
const app = express();

const API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjdmZWJlNmFiLTkyMDItNDJhNi05Y2Q4LWY5NDNjNWE2NzUyNyIsImlhdCI6MTc4NDQ4OTI3MCwic3ViIjoiZGV2ZWxvcGVyLzAyOWI3NTAyLTE3MDMtNGI1OS04Y2Q1LWNjMzc4NzYxYzZkMCIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiMTI4LjEyOC4xMjguMTI4Il0sInR5cGUiOiJjbGllbnQifV19.Qo6NXjK_XAn2G_lKJl5DqDokvmvL1C2Hu_XCW8dDeimwRBf986obeBM3GcCQseQZDUi65MhV1M6xerNgw_bWRw';

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
