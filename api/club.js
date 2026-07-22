export default async function handler(req, res) {
    const { tag } = req.query;
    if (!tag) return res.status(400).json({ error: 'Tag required' });

    const cleanTag = tag.replace('#', '');
    const url = `https://api.brawlstars.com/v1/clubs/%23${cleanTag}`;
    const API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjdmZWJlNmFiLTkyMDItNDJhNi05Y2Q4LWY5NDNjNWE2NzUyNyIsImlhdCI6MTc4NDQ4OTI3MCwic3ViIjoiZGV2ZWxvcGVyLzAyOWI3NTAyLTE3MDMtNGI1OS04Y2Q1LWNjMzc4NzYxYzZkMCIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiMTI4LjEyOC4xMjguMTI4Il0sInR5cGUiOiJjbGllbnQifV19.Qo6NXjK_XAn2G_lKJl5DqDokvmvL1C2Hu_XCW8dDeimwRBf986obeBM3GcCQseQZDUi65MhV1M6xerNgw_bWRw';

    try {
        const response = await fetch(url, {
            headers: { 'Authorization': `Bearer ${API_KEY}` }
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
