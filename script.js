// Product data
const products = [
    {
        id: 1,
        name: "Modern Accent Chair",
        category: "seating",
        price: 899,
        image: "https://images.pexels.com/photos/586763/pexels-photo-586763.jpeg?auto=compress&cs=tinysrgb&w=400",
        badge: "New",
        description: "A stunning modern accent chair that combines comfort with contemporary design. Perfect for any living space."
    },
    {
        id: 2,
        name: "Glass Coffee Table",
        category: "tables",
        price: 1299,
        image: "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=400",
        badge: "Popular",
        description: "Elegant glass coffee table with a sleek metal frame. Adds sophistication to your living room."
    },
    {
        id: 3,
        name: "Comfortable Sofa",
        category: "seating",
        price: 2499,
        image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400",
        badge: "Best Seller",
        description: "Luxurious 3-seater sofa with premium upholstery and exceptional comfort for your family."
    },
    {
        id: 4,
        name: "Wooden Dining Chair",
        category: "seating",
        price: 349,
        image: "https://images.pexels.com/photos/1148955/pexels-photo-1148955.jpeg?auto=compress&cs=tinysrgb&w=400",
        badge: "",
        description: "Classic wooden dining chair crafted from sustainable oak wood with ergonomic design."
    },
    {
        id: 5,
        name: "Modern Bookshelf",
        category: "storage",
        price: 799,
        image: "https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=400",
        badge: "New",
        description: "Contemporary bookshelf with clean lines and ample storage space for books and decorative items."
    },
    {
        id: 6,
        name: "Minimalist Side Table",
        category: "tables",
        price: 299,
        image: "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=400",
        badge: "",
        description: "Sleek side table with a minimalist design, perfect for bedrooms or living areas."
    },
    {
        id: 7,
        name: "Executive Desk",
        category: "tables",
        price: 1899,
        image: "https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg?auto=compress&cs=tinysrgb&w=400",
        badge: "Premium",
        description: "Professional executive desk with built-in storage and cable management for the modern office."
    },
    {
        id: 8,
        name: "Floor Lamp",
        category: "lighting",
        price: 449,
        image: "https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=400",
        badge: "",
        description: "Elegant floor lamp with adjustable height and warm LED lighting for ambient illumination."
    },
    {
        id: 9,
        name: "Storage Ottoman",
        category: "storage",
        price: 199,
        image: "https://images.pexels.com/photos/1148955/pexels-photo-1148955.jpeg?auto=compress&cs=tinysrgb&w=400",
        badge: "Sale",
        description: "Versatile storage ottoman that doubles as seating and provides hidden storage space."
    },
    {
        id: 10,
        name: "Bar Stool",
        category: "seating",
        price: 179,
        image: "https://images.pexels.com/photos/1148955/pexels-photo-1148955.jpeg?auto=compress&cs=tinysrgb&w=400",
        badge: "",
        description: "Modern bar stool with adjustable height and comfortable cushioned seat."
    },
    {
        id: 11,
        name: "Pendant Light",
        category: "lighting",
        price: 329,
        image: "https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=400",
        badge: "New",
        description: "Contemporary pendant light with geometric design, perfect for dining areas and kitchens."
    },
    {
        id: 12,
        name: "TV Console",
        category: "storage",
        price: 899,
        image: "https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=400",
        badge: "",
        description: "Stylish TV console with multiple compartments for media storage and cable management."
    }
];

// Shopping cart
let cart = [];

// DOM elements
const productsGrid = document.getElementById('products-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const cartBtn = document.querySelector('.cart-btn');
const cartModal = document.getElementById('cart-modal');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.querySelector('.cart-count');
const closeCartBtn = document.querySelector('.close-cart');
const productModal = document.getElementById('product-modal');
const closeModalBtn = document.querySelector('.close-modal');
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const newsletterForm = document.querySelector('.newsletter-form');

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    renderProducts(products);
    updateCartUI();
    initializeEventListeners();
    initializeScrollAnimations();
});

// Render products
function renderProducts(productsToRender) {
    productsGrid.innerHTML = '';
    
    productsToRender.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Create product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card fade-in-up';
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
            ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
            <div class="product-actions">
                <button class="action-btn" onclick="toggleWishlist(${product.id})">
                    <i class="fas fa-heart"></i>
                </button>
                <button class="action-btn" onclick="quickView(${product.id})">
                    <i class="fas fa-eye"></i>
                </button>
            </div>
        </div>
        <div class="product-info">
            <div class="product-category">${product.category}</div>
            <h3 class="product-name">${product.name}</h3>
            <div class="product-price">$${product.price.toLocaleString()}</div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        </div>
    `;
    
    return card;
}

// Filter products
function filterProducts(category) {
    const filteredProducts = category === 'all' ? products : products.filter(p => p.category === category);
    renderProducts(filteredProducts);
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartUI();
    showNotification('Product added to cart!');
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    renderCartItems();
}

// Update quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartUI();
            renderCartItems();
        }
    }
}

// Update cart UI
function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartCount.textContent = totalItems;
    cartTotal.textContent = totalPrice.toLocaleString();
}

// Render cart items
function renderCartItems() {
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #6c757d; padding: 40px;">Your cart is empty</p>';
        return;
    }
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${item.price.toLocaleString()}</div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    <button class="quantity-btn" onclick="removeFromCart(${item.id})" style="margin-left: 10px; color: #e74c3c;">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
}

// Quick view product
function quickView(productId) {
    const product = products.find(p => p.id === productId);
    const modalBody = document.querySelector('.product-modal-body');
    
    modalBody.innerHTML = `
        <div class="modal-product-grid">
            <div class="modal-product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="modal-product-info">
                <div class="modal-product-category">${product.category}</div>
                <h2>${product.name}</h2>
                <div class="modal-product-price">$${product.price.toLocaleString()}</div>
                <p class="modal-product-description">${product.description}</p>
                <button class="btn btn-primary modal-add-to-cart" onclick="addToCart(${product.id}); closeProductModal();">
                    Add to Cart
                </button>
            </div>
        </div>
    `;
    
    productModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close product modal
function closeProductModal() {
    productModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Toggle wishlist (placeholder function)
function toggleWishlist(productId) {
    showNotification('Added to wishlist!');
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #e67e22;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 3000;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// Initialize event listeners
function initializeEventListeners() {
    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterProducts(btn.dataset.filter);
        });
    });
    
    // Cart modal
    cartBtn.addEventListener('click', () => {
        cartModal.classList.add('active');
        renderCartItems();
        document.body.style.overflow = 'hidden';
    });
    
    closeCartBtn.addEventListener('click', () => {
        cartModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Close modals when clicking outside
    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) {
            closeProductModal();
        }
    });
    
    closeModalBtn.addEventListener('click', closeProductModal);
    
    // Mobile menu
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
    
    // Newsletter form
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        showNotification('Thank you for subscribing!');
        e.target.reset();
    });
    
    // Category cards
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            filterBtns.forEach(btn => btn.classList.remove('active'));
            document.querySelector(`[data-filter="${category}"]`).classList.add('active');
            filterProducts(category);
            document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            // Check if href is just '#' or empty - if so, don't try to scroll
            if (!href || href === '#') {
                return;
            }
            
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Initialize scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.category-card, .product-card, .about-content, .newsletter-content').forEach(el => {
        observer.observe(el);
    });
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);