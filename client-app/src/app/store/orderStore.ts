import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/axioAgent";
import { Cart } from "../model/cart";

export default class OrderStore {

    orders: Cart[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    getAllOrder = async (userId: number) => {
        const result = await agent.Orders.list(userId);
        runInAction(() => {
            this.orders = result;
        });
    }
}