import { useEffect } from 'react'
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Grid, GridColumn, Header, HeaderContent, HeaderSubheader, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow, Image, Label, Segment, Icon } from "semantic-ui-react";

export default observer(function OrderDashboard() {
    const { orderStore, cartStore } = useStore();
    useEffect(() => {
        orderStore.getAllOrder(cartStore.user.id)
    }, [orderStore.getAllOrder])


    return (

        <div>

            {orderStore.orders.map(
                (order) => (

                    <Grid columns={1}>
                        <GridColumn>
                            <Segment raised>
                                <Label as='a' color='red' ribbon>
                                    <Icon name='amazon pay' />
                                    Order No {order.id}
                                </Label>
                                <Label as='a' color='blue'>
                                    <Icon name='clock' />
                                    Date: {order.orderDate}
                                </Label>
                                <Label as='a' color='blue' basic>
                                    <Icon name='clock' />
                                    Number Of Products: {order.totalProducts}
                                </Label>
                                <Label as='a' color='blue' basic>
                                    <Icon name='clock' />
                                    Total Invoice: $ {order.totalInvoice}
                                </Label>
                                <Table basic='very'   >
                                    <TableHeader>
                                        <TableRow>
                                            <TableHeaderCell  >  </TableHeaderCell>
                                            <TableHeaderCell textAlign='center'>Price</TableHeaderCell>
                                            <TableHeaderCell textAlign='center'>Quantity</TableHeaderCell>
                                            <TableHeaderCell textAlign='center'>Total</TableHeaderCell>
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody>
                                        {order.items.map(item => (
                                            <TableRow>
                                                <TableCell width={8}>
                                                    <Header as='h4' >
                                                        <Image src={item.product.imageUrl} rounded size='mini' />
                                                        <HeaderContent >
                                                            {item.product.name}
                                                            <HeaderSubheader> {item.product.description}</HeaderSubheader>
                                                        </HeaderContent>
                                                    </Header>
                                                </TableCell>
                                                <TableCell textAlign='center'>
                                                    {item.product.unitPrice}
                                                </TableCell>
                                                <TableCell textAlign='center'>
                                                    {item.quantity}
                                                </TableCell>
                                                <TableCell textAlign='center'>
                                                    {item.quantity * item.product.unitPrice}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Segment>
                        </GridColumn>
                    </Grid>
                )
            )}
        </div>)
})