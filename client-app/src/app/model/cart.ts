import { CartItem } from "./cartItem"

export class Cart {
    items: CartItem[];
    userId: number;
    id: number;
    orderDate: string;
    totalInvoice: number;
    totalProducts: number;

    constructor(items: CartItem[], userId: number, id: number, orderDate: string, totalInvoice: number, totalProducts: number) {
        this.items = items;
        this.userId = userId;
        this.id = id;
        this.orderDate = orderDate;
        this.totalInvoice = totalInvoice;
        this.totalProducts = totalProducts;
    }
}