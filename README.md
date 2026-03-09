# Voice Cloning Demo

A simple web demo that connects to the ElevenLabs API for text-to-speech. Type some text, pick a voice, and hear it spoken back to you.

Built with Node.js and Express.

## Setup

```bash
npm install
cp .env.example .env
# Add your ElevenLabs API key to .env
npm start
```

Then open http://localhost:3000

## How It Works

The Express server acts as a proxy to the ElevenLabs API so your API key stays on the server side. The frontend lists available voices and lets you generate speech from any text input.

### Endpoints

- `GET /api/voices` — lists available ElevenLabs voices
- `POST /api/generate` — sends text + voice ID to ElevenLabs, returns audio

## Requirements

- Node.js 18+
- An [ElevenLabs](https://elevenlabs.io) API key


## About Hand On Web
We build AI chatbots, voice agents, and automation tools for businesses.
- 🌐 [handonweb.com](https://www.handonweb.com)
- 📧 outreach@handonweb.com
- 📍 Chester, UK

## Licence
MIT
