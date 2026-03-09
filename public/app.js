(async function () {
  const voiceSelect = document.getElementById('voice-select');
  const textInput = document.getElementById('text-input');
  const generateBtn = document.getElementById('generate-btn');
  const result = document.getElementById('result');
  const audioPlayer = document.getElementById('audio-player');
  const errorDiv = document.getElementById('error');

  try {
    const res = await fetch('/api/voices');
    const voices = await res.json();
    voiceSelect.innerHTML = voices.map(v =>
      `<option value="${v.id}">${v.name} (${v.category})</option>`
    ).join('');
  } catch (err) {
    voiceSelect.innerHTML = '<option>Failed to load voices</option>';
  }

  generateBtn.addEventListener('click', async () => {
    const text = textInput.value.trim();
    if (!text) return;

    generateBtn.disabled = true;
    generateBtn.textContent = 'Generating...';
    errorDiv.classList.add('hidden');
    result.classList.add('hidden');

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voiceId: voiceSelect.value })
      });

      if (!res.ok) throw new Error('Generation failed');

      const blob = await res.blob();
      audioPlayer.src = URL.createObjectURL(blob);
      result.classList.remove('hidden');
      audioPlayer.play();
    } catch (err) {
      errorDiv.textContent = err.message;
      errorDiv.classList.remove('hidden');
    } finally {
      generateBtn.disabled = false;
      generateBtn.textContent = 'Generate Speech';
    }
  });
})();
