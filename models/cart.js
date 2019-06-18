const fs = require('fs');
const path = require('path');

const cartPathAndFile = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);

module.exports = class Cart {

  static getCart(cb) {
    fs.readFile(cartPathAndFile, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      if (err) {
        cb(null);
      } else {
        cb(cart);
      };
    });
  };

  static addProduct(id, productPrice) {
    // Fetch the previous cart
    fs.readFile(cartPathAndFile, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      // Analyze the cart and find existing product
      const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      // Add new product and increase quantity
      if (existingProduct) {
        updatedProduct = {...existingProduct};
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      };
      cart.totalPrice = cart.totalPrice + +productPrice;
      // Write updated cart to file
      fs.writeFile(cartPathAndFile, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  };

  static deleteProduct(id, productPrice) {
    // Fetch the previous cart
    fs.readFile(cartPathAndFile, (err, fileContent) => {
      if (err) {
        return;
      }
      const cart = JSON.parse(fileContent);
      const updatedCart = { ...cart };
      // Analyze the cart and find existing product and quantity
      const product = updatedCart.products.find(prod => prod.id === id);
      if (!product) {
        return;
      }
      // Remove product from cart and update price
      updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
      updatedCart.totalPrice = updatedCart.totalPrice - productPrice * product.qty;
      // Write updated cart to file
      fs.writeFile(cartPathAndFile, JSON.stringify(updatedCart), (err) => {
        console.log(err);
      });
    });
  };

};
