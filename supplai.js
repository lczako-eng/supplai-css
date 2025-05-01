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
const randomButton = document.getElementById('randomSuggestButton');

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
        div.classList.add('suggestion-item');

        // Text span
        const textSpan = document.createElement('span');
        textSpan.textContent = item;

        // Heart icon
        const heart = document.createElement('span');
        heart.textContent = '🤍';
        heart.style.cursor = 'pointer';
        heart.style.marginLeft = '10px';

        // Load favorites from localStorage
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        if (favorites.includes(item)) {
          heart.textContent = '❤️';
        }

        // Heart click logic
        heart.addEventListener('click', (e) => {
          e.stopPropagation();
          let favs = JSON.parse(localStorage.getItem('favorites') || '[]');
          if (favs.includes(item)) {
            favs = favs.filter(f => f !== item);
            heart.textContent = '🤍';
          } else {
            favs.push(item);
            heart.textContent = '❤️';
          }
          localStorage.setItem('favorites', JSON.stringify(favs));
        });

        // Append to div
        div.appendChild(textSpan);
        div.appendChild(heart);
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

// 🔮 Random Suggestion Button (fill + trigger search)
if (randomButton) {
  randomButton.addEventListener('click', () => {
    const randomItem = itemsDatabase[Math.floor(Math.random() * itemsDatabase.length)];
    searchInput.value = randomItem;
    searchInput.dispatchEvent(new Event('input'));
  });
}

// 🖱️ Make suggestion items clickable
suggestionsSection.addEventListener('click', (e) => {
  if (e.target.classList.contains('suggestion-item')) {
    const selectedItem = e.target.textContent;
    searchInput.value = selectedItem;
    searchInput.dispatchEvent(new Event('input'));
  }
});
