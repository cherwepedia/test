// Search functionality
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');

  if (!searchInput) return;

  let posts = [];

  // Fetch posts data
  fetch('/search.json')
    .then(response => response.json())
    .then(data => {
      posts = data;
    })
    .catch(err => console.error('Error loading search data:', err));

  searchInput.addEventListener('input', function(e) {
    const query = e.target.value.toLowerCase().trim();

    if (query.length < 2) {
      searchResults.classList.remove('active');
      searchResults.innerHTML = '';
      return;
    }

    const results = posts.filter(post => {
      return post.title.toLowerCase().includes(query) ||
             post.content.toLowerCase().includes(query) ||
             (post.categories && post.categories.some(cat => cat.toLowerCase().includes(query)));
    });

    displayResults(results);
  });

  function displayResults(results) {
    if (results.length === 0) {
      searchResults.innerHTML = '<div class="search-result-item"><p>Ничего не найдено</p></div>';
      searchResults.classList.add('active');
      return;
    }

    const html = results.slice(0, 10).map(post => `
      <div class="search-result-item" onclick="window.location.href='${post.url}'">
        <h4>${post.title}</h4>
        <p>${post.excerpt}</p>
        ${post.categories ? `<div class="card-categories">
          ${post.categories.map(cat => `<span class="category-tag">${cat}</span>`).join('')}
        </div>` : ''}
      </div>
    `).join('');

    searchResults.innerHTML = html;
    searchResults.classList.add('active');
  }

  // Close search results when clicking outside
  document.addEventListener('click', function(e) {
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
      searchResults.classList.remove('active');
    }
  });
});
