// Main JavaScript file for LuxAuto website
// Handles navigation, animations, and general functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all main functionality
    initNavigation();
    initAnimations();
    initNewsletterForms();
    initScrollEffects();
    initCarData();
    initBlogData();
    initInteractiveElements();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Animation functionality
function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.car-card, .service-card, .team-member, .value-item, .award-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Button hover effects
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Card hover effects
    document.querySelectorAll('.car-card, .service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Newsletter form functionality
function initNewsletterForms() {
    const newsletterForms = document.querySelectorAll('.newsletter-form, #newsletter-form, #blog-newsletter-form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            const submitBtn = this.querySelector('button[type="submit"]');
            
            if (validateEmail(email)) {
                // Show loading state
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Subscribing...';
                submitBtn.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    showNotification('Thank you for subscribing to our newsletter!', 'success');
                    this.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    
                    // Store subscription in localStorage
                    storeSubscription(email);
                }, 1500);
            } else {
                showNotification('Please enter a valid email address.', 'error');
            }
        });
    });
}

// Scroll effects
function initScrollEffects() {
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElement = document.querySelector('.hero-image');
        
        if (parallaxElement) {
            const speed = scrolled * 0.5;
            parallaxElement.style.transform = `translateY(${speed}px)`;
        }
    });

    // Progress bar for reading
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(135deg, #2c5aa0 0%, #1a365d 100%);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Car data for featured cars section
function initCarData() {
    const featuredCars = [
        {
            id: 1,
            name: 'BMW X5 M Sport',
            price: '$89,500',
            image: 'https://cdn.pixabay.com/photo/2019/10/21/03/48/bmw-4565066_1280.jpg',
            category: 'luxury',
            specs: ['Twin Turbo V8', '523 HP', 'AWD', '4.2s 0-60mph'],
            badge: 'New'
        },
        {
            id: 2,
            name: 'Mercedes S-Class',
            price: '$126,000',
            image: 'https://cdn.pixabay.com/photo/2020/06/25/17/58/car-5340358_1280.jpg',
            category: 'luxury',
            specs: ['V6 Turbo', '429 HP', 'RWD', '4.8s 0-60mph'],
            badge: 'Featured'
        },
        {
            id: 3,
            name: 'Tesla Model S Plaid',
            price: '$135,000',
            image: 'https://cdn.pixabay.com/photo/2021/12/23/09/18/tesla-6889042_1280.jpg',
            category: 'electric',
            specs: ['Tri-Motor Electric', '1020 HP', 'AWD', '1.9s 0-60mph'],
            badge: 'Electric'
        }
    ];

    const featuredCarsGrid = document.getElementById('featured-cars-grid');
    if (featuredCarsGrid) {
        renderCars(featuredCars, featuredCarsGrid);
    }
}

// Blog data for blog section
function initBlogData() {
    const blogPosts = [
        {
            id: 1,
            title: 'Electric Revolution in Luxury Cars',
            excerpt: 'How premium automotive brands are embracing electric technology without compromising luxury.',
            category: 'technology',
            date: '2024-12-10',
            readTime: '5 min read',
            image: 'https://cdn.pixabay.com/photo/2022/09/28/14/34/car-7485224_1280.jpg',
            tags: ['electric-vehicles', 'luxury-cars', 'technology']
        },
        {
            id: 2,
            title: 'BMW vs Mercedes: Ultimate Comparison',
            excerpt: 'A detailed comparison of BMW and Mercedes luxury sedans in 2024.',
            category: 'reviews',
            date: '2024-12-08',
            readTime: '8 min read',
            image: 'https://cdn.pixabay.com/photo/2022/06/30/08/13/race-car-7293167_960_720.jpg',
            tags: ['bmw', 'mercedes', 'comparison', 'reviews']
        },
        {
            id: 3,
            title: 'Luxury Car Maintenance Tips',
            excerpt: 'Essential maintenance tips to keep your luxury vehicle in perfect condition.',
            category: 'maintenance',
            date: '2024-12-05',
            readTime: '6 min read',
            image: 'https://cdn.pixabay.com/photo/2023/03/27/08/53/woman-7880177_1280.jpg',
            tags: ['maintenance', 'luxury-cars', 'tips']
        },
        {
            id: 4,
            title: 'The Future of Autonomous Driving',
            excerpt: 'How self-driving technology is reshaping the luxury automotive landscape.',
            category: 'technology',
            date: '2024-12-03',
            readTime: '7 min read',
            image: 'https://cdn.pixabay.com/photo/2022/11/11/13/09/tesla-7584958_1280.jpg',
            tags: ['autonomous-driving', 'technology', 'future']
        },
        {
            id: 5,
            title: 'Financing Your Dream Car',
            excerpt: 'Understanding financing options and getting the best deals on luxury vehicles.',
            category: 'financing',
            date: '2024-12-01',
            readTime: '4 min read',
            image: 'https://cdn.pixabay.com/photo/2022/07/04/10/46/vintage-car-7300881_1280.jpg',
            tags: ['financing', 'car-buying-guide', 'tips']
        },
        {
            id: 6,
            title: 'Performance vs Efficiency in Modern Luxury Cars',
            excerpt: 'Balancing high performance with fuel efficiency in today\'s luxury automotive market.',
            category: 'industry',
            date: '2024-11-28',
            readTime: '6 min read',
            image: 'https://cdn.pixabay.com/photo/2017/11/09/01/49/ferrari-458-spider-2932191_1280.jpg  ',
            tags: ['performance', 'efficiency', 'industry']
        }
    ];

    const blogPostsGrid = document.getElementById('blog-posts-grid');
    if (blogPostsGrid) {
        renderBlogPosts(blogPosts, blogPostsGrid);
        initBlogFilters(blogPosts);
        initLoadMore(blogPosts);
    }

    // Load recent posts in sidebar
    const recentPostsContainer = document.getElementById('recent-posts');
    if (recentPostsContainer) {
        renderRecentPosts(blogPosts.slice(0, 4), recentPostsContainer);
    }

    // Initialize blog tags
    initBlogTags();
}

// Interactive elements
function initInteractiveElements() {
    // FAQ toggles (for pages that have them)
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            const icon = this.querySelector('i');
            
            faqItem.classList.toggle('active');
            
            if (faqItem.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.style.transform = 'rotate(180deg)';
            } else {
                answer.style.maxHeight = '0';
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });

    // Process SVG interactions (for about page)
    const processSteps = document.querySelectorAll('.process-step');
    processSteps.forEach((step, index) => {
        step.addEventListener('mouseenter', function() {
            this.style.fill = '#f39c12';
            this.style.transform = 'scale(1.1)';
        });
        
        step.addEventListener('mouseleave', function() {
            this.style.fill = '#2c5aa0';
            this.style.transform = 'scale(1)';
        });
    });

    // Social media sharing
    initSocialSharing();
}

