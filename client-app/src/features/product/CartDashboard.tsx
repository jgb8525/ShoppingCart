
import { useStore } from "../../../app/stores/store";
import { Button, Grid, GridColumn, GridRow, Header, HeaderContent, HeaderSubheader, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow, Image, Label, Segment, Item, Divider } from "semantic-ui-react";
import { observer } from "mobx-react-lite";


export default observer(function CartDashboard() {
  const { cartStore } = useStore();

  const { productsInCart } = cartStore;

  return (

    <Grid divided>
      <GridRow>
        <Header size='large'>My Shopping Cart</Header>
      </GridRow>
      <GridRow>
        <GridColumn width={11}>
          <Table basic='very'   >
            <TableHeader>
              <TableRow>
                <TableHeaderCell  ></TableHeaderCell>
                <TableHeaderCell textAlign='center'>Price</TableHeaderCell>
                <TableHeaderCell textAlign='center'>Quantity</TableHeaderCell>
                <TableHeaderCell textAlign='center'>Total</TableHeaderCell>
                <TableHeaderCell textAlign='center'>Option</TableHeaderCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {productsInCart.map((p) => (
                <TableRow key={p.product.id}>
                  <TableCell width={8}>
                    <Header as='h4' >
                      <Image src={p.product.imageUrl} rounded size='mini' />
                      <HeaderContent >
                        {p.product.name}
                        <HeaderSubheader> {p.product.description}</HeaderSubheader>
                      </HeaderContent>
                    </Header>

                  </TableCell>
                  <TableCell width={1} textAlign='right'>
                    ${p.product.unitPrice}
                  </TableCell>
                  <TableCell width={1} textAlign='right'>
                    <Label color='black'>
                      {p.quantity}
                    </Label>

                  </TableCell>
                  <TableCell width={1} textAlign='right'>
                    ${p.quantity * p.product.unitPrice}
                  </TableCell>
                  <TableCell width={1} textAlign='center'>
                    <Button icon='trash' color='red' size='tiny' onClick={() => { cartStore.removeProductFromCart(p) }} />
                  </TableCell>
                </TableRow>
              )
              )}
            </TableBody>
          </Table>
        </GridColumn  >

        <GridColumn width={4}>

          <GridRow>
            <Segment.Group>
              <Segment>
                <Item.Group>
                  <Item>

                    <Item.Content>
                      <Item.Header >
                        <Header size='small' >Shopping cart details: </Header>
                      </Item.Header>
                      <Item.Description>
                        Total Items   :   {cartStore.totalProducts}
                      </Item.Description>
                 
                      <Item.Description>
                        Total ammount   : $  {cartStore.totalPrice}
                      </Item.Description>
                      <Divider  />
                      <Button content='Process Order'  icon='right arrow' labelPosition='right' color='blue'  disabled={cartStore.totalPrice==0} onClick={()=>{cartStore.createOrder() }} />

                    </Item.Content>
                  </Item>
                </Item.Group>
              </Segment>
            </Segment.Group>

          </GridRow>

        </GridColumn>

      </GridRow>
    </Grid>


  )

})