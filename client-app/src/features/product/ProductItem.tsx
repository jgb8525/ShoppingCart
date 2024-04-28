
import { Button, Divider, Icon, Item, ItemContent, ItemDescription, ItemExtra, ItemHeader, ItemMeta, Label, Segment } from 'semantic-ui-react'
import { Product } from '../../app/model/product'
import { useStore } from '../../../app/stores/store';



interface Props {
    product: Product
}


export default function ProductItem({ product }: Props) {
    const { cartStore } = useStore();
    return (
        <>
            <Segment.Group   >
                <Segment  >
                    <Item.Group>
                        <Item key={product.id}>
                            <Item.Image size='tiny' src={product.imageUrl} />
                            <ItemContent>
                                <ItemHeader as='a'> {product.title}</ItemHeader>
                                <ItemDescription>{product.description}</ItemDescription>
                                <ItemMeta>
                                    <span className='cinema'>Item No: {product.productCode}  | <Label as='a' basic color={product.stock == 0 ? 'red' : 'blue'}> {product.stock} in stock</Label> </span>
                                </ItemMeta>
                                <ItemExtra> <b> Price: $ </b>
                                    <Label as='a' basic color='green' >{product.price}</Label>
                                </ItemExtra>
                                <Divider fitted />
                                <ItemDescription>
                                    <b>Categories:  </b>
                                    {
                                        product.categories.map((category) => (
                                            <Label tag color='black' size='tiny'>
                                                {category.description}
                                            </Label>
                                        ))
                                    }
                                </ItemDescription  >
                            </ItemContent>
                        </Item>
                    </Item.Group>
                </Segment>
                <Segment secondary  >
                    <Button icon size='mini' onClick={() =>
                        product.quantity = product.quantity < 1 ? 0 : product.quantity - 1
                    }>
                        <Icon name='minus' />
                    </Button>
                    <Button icon size='mini' onClick={() => {
                        product.quantity = product.stock > product.quantity ? product.quantity + 1 : product.quantity
                    }
                    }  >
                        <Icon name='add' />
                    </Button>

                    <Button
                        content='Add to cart '
                        icon='cart'
                        size='mini'
                        color='blue'
                        label={product.quantity ?? 0}
                        labelPosition='left'
                        onClick={() => cartStore.addProductToCart(product, product.quantity)}
                        disabled={product.stock == 0 || product.quantity == 0}
                    />


                </Segment>
            </Segment.Group>
            </>

    )
}