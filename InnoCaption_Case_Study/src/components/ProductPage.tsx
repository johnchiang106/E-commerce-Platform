import { ProductProps } from '../types';

interface ProductPageProps {
    cart: { product: ProductProps, amount: number }[];
    products: ProductProps[];
    addToCart: (product: ProductProps, quantity: number) => void;
    handleTabClick: (tabName: string) => void;
}

const ProductPage: React.FC<ProductPageProps> = ({ cart, products, addToCart, handleTabClick }) => {

    const isInCart = (productId: number) => {
        return cart.some(item => item.product.id === productId);
    };

    const getCartAmount = (productId: number) => {
        const cartItem = cart.find(item => item.product.id === productId);
        return cartItem ? cartItem.amount : 0;
    };
    
    const renderButton = (product: ProductProps) => {
        if (isInCart(product.id)) {
            return <button className="fancy-button amount" onClick={() => handleTabClick("cart")}>{getCartAmount(product.id)}</button>;
        } else {
            return <button className="fancy-button add" onClick={() => addToCart(product, 1)}>Add to Cart</button>;
        }
    };

    return (
    <div id="prodPage" className="page">
        {products.map(product => (
            <div key={product.id} className="prod card">
            <div className="title-container"><strong>{product.title}</strong></div>
            <img src={product.images[0]} alt={product.title} /><br />
            <del>${product.price}</del><br />
            <span className="red">${product.actualPrice}</span><br />
            {/* <input type="number" min="1" defaultValue="1" ref={input => product.inputRef = input} /> */}
            {renderButton(product)}
            </div>
        ))}
    </div>
      
  );
  }
  
  export default ProductPage;
