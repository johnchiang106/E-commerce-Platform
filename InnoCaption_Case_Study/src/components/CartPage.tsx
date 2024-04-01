import { useEffect, useState } from 'react'

function CartPage() {

  // Dummy data for products
  const initialProducts = [
    { id: 1, name: 'Product 1', price: 10, amount: 1 },
    { id: 2, name: 'Product 2', price: 20, amount: 1 }
  ];

  // State to hold the list of products
  const [products, setProducts] = useState(initialProducts);

  // Function to remove a product from the cart
  const removeFromCart = (productId: number) => {
    setProducts(products.filter(product => product.id !== productId));
  };

    return (
      <div id="cartPage" className="page">
        <div className="cart-items">
          {products.map(product => (
            <div key={product.id} className="cart-item">
              <div className="product-details">
                <strong>{product.name}</strong>
                <p>Price: ${product.price}</p>
                <p>Amount: {product.amount}</p>
                <button onClick={() => removeFromCart(product.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default CartPage;
