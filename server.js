require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');

const app = express();
app.use(express.json());
app.use(express.static('public'));

const API_KEY = process.env.ELEVENLABS_API_KEY;
const BASE_URL = 'https://api.elevenlabs.io/v1';

app.get('/api/voices', async (req, res) => {
  try {
    const response = await fetch(`${BASE_URL}/voices`, {
      headers: { 'xi-api-key': API_KEY }
    });
    const data = await response.json();
    const voices = data.voices.map(v => ({
      id: v.voice_id,
      name: v.name,
      category: v.category,
      preview: v.preview_url
    }));
    res.json(voices);
  } catch (err) {
    console.error('Failed to fetch voices:', err.message);
    res.status(500).json({ error: 'Failed to fetch voices' });
  }
});

app.post('/api/generate', async (req, res) => {
  const { text, voiceId } = req.body;
  if (!text || !voiceId) {
    return res.status(400).json({ error: 'Missing text or voiceId' });
  }

  try {
    const response = await fetch(`${BASE_URL}/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'xi-api-key': API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'audio/mpeg'
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_monolingual_v1',
        voice_settings: { stability: 0.5, similarity_boost: 0.5 }
      })
    });

    if (!response.ok) {
      const err = await response.text();
      return res.status(response.status).json({ error: err });
    }

    res.set('Content-Type', 'audio/mpeg');
    response.body.pipe(res);
  } catch (err) {
    console.error('Generation failed:', err.message);
    res.status(500).json({ error: 'Generation failed' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
