import { Fragment } from 'react/jsx-runtime'
import ProductItem from './productItem';
import {selectProducts} from "./productSlice"
import { useAppSelector } from '../../app/redux/hooks';


export default function ProductList() {
    
    const products = useAppSelector(selectProducts);
    
    
    return (
        <Fragment>
            {products.map((product) => (
                <ProductItem key={product.id} product={product} />
            ))}
        </Fragment>
    )
}