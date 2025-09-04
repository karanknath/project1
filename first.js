const navbarToggle = document.querySelector('.navbar-toggle');
const navMenu = document.querySelector('.nav-menu');

// Toggle mobile menu
navbarToggle.addEventListener('click', () => {
    navbarToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-links').forEach(link => {
    link.addEventListener('click', () => {
        navbarToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        navbarToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Product Quantity Controls
document.addEventListener('DOMContentLoaded', () => {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const decreaseBtn = card.querySelector('.qty-btn[data-action="decrease"]');
        const increaseBtn = card.querySelector('.qty-btn[data-action="increase"]');
        const quantityDisplay = card.querySelector('.quantity');
        const addToCartBtn = card.querySelector('.add-to-cart-btn');
        
        let quantity = 1;
        
        // Decrease quantity
        decreaseBtn.addEventListener('click', () => {
            if (quantity > 1) {
                quantity--;
                quantityDisplay.textContent = quantity;
                updateButtonState();
            }
        });
        
        // Increase quantity
        increaseBtn.addEventListener('click', () => {
            quantity++;
            quantityDisplay.textContent = quantity;
            updateButtonState();
        });
        
        // Add to cart functionality
        addToCartBtn.addEventListener('click', () => {
            const productName = card.querySelector('.product-name').textContent;
            const productPrice = card.querySelector('.product-price').textContent;
            
            // Add animation
            addToCartBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                addToCartBtn.style.transform = 'scale(1)';
            }, 150);
            
            // Show success message
            showNotification(`${quantity} × ${productName} added to cart!`);
            
            // Reset quantity
            quantity = 1;
            quantityDisplay.textContent = quantity;
            updateButtonState();
        });
        
        function updateButtonState() {
            decreaseBtn.style.opacity = quantity === 1 ? '0.5' : '1';
            decreaseBtn.style.cursor = quantity === 1 ? 'not-allowed' : 'pointer';
        }
        
        updateButtonState();
    });
});

// Quick View Button
document.querySelectorAll('.quick-view-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const productCard = btn.closest('.product-card');
        const productName = productCard.querySelector('.product-name').textContent;
        const productPrice = productCard.querySelector('.product-price').textContent;
        
        showNotification(`Quick view: ${productName} - ${productPrice}`);
    });
});

// Notification System
function showNotification(message) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create new notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(45deg, #4ecdc4, #44a08d);
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 500;
        z-index: 1000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animations for notifications
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

// Smooth scroll for navigation links
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

// Intersection Observer for scroll animations
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

// Observe product cards for scroll animations
document.querySelectorAll('.product-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});
