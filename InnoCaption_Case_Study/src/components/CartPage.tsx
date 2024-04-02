import React from 'react';
import { ProductProps } from '../types';

interface CartPageProps {
  cart: { product: ProductProps, amount: number }[];
  removeFromCart: (productId: number) => void;
  handleQuantityChange: (productId: number, newQuantity: number) => void;
}

const CartPage: React.FC<CartPageProps> = ({ cart, removeFromCart, handleQuantityChange }) => {
  return (
    <div id="cartPage" className="page">
      <div className="cart-items">
        {cart.map(({ product, amount }) => (
          <div key={product.id} className="cart-item">
            <div className="product-image">
              <img src={product.images[0]} alt={product.title} />
            </div>
            <div className="product-details">
              <strong>{product.title}</strong>
              <p>Price: ${product.actualPrice}</p>
            </div>
            <div className="quantity-input">
              <p>Amount:</p>
              <input
                type="number"
                value={amount}
                size={6}
                onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
              />
            </div>
            <div className="second-line">
              <p>Total Price: ${Math.round(product.actualPrice * amount * 100) / 100}</p>
              <button onClick={() => removeFromCart(product.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CartPage;
