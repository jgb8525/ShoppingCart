import { RouteObject,  createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import ProductDashboard from "../../features/products/dashboard/ProductDashboard";
import CartDashboard from "../../features/products/dashboard/CartDashboard";
import OrderDashboard from "../../features/orders/orderDashboard";

export const routes: RouteObject[] = [
    {
        path: '/',
        element : <App/>,
        children: [
            {path: '/', element : <ProductDashboard/>},
            {path: 'products', element : <ProductDashboard/>},
            {path: 'cart', element : <CartDashboard/>},
            {path: 'orders', element : <OrderDashboard/>}
        ]
    },
]

export const router = createBrowserRouter(routes);