// Utility functions
function renderCars(cars, container) {
    container.innerHTML = cars.map(car => `
        <div class="car-card" data-category="${car.category}">
            <div class="car-image">
                <img src="${car.image}" alt="${car.name}" loading="lazy">
                <div class="car-badge">${car.badge}</div>
            </div>
            <div class="car-info">
                <h3 class="car-title">${car.name}</h3>
                <p class="car-price">${car.price}</p>
                <div class="car-specs">
                    ${car.specs.map(spec => `<span>${spec}</span>`).join('')}
                </div>
                <div class="car-actions">
                    <button class="btn btn-primary" onclick="openCarModal(${car.id})">View Details</button>
                    <button class="btn btn-secondary" onclick="scheduleTestDrive('${car.name}')">Test Drive</button>
                </div>
            </div>
        </div>
    `).join('');
}

function renderBlogPosts(posts, container) {
    container.innerHTML = posts.map(post => `
        <article class="blog-post" data-category="${post.category}">
            <div class="post-image">
                <img src="${post.image}" alt="${post.title}" loading="lazy">
                <div class="post-category">${post.category}</div>
            </div>
            <div class="post-content">
                <div class="post-meta">
                    <span class="post-date">${formatDate(post.date)}</span>
                    <span class="post-read-time">${post.readTime}</span>
                </div>
                <h3 class="post-title">${post.title}</h3>
                <p class="post-excerpt">${post.excerpt}</p>
                <div class="post-tags">
                    ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <a href="#" class="btn btn-outline">Read More</a>
            </div>
        </article>
    `).join('');
}

function renderRecentPosts(posts, container) {
    container.innerHTML = posts.map(post => `
        <div class="recent-post">
            <div class="recent-post-image">
                <img src="${post.image}" alt="${post.title}" loading="lazy">
            </div>
            <div class="recent-post-content">
                <h4>${post.title}</h4>
                <span class="recent-post-date">${formatDate(post.date)}</span>
            </div>
        </div>
    `).join('');
}

function initBlogFilters(posts) {
    const categoryFilters = document.querySelectorAll('.category-filter');
    
    categoryFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Update active filter
            categoryFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            
            // Filter posts
            const blogPosts = document.querySelectorAll('.blog-post');
            blogPosts.forEach(post => {
                if (category === 'all' || post.dataset.category === category) {
                    post.style.display = 'block';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    });
}

function initLoadMore(posts) {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    let currentPosts = 3;
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            const nextPosts = posts.slice(currentPosts, currentPosts + 3);
            const container = document.getElementById('blog-posts-grid');
            
            nextPosts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.innerHTML = `
                    <article class="blog-post" data-category="${post.category}">
                        <div class="post-image">
                            <img src="${post.image}" alt="${post.title}" loading="lazy">
                            <div class="post-category">${post.category}</div>
                        </div>
                        <div class="post-content">
                            <div class="post-meta">
                                <span class="post-date">${formatDate(post.date)}</span>
                                <span class="post-read-time">${post.readTime}</span>
                            </div>
                            <h3 class="post-title">${post.title}</h3>
                            <p class="post-excerpt">${post.excerpt}</p>
                            <div class="post-tags">
                                ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                            </div>
                            <a href="#" class="btn btn-outline">Read More</a>
                        </div>
                    </article>
                `;
                container.appendChild(postElement.firstElementChild);
            });
            
            currentPosts += 3;
            
            if (currentPosts >= posts.length) {
                loadMoreBtn.style.display = 'none';
            }
        });
    }
}

function initBlogTags() {
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.addEventListener('click', function() {
            const tagText = this.textContent.toLowerCase().replace(/\s+/g, '-');
            // Filter posts by tag
            console.log('Filtering by tag:', tagText);
        });
    });
}

function initSocialSharing() {
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.querySelector('i').className;
            const url = window.location.href;
            const title = document.title;
            
            let shareUrl = '';
            if (platform.includes('facebook')) {
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            } else if (platform.includes('twitter')) {
                shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
            } else if (platform.includes('linkedin')) {
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
            }
            
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });
}

// Global utility functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

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
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function storeSubscription(email) {
    const subscriptions = JSON.parse(localStorage.getItem('luxauto_subscriptions') || '[]');
    if (!subscriptions.includes(email)) {
        subscriptions.push(email);
        localStorage.setItem('luxauto_subscriptions', JSON.stringify(subscriptions));
    }
}

// Global functions for car interactions
function openCarModal(carId) {
    console.log('Opening modal for car ID:', carId);
    // This will be implemented in products.js
}

function scheduleTestDrive(carName) {
    showNotification(`Test drive scheduled for ${carName}. We'll contact you soon!`, 'success');
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .blog-post {
        background: white;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        transition: all 0.5s ease;
        margin-bottom: 2rem;
    }
    
    .blog-post:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
    }
    
    .post-image {
        position: relative;
        height: 250px;
        overflow: hidden;
    }
    
    .post-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
    }
    
    .blog-post:hover .post-image img {
        transform: scale(1.1);
    }
    
    .post-category {
        position: absolute;
        top: 1rem;
        left: 1rem;
        background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 8px;
        font-size: 0.8rem;
        font-weight: 600;
        text-transform: uppercase;
    }
    
    .post-content {
        padding: 2rem;
    }
    
    .post-meta {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;
        font-size: 0.9rem;
        color: #666;
    }
    
    .post-title {
        margin-bottom: 1rem;
        font-size: 1.5rem;
        color: #333;
    }
    
    .post-excerpt {
        margin-bottom: 1.5rem;
        color: #666;
        line-height: 1.6;
    }
    
    .post-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 1.5rem;
    }
    
    .tag {
        background: #f8f9fa;
        color: #666;
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        font-size: 0.8rem;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .tag:hover {
        background: #2c5aa0;
        color: white;
    }
    
    .category-filter {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1.5rem;
        background: white;
        border-radius: 16px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        cursor: pointer;
        transition: all 0.3s ease;
        text-align: center;
    }
    
    .category-filter.active,
    .category-filter:hover {
        background: #2c5aa0;
        color: white;
        transform: translateY(-5px);
    }
    
    .category-filter i {
        font-size: 2rem;
        margin-bottom: 1rem;
    }
    
    .recent-post {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid #eee;
    }
    
    .recent-post-image {
        width: 80px;
        height: 60px;
        border-radius: 8px;
        overflow: hidden;
        flex-shrink: 0;
    }
    
    .recent-post-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    
    .recent-post-content h4 {
        font-size: 0.9rem;
        margin-bottom: 0.5rem;
        line-height: 1.3;
    }
    
    .recent-post-date {
        font-size: 0.8rem;
        color: #666;
    }
`;
document.head.appendChild(style);
