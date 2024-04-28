import { makeAutoObservable, runInAction } from "mobx";
import { Product } from "../model/product";
import agent from "../api/axioAgent";
import { PaginationProps, PagingParams } from "../model/paginationProps";

export default class ProductStore {
    products: Product[] = [];
    selectedProduct: Product | undefined = undefined;
    editMode = false;
    loadingInitial = false;
    pagingParams = new PagingParams();
    pagination: PaginationProps | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    SetPagingParams = (pagingParams: PagingParams) => {
        this.pagingParams = pagingParams;
    }

    get axiosParams() {
        const params = new URLSearchParams();
        params.append('pageNumber', this.pagingParams.pageNumber.toString());
        params.append('pageSize', this.pagingParams.pagesize.toString());
        return params;
    }

    loadProducts = async () => {
        this.setLoadingInitial(true);
        try {
            const result = await agent.Products.list(this.axiosParams);
            runInAction(() => {
                this.products = result.data;
            });
            this.setPagination(result.pagination);
            this.setLoadingInitial(false);

        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    increment = (id: number) => {
        this.selectedProduct = this.products.find(x => x.id = id);
        if (this.selectedProduct != null && this.selectedProduct.stock > this.selectedProduct.quantity)
            this.selectedProduct.quantity++;
    }

    decrement = (id: number) => {
        this.selectedProduct = this.products.find(x => x.id = id);
        if (this.selectedProduct != undefined && this.selectedProduct.quantity > 0)
            this.selectedProduct.quantity--;
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    setPagination = (pagination: PaginationProps) => {
        this.pagination = pagination;
    }
}