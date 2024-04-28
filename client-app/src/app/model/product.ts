import { Category } from "./category"

export interface Product {
    id: number;
    productCode: string;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
    stock: number;
    quantity: number;
    categories: Category[];
}
