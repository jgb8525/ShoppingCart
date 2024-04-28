import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/redux/createAppSlice"
import { Product } from "../../app/model/product";
import { PaginationProps, PagingParams } from "../../app/model/paginationProps";
import axioAgent from "../../app/api/axioAgent";


export interface ProductSliceState {
    products: Product[];
    selectedProduct: Product | undefined;
    editMode: boolean;
    loadingInitial: boolean;
    pagingParams: PagingParams;
    pagination: PaginationProps;
    axiosParams: URLSearchParams;
    status: "idle" | "loading" | "failed";
}

const initialPaginationProps: PaginationProps = {
    currentPage: 1,
    itemPerPage: 10,
    totalItems: 1,
    totalPages: 10
}

const initialState: ProductSliceState = {
    products: [],
    selectedProduct: undefined,
    editMode: false,
    loadingInitial: false,
    pagingParams: new PagingParams(),
    pagination: initialPaginationProps,
    axiosParams: new URLSearchParams(),
    status: "idle"
}

// If you are not using async thunks you can use the standalone `createSlice`.
export const productSlice = createAppSlice({
    name: "product",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: create => ({
        // Use the `PayloadAction` type to declare the contents of `action.payload`
        incrementByAmount: create.reducer(
            (state, action: PayloadAction<number>) => {
                state.selectedProduct = state.products.find(x => x.id == action.payload);
                if (state.selectedProduct != null && state.selectedProduct.stock > state.selectedProduct.quantity)
                    state.selectedProduct.quantity++;
            },
        ),
        // Use the `PayloadAction` type to declare the contents of `action.payload`
        decrementByAmount: create.reducer(
            (state, action: PayloadAction<number>) => {
                state.selectedProduct = state.products.find(x => x.id == action.payload);
                if (state.selectedProduct != undefined && state.selectedProduct.quantity > 0)
                    state.selectedProduct.quantity--;
            },
        ),
        // Use the `PayloadAction` type to declare the contents of `action.payload`
        setPagingParams: create.reducer(
            (state, action: PayloadAction<PagingParams>) => {
                state.pagingParams = action.payload;
            },
        ),
        // Use the `PayloadAction` type to declare the contents of `action.payload`
        loadProducts: create.asyncThunk(
            async (_, thunkAPI) => {
                const currentState = thunkAPI.getState();
                currentState.loadingInitial = true;
                try {
                    const params = new URLSearchParams();
                    params.append('pageNumber', state.pagingParams.pageNumber.toString());
                    params.append('pageSize', state.pagingParams.pagesize.toString());
                    state.axiosParams = params;
                    const result = await axioAgent.Products.list(state.axiosParams);
                    state.products = result.data;
                    state.pagination = result.pagination;
                    state.loadingInitial = false;
                } catch (error) {
                    state.loadingInitial = false;
                }

            }
        ),
    }),
    // You can define your selectors here. These selectors receive the slice
    // state as their first argument.
    selectors: {

        selectPagination: product => product.pagination,
        selectProducts: product => product.products,
        selectLoadingInitial: product => product.loadingInitial,
    },
})

// Action creators are generated for each case reducer function.
export const { incrementByAmount, decrementByAmount, setPagingParams, loadProducts } = productSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectPagination, selectProducts, selectLoadingInitial } = productSlice.selectors