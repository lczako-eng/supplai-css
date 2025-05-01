document.addEventListener('DOMContentLoaded', function () {
    console.log('✅ SupplAi script loaded');
  
    const itemsDatabase = [
      // Furniture
      { name: "Blue Chair", category: "Furniture" },
      { name: "Red Table", category: "Furniture" },
      { name: "Green Sofa", category: "Furniture" },
      { name: "Wooden Desk", category: "Furniture" },
      { name: "Bookshelf", category: "Furniture" },
      // Tools
      { name: "Electric Drill", category: "Tools" },
      { name: "Toolbox", category: "Tools" },
      { name: "Screwdriver Set", category: "Tools" },
      { name: "Socket Wrench", category: "Tools" },
      { name: "Hammer", category: "Tools" },
      // Outdoors
      { name: "Bicycle", category: "Outdoors" },
      { name: "Backpack", category: "Outdoors" },
      { name: "Tent", category: "Outdoors" },
      { name: "Sleeping Bag", category: "Outdoors" },
      { name: "Camping Stove", category: "Outdoors" },
      // Electronics
      { name: "Laptop", category: "Electronics" },
      { name: "Smartphone", category: "Electronics" },
      { name: "Wireless Headphones", category: "Electronics" },
      { name: "Bluetooth Speaker", category: "Electronics" },
      { name: "Power Bank", category: "Electronics" },
      // Hardware
      { name: "Nails - 2 inch", category: "Hardware" },
      { name: "Drywall Screws", category: "Hardware" },
      { name: "Paint Roller", category: "Hardware" },
      { name: "Wall Anchors", category: "Hardware" },
      { name: "Stud Finder", category: "Hardware" },
      // Beauty
      { name: "Lipstick - Coral", category: "Beauty" },
      { name: "Foundation - Beige", category: "Beauty" },
      { name: "Mascara - Black", category: "Beauty" },
      { name: "Eyeliner Pen", category: "Beauty" },
      { name: "Makeup Remover Wipes", category: "Beauty" },
      // Health
      { name: "Vitamin C 1000mg", category: "Health" },
      { name: "Ibuprofen 200mg", category: "Health" },
      { name: "Bandage Roll", category: "Health" },
      { name: "Hand Sanitizer", category: "Health" },
      { name: "Thermometer - Digital", category: "Health" },
      // Cleaning
      { name: "Dish Soap", category: "Cleaning" },
      { name: "Multi-surface Cleaner", category: "Cleaning" },
      { name: "Sponges - Pack of 3", category: "Cleaning" },
      { name: "Mop and Bucket", category: "Cleaning" },
      { name: "Glass Cleaner", category: "Cleaning" },
      // Kitchen
      { name: "Frying Pan - 12in", category: "Kitchen" },
      { name: "Chef Knife", category: "Kitchen" },
      { name: "Cutting Board", category: "Kitchen" },
      { name: "Measuring Cups", category: "Kitchen" },
      { name: "Microwave Oven", category: "Kitchen" }
    ];
  
    const searchInput = document.getElementById('searchInput');
    const suggestionsSection = document.getElementById('suggestions');
    const voiceButton = document.getElementById('voiceSearchButton');
    const randomButton = document.getElementById('randomSuggestButton');
    const categorySelect = document.getElementById('categoryFilter');
  
    // ✏️ Typing-Based Suggestions
    searchInput.addEventListener('input', function () {
      const query = searchInput.value.toLowerCase();
      const selectedCategory = categorySelect ? categorySelect.value : 'All';
      suggestionsSection.innerHTML = '';
  
      if (query.length > 0) {
        const filtered = itemsDatabase.filter(item =>
          item.name.toLowerCase().includes(query) &&
          (selectedCategory === 'All' || item.category === selectedCategory)
        );
  
        if (filtered.length > 0) {
          filtered.forEach(item => {
            const div = document.createElement('div');
            div.classList.add('suggestion-item');
  
            const textSpan = document.createElement('span');
            textSpan.textContent = item.name;
  
            const heart = document.createElement('span');
            heart.textContent = '🤍';
            heart.style.cursor = 'pointer';
            heart.style.marginLeft = '10px';
  
            const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
            if (favorites.includes(item.name)) {
              heart.textContent = '❤️';
            }
  
            heart.addEventListener('click', (e) => {
              e.stopPropagation();
              let favs = JSON.parse(localStorage.getItem('favorites') || '[]');
              if (favs.includes(item.name)) {
                favs = favs.filter(f => f !== item.name);
                heart.textContent = '🤍';
              } else {
                favs.push(item.name);
                heart.textContent = '❤️';
              }
              localStorage.setItem('favorites', JSON.stringify(favs));
            });
  
            div.appendChild(textSpan);
            div.appendChild(heart);
            suggestionsSection.appendChild(div);
          });
        } else {
          suggestionsSection.innerHTML = '<div>No matches found.</div>';
        }
      }
    });
  
    // 🎙️ Voice Search
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
  
    // 🔮 Random Suggestion Button
    if (randomButton) {
      randomButton.addEventListener('click', () => {
        const randomItem = itemsDatabase[Math.floor(Math.random() * itemsDatabase.length)];
        searchInput.value = randomItem.name;
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
  });
  