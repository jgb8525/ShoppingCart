import { Button, Container, Grid, Icon, Label, Pagination, PaginationProps } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';
import { useEffect, useState } from 'react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { PagingParams } from '../../app/model/paginationProps';
import ProductList from './productList';
import PaginationShorthand from '../../app/layout/Pagination';
import { setPagingParams, loadProducts, selectPagination, selectLoadingInitial } from "./productSlice"
import { useAppDispatch, useAppSelector } from '../../app/redux/hooks';



export default function productDashboard() {

    //Redux
    const dispatch = useAppDispatch();
    const paginationRedux = useAppSelector(selectPagination);
    const loadingInitial = useAppSelector(selectLoadingInitial);
    //------------------------------
    const { productStore, cartStore } = useStore();    
    const [loadingNext, setLoadingNext] = useState(false);
    const [activePage, setActivePage] = useState('1');


    function handleGetNext() {
        setLoadingNext(true);
        dispatch(setPagingParams(new PagingParams(paginationRedux!.currentPage + 1)));
        dispatch(loadProducts(1));
        setLoadingNext(false);
        .then(() => setLoadingNext(false)).then(() => cartStore.updateProductStockFromCart(productStore.products)));
    }

    function handleGetPrev() {
        setLoadingNext(true);
        dispatch(setPagingParams(new PagingParams(paginationRedux!.currentPage - 1)));
        loadProducts().then(() => setLoadingNext(false)).then(() => cartStore.updateProductStockFromCart(productStore.products));
    }


    useEffect(() => {
        loadProducts()
            .then(() => cartStore.loadCartFromStorage())
            .then(() => cartStore.updateProductStockFromCart(productStore.products));


    }, [loadProducts])

    const onChange = (e, pageInfo: PaginationProps) => {
        
        setActivePage(pageInfo.activePage);      
    };


    if (loadingInitial) return <LoadingComponent content='Loading app' />

    return (
        <Container style={{ marginTop: '7em' }}>
            <Grid>
                <Grid.Column width='16'>
                    <ProductList />
                    <Pagination
                        defaultActivePage={activePage}
                        activePage={paginationRedux.currentPage}
                        ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
                        firstItem={{ content: <Icon name='angle double left' />, icon: true }}
                        lastItem={{ content: <Icon name='angle double right' />, icon: true }}
                        prevItem={{ content: <Icon name='angle left' />, icon: true }}
                        nextItem={{ content: <Icon name='angle right' />, icon: true }}
                        totalPages={paginationRedux.totalPages}
                        onPageChange={onChange}
                    />

                </Grid.Column>
            </Grid>
        </Container>
    )
}