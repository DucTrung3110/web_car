// Blog page specific functionality
// Handles article filtering, animations, and interactions

document.addEventListener('DOMContentLoaded', function() {
    initBlogPage();
});

function initBlogPage() {
    initArticleFiltering();
    initBrandCardInteractions();
    initLoadMoreFunctionality();
    initArticleAnimations();
}

// Article filtering functionality
function initArticleFiltering() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const articles = document.querySelectorAll('.article-card');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active tab
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Filter articles with animation
            filterArticles(articles, filter);
            
            // Update URL without page reload
            updateURL(filter);
        });
    });
    
    // Initialize based on URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const initialFilter = urlParams.get('category') || 'all';
    setActiveFilter(initialFilter);
}

function filterArticles(articles, filter) {
    articles.forEach((article, index) => {
        const category = article.dataset.category;
        const shouldShow = filter === 'all' || category === filter;
        
        // Add staggered animation delay
        setTimeout(() => {
            if (shouldShow) {
                article.classList.remove('hidden');
                article.style.animationDelay = `${index * 0.1}s`;
            } else {
                article.classList.add('hidden');
            }
        }, index * 50);
    });
    
    // Update results count
    updateResultsCount(articles, filter);
}

function setActiveFilter(filter) {
    const filterTab = document.querySelector(`[data-filter="${filter}"]`);
    const articles = document.querySelectorAll('.article-card');
    
    if (filterTab) {
        document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
        filterTab.classList.add('active');
        filterArticles(articles, filter);
    }
}

function updateURL(filter) {
    const url = new URL(window.location);
    if (filter === 'all') {
        url.searchParams.delete('category');
    } else {
        url.searchParams.set('category', filter);
    }
    window.history.replaceState({}, '', url);
}

function updateResultsCount(articles, filter) {
    const visibleCount = Array.from(articles).filter(article => {
        const category = article.dataset.category;
        return filter === 'all' || category === filter;
    }).length;
    
    // Show notification of filter results
    const filterName = filter === 'all' ? 'All Articles' : 
                      filter.charAt(0).toUpperCase() + filter.slice(1);
    
    if (filter !== 'all') {
        showNotification(`Showing ${visibleCount} articles in ${filterName}`, 'info');
    }
}

// Brand card interactions
function initBrandCardInteractions() {
    const brandCards = document.querySelectorAll('.brand-card');
    
    brandCards.forEach(card => {
        card.addEventListener('click', function() {
            const brandType = this.classList.contains('bmw') ? 'BMW' :
                            this.classList.contains('mercedes') ? 'Mercedes-Benz' :
                            this.classList.contains('honda') ? 'Honda' : 'Brand';
            
            // Simulate navigation to brand-specific articles
            const filter = brandType.toLowerCase() === 'mercedes-benz' ? 'reviews' : 'technology';
            setActiveFilter(filter);
            
            // Smooth scroll to articles section
            document.querySelector('.latest-articles').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            showNotification(`Viewing ${brandType} related articles`, 'success');
        });
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-10px)';
        });
    });
}

// Load more functionality
function initLoadMoreFunctionality() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    let currentPage = 1;
    const articlesPerPage = 6;
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            loadMoreArticles(currentPage + 1);
            currentPage++;
        });
    }
}

function loadMoreArticles(page) {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const articlesGrid = document.querySelector('.articles-grid');
    
    // Show loading state
    loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    loadMoreBtn.disabled = true;
    
    // Simulate API call with setTimeout
    setTimeout(() => {
        const newArticles = generateMoreArticles(page);
        
        newArticles.forEach((articleHTML, index) => {
            const articleElement = document.createElement('div');
            articleElement.innerHTML = articleHTML;
            const article = articleElement.firstElementChild;
            
            // Add animation delay for staggered effect
            article.style.opacity = '0';
            article.style.transform = 'translateY(30px)';
            articlesGrid.appendChild(article);
            
            setTimeout(() => {
                article.style.transition = 'all 0.6s ease';
                article.style.opacity = '1';
                article.style.transform = 'translateY(0)';
            }, index * 100);
        });
        
        // Reset button state
        loadMoreBtn.innerHTML = '<span>Load More Articles</span><i class="fas fa-arrow-down"></i>';
        loadMoreBtn.disabled = false;
        
        // Hide button if no more articles
        if (page >= 3) {
            loadMoreBtn.style.display = 'none';
            showNotification('All articles loaded', 'info');
        }
        
        showNotification(`Loaded ${newArticles.length} more articles`, 'success');
        
    }, 1500);
}

function generateMoreArticles(page) {
    // Generate additional articles for demo
    const articles = [
        {
            category: 'technology',
            title: 'AI-Powered Safety Features in Modern Luxury Cars',
            excerpt: 'How artificial intelligence is making luxury vehicles safer than ever before.',
            author: 'Dr. Lisa Wang',
            readTime: '6 min read',
            likes: 89,
            comments: 12
        },
        {
            category: 'reviews',
            title: 'Honda Accord Hybrid: Efficiency Meets Performance',
            excerpt: 'A detailed review of Honda\'s latest hybrid technology and driving experience.',
            author: 'Robert Kim',
            readTime: '9 min read',
            likes: 134,
            comments: 28
        },
        {
            category: 'maintenance',
            title: 'Luxury Car Care: Professional Tips for Longevity',
            excerpt: 'Expert advice on maintaining your luxury vehicle\'s performance and appearance.',
            author: 'Maria Garcia',
            readTime: '5 min read',
            likes: 67,
            comments: 19
        }
    ];
    
    return articles.map((article, index) => `
        <article class="article-card" data-category="${article.category}">
            <div class="article-image">
                <img src="https://picsum.photos/400/250?random=${page}${index}" alt="${article.title}" loading="lazy">
                <div class="read-time">${article.readTime}</div>
            </div>
            <div class="article-content">
                <div class="article-meta">
                    <span class="category ${article.category}">${article.category}</span>
                    <span class="date">${getRecentDate()}</span>
                </div>
                <h3><a href="#">${article.title}</a></h3>
                <p>${article.excerpt}</p>
                <div class="article-footer">
                    <div class="author">
                        <img src="https://picsum.photos/32/32?random=${page}${index}author" alt="Author" class="author-avatar">
                        <span>${article.author}</span>
                    </div>
                    <div class="engagement">
                        <span><i class="fas fa-heart"></i> ${article.likes}</span>
                        <span><i class="fas fa-comment"></i> ${article.comments}</span>
                    </div>
                </div>
            </div>
        </article>
    `);
}

function getRecentDate() {
    const dates = ['Nov 25, 2024', 'Nov 22, 2024', 'Nov 20, 2024', 'Nov 18, 2024'];
    return dates[Math.floor(Math.random() * dates.length)];
}

// Article animations on scroll
function initArticleAnimations() {
    const articles = document.querySelectorAll('.article-card, .brand-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Initialize articles with hidden state
    articles.forEach((article, index) => {
        article.style.opacity = '0';
        article.style.transform = 'translateY(30px)';
        article.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(article);
    });
}

// Global notification function (if not already defined)
if (typeof showNotification === 'undefined') {
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            max-width: 300px;
            word-wrap: break-word;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Add blog-specific styles
const blogStyles = document.createElement('style');
blogStyles.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
    
    .brand-card {
        cursor: pointer;
    }
    
    .brand-card:hover {
        background: rgba(255, 255, 255, 0.1) !important;
    }
    
    .article-card.hidden {
        display: none;
    }
    
    .filter-tab {
        user-select: none;
    }
    
    .articles-grid {
        min-height: 400px;
    }
`;

document.head.appendChild(blogStyles);