
const API_KEY = "7574030db4a34afbb54af21ee207185b";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => {
    fetchNews("India");
    checkTheme();
});

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}



window.addEventListener('DOMContentLoaded', () => {
    const toggleSwitch = document.getElementById('toggle');

    if (toggleSwitch) {
        
        const theme = localStorage.getItem('theme');
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            toggleSwitch.checked = true;
        }

        toggleSwitch.addEventListener('change', function () {
            document.body.classList.toggle('dark-mode');

            
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }

    const searchButton = document.getElementById("search-button");
    const searchText = document.getElementById("search-text");

    searchButton.addEventListener("click", (event) => {
        event.preventDefault();

        const query = searchText.value.trim();
        if (!query) return;

        fetchNews(query);
    });

    const navLinks = document.querySelectorAll('.nav-links li a');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.forEach(link => link.classList.remove('active'));

            link.classList.add('active');

            const category = link.getAttribute('href').substring(1);
            fetchNews(category);
        });
    });
});

function bindData(articles) {
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;

        const cardClone = newsCardTemplate.content.cloneNode(true);

        const img = cardClone.querySelector('#news-img');
        const title = cardClone.querySelector('#news-title');
        const source = cardClone.querySelector('#news-source');
        const desc = cardClone.querySelector('#news-desc');

        img.src = article.urlToImage;
        title.textContent = article.title;
        source.textContent = `${article.source.name} • ${new Date(article.publishedAt).toLocaleDateString()}`;
        desc.textContent = article.description;

        cardClone.firstElementChild.addEventListener("click", () => {
            window.open(article.url, "_blank");
        });

        cardsContainer.appendChild(cardClone);
    });
}

function onNavItemClick(id) {
    fetchNews(id);
}
