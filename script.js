// Product list
const products = [
    { id: 1, name: "iPhone 16", price: 799 },
    { id: 2, name: "iPhone 16 Pro & Pro Max", price: 1199 },
    { id: 3, name: "iPhone 15 Series", price: 699 },
    { id: 4, name: "iPhone 14 Pro", price: 899 },
    { id: 5, name: "iPhone 16 Series", price: 799 },
    { id: 6, name: "MacBook Pro", price: 1599 },
    { id: 7, name: "iPad Pro", price: 1299 },
    { id: 8, name: "Apple Watch Series 10", price: 399 },
    { id: 9, name: "AirPods Pro 2", price: 249 },
    { id: 10, name: "Apple Vision Pro", price: 3499 },
    { id: 11, name: "AirTag (4-Pack)", price: 99 },
    { id: 12, name: "Magic Keyboard, Mouse & Trackpad", price: 377 },
    { id: 13, name: "iMac M4", price: 1299 },
    { id: 14, name: "Mac Studio (M2 Ultra)", price: 3999 },
    { id: 15, name: "Studio Display", price: 1599 },
    { id: 16, name: "HomePod mini", price: 99 }
];

// Cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add to cart
function addToCart(e) {
    const id = parseInt(e.target.dataset.id);
    const product = products.find(p => p.id === id);
    
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showCartItems(); // Cart page pe update
    alert(`${product.name} added to cart!`);
}

// Show items on Cart page
function showCartItems() {
    const cartContainer = document.getElementById('cart-items');
    const emptyMessage = document.getElementById('empty-message');
    
    if (!cartContainer) return; // Sirf cart page pe run
    
    if (cart.length === 0) {
        emptyMessage.style.display = 'block';
        cartContainer.innerHTML = '';
        return;
    }
    
    emptyMessage.style.display = 'none';
    cartContainer.innerHTML = '';
    
    cart.forEach(item => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <h3>${item.name}</h3>
            <p>Quantity: ${item.quantity}</p>
            <p class="price">$${item.price * item.quantity}</p>
        `;
        cartContainer.appendChild(card);
    });
}

// Clear cart
function clearCart() {
    if (confirm('Are you sure you want to clear the cart?')) {
        cart = [];
        localStorage.removeItem('cart');
        updateCartCount();
        showCartItems();
        alert('Cart cleared!');
    }
}

// Update count
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('#cart-count').forEach(el => {
        el.textContent = count;
    });
}

// Run everything
document.addEventListener('DOMContentLoaded', () => {
    // Add to Cart buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.onclick = addToCart;
    });
    
    // Clear button
    const clearBtn = document.getElementById('clear-cart-btn');
    if (clearBtn) {
        clearBtn.onclick = clearCart;
    }
    
    updateCartCount();
    showCartItems(); // Cart page pe list dikhao
});