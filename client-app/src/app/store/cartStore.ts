import { makeAutoObservable } from "mobx";
import { CartItem } from "../model/cartItem";
import { Product } from "../model/product";
import agent from "../api/axioAgent";
import User from "../model/user";
import { Cart } from "../model/cart";

export default class CartStore {

    productsInCart: CartItem[] = [];
    totalProducts: number = 0;
    totalPrice: number = 0;
    user: User;

    constructor() {
        this.user = new User(1, 11207352, "Jimmy", "García", "jgb8525@gmail.com")
        makeAutoObservable(this);
    }

    addProductToCart = (product: Product, ammount: number) => {
        var existsProduct = this.productsInCart.find(p => p.product.id == product.id);

        if (existsProduct != null)
            existsProduct.quantity += ammount;
        else
            this.productsInCart.push(new CartItem(product, ammount));

        this.totalProducts = this.totalProducts + ammount;
        product.stock = product.stock - ammount;
        product.quantity = 0;
        this.getTotalPrice();        
        localStorage.setItem('cart', JSON.stringify(this));
    }

    removeProductFromCart = (cart: CartItem) => {
        this.productsInCart = this.productsInCart.filter(p => p != cart);
        cart.product.stock = cart.product.stock + cart.quantity;
        this.totalProducts = this.totalProducts - cart.quantity;
        this.getTotalPrice();        
        localStorage.setItem('cart', JSON.stringify(this));
    }

    updateProductStockFromCart = (products: Product[]) => {
        products.forEach(p => {
            const quantity = this.productsInCart.find(x => x.product.id == p.id)?.quantity;
            if (quantity != undefined)
                p.stock = p.stock - quantity;
        })
        this.getTotalPrice();
    }

    getTotalPrice = () => {
        this.totalPrice = 0;
        this.productsInCart.forEach(
            e => {
                this.totalPrice += e.quantity * e.product.price
            }
        )
    }

    loadCartFromStorage = () => {
        var cartFromStorage = localStorage.getItem('cart');
        if (cartFromStorage != null) {
            var cart = JSON.parse(cartFromStorage) as CartStore
            this.productsInCart = cart.productsInCart
            this.totalProducts = cart.totalProducts
        }
    }

    createOrder = () => {
        var cart = new Cart(this.productsInCart, this.user.id, 0, Date.now.toString(), 0, 0);
        agent.Orders.create(cart);
        this.clearCart();
    }

    clearCart = () => {
        this.productsInCart = [];
        this.totalProducts = 0;
        this.totalPrice = 0;
        localStorage.setItem('cart', JSON.stringify(this));
    }
}