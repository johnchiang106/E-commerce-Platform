import React from 'react';
import { ProductProps } from '../types'; // Import or define ProductProps type if not already done

interface CartPageProps {
  cart: { product: ProductProps, amount: number }[];
  removeFromCart: (productId: number) => void;
}

const CartPage: React.FC<CartPageProps> = ({ cart, removeFromCart }) => {
  return (
    <div id="cartPage" className="page">
      <div className="cart-items">
        {cart.map(({ product, amount }) => (
          <div key={product.id} className="cart-item">
            <div className="product-details">
              <strong>{product.title}</strong>
              <p>Price: ${product.price}</p>
              <p>Quantity: {amount}</p>
              <button onClick={() => removeFromCart(product.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CartPage;
