// --- 1. Global State --- //
let products = []; // Starts empty, will be filled by your backend!
let cart = [];

// Mock schedules (since we haven't moved this to the database yet)
const schedules = [
    { id: 1, date: "June 15, 2026", location: "Intramuros Student Fair", time: "10:00 AM - 4:00 PM" },
    { id: 2, date: "June 22, 2026", location: "Makati Weekend Market", time: "9:00 AM - 6:00 PM" }
];

// --- 2. Render Functions --- //

// Fetch and display live products from MongoDB
async function displayProducts() {
    try {
        const response = await fetch('http://localhost:5000/api/products');
        products = await response.json(); // Save the live data into our array

        const productContainer = document.getElementById('product-container');
        productContainer.innerHTML = ''; 

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('card');
            
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>₱${product.price.toFixed(2)}</p>
                <button onclick="addToCart('${product._id}')">Add to Cart</button> 
            `;
            productContainer.appendChild(productCard);
        });
    } catch (error) {
        console.error("Error loading products:", error);
    }
}

// Display hardcoded schedules
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
    // Find the product using MongoDB's automatic _id
    const productToAdd = products.find(p => p._id === productId); 
    
    if (productToAdd) {
        cart.push(productToAdd);
        updateCartUI();
    }
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
    cart.splice(index, 1); 
    updateCartUI(); 
}

// --- 4. Initialize Page --- //
// Run these functions immediately when the page loads
displayProducts();
displaySchedules();