SUPPLAI-CSS/
├── index.html    (Layout and structure)
├── style.css     (Design and styling)
└── supplai.js    (Smart functions and behavior)
// SupplAi Smart Search System

// Example database of items (later this will come from a real server)
const itemsDatabase = [
    "Blue Chair",
    "Red Table",
    "Green Sofa",
    "Electric Drill",
    "Bicycle",
    "Laptop",
    "Wireless Headphones",
    "Smartphone",
    "Toolbox",
    "Backpack"
  ];
  
  // Get references to DOM elements
  const searchInput = document.getElementById('searchInput');
  const suggestionsSection = document.getElementById('suggestions');
  
  // Listen for typing in the search input
  searchInput.addEventListener('input', function() {
    const query = searchInput.value.toLowerCase();
    suggestionsSection.innerHTML = ''; // Clear previous suggestions
  
    if (query.length > 0) {
      const filteredItems = itemsDatabase.filter(item => item.toLowerCase().includes(query));
  
      filteredItems.forEach(item => {
        const div = document.createElement('div');
        div.textContent = item;
        div.classList.add('suggestion-item');
        suggestionsSection.appendChild(div);
      });
  
      if (filteredItems.length === 0) {
        suggestionsSection.innerHTML = '<div>No matches found.</div>';
      }
    }
  });
  