// SupplAi Smart Search System
console.log('✅ SupplAi script loaded');

const itemsDatabase = [
    "Blue Chair", "Red Table", "Green Sofa", "Electric Drill",
    "Bicycle", "Laptop", "Wireless Headphones", "Smartphone",
    "Toolbox", "Backpack"
  ];
  
  const searchInput = document.getElementById('searchInput');
  const suggestionsSection = document.getElementById('suggestions');
  const voiceButton = document.getElementById('voiceSearchButton');
  
  // ✏️ Typing-Based Suggestions
  searchInput.addEventListener('input', function () {
    const query = searchInput.value.toLowerCase();
    suggestionsSection.innerHTML = '';
  
    if (query.length > 0) {
      const filtered = itemsDatabase.filter(item =>
        item.toLowerCase().includes(query)
      );
      if (filtered.length > 0) {
        filtered.forEach(item => {
          const div = document.createElement('div');
          div.textContent = item;
          div.classList.add('suggestion-item');
          suggestionsSection.appendChild(div);
        });
      } else {
        suggestionsSection.innerHTML = '<div>No matches found.</div>';
      }
    }
  });
  
  // 🎙️ Voice Search (Web Speech API)
  if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
  
    voiceButton.addEventListener('click', () => {
      recognition.start();
      voiceButton.textContent = '🎙️ Listening...';
    });
  
    recognition.addEventListener('result', (event) => {
      const speechResult = event.results[0][0].transcript;
      searchInput.value = speechResult;
      searchInput.dispatchEvent(new Event('input'));
      voiceButton.textContent = '🎙️ Voice Search';
    });
  
    recognition.addEventListener('end', () => {
      voiceButton.textContent = '🎙️ Voice Search';
    });
  
  } else {
    voiceButton.disabled = true;
    voiceButton.textContent = '🎙️ Not Supported';
  }
  const randomButton = document.getElementById('randomSuggestButton');

randomButton.addEventListener('click', () => {
  suggestionsSection.innerHTML = '';
  const shuffled = [...itemsDatabase].sort(() => 0.5 - Math.random());
  const topSuggestions = shuffled.slice(0, 5);

  topSuggestions.forEach(item => {
    const div = document.createElement('div');
    div.textContent = item;
    div.classList.add('suggestion-item');
    suggestionsSection.appendChild(div);
  });
});
