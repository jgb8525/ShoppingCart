import { createContext, useContext } from "react";
import ProductStore from "./productStore";
import CartStore from "./cartStore";
import OrderStore from "./orderStore";

interface Store{
        productStore : ProductStore;
        cartStore: CartStore;
        orderStore : OrderStore;
}

export const store: Store = {
    productStore: new ProductStore(),
    cartStore: new CartStore(),
    orderStore : new OrderStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}