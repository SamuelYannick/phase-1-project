document.addEventListener("DOMContentLoaded", () => {
    // Fetch the API key from environment variables
    const apiKey = "81700ea1546544378a8305258121fbdf";
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
    // DOM elements
    const newsContainer = document.getElementById('news-container');
    const searchBar = document.getElementById('search-bar');
    const sortOptions = document.getElementById('sort-options');

    let articles = []; // To store fetched articles
    
    // Fetch news articles from the API
    async function fetchNews() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            articles = data.articles;
            displayNews(articles);
        } catch (error) {
            console.error("Error fetching news:", error);
        }
    }
    
    // Render news articles on the page
    function displayNews(news) {
        newsContainer.innerHTML = ''; // Clear existing content
        news.forEach(article => {
            const newsCard = document.createElement('div');
            newsCard.classList.add('news-card');
            newsCard.innerHTML = `
                <img src="${article.urlToImage || 'placeholder.jpg'}" alt="${article.title}" class="news-image">
                <h2>${article.title}</h2>
                <p>${new Date(article.publishedAt).toLocaleDateString()}</p>
                <p>${article.description || ''}</p>
                <a href="${article.url}" target="_blank">Read more</a>
            `;
            newsContainer.appendChild(newsCard);
        });
    }

    // Filter news articles based on the search query
    function filterNews() {
        const query = searchBar.value.toLowerCase();
        const filtered = articles.filter(article =>
            article.title.toLowerCase().includes(query) ||
            (article.description && article.description.toLowerCase().includes(query))
        );
        displayNews(filtered);
    }

    // Sort news articles based on the selected option
    function sortNews() {
        const option = sortOptions.value;
        const sorted = [...articles]; // Copy articles array to avoid mutation
        if (option === 'date') {
            sorted.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)); // Sort by date
        } else if (option === 'title') {
            sorted.sort((a, b) => a.title.localeCompare(b.title)); // Sort alphabetically by title
        }
        displayNews(sorted);
    }

    searchBar.addEventListener('input', filterNews); // Filter on search input
    sortOptions.addEventListener('change', sortNews); // Sort on dropdown change

    // Fetch and display news articles when the page loads
    fetchNews();
});


