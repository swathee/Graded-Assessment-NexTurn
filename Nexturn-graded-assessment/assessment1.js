
let productsJSON = `[
    {"id": 1, "name": "Wireless Earbuds", "category": "Electronics", "price": 49.99, "available": true},
    {"id": 2, "name": "Yoga Mat", "category": "Fitness", "price": 20.00, "available": true},
    {"id": 3, "name": "Coffee Maker", "category": "Home Appliances", "price": 85.00, "available": false},
    {"id": 4, "name": "Smartwatch", "category": "Electronics", "price": 199.99, "available": true},
    {"id": 5, "name": "Desk Lamp", "category": "Furniture", "price": 35.00, "available": true}
]`;


function parseProducts() {
    return JSON.parse(productsJSON);
}


function addProduct(newProduct) {
    let products = parseProducts();
    products.push(newProduct);
    console.log("Product added:", newProduct);
    return products;
}


function updateProductPrice(productId, newPrice) {
    let products = parseProducts();
    let product = products.find(p => p.id === productId);
    if (product) {
        product.price = newPrice;
        console.log(`Price updated for product ID ${productId}: $${newPrice}`);
    } else {
        console.log(`Product with ID ${productId} not found.`);
    }
    return products;
}


function getAvailableProducts() {
    let products = parseProducts();
    return products.filter(p => p.available);
}


function getProductsByCategory(category) {
    let products = parseProducts();
    return products.filter(p => p.category === category);
}


console.log("Parsed Products:", parseProducts());

console.log("Adding a new product...");
addProduct({"id": 6, "name": "Bluetooth Speaker", "category": "Electronics", "price": 59.99, "available": true});

console.log("Updating product price...");
updateProductPrice(2, 25.00);

console.log("Available Products:", getAvailableProducts());

console.log("Products in Electronics Category:", getProductsByCategory("Electronics"));
