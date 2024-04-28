import axios, { AxiosResponse } from "axios";
import { Product } from "../model/product";
import { PaginatedResult } from "../model/paginationProps";
import { Cart } from "../model/cart";

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response => {
    const pagination = response.headers['pagination']
    if (pagination) {
        response.data = new PaginatedResult(response.data, JSON.parse(pagination))
        return response as AxiosResponse<PaginatedResult<any>>
    }
    return response;
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody)
}

const Products = {
    list: (params: URLSearchParams) => axios.get<PaginatedResult<Product[]>>('/Product', { params }).then(responseBody),
    details: (id: string) => requests.get<Product>(`/Product/${id}`),
    create: (product: Product) => requests.post<void>('/Product', product),
    update: (product: Product) => requests.put<void>(`/Product/${product.id}`, product),
    delete: (id: string) => requests.del<void>(`/Product/${id}`)
}

const Orders = {
    create: (cart: Cart) => requests.post<void>('/Order', cart),
    list: (userId: number) => requests.get<Cart[]>(`/Order/${userId}`)
}

const agent = {
    Products,
    Orders
}

export default agent;