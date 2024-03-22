//CONTEXTO:
/*En este caso usamos el patron decorator para poder añadir funcionalidades a nuestros productos, 
ya sea como descuentos a cada producto en este caso 
DiscountDecorator es un decorador que toma un producto 
y un porcentaje de descuento como parámetros. 
Cuando se llama al método getPrice() en el decorador,
calcula el precio con el descuento aplicado. 
Además, sobrescribe el método render() para agregar 
la información del descuento en la representación HTML del producto.
*/ 

// Definir la clase base para los productos
class Product {
    constructor(name, price,imagen) {
        this.name = name;
        this.price = price;
        this.imagen = imagen;
    
    }

    // Obtener el precio del producto 
    getPrice() {
        return this.price;
    }

    // Para que se ejecute en el html 
    render() {
        return `
            <div class="product">
            <img src="${this.imagen}" alt="${this.imagen}"> <
                <div class="name">${this.name}</div>
                <div class="price">$${this.price.toFixed(2)}</div>
                <select class="size">
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
            </select>
            <button class="add-to-cart" onclick="addToCart('${this.name}', ${this.price})">Agregar al carrito</button>
            </div>
        `;
    }
}
// funcion para comprar el producto 
function addToCart(productName, productPrice) {
    const selectedSize = document.querySelector('.size').value;
    const cartItem = { name: productName, price: productPrice, size: selectedSize };
    console.log('Producto agregado al carrito:', cartItem);
    // Redirigimos a la página de compra
    window.location.href = 'paginadecompra.html';
}

// Decorator para añadir un descuento a un producto
class DiscountDecorator {
    constructor(product, discountPercentage) {
        this.product = product;
        this.discountPercentage = discountPercentage;
    }

    // Precio mas el descuento 
    getPrice() {
        const originalPrice = this.product.getPrice();
        const discountAmount = originalPrice * (this.discountPercentage / 100);
        return originalPrice - discountAmount;
    }

    // renderizar en html 
    render() {
        const originalRender = this.product.render();
        return originalRender.replace('</div>', `<div class="discount">-${this.discountPercentage}%</div></div>`);
    }
}

// Crear algunos productos
const product1 = new Product('Camisa', 25, 'camisa.png');
const product2 = new Product('Pantalón', 40, 'pantalon.png');
const product3 = new Product('Corbatin', 10, 'corbatin.png');
const product4 = new Product('tennis', 500, 'tennis.png');
const product5 = new Product('TennisOrange', 250, 'tennisOrange.png');
// Aplicar descuento a algunos productos
const discountedProduct1 = new DiscountDecorator(product1, 50);
const discountedProduct = new DiscountDecorator(product5, 50);
// Renderizar los productos en la página
const productListElement = document.getElementById('product-list');
productListElement.innerHTML += product1.render();
productListElement.innerHTML += product2.render();
productListElement.innerHTML += product3.render();
productListElement.innerHTML += product4.render();
productListElement.innerHTML += discountedProduct.render();


//pago tarjeta

document.getElementById("payment-form").addEventListener("submit", function(event) {
    event.preventDefault(); 
    // event.preventDefault evita que el formulario se envíe automáticamente

    // Obtener los valores del formulario
    const cardNumber = document.getElementById("card-number").value;
    const cardExpiry = document.getElementById("card-expiry").value;
    const cardCVC = document.getElementById("card-cvc").value;
    console.log("Información de la tarjeta:", cardNumber, cardExpiry, cardCVC);
});

