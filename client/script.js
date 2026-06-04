// --- 1. Mock Data --- //
const products = [
    { id: 1, name: "Beaded Floral Bracelet", price: 120, image: "https://via.placeholder.com/150" },
    { id: 2, name: "Crystal Charm Necklace", price: 250, image: "https://via.placeholder.com/150" },
    { id: 3, name: "Custom Initial Keychain", price: 85, image: "https://via.placeholder.com/150" }
];

const schedules = [
    { id: 1, date: "June 15, 2026", location: "Intramuros Student Fair", time: "10:00 AM - 4:00 PM" },
    { id: 2, date: "June 22, 2026", location: "Makati Weekend Market", time: "9:00 AM - 6:00 PM" }
];

let cart = [];

// --- 2. Render Functions --- //
function displayProducts() {
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = ''; 

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('card');
        
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>₱${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productContainer.appendChild(productCard);
    });
}

function displaySchedules() {
    const scheduleContainer = document.getElementById('schedule-container');
    scheduleContainer.innerHTML = '';

    schedules.forEach(sched => {
        const schedCard = document.createElement('div');
        schedCard.classList.add('schedule-card');
        
        schedCard.innerHTML = `
            <h3>📅 ${sched.date}</h3>
            <p><strong>Where:</strong> ${sched.location}</p>
            <p><strong>Time:</strong> ${sched.time}</p>
        `;
        scheduleContainer.appendChild(schedCard);
    });
}

// --- 3. Cart Logic --- //
function addToCart(productId) {
    const productToAdd = products.find(p => p.id === productId);
    cart.push(productToAdd);
    updateCartUI();
}

function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    
    cartItemsContainer.innerHTML = ''; 
    let total = 0;

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${item.name} - ₱${item.price.toFixed(2)} <button onclick="removeFromCart(${index})" class="remove-btn">x</button>`;
        cartItemsContainer.appendChild(li);
        total += item.price;
    });

    cartTotalElement.innerText = total.toFixed(2);
}

function removeFromCart(index) {
    cart.splice(index, 1); // Remove the item at that specific index
    updateCartUI(); // Refresh the display
}

// --- 4. Initialize Page --- //
// Run these functions when the page loads
displayProducts();
displaySchedules();