// This is the boilerplate code given for you
// You can modify this code
// Product data
const products = [
    { id: 1, name: "Product 1", price: 10 },
    { id: 2, name: "Product 2", price: 20 },
    { id: 3, name: "Product 3", price: 30 },
    { id: 4, name: "Product 4", price: 40 },
    { id: 5, name: "Product 5", price: 50 },
];

const cartedProducts = [];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById('cart-list');

// Render product list
function renderProducts() {

    products.forEach((product) => {
        const li = document.createElement("li");
        li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
        productList.appendChild(li);
    });
}

// Render cart list
function renderCart() {
    if (sessionStorage.length <= 1) {
        return;
    }
    else {
        // some data in session storage, corresponding to cart;        
        for (let index = 1; index < sessionStorage.length; index++) {

            const productId = sessionStorage.key(index);

            const productObject = JSON.parse(sessionStorage.getItem(productId));
            const li = document.createElement('li');
            li.innerHTML = `${productObject.name} - $${productObject.price} <button class="remove-from-cart-btn" data-id="${productObject.id}">Remove</button>`
            li.addEventListener('click', removeEventHandler);
            cartList.appendChild(li);
        }
    }
}

// Add item to cart
function addToCart(productId) {
    const product = getProductObject(productId);

    const li = document.createElement('li');
    li.innerHTML = `${product.name} - $${product.price} <button class="remove-from-cart-btn" data-id="${product.id}">Remove</button>`
    cartList.appendChild(li);

    li.addEventListener('click', removeEventHandler);

    cartedProducts.push(product);

    updateSessionStorage(productId);
}

// Remove item from cart
function removeFromCart(productId) {
    const product = getProductObject(productId);

    const productListItem = cartList.querySelector(`[data-id = "${productId}"]`).parentElement;
    productListItem.remove();

    updateSessionStorage(productId, true);
}

// Clear cart
function clearCart() {
    while (cartList.childElementCount > 0) {
        cartList.lastChild.remove();
    }
    sessionStorage.clear();
}

// Initial render
renderProducts();
renderCart();


// essential functions
function getProductObject(productId) {
    return products.find((element) => {
        console.log(element.id);
        return (element.id === parseInt(productId));
    });
}
function updateSessionStorage(productId, deleteProduct) {
    if (deleteProduct) {
        if (sessionStorage.getItem(productId)) {
            sessionStorage.removeItem(productId);
        }
    }
    else {
        // insert or update
        sessionStorage.setItem(productId, JSON.stringify(getProductObject(productId)));
    }
}

// event listeners
productList.querySelectorAll('li').forEach((listItem) => {

    listItem.addEventListener('click', (event) => {

        console.log('li clicked');

        if (event.target.tagName === 'BUTTON') {
            console.log('button clicked');
            const button = event.target;

            addToCart(button.getAttribute('data-id'));
        }
    })
});

function removeEventHandler(event) {
    console.log('li clicked');

    if (event.target.tagName === 'BUTTON') {
        console.log('button clicked');
        const button = event.target;

        removeFromCart(button.getAttribute('data-id'));
    }
}

cartList.nextElementSibling.addEventListener('click', (event)=> {
    clearCart();
